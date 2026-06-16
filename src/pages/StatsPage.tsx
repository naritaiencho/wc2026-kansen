import { useMemo } from 'react'
import { Crown, Medal, TrendingUp, Zap } from 'lucide-react'
import { goldenBootCandidates, titleOdds, recordsAtStake, youngStars } from '../data/storylines'
import { allMatches } from '../data/matches'
import { teamMap, teamName } from '../data/teams'
import { parseScorerMemo } from '../lib/standings'
import { useAppState } from '../state/AppState'
import Flag from '../components/Flag'
import Reveal from '../components/Reveal'

export default function StatsPage() {
  const { userScorers, officialScorers } = useAppState()

  // 公式得点データ + ユーザー入力の得点メモを統合してランキング化
  const scorerRanking = useMemo(() => {
    const totals = new Map<string, { player: string; team?: string; goals: number; assists: number; club?: string }>()
    for (const s of officialScorers) {
      totals.set(s.player, { ...s })
    }
    for (const [matchIdStr, memo] of Object.entries(userScorers)) {
      const match = allMatches.find((m) => m.id === Number(matchIdStr))
      for (const { name, goals } of parseScorerMemo(memo)) {
        const existing = totals.get(name)
        if (existing) existing.goals += goals
        else totals.set(name, { player: name, team: match ? undefined : undefined, goals, assists: 0 })
      }
    }
    return [...totals.values()].sort((a, b) => b.goals - a.goals).slice(0, 20)
  }, [userScorers])

  const assistRanking = useMemo(
    () => [...officialScorers].filter((s) => s.assists > 0).sort((a, b) => b.assists - a.assists).slice(0, 10),
    [],
  )

  const rankBadge = (i: number) =>
    i === 0 ? 'bg-gold/20 text-gold ring-gold/50' : i === 1 ? 'bg-slate-300/15 text-slate-200 ring-slate-300/40' : i === 2 ? 'bg-amber-700/20 text-amber-400 ring-amber-600/40' : 'bg-white/5 text-foreground/50 ring-white/10'

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-12">
      <Reveal>
        <h1 className="font-display text-4xl uppercase tracking-wide sm:text-5xl">
          Stats & <span className="text-gradient-gold">Rankings</span>
        </h1>
        <p className="mt-2 text-sm text-foreground/55">
          得点・アシストランキングから優勝オッズ、懸かっている記録まで。大会の「数字」はここで完結。
        </p>
      </Reveal>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {/* 得点ランキング */}
        <Reveal>
          <div className="liquid-glass rounded-3xl p-6">
            <h2 className="flex items-center gap-2 font-display text-2xl uppercase">
              <Medal className="text-gold" size={22} /> 得点ランキング
            </h2>
            {scorerRanking.length === 0 ? (
              <div className="mt-6 rounded-2xl bg-white/[0.03] p-6 text-center ring-1 ring-white/5">
                <p className="text-3xl">⚽</p>
                <p className="mt-2 text-sm font-bold text-foreground/70">大会は開幕したばかり</p>
                <p className="mt-1.5 text-xs leading-relaxed text-foreground/50">
                  ゴールが生まれ次第、公式記録から自動でここに反映され、ランキングが組み上がっていきます。
                </p>
              </div>
            ) : (
              <div className="mt-4 space-y-2">
                {scorerRanking.map((s, i) => (
                  <div key={s.player} className="flex items-center gap-3 rounded-xl bg-white/[0.03] px-3 py-2.5 ring-1 ring-white/5">
                    <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ring-1 ${rankBadge(i)}`}>
                      {i + 1}
                    </span>
                    {s.team && <Flag code={s.team} size="sm" />}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold">{s.player}</p>
                      {(s.club || s.team) && (
                        <p className="truncate text-[10px] text-foreground/40">
                          {s.team ? teamName(s.team) : ''}
                          {s.club ? ` / ${s.club}` : ''}
                        </p>
                      )}
                    </div>
                    <span className="font-display text-xl text-gradient-gold">{s.goals}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Reveal>

        {/* アシストランキング */}
        <Reveal delay={100}>
          <div className="liquid-glass rounded-3xl p-6">
            <h2 className="flex items-center gap-2 font-display text-2xl uppercase">
              <Zap className="text-sky-300" size={22} /> アシストランキング
            </h2>
            {assistRanking.length === 0 ? (
              <div className="mt-6 rounded-2xl bg-white/[0.03] p-6 text-center ring-1 ring-white/5">
                <p className="text-3xl">🎯</p>
                <p className="mt-2 text-sm font-bold text-foreground/70">記録待ち</p>
                <p className="mt-1.5 text-xs leading-relaxed text-foreground/50">
                  大会進行とともに公式アシストデータを反映していきます。それまでは下の得点王候補をチェック。
                </p>
              </div>
            ) : (
              <div className="mt-4 space-y-2">
                {assistRanking.map((s, i) => (
                  <div key={s.player} className="flex items-center gap-3 rounded-xl bg-white/[0.03] px-3 py-2.5 ring-1 ring-white/5">
                    <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ring-1 ${rankBadge(i)}`}>
                      {i + 1}
                    </span>
                    <Flag code={s.team} size="sm" />
                    <p className="min-w-0 flex-1 truncate text-sm font-bold">{s.player}</p>
                    <span className="font-display text-xl text-gradient-blue">{s.assists}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Reveal>
      </div>

      {/* 得点王候補 */}
      <section className="mt-14">
        <Reveal>
          <h2 className="flex items-center gap-2 font-display text-3xl uppercase tracking-wide">
            <Crown className="text-gold" size={26} />
            得点王<span className="text-gradient-gold">候補オッズ</span>
          </h2>
          <p className="mt-2 text-sm text-foreground/55">米ブックメーカー(2026年6月時点)のゴールデンブーツオッズ。</p>
        </Reveal>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {goldenBootCandidates.map((c, i) => (
            <Reveal key={c.player} delay={(i % 5) * 60}>
              <div className={`liquid-glass card-hover h-full rounded-2xl p-4 ${i === 0 ? 'ring-1 ring-gold/50' : ''}`}>
                <div className="flex items-center justify-between">
                  <Flag code={c.country} size="md" />
                  <span className={`font-display text-lg ${i === 0 ? 'text-gradient-gold' : 'text-foreground/60'}`}>{c.odds}</span>
                </div>
                <p className="mt-2.5 text-sm font-bold leading-tight">{c.player}</p>
                <p className="text-[10px] text-foreground/40">{c.club}</p>
                <p className="mt-2 text-[11px] leading-relaxed text-foreground/55">{c.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 優勝オッズ */}
      <section className="mt-14">
        <Reveal>
          <h2 className="flex items-center gap-2 font-display text-3xl uppercase tracking-wide">
            <TrendingUp className="text-pitch" size={26} />
            優勝候補<span className="text-gradient-gold">トップ8</span>
          </h2>
        </Reveal>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {titleOdds.map((t, i) => {
            const team = teamMap[t.country]
            return (
              <Reveal key={t.country} delay={(i % 4) * 60}>
                <div className="liquid-glass card-hover flex h-full items-start gap-3 rounded-2xl p-4">
                  <span className="font-display text-2xl text-foreground/25">{i + 1}</span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <Flag code={t.country} size="sm" />
                      <p className="truncate text-sm font-bold">{team?.nameJa}</p>
                      <span className="ml-auto font-display text-sm text-gradient-gold">{t.odds}</span>
                    </div>
                    <p className="mt-1.5 text-[11px] leading-relaxed text-foreground/55">{t.note}</p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      {/* 記録 & 若手 */}
      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        <Reveal>
          <div className="liquid-glass h-full rounded-3xl p-6">
            <h2 className="font-display text-2xl uppercase">📜 懸かっている記録</h2>
            <div className="mt-4 space-y-3">
              {recordsAtStake.map((r) => (
                <div key={r.record} className="rounded-xl bg-white/[0.03] p-3.5 ring-1 ring-white/5">
                  <p className="text-sm font-bold text-gold/90">{r.record}</p>
                  <p className="mt-1 text-xs leading-relaxed text-foreground/60">{r.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div className="liquid-glass h-full rounded-3xl p-6">
            <h2 className="font-display text-2xl uppercase">🌟 ブレイク候補の若手5人</h2>
            <div className="mt-4 space-y-3">
              {youngStars.map((y) => (
                <div key={y.player} className="flex items-center gap-3 rounded-xl bg-white/[0.03] p-3.5 ring-1 ring-white/5">
                  <Flag code={y.country} size="md" />
                  <div className="min-w-0">
                    <p className="text-sm font-bold">
                      {y.player} <span className="text-xs font-normal text-foreground/40">({y.age}歳 / {y.club})</span>
                    </p>
                    <p className="mt-0.5 text-xs leading-relaxed text-foreground/55">{y.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      <p className="mt-10 text-xs text-foreground/35">
        ※ オッズ・成績は2026年6月時点の海外報道(RotoWire, BetMGM, ESPN等)に基づく参考値。得点ランキングは公式記録から随時自動更新されます。
      </p>
    </div>
  )
}
