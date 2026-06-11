// JST時刻ユーティリティ — データは全てISO 8601(+09:00)で保持し、表示もJST固定

const DAYS_JA = ['日', '月', '火', '水', '木', '金', '土']

export function parseKickoff(iso: string): Date {
  return new Date(iso)
}

/** '6/15(月) 5:00' 形式 */
export function formatKickoff(iso: string): string {
  const d = new Date(iso)
  // ISO文字列自体がJSTオフセット付きなので、JSTに固定して表示
  const jst = new Date(d.getTime() + 9 * 3600 * 1000)
  const month = jst.getUTCMonth() + 1
  const day = jst.getUTCDate()
  const dow = DAYS_JA[jst.getUTCDay()]
  const h = jst.getUTCHours()
  const min = jst.getUTCMinutes()
  return `${month}/${day}(${dow}) ${h}:${String(min).padStart(2, '0')}`
}

/** '5:00' 形式 */
export function formatTimeOnly(iso: string): string {
  const jst = new Date(new Date(iso).getTime() + 9 * 3600 * 1000)
  return `${jst.getUTCHours()}:${String(jst.getUTCMinutes()).padStart(2, '0')}`
}

/** '6/15(月)' 形式 */
export function formatDateOnly(iso: string): string {
  const jst = new Date(new Date(iso).getTime() + 9 * 3600 * 1000)
  return `${jst.getUTCMonth() + 1}/${jst.getUTCDate()}(${DAYS_JA[jst.getUTCDay()]})`
}

/** JSTでの日付キー '2026-06-15' */
export function jstDateKey(iso: string): string {
  const jst = new Date(new Date(iso).getTime() + 9 * 3600 * 1000)
  return `${jst.getUTCFullYear()}-${String(jst.getUTCMonth() + 1).padStart(2, '0')}-${String(jst.getUTCDate()).padStart(2, '0')}`
}

export function isPast(iso: string, now: Date = new Date()): boolean {
  // 試合終了の目安としてキックオフ+2時間
  return now.getTime() > new Date(iso).getTime() + 2 * 3600 * 1000
}

export function isLive(iso: string, now: Date = new Date()): boolean {
  const ko = new Date(iso).getTime()
  return now.getTime() >= ko && now.getTime() <= ko + 2 * 3600 * 1000
}

export interface CountdownParts {
  days: number
  hours: number
  minutes: number
  seconds: number
  total: number
}

export function countdownTo(iso: string, now: Date = new Date()): CountdownParts {
  const total = Math.max(0, new Date(iso).getTime() - now.getTime())
  return {
    total,
    days: Math.floor(total / 86400000),
    hours: Math.floor((total % 86400000) / 3600000),
    minutes: Math.floor((total % 3600000) / 60000),
    seconds: Math.floor((total % 60000) / 1000),
  }
}

/** 観戦睡眠プラン: キックオフ時刻から就寝・起床の提案を生成 */
export function sleepPlanFor(iso: string): { wake: string; sleep: string; advice: string } {
  const jst = new Date(new Date(iso).getTime() + 9 * 3600 * 1000)
  const h = jst.getUTCHours()
  const m = jst.getUTCMinutes()
  const wakeMin = h * 60 + m - 30 // 30分前起床
  const fmt = (totalMin: number) => {
    const t = ((totalMin % 1440) + 1440) % 1440
    return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}`
  }
  if (h >= 1 && h <= 3) {
    return {
      wake: fmt(wakeMin),
      sleep: '21:00頃に仮眠開始',
      advice: '深夜帯キックオフ。21時就寝→試合前に起きる「仮眠作戦」か、いっそ夜更かしで完走するか。翌日に響かせない覚悟を。',
    }
  }
  if (h >= 4 && h <= 6) {
    return {
      wake: fmt(wakeMin),
      sleep: '21:30〜22:00就寝',
      advice: `早朝キックオフ。22時就寝→${fmt(wakeMin)}起床で睡眠6時間確保。観戦後そのまま朝活へ。`,
    }
  }
  if (h >= 7 && h <= 9) {
    return {
      wake: fmt(wakeMin),
      sleep: '23:00就寝でOK',
      advice: '朝キックオフ。通常の睡眠リズムで観戦可能な神スケジュール。在宅勤務切替やフレックスの検討を。',
    }
  }
  return {
    wake: '起床調整不要',
    sleep: '通常通り',
    advice: '昼〜午後キックオフ。睡眠調整不要のゴールデンタイム。家族や仲間と集まって観戦しよう。',
  }
}
