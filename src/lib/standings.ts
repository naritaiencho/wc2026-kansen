import type { Match, MatchResult } from '../data/types'

export interface StandingRow {
  code: string
  played: number
  won: number
  drawn: number
  lost: number
  gf: number
  ga: number
  gd: number
  points: number
}

/** グループ順位表を結果データから計算(公式データ+ユーザー入力をマージ済みの結果を渡す) */
export function computeStandings(
  groupTeams: string[],
  matches: Match[],
  results: Map<number, MatchResult>,
): StandingRow[] {
  const rows = new Map<string, StandingRow>()
  for (const code of groupTeams) {
    rows.set(code, { code, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, points: 0 })
  }

  for (const match of matches) {
    const result = results.get(match.id)
    if (!result) continue
    const home = rows.get(match.home)
    const away = rows.get(match.away)
    if (!home || !away) continue

    home.played++
    away.played++
    home.gf += result.homeScore
    home.ga += result.awayScore
    away.gf += result.awayScore
    away.ga += result.homeScore

    if (result.homeScore > result.awayScore) {
      home.won++
      home.points += 3
      away.lost++
    } else if (result.homeScore < result.awayScore) {
      away.won++
      away.points += 3
      home.lost++
    } else {
      home.drawn++
      away.drawn++
      home.points++
      away.points++
    }
  }

  for (const row of rows.values()) row.gd = row.gf - row.ga

  return [...rows.values()].sort(
    (a, b) => b.points - a.points || b.gd - a.gd || b.gf - a.gf || a.code.localeCompare(b.code),
  )
}

/** 公式結果とユーザー入力結果をマージ(公式優先) */
export function mergeResults(official: MatchResult[], user: MatchResult[]): Map<number, MatchResult> {
  const map = new Map<number, MatchResult>()
  for (const r of user) map.set(r.matchId, r)
  for (const r of official) map.set(r.matchId, r) // 公式が上書き
  return map
}

/** 得点者メモ('上田綺世x2, 久保建英')をパースして集計 */
export function parseScorerMemo(memo: string): { name: string; goals: number }[] {
  return memo
    .split(/[,、]/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((entry) => {
      const match = entry.match(/^(.+?)\s*[x×]\s*(\d+)$/)
      if (match) return { name: match[1].trim(), goals: parseInt(match[2], 10) }
      return { name: entry, goals: 1 }
    })
}
