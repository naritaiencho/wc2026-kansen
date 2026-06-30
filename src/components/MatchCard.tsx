import { useState } from 'react'
import { CalendarPlus, ChevronDown, ExternalLink, Flame, MapPin, Star } from 'lucide-react'
import type { Match } from '../data/types'
import { stageLabels } from '../data/matches'
import { teamMap, teamName } from '../data/teams'
import { formatDateOnly, formatTimeOnly, isLive, isPast } from '../lib/time'
import { googleCalendarUrl, resultSearchUrl } from '../lib/calendar'
import { useAppState } from '../state/AppState'
import Flag from './Flag'
import BroadcastBadge from './BroadcastBadge'

function TeamSide({ code, align }: { code: string; align: 'left' | 'right' }) {
  const team = teamMap[code]
  const isJapan = code === 'JPN'
  return (
    <div className={`flex items-center gap-2.5 ${align === 'right' ? 'flex-row-reverse text-right' : ''} min-w-0 flex-1`}>
      {team ? (
        <Flag code={code} size="md" />
      ) : (
        <span className="flex h-6 w-9 items-center justify-center rounded-sm bg-white/5 text-xs text-foreground/40">?</span>
      )}
      <div className="min-w-0">
        <p className={`truncate text-sm font-bold sm:text-base ${isJapan ? 'text-gradient-blue' : 'text-foreground'}`}>
          {team ? team.nameJa : code}
        </p>
        {team && <p className="hidden text-[10px] tracking-wider text-foreground/40 sm:block">{team.nameEn.toUpperCase()}</p>}
      </div>
    </div>
  )
}

export default function MatchCard({ match: rawMatch }: { match: Match }) {
  const { bookmarks, toggleBookmark, predictions, setPrediction, resultsMap, bracket } = useAppState()
  const [open, setOpen] = useState(false)

  // 決勝Tの「未定」枠は、CIが取得した対戦カード(bracket)で実チームに差し替える（確定次第ライブ反映）
  const ov = bracket?.[rawMatch.id]
  const match = ov ? { ...rawMatch, home: ov.home, away: ov.away } : rawMatch

  const result = resultsMap.get(match.id)
  const live = isLive(match.kickoff)
  const past = isPast(match.kickoff)
  const bookmarked = bookmarks.includes(match.id)
  const prediction = predictions[match.id]
  const isJapanMatch = match.home === 'JPN' || match.away === 'JPN'
  const isPlaceholder = !teamMap[match.home]

  const predictionResult =
    result && prediction
      ? (prediction === 'home' && result.homeScore > result.awayScore) ||
        (prediction === 'away' && result.awayScore > result.homeScore) ||
        (prediction === 'draw' && result.homeScore === result.awayScore)
      : null

  return (
    <div
      className={`liquid-glass card-hover rounded-2xl p-4 sm:p-5 ${
        isJapanMatch ? 'ring-1 ring-samurai/60 shadow-[0_0_30px_-8px_rgba(30,111,255,0.5)]' : ''
      }`}
    >
      {/* top row: time + badges */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="font-display text-lg tracking-wide text-foreground/90">
          {formatDateOnly(match.kickoff)}{' '}
          <span className="text-gradient-gold text-xl">{formatTimeOnly(match.kickoff)}</span>
        </span>
        <BroadcastBadge type={match.broadcast} />
        {live && (
          <span className="inline-flex items-center gap-1 rounded-full bg-daznred/20 px-2 py-0.5 text-[11px] font-bold text-red-300 ring-1 ring-daznred/60">
            <span className="live-dot h-1.5 w-1.5 rounded-full bg-daznred" /> LIVE
          </span>
        )}
        {isJapanMatch && (
          <span className="inline-flex items-center gap-1 rounded-full bg-samurai/20 px-2 py-0.5 text-[11px] font-bold text-sky-200 ring-1 ring-samurai/60">
            🇯🇵 日本戦
          </span>
        )}
        <span className="ml-auto rounded-full bg-white/5 px-2 py-0.5 text-[11px] font-bold tracking-wider text-foreground/50">
          {match.stage === 'group' ? `グループ${match.group}` : stageLabels[match.stage]}
        </span>
      </div>

      {/* teams + score */}
      <div className="flex items-center gap-3">
        <TeamSide code={match.home} align="left" />
        <div className="flex flex-col items-center px-1">
          {result ? (
            <>
              <span className="font-display text-2xl tracking-widest text-gradient-gold sm:text-3xl">
                {result.homeScore}–{result.awayScore}
              </span>
              {result.pens && (
                <span className="mt-0.5 whitespace-nowrap text-[10px] font-bold tracking-wider text-gold/80">
                  PK {result.pens.home}-{result.pens.away}
                </span>
              )}
            </>
          ) : (
            <span className="font-display text-lg tracking-widest text-foreground/35">VS</span>
          )}
        </div>
        <TeamSide code={match.away} align="right" />
      </div>

      {/* venue */}
      <p className="mt-3 flex items-center gap-1.5 text-xs text-foreground/45">
        <MapPin size={12} className="shrink-0" />
        {match.stadium}({match.city})
      </p>

      {/* highlight */}
      {match.highlight && (
        <div className="mt-3">
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex w-full items-center gap-1.5 text-left text-xs font-bold text-gold/90 transition hover:text-gold"
          >
            <Flame size={13} className="shrink-0" />
            見どころ
            <ChevronDown size={13} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>
          <p
            className={`overflow-hidden text-xs leading-relaxed text-foreground/65 transition-all duration-300 ${
              open ? 'mt-2 max-h-40' : 'max-h-0'
            }`}
          >
            {match.highlight}
          </p>
        </div>
      )}

      {/* actions */}
      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-white/5 pt-3">
        <a
          href={googleCalendarUrl(match, teamName)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-samurai to-sky-500 px-3 py-1.5 text-xs font-bold text-white shadow-lg shadow-samurai/30 transition hover:brightness-110"
        >
          <CalendarPlus size={13} />
          カレンダー追加
        </a>
        {!isPlaceholder && past && !result && (
          <a
            href={resultSearchUrl(teamName(match.home), teamName(match.away))}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 text-xs font-bold text-foreground/70 ring-1 ring-white/10 transition hover:bg-white/10"
          >
            <ExternalLink size={13} />
            結果を調べる
          </a>
        )}
        <button
          onClick={() => toggleBookmark(match.id)}
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition ${
            bookmarked
              ? 'bg-gold/20 text-gold ring-1 ring-gold/50'
              : 'bg-white/5 text-foreground/60 ring-1 ring-white/10 hover:bg-white/10'
          }`}
        >
          <Star size={13} fill={bookmarked ? 'currentColor' : 'none'} />
          {bookmarked ? '観戦予定' : '観る'}
        </button>

        {/* prediction */}
        {!isPlaceholder && !past && !result && (
          <div className="ml-auto flex items-center gap-1 rounded-full bg-white/5 p-1 ring-1 ring-white/10">
            <span className="px-1.5 text-[10px] font-bold text-foreground/40">予想</span>
            {(['home', 'draw', 'away'] as const).map((option) => (
              <button
                key={option}
                onClick={() => setPrediction(match.id, prediction === option ? null : option)}
                className={`rounded-full px-2 py-0.5 text-[11px] font-bold transition ${
                  prediction === option
                    ? 'bg-gold text-background'
                    : 'text-foreground/55 hover:bg-white/10'
                }`}
              >
                {option === 'home' ? teamMap[match.home]?.nameJa.slice(0, 4) ?? 'HOME' : option === 'draw' ? '分' : teamMap[match.away]?.nameJa.slice(0, 4) ?? 'AWAY'}
              </button>
            ))}
          </div>
        )}
        {predictionResult !== null && (
          <span
            className={`ml-auto rounded-full px-2.5 py-1 text-[11px] font-bold ${
              predictionResult ? 'bg-pitch/15 text-pitch ring-1 ring-pitch/50' : 'bg-white/5 text-foreground/45 ring-1 ring-white/10'
            }`}
          >
            {predictionResult ? '🎯 予想的中!' : '予想ハズレ'}
          </span>
        )}
      </div>
    </div>
  )
}
