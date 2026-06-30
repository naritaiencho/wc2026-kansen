export type Stage = 'group' | 'r32' | 'r16' | 'qf' | 'sf' | 'third' | 'final'

/** exclusive=DAZN独占 / free=DAZN無料配信 / shared=DAZN+地上波放送あり(予定) */
export type Broadcast = 'exclusive' | 'free' | 'shared'

export interface Match {
  id: number
  stage: Stage
  group?: string
  kickoff: string // ISO 8601 JST
  home: string // FIFA 3-letter code, or knockout placeholder label
  away: string
  city: string
  stadium: string
  broadcast: Broadcast
  highlight?: string
}

export interface Player {
  name: string
  position: string
  club: string
  note?: string
}

export interface Team {
  code: string
  nameJa: string
  nameEn: string
  flag: string
  iso2: string
  group: string
  fifaRank?: number
  appearances?: number
  bestResult?: string
  manager?: string
  star?: Player
  second?: Player
  style?: string
  funFact?: string
}

export interface MatchResult {
  matchId: number
  homeScore: number
  awayScore: number
  /** 決勝Tのみ: 勝者(PK決着含む)。グループ戦では未設定。 */
  winner?: 'home' | 'away'
  note?: string
}

export interface ScorerEntry {
  player: string
  team: string // FIFA code
  goals: number
  assists: number
  club?: string
}
