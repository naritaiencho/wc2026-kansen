import { useMemo } from 'react'
import { Trophy } from 'lucide-react'
import { knockoutMatches, stageLabels } from '../data/matches'
import { teamMap } from '../data/teams'
import type { Match, MatchResult, Stage } from '../data/types'
import { useAppState } from '../state/AppState'
import { formatDateOnly } from '../lib/time'
import Flag from '../components/Flag'
import Reveal from '../components/Reveal'

const ROUND_ORDER: Stage[] = ['r32', 'r16', 'qf', 'sf', 'final']

function TeamRow({ code, score, win, dim }: { code: string; score?: number; win: boolean; dim: boolean }) {
  const team = teamMap[code]
  const isJapan = code === 'JPN'
  return (
    <div className={`flex items-center gap-2 ${dim ? 'opacity-40' : ''}`}>
      {team ? (
        <Flag code={code} size="sm" />
      ) : (
        <span className="flex h-4 w-6 shrink-0 items-center justify-center rounded-sm bg-white/5 text-[9px] text-foreground/40">?</span>
      )}
      <span
        className={`min-w-0 flex-1 truncate text-xs font-bold ${
          isJapan ? 'text-gradient-blue' : win ? 'text-foreground' : 'text-foreground/70'
        }`}
      >
        {team ? team.nameJa : '未定'}
      </span>
      {win && <span className="shrink-0 text-[10px] text-pitch">▲</span>}
      {score !== undefined && (
        <span className={`shrink-0 font-display text-sm tabular-nums ${win ? 'text-gradient-gold' : 'text-foreground/45'}`}>{score}</span>
      )}
    </div>
  )
}

function BracketCell({ match, result, big }: { match: Match; result?: MatchResult; big?: boolean }) {
  const decided = result !== undefined
  // 勝者: APIのwinner(PK決着含む)優先、無ければスコア比較
  const winner: 'home' | 'away' | null = result?.winner ?? (decided ? (result!.homeScore > result!.awayScore ? 'home' : result!.awayScore > result!.homeScore ? 'away' : null) : null)
  const homeWin = winner === 'home'
  const awayWin = winner === 'away'
  // 引き分けスコアなのに勝者がいる = PK決着
  const isPk = decided && result!.homeScore === result!.awayScore && winner !== null
  const isJapan = match.home === 'JPN' || match.away === 'JPN'
  return (
    <div
      className={`rounded-xl bg-white/[0.04] p-2.5 ring-1 ${big ? 'p-3.5' : ''} ${
        isJapan ? 'ring-samurai/60 shadow-[0_0_18px_-6px_rgba(30,111,255,0.55)]' : 'ring-white/10'
      }`}
    >
      <div className="mb-1 flex items-center justify-between">
        <span className="text-[9px] font-bold tracking-wider text-foreground/35">{formatDateOnly(match.kickoff)}</span>
        {isPk && <span className="rounded bg-gold/15 px-1.5 text-[8px] font-bold tracking-wider text-gold">PK</span>}
      </div>
      <TeamRow code={match.home} score={decided ? result!.homeScore : undefined} win={homeWin} dim={awayWin} />
      <div className="my-1 h-px bg-white/5" />
      <TeamRow code={match.away} score={decided ? result!.awayScore : undefined} win={awayWin} dim={homeWin} />
    </div>
  )
}

export default function BracketPage() {
  const { bracket, resultsMap } = useAppState()

  // 「未定」枠を bracket(取得済みの実チーム)で解決
  const resolved = useMemo(
    () => knockoutMatches.map((m) => (bracket?.[m.id] ? { ...m, home: bracket[m.id].home, away: bracket[m.id].away } : m)),
    [bracket],
  )
  const byStage = (s: Stage) => resolved.filter((m) => m.stage === s)
  const thirdPlace = byStage('third')
  const decidedCount = resolved.filter((m) => resultsMap.has(m.id)).length

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-12">
      <Reveal>
        <h1 className="font-display text-4xl uppercase tracking-wide sm:text-5xl">
          決勝<span className="text-gradient-gold">トーナメント表</span>
        </h1>
        <p className="mt-2 text-sm text-foreground/55">
          ラウンド32から決勝まで。勝ち上がりが決まり次第<span className="font-bold text-pitch">自動でリアルタイム更新</span>。
          <span className="text-samurai font-bold"> 青枠=日本</span>の足跡、<span className="text-gold font-bold">▲</span>が勝者(PK含む)です。
        </p>
        <p className="mt-1 text-xs text-foreground/40">消化済み {decidedCount} / 32 試合</p>
      </Reveal>

      <div className="mt-10 space-y-10">
        {ROUND_ORDER.map((s, idx) => {
          const matches = byStage(s)
          if (matches.length === 0) return null
          const isFinal = s === 'final'
          return (
            <Reveal key={s} delay={idx * 60}>
              <section>
                <h2 className="flex items-center gap-2 font-display text-xl uppercase tracking-wide text-gold">
                  {isFinal && <Trophy size={18} />}
                  {stageLabels[s]} <span className="text-xs font-bold text-foreground/35">({matches.length})</span>
                </h2>
                <div
                  className={`mt-3 grid gap-2.5 ${
                    isFinal ? 'sm:max-w-sm' : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
                  }`}
                >
                  {matches.map((m) => (
                    <BracketCell key={m.id} match={m} result={resultsMap.get(m.id)} big={isFinal} />
                  ))}
                </div>
              </section>
            </Reveal>
          )
        })}

        {thirdPlace.length > 0 && (
          <Reveal>
            <section>
              <h2 className="font-display text-xl uppercase tracking-wide text-foreground/55">3位決定戦</h2>
              <div className="mt-3 grid gap-2.5 sm:max-w-sm">
                {thirdPlace.map((m) => (
                  <BracketCell key={m.id} match={m} result={resultsMap.get(m.id)} />
                ))}
              </div>
            </section>
          </Reveal>
        )}
      </div>
    </div>
  )
}
