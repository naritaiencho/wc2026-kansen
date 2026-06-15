// ランタイムでの公式データ取得層。
// GitHub Actions が書き込んだ「app形状JSON」を raw.githubusercontent(dataブランチ)から取得する。
// 取得できなければ順にフォールバックし、最終的に呼び出し側がビルド時staticへフォールバックする。
// データ源(football-data.org等)に依存しない: 受け取るのは常にアプリ自身の型(MatchResult[]/ScorerEntry[])。

import type { MatchResult, ScorerEntry } from '../data/types'

export interface NewsItem {
  date: string
  title: string
  link: string
  source: string
}

// dataブランチ(コミットで即更新・再デプロイ不要・CORS:* / 5分CDN)を最優先、
// 次に Vercel が配信する /data(ビルドに同梱された場合のフォールバック)。
const SOURCES = [
  'https://raw.githubusercontent.com/naritaiencho/wc2026-kansen/data',
  '/data',
]

async function fetchFirst<T>(file: string, validate: (v: unknown) => v is T): Promise<T | null> {
  for (const base of SOURCES) {
    try {
      const res = await fetch(`${base}/${file}`, { cache: 'default' })
      if (!res.ok) continue
      const json = (await res.json()) as unknown
      if (validate(json)) return json
    } catch {
      // 次のソースへ
    }
  }
  return null
}

function isResultArray(v: unknown): v is MatchResult[] {
  return (
    Array.isArray(v) &&
    v.every(
      (r) =>
        !!r &&
        typeof (r as MatchResult).matchId === 'number' &&
        (r as MatchResult).matchId >= 1 &&
        (r as MatchResult).matchId <= 104 &&
        typeof (r as MatchResult).homeScore === 'number' &&
        typeof (r as MatchResult).awayScore === 'number',
    )
  )
}

function isScorerArray(v: unknown): v is ScorerEntry[] {
  return (
    Array.isArray(v) &&
    v.every(
      (s) =>
        !!s &&
        typeof (s as ScorerEntry).player === 'string' &&
        typeof (s as ScorerEntry).goals === 'number' &&
        typeof (s as ScorerEntry).assists === 'number',
    )
  )
}

function isNewsArray(v: unknown): v is NewsItem[] {
  return (
    Array.isArray(v) &&
    v.every((n) => !!n && typeof (n as NewsItem).title === 'string' && typeof (n as NewsItem).link === 'string')
  )
}

export const remoteData = {
  results: () => fetchFirst('results.json', isResultArray),
  scorers: () => fetchFirst('scorers.json', isScorerArray),
  news: () => fetchFirst('news.json', isNewsArray),
}
