import type { MatchResult, ScorerEntry } from './types'

// 公式結果データ — 通常は GitHub Actions が data ブランチへ自動公開する JSON が使われる。
// このファイルは自動取得が失敗したときの最終フォールバック(非常用の手動上書き枠)。
// ここに追記したスコアも mergeResults 経由で順位表・ランキングに反映される(UIからの入力欄は廃止済み)。
// ※ 2026-06-12時点: 開幕戦(メキシコvs南アフリカ)は確定スコア未報道のため未登録。

export const officialResults: MatchResult[] = [
  // 例: { matchId: 1, homeScore: 2, awayScore: 1, note: 'ヒメネス2発' },
]

// 公式得点・アシストランキングのシードデータ。大会進行に合わせて更新。
export const officialScorers: ScorerEntry[] = [
  // 例: { player: '上田綺世', team: 'JPN', goals: 2, assists: 0, club: 'フェイエノールト' },
]
