// football-data.org から W杯2026 の結果・得点を取得し、アプリ形状のJSON(MatchResult[]/ScorerEntry[])に
// 変換して data/ に書き出す。順位はクライアント側の computeStandings が結果から計算するため取得しない。
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
  // (jstDate|sortedPair) -> 日程スロット。決勝T('未定')は除外（チーム確定後に別途対応）。
  const index = new Map()
  for (const m of schedule) {
    if (m.home === '未定' || m.away === '未定') continue
    index.set(`${m.jstDate}|${[m.home, m.away].sort().join('-')}`, m)
  }

  const meta = { updatedAt: new Date().toISOString(), source: 'football-data.org', degraded: [], unmapped: [] }

  // --- 結果 (MatchResult[]) ---
  let results = []
  try {
    const data = await api('/competitions/WC/matches')
    for (const fm of data.matches || []) {
      const ft = fm.score && fm.score.fullTime
      if (!ft || typeof ft.home !== 'number' || typeof ft.away !== 'number') continue // 未消化はスキップ
      const h = code(fm.homeTeam && fm.homeTeam.tla)
      const a = code(fm.awayTeam && fm.awayTeam.tla)
      if (!h || !a) continue
      const slot = index.get(`${jstDate(fm.utcDate)}|${[h, a].sort().join('-')}`)
      if (!slot) {
        meta.unmapped.push(`${jstDate(fm.utcDate)} ${h}-${a}`)
        continue
      }
      const swap = slot.home !== h // アプリのhome/awayと逆ならスコアも入替
      results.push({
        matchId: slot.id,
        homeScore: swap ? ft.away : ft.home,
        awayScore: swap ? ft.home : ft.away,
      })
    }
    results.sort((x, y) => x.matchId - y.matchId)
  } catch (e) {
    meta.degraded.push(`matches:${e.message}`)
  }

  // --- 得点 (ScorerEntry[])。無料枠はアシスト無し → assists:0（既存の空状態UIが出る） ---
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
  }
  if (!meta.degraded.some((d) => d.startsWith('scorers'))) {
    await writeFile(join(ROOT, 'data/scorers.json'), JSON.stringify(scorers), 'utf-8')
  }
  await writeFile(join(ROOT, 'data/meta.json'), JSON.stringify(meta), 'utf-8')

  console.log(`results=${results.length} scorers=${scorers.length} unmapped=${meta.unmapped.length} degraded=${JSON.stringify(meta.degraded)}`)
  if (meta.unmapped.length) console.log('UNMAPPED:', meta.unmapped)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
