import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import type { MatchResult, ScorerEntry } from '../data/types'
import { officialResults, officialScorers as seedScorers } from '../data/results'
import { storage } from '../lib/storage'
import { mergeResults } from '../lib/standings'
import { useRemoteData } from '../hooks/useRemoteData'
import { remoteData, type NewsItem, type BracketMap } from '../lib/remoteData'

interface AppStateValue {
  favTeams: string[]
  bookmarks: number[]
  predictions: Record<number, 'home' | 'draw' | 'away'>
  userResults: MatchResult[]
  userScorers: Record<number, string>
  resultsMap: Map<number, MatchResult>
  officialScorers: ScorerEntry[]
  news: NewsItem[] | null
  bracket: BracketMap | null
  toggleFavTeam: (code: string) => void
  toggleBookmark: (matchId: number) => void
  setPrediction: (matchId: number, value: 'home' | 'draw' | 'away' | null) => void
  saveUserResult: (result: MatchResult, scorerMemo: string) => void
  removeUserResult: (matchId: number) => void
}

const AppStateContext = createContext<AppStateValue | null>(null)

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [favTeams, setFavTeams] = useState<string[]>(() => storage.loadFavTeams())
  const [bookmarks, setBookmarks] = useState<number[]>(() => storage.loadBookmarks())
  const [predictions, setPredictions] = useState<Record<number, 'home' | 'draw' | 'away'>>(() =>
    storage.loadPredictions(),
  )
  const [userResults, setUserResults] = useState<MatchResult[]>(() => storage.loadUserResults())
  const [userScorers, setUserScorers] = useState<Record<number, string>>(() => storage.loadUserScorers())

  const toggleFavTeam = useCallback((code: string) => {
    setFavTeams((prev) => {
      const next = prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
      storage.saveFavTeams(next)
      return next
    })
  }, [])

  const toggleBookmark = useCallback((matchId: number) => {
    setBookmarks((prev) => {
      const next = prev.includes(matchId) ? prev.filter((id) => id !== matchId) : [...prev, matchId]
      storage.saveBookmarks(next)
      return next
    })
  }, [])

  const setPrediction = useCallback((matchId: number, value: 'home' | 'draw' | 'away' | null) => {
    setPredictions((prev) => {
      const next = { ...prev }
      if (value === null) delete next[matchId]
      else next[matchId] = value
      storage.savePredictions(next)
      return next
    })
  }, [])

  const saveUserResult = useCallback((result: MatchResult, scorerMemo: string) => {
    setUserResults((prev) => {
      const next = [...prev.filter((r) => r.matchId !== result.matchId), result]
      storage.saveUserResults(next)
      return next
    })
    setUserScorers((prev) => {
      const next = { ...prev, [result.matchId]: scorerMemo }
      if (!scorerMemo) delete next[result.matchId]
      storage.saveUserScorers(next)
      return next
    })
  }, [])

  const removeUserResult = useCallback((matchId: number) => {
    setUserResults((prev) => {
      const next = prev.filter((r) => r.matchId !== matchId)
      storage.saveUserResults(next)
      return next
    })
    setUserScorers((prev) => {
      const next = { ...prev }
      delete next[matchId]
      storage.saveUserScorers(next)
      return next
    })
  }, [])

  // 公式データのランタイム取得（dataブランチJSON）。取れなければビルド時staticにフォールバック。
  const remoteResults = useRemoteData(remoteData.results)
  const remoteScorers = useRemoteData(remoteData.scorers)
  const news = useRemoteData(remoteData.news)
  const bracket = useRemoteData(remoteData.bracket)
  const resultsMap = useMemo(
    () => mergeResults(remoteResults ?? officialResults, userResults),
    [remoteResults, userResults],
  )
  const officialScorers = remoteScorers ?? seedScorers

  const value = useMemo(
    () => ({
      favTeams,
      bookmarks,
      predictions,
      userResults,
      userScorers,
      resultsMap,
      officialScorers,
      news,
      bracket,
      toggleFavTeam,
      toggleBookmark,
      setPrediction,
      saveUserResult,
      removeUserResult,
    }),
    [favTeams, bookmarks, predictions, userResults, userScorers, resultsMap, officialScorers, news, bracket, toggleFavTeam, toggleBookmark, setPrediction, saveUserResult, removeUserResult],
  )

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
}

export function useAppState(): AppStateValue {
  const ctx = useContext(AppStateContext)
  if (!ctx) throw new Error('useAppState must be used within AppStateProvider')
  return ctx
}
