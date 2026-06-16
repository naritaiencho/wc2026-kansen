import { useMemo, useState } from 'react'
import { AlarmClock, AlertTriangle, CalendarPlus, ChevronRight, Moon, Newspaper, Swords, Trophy } from 'lucide-react'
import {
  japanSquad,
  japanStaff,
  japanBreaking,
  japanAbsentees,
  opponents,
  japanMatchPlans,
  japanHistory,
  breakthroughScenarios,
} from '../data/japan'
import { allMatches, groupMatches } from '../data/matches'
import { teamsByGroup, teamName, teamMap } from '../data/teams'
import { computeStandings } from '../lib/standings'
import { googleCalendarUrl } from '../lib/calendar'
import { formatKickoff, sleepPlanFor } from '../lib/time'
import { useAppState } from '../state/AppState'
import CountdownTimer from '../components/CountdownTimer'
import Flag from '../components/Flag'
import Reveal from '../components/Reveal'
import MatchCard from '../components/MatchCard'

const POS_LABEL: Record<string, string> = { GK: 'ゴールキーパー', DF: 'ディフェンダー', MF: 'ミッドフィールダー', FW: 'フォワード' }

export default function JapanPage() {
  const { resultsMap, news } = useAppState()
  const [samuraiImgOk, setSamuraiImgOk] = useState(true)

  const japanMatches = useMemo(
    () => allMatches.filter((m) => m.home === 'JPN' || m.away === 'JPN'),
    [],
  )
  const nextMatch = japanMatches.find((m) => new Date(m.kickoff).getTime() > Date.now())

  const groupF = teamsByGroup('F')
  const standings = computeStandings(
    groupF.map((t) => t.code),
    groupMatches.filter((m) => m.group === 'F'),
    resultsMap,
  )

  return (
    <div>
      {/* ===== hero strip ===== */}
      <section className="relative overflow-hidden border-b border-white/5">
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 30% 0%, rgba(30,111,255,0.28) 0%, transparent 60%)' }}
        />
        {samuraiImgOk && (
          <img
            src="/samurai-blue.png"
            alt=""
            onError={() => setSamuraiImgOk(false)}
            className="pointer-events-none absolute -right-10 bottom-0 hidden h-[110%] object-contain opacity-50 md:block"
          />
        )}
        <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-12">
          <div className="flex items-center gap-4">
            <Flag code="JPN" size="lg" />
            <div>
              <p className="text-xs font-bold tracking-[0.3em] text-sky-300">SAMURAI BLUE — GROUP F</p>
              <h1 className="font-display text-4xl uppercase sm:text-6xl">
                <span className="text-gradient-blue">日本代表</span> 完全ガイド
              </h1>
            </div>
          </div>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground/65">
            {japanHistory.appearances}。過去最高は{japanHistory.best}。{japanHistory.goal}
            指揮官は{japanStaff.manager}、キャプテンは{japanStaff.captain}。
          </p>
          {nextMatch && (
            <div className="mt-8">
              <CountdownTimer
                target={nextMatch.kickoff}
                label={`次戦 vs ${teamName(nextMatch.home === 'JPN' ? nextMatch.away : nextMatch.home)} (${formatKickoff(nextMatch.kickoff)}) まで`}
              />
            </div>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* ===== breaking news ===== */}
        <Reveal>
          <div className="mt-8 rounded-2xl border border-daznred/40 bg-daznred/10 p-5">
            <p className="flex items-center gap-2 text-sm font-bold text-red-300">
              <AlertTriangle size={16} className="shrink-0" />
              {japanBreaking.title}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-foreground/70">{japanBreaking.body}</p>
            <p className="mt-1.5 text-[10px] text-foreground/40">({japanBreaking.date} 時点の公式発表・報道に基づく)</p>
          </div>
        </Reveal>

        {/* ===== 最新ニュース（自動更新） ===== */}
        {news && news.length > 0 && (
          <Reveal>
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="flex items-center gap-2 text-sm font-bold text-gold">
                <Newspaper size={15} /> 最新ニュース
                <span className="text-[10px] font-normal text-foreground/40">(ゲキサカ・自動更新)</span>
              </p>
              <ul className="mt-3 space-y-2.5">
                {news.slice(0, 6).map((n) => (
                  <li key={n.link}>
                    <a
                      href={n.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-2 text-xs leading-relaxed text-foreground/75 transition hover:text-gold"
                    >
                      <ChevronRight size={13} className="mt-0.5 shrink-0 text-gold/60" />
                      <span className="flex-1">{n.title}</span>
                      <span className="shrink-0 text-[10px] text-foreground/30">{n.source}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        )}

        {/* ===== japan matches ===== */}
        <section className="py-14">
          <Reveal>
            <h2 className="font-display text-3xl uppercase tracking-wide">
              <span className="text-gradient-gold">3つの決戦</span> — グループF
            </h2>
            <p className="mt-2 text-sm text-foreground/55">
              日本戦は3試合とも<span className="font-bold text-pitch">DAZN無料配信</span>+地上波。見逃す理由がない。
            </p>
          </Reveal>
          <div className="mt-8 space-y-10">
            {japanMatchPlans.map((plan, i) => {
              const match = allMatches.find((m) => m.id === plan.matchId)!
              const sleep = sleepPlanFor(match.kickoff)
              return (
                <Reveal key={plan.matchId} delay={i * 100}>
                  <div className="grid gap-4 lg:grid-cols-[1fr_1.1fr]">
                    <MatchCard match={match} />
                    <div className="liquid-glass rounded-2xl p-5">
                      <p className="flex items-center gap-2 text-sm font-bold text-gold">
                        <Swords size={15} /> キーマッチアップ
                      </p>
                      <ul className="mt-3 space-y-2">
                        {plan.keyMatchups.map((k) => (
                          <li key={k} className="flex gap-2 text-xs leading-relaxed text-foreground/70">
                            <ChevronRight size={13} className="mt-0.5 shrink-0 text-samurai" />
                            {k}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-4 border-t border-white/5 pt-3 text-xs leading-relaxed text-foreground/60">
                        <span className="font-bold text-sky-300">戦術メモ: </span>
                        {plan.tacticalPoint}
                      </p>
                      <div className="mt-4 flex flex-wrap items-center gap-2 rounded-xl bg-white/[0.03] p-3 ring-1 ring-white/5">
                        <Moon size={14} className="text-gold" />
                        <span className="text-xs font-bold text-foreground/80">観戦睡眠プラン:</span>
                        <span className="text-xs text-foreground/60">
                          {sleep.sleep} → <AlarmClock size={12} className="inline text-pitch" /> {sleep.wake}起床。
                          {plan.watchLabel}
                        </span>
                      </div>
                      <p className="mt-2 text-[11px] font-bold text-foreground/45">📺 {plan.broadcast}</p>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </section>

        {/* ===== group F standings ===== */}
        <section className="pb-14">
          <Reveal>
            <h2 className="font-display text-3xl uppercase tracking-wide">
              Group F <span className="text-gradient-gold">順位表</span>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="liquid-glass mt-6 overflow-x-auto rounded-2xl p-4">
              <table className="w-full min-w-[480px] text-sm">
                <thead>
                  <tr className="text-left text-[11px] font-bold tracking-widest text-foreground/40">
                    <th className="px-3 py-2">#</th>
                    <th className="px-3 py-2">チーム</th>
                    <th className="px-2 py-2 text-center">試</th>
                    <th className="px-2 py-2 text-center">勝</th>
                    <th className="px-2 py-2 text-center">分</th>
                    <th className="px-2 py-2 text-center">敗</th>
                    <th className="px-2 py-2 text-center">得失</th>
                    <th className="px-2 py-2 text-center">点</th>
                  </tr>
                </thead>
                <tbody>
                  {standings.map((row, i) => (
                    <tr
                      key={row.code}
                      className={`border-t border-white/5 ${row.code === 'JPN' ? 'bg-samurai/10' : ''} ${i < 2 ? 'text-foreground' : 'text-foreground/60'}`}
                    >
                      <td className="px-3 py-2.5 font-display">{i + 1}</td>
                      <td className="px-3 py-2.5">
                        <span className="flex items-center gap-2 font-bold">
                          <Flag code={row.code} size="sm" />
                          {teamMap[row.code]?.nameJa}
                          {i < 2 && <span className="rounded bg-pitch/15 px-1.5 text-[9px] font-bold text-pitch">突破圏</span>}
                        </span>
                      </td>
                      <td className="px-2 py-2.5 text-center tabular-nums">{row.played}</td>
                      <td className="px-2 py-2.5 text-center tabular-nums">{row.won}</td>
                      <td className="px-2 py-2.5 text-center tabular-nums">{row.drawn}</td>
                      <td className="px-2 py-2.5 text-center tabular-nums">{row.lost}</td>
                      <td className="px-2 py-2.5 text-center tabular-nums">{row.gd > 0 ? `+${row.gd}` : row.gd}</td>
                      <td className="px-2 py-2.5 text-center font-display text-gradient-gold">{row.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-2 px-3 text-[11px] text-foreground/35">
                ※ 各組上位2+12組の3位のうち上位8チームが突破。結果は公式データから自動で反映されます。
              </p>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {breakthroughScenarios.map((s) => (
                <div key={s} className="rounded-xl bg-white/[0.03] p-4 text-xs leading-relaxed text-foreground/65 ring-1 ring-white/5">
                  {s}
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ===== opponents ===== */}
        <section className="pb-14">
          <Reveal>
            <h2 className="font-display text-3xl uppercase tracking-wide">
              対戦相手<span className="text-gradient-gold">スカウティング</span>
            </h2>
          </Reveal>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {opponents.map((op, i) => (
              <Reveal key={op.code} delay={i * 100}>
                <div className="liquid-glass card-hover h-full rounded-2xl p-5">
                  <div className="flex items-center gap-3">
                    <Flag code={op.code} size="lg" />
                    <div>
                      <p className="font-display text-xl">{op.nameJa}</p>
                      <p className="text-[11px] text-foreground/45">
                        FIFAランク{op.fifaRank} / 監督: {op.manager}
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-foreground/60">{op.style}</p>
                  <div className="mt-3 space-y-1.5">
                    {op.keyPlayers.map((p) => (
                      <p key={p.name} className="text-xs text-foreground/70">
                        <span className="font-bold text-foreground">{p.name}</span>
                        <span className="text-foreground/40">({p.club})</span> — {p.note}
                      </p>
                    ))}
                  </div>
                  <p className="mt-3 border-t border-white/5 pt-2.5 text-[11px] leading-relaxed text-foreground/50">
                    <span className="font-bold text-gold">過去対戦: </span>
                    {op.h2h}
                  </p>
                  {op.absences && (
                    <p className="mt-2 text-[11px] leading-relaxed text-red-300/80">⚠ {op.absences}</p>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ===== squad ===== */}
        <section className="pb-14">
          <Reveal>
            <h2 className="font-display text-3xl uppercase tracking-wide">
              登録メンバー<span className="text-gradient-gold">26人</span>
            </h2>
            <p className="mt-2 text-sm text-foreground/55">
              監督: {japanStaff.manager} / コーチ: {japanStaff.coaches.join('、')}
            </p>
          </Reveal>
          {(['GK', 'DF', 'MF', 'FW'] as const).map((pos, pi) => (
            <Reveal key={pos} delay={pi * 80}>
              <p className="mb-3 mt-7 text-xs font-bold tracking-[0.25em] text-sky-300">
                {pos} — {POS_LABEL[pos]}
              </p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {japanSquad
                  .filter((p) => p.pos === pos)
                  .map((p) => (
                    <div key={p.num} className="liquid-glass card-hover flex items-center gap-3 rounded-xl p-3.5">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-samurai/30 to-samurai/5 font-display text-xl text-gradient-blue ring-1 ring-samurai/30">
                        {p.num}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold">{p.name}</p>
                        <p className="truncate text-[11px] text-foreground/45">
                          {p.club} / {p.age}歳
                        </p>
                        {p.note && <p className="mt-0.5 truncate text-[10px] text-gold/80">{p.note}</p>}
                      </div>
                    </div>
                  ))}
              </div>
            </Reveal>
          ))}
          <Reveal delay={100}>
            <div className="mt-7 rounded-xl bg-white/[0.03] p-4 ring-1 ring-white/5">
              <p className="text-xs font-bold text-foreground/60">招集外・離脱</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {japanAbsentees.map((a) => (
                  <span key={a.name} className="rounded-full bg-white/5 px-3 py-1 text-[11px] text-foreground/55 ring-1 ring-white/10" title={a.reason}>
                    {a.name}({a.club}) — {a.reason}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* ===== history ===== */}
        <section className="pb-20">
          <Reveal>
            <div className="liquid-glass rounded-3xl p-8">
              <p className="flex items-center gap-2 text-sm font-bold text-gold">
                <Trophy size={16} /> 日本のW杯ヒストリー
              </p>
              <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                {japanHistory.appearances}。{japanHistory.best}。{japanHistory.last}
              </p>
              {nextMatch && (
                <a
                  href={googleCalendarUrl(nextMatch, teamName)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-samurai to-sky-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-samurai/40 transition hover:brightness-110"
                >
                  <CalendarPlus size={15} />
                  次の日本戦をカレンダーに追加
                </a>
              )}
            </div>
          </Reveal>
        </section>
      </div>
    </div>
  )
}
