import type { Match } from '../data/types'
import { stageLabels } from '../data/matches'

/** Googleカレンダー追加用URL(JST指定)を生成 — ワンクリックで予定追加 */
export function googleCalendarUrl(match: Match, teamName: (code: string) => string): string {
  const start = new Date(match.kickoff)
  const end = new Date(start.getTime() + 2 * 3600 * 1000) // 試合時間2時間で登録

  const fmt = (d: Date) => {
    const jst = new Date(d.getTime() + 9 * 3600 * 1000)
    const p = (n: number) => String(n).padStart(2, '0')
    return `${jst.getUTCFullYear()}${p(jst.getUTCMonth() + 1)}${p(jst.getUTCDate())}T${p(jst.getUTCHours())}${p(jst.getUTCMinutes())}00`
  }

  const stageLabel = match.stage === 'group' ? `グループ${match.group}` : stageLabels[match.stage]
  const title = `⚽ ${teamName(match.home)} vs ${teamName(match.away)}【W杯2026 ${stageLabel}】`

  const broadcastNote =
    match.broadcast === 'free'
      ? '📺 DAZN無料配信(無料登録のみで視聴可)'
      : match.broadcast === 'shared'
        ? '📺 地上波放送あり + DAZN配信'
        : '📺 DAZN独占配信'

  const details = [
    broadcastNote,
    match.highlight ? `\n🔥 見どころ: ${match.highlight}` : '',
    `\n🏟️ ${match.stadium}(${match.city})`,
    '\n\n— ワールドカップ手帳 \'26 で追加',
  ].join('')

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${fmt(start)}/${fmt(end)}`,
    ctz: 'Asia/Tokyo',
    details,
    location: `${match.stadium}, ${match.city}`,
  })

  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

/** 試合結果を調べるためのGoogle検索リンク */
export function resultSearchUrl(homeName: string, awayName: string): string {
  const q = encodeURIComponent(`${homeName} 対 ${awayName} 結果 ワールドカップ 2026`)
  return `https://www.google.com/search?q=${q}`
}
