import type { MatchResult, ScorerEntry } from './types'

// 公式結果データ — 大会の進行に合わせてこのファイルを更新する。
// アプリ内の「結果入力」(マイ観戦タブ)で入力したスコアはlocalStorageに保存され、
// このファイルの公式データとマージされて順位表・ランキングに反映される。
// ※ 2026-06-12時点: 開幕戦(メキシコvs南アフリカ)は確定スコア未報道のため未登録。

export const officialResults: MatchResult[] = [
  // 例: { matchId: 1, homeScore: 2, awayScore: 1, note: 'ヒメネス2発' },
]

// 公式得点・アシストランキングのシードデータ。大会進行に合わせて更新。
export const officialScorers: ScorerEntry[] = [
  // 例: { player: '上田綺世', team: 'JPN', goals: 2, assists: 0, club: 'フェイエノールト' },
]
