// localStorage永続化 — マイ観戦データ(お気に入り・予想・結果入力)

import type { MatchResult } from '../data/types'

const KEYS = {
  favTeams: 'kansenhq.favTeams',
  bookmarks: 'kansenhq.bookmarks',
  predictions: 'kansenhq.predictions',
  userResults: 'kansenhq.userResults',
  userScorers: 'kansenhq.userScorers',
} as const

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function save(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // storage full / private mode — silently ignore
  }
}

export const storage = {
  loadFavTeams: (): string[] => load(KEYS.favTeams, []),
  saveFavTeams: (codes: string[]) => save(KEYS.favTeams, codes),

  loadBookmarks: (): number[] => load(KEYS.bookmarks, []),
  saveBookmarks: (ids: number[]) => save(KEYS.bookmarks, ids),

  /** matchId -> 'home' | 'draw' | 'away' */
  loadPredictions: (): Record<number, 'home' | 'draw' | 'away'> => load(KEYS.predictions, {}),
  savePredictions: (p: Record<number, 'home' | 'draw' | 'away'>) => save(KEYS.predictions, p),

  loadUserResults: (): MatchResult[] => load(KEYS.userResults, []),
  saveUserResults: (r: MatchResult[]) => save(KEYS.userResults, r),

  /** matchId -> 得点者メモ(例: '上田綺世x2, 久保建英') */
  loadUserScorers: (): Record<number, string> => load(KEYS.userScorers, {}),
  saveUserScorers: (s: Record<number, string>) => save(KEYS.userScorers, s),
}
