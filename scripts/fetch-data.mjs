// football-data.org から W杯2026 の結果・得点・決勝T組み合わせを取得し、アプリ形状のJSONに
// 変換して data/ に書き出す。順位はクライアント側の computeStandings が結果から計算するため取得しない。
//
// グループ(1-72): matches.ts と同じ「日付+チームペア」で固定スロットへ。
// 決勝T(73-104): matches.ts が「未定」なので、APIのキックオフ時刻でスロットへマッピングし、
//   対戦カード(bracket.json) と スコア(results.json) を自動生成する。勝ち上がり確定のたびに自動で埋まる。
// 使い方: FOOTBALL_DATA_TOKEN=xxx node scripts/fetch-data.mjs
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const TOKEN = process.env.FOOTBALL_DATA_TOKEN
const BASE = 'https://api.football-data.org/v4'
// football-data.org の TLA → アプリのFIFAコードの差分（48カ国中ここだけ違う）
const ALIAS = { URY: 'URU' }

if (!TOKEN) {
  console.error('FOOTBALL_DATA_TOKEN is missing')
  process.exit(1)
}

const code = (tla) => (tla ? ALIAS[tla] || tla : null)

// UTC日時 → JST暦日(YYYY-MM-DD)。日本はDST無しなので固定+9h。
const jstDate = (utc) => {
  const j = new Date(new Date(utc).getTime() + 9 * 3600 * 1000)
  return `${j.getUTCFullYear()}-${String(j.getUTCMonth() + 1).padStart(2, '0')}-${String(j.getUTCDate()).padStart(2, '0')}`
}

async function api(path) {
  const res = await fetch(`${BASE}${path}`, { headers: { 'X-Auth-Token': TOKEN } })
  if (!res.ok) throw new Error(`${path} -> HTTP ${res.status}`)
  return res.json()
}

async function main() {
  const schedule = JSON.parse(await readFile(join(ROOT, 'scripts/maps/schedule.json'), 'utf-8'))
  // グループ: (jstDate|sortedPair) -> スロット。決勝T(未定)はキックオフ時刻インデックスへ。
  const groupIndex = new Map()
  const koByEpoch = new Map() // 決勝T枠: キックオフUTCエポック -> スロット
  for (const m of schedule) {
    if (m.home === '未定' || m.away === '未定') {
      koByEpoch.set(Date.parse(m.kickoff), m)
    } else {
      groupIndex.set(`${m.jstDate}|${[m.home, m.away].sort().join('-')}`, m)
    }
  }

  const meta = { updatedAt: new Date().toISOString(), source: 'football-data.org', degraded: [], unmapped: [] }

  // --- 結果(MatchResult[]) + 決勝T組み合わせ(bracket) ---
  let results = []
  let bracket = {} // matchId -> { home, away }
  try {
    const data = await api('/competitions/WC/matches')
    for (const fm of data.matches || []) {
      const h = code(fm.homeTeam && fm.homeTeam.tla)
      const a = code(fm.awayTeam && fm.awayTeam.tla)
      const ft = fm.score && fm.score.fullTime
      const hasScore = ft && typeof ft.home === 'number' && typeof ft.away === 'number'

      // 1) まずグループ枠（日付+チームペア）を試す。ステージ文字列に依存しない判定。
      if (h && a && hasScore) {
        const gslot = groupIndex.get(`${jstDate(fm.utcDate)}|${[h, a].sort().join('-')}`)
        if (gslot) {
          const swap = gslot.home !== h // アプリのhome/awayと逆ならスコアも入替
          results.push({ matchId: gslot.id, homeScore: swap ? ft.away : ft.home, awayScore: swap ? ft.home : ft.away })
          continue
        }
      }

      // 2) 決勝T枠（キックオフ時刻で73-104へ）。チーム確定次第 bracket に、消化済みなら results にも。
      const kslot = koByEpoch.get(Date.parse(fm.utcDate))
      if (kslot) {
        if (h && a) bracket[kslot.id] = { home: h, away: a }
        if (hasScore && h && a) {
          // 勝者(PK決着含む)。引き分けスコアでもPK勝者を拾えるよう score.winner を使う。
          const w = fm.score && fm.score.winner
          const entry = { matchId: kslot.id, homeScore: ft.home, awayScore: ft.away }
          if (w === 'HOME_TEAM') entry.winner = 'home'
          else if (w === 'AWAY_TEAM') entry.winner = 'away'
          results.push(entry)
        }
        continue
      }

      // 3) どちらにも該当しない（時刻ズレ等）。診断用に記録するだけで、推測マッピングはしない。
      if (h && a) meta.unmapped.push(`${fm.stage || '?'}|${jstDate(fm.utcDate)}|${h}-${a}|${hasScore ? `${ft.home}-${ft.away}` : 'TBD'}`)
    }
    results.sort((x, y) => x.matchId - y.matchId)
  } catch (e) {
    meta.degraded.push(`matches:${e.message}`)
  }

  // --- 得点(ScorerEntry[])。大会通算なので決勝Tの得点も自動で含まれる。無料枠はアシスト無し → assists:0 ---
  let scorers = []
  try {
    const data = await api('/competitions/WC/scorers?limit=100')
    for (const s of data.scorers || []) {
      if (!s.player || !s.player.name) continue
      scorers.push({
        player: s.player.name,
        team: code(s.team && s.team.tla),
        goals: typeof s.goals === 'number' ? s.goals : 0,
        assists: typeof s.assists === 'number' ? s.assists : 0,
      })
    }
  } catch (e) {
    meta.degraded.push(`scorers:${e.message}`)
  }

  // 書き出し（失敗した系統は前回の正データを温存するため上書きしない）
  await mkdir(join(ROOT, 'data'), { recursive: true })
  if (!meta.degraded.some((d) => d.startsWith('matches'))) {
    await writeFile(join(ROOT, 'data/results.json'), JSON.stringify(results), 'utf-8')
    await writeFile(join(ROOT, 'data/bracket.json'), JSON.stringify(bracket), 'utf-8')
  }
  if (!meta.degraded.some((d) => d.startsWith('scorers'))) {
    await writeFile(join(ROOT, 'data/scorers.json'), JSON.stringify(scorers), 'utf-8')
  }
  await writeFile(join(ROOT, 'data/meta.json'), JSON.stringify(meta), 'utf-8')

  console.log(
    `results=${results.length} bracket=${Object.keys(bracket).length} scorers=${scorers.length} ` +
      `unmapped=${meta.unmapped.length} degraded=${JSON.stringify(meta.degraded)}`,
  )
  if (meta.unmapped.length) console.log('UNMAPPED:', meta.unmapped)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
