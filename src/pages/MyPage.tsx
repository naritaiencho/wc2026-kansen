import { useMemo } from 'react'
import { AlarmClock, BedDouble, Heart, Star, Target } from 'lucide-react'
import { allMatches } from '../data/matches'
import { teams } from '../data/teams'
import { isPast, sleepPlanFor } from '../lib/time'
import { useAppState } from '../state/AppState'
import Flag from '../components/Flag'
import Reveal from '../components/Reveal'
import MatchCard from '../components/MatchCard'

export default function MyPage() {
  const { favTeams, toggleFavTeam, bookmarks, predictions, resultsMap } = useAppState()

  const bookmarkedMatches = useMemo(
    () =>
      allMatches
        .filter((m) => bookmarks.includes(m.id))
        .sort((a, b) => a.kickoff.localeCompare(b.kickoff)),
    [bookmarks],
  )

  const upcomingBookmarked = bookmarkedMatches.filter((m) => !isPast(m.kickoff))

  // 予想成績
  const predictionStats = useMemo(() => {
    let hit = 0
    let judged = 0
    for (const [idStr, pick] of Object.entries(predictions)) {
      const result = resultsMap.get(Number(idStr))
      if (!result) continue
      judged++
      const actual =
        result.homeScore > result.awayScore ? 'home' : result.homeScore < result.awayScore ? 'away' : 'draw'
      if (actual === pick) hit++
    }
    return { total: Object.keys(predictions).length, judged, hit }
  }, [predictions, resultsMap])

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-12">
      <Reveal>
        <h1 className="font-display text-4xl uppercase tracking-wide sm:text-5xl">
          My <span className="text-gradient-gold">観戦計画</span>
        </h1>
        <p className="mt-2 text-sm text-foreground/55">
          推しチーム、観戦予定、勝敗予想、睡眠プラン——あなた専用の大会カスタマイズ。データはこの端末に自動保存されます。
        </p>
      </Reveal>

      {/* 推しチーム */}
      <section className="mt-10">
        <Reveal>
          <h2 className="flex items-center gap-2 font-display text-2xl uppercase">
            <Heart className="text-daznred" size={20} /> 推しチーム登録
          </h2>
          <p className="mt-1.5 text-xs text-foreground/50">
            タップで登録/解除。試合日程の「❤️ 推しチーム」フィルターに連動します。
          </p>
        </Reveal>
        <Reveal delay={80}>
          <div className="mt-4 flex flex-wrap gap-2">
            {teams.map((t) => {
              const active = favTeams.includes(t.code)
              return (
                <button
                  key={t.code}
                  onClick={() => toggleFavTeam(t.code)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition ring-1 ${
                    active
                      ? 'bg-daznred/15 text-red-200 ring-daznred/50'
                      : 'bg-white/[0.04] text-foreground/55 ring-white/10 hover:bg-white/10'
                  }`}
                >
                  <Flag code={t.code} size="sm" />
                  {t.nameJa}
                  {active && ' ❤️'}
                </button>
              )
            })}
          </div>
        </Reveal>
      </section>

      {/* 予想成績 */}
      <section className="mt-12">
        <Reveal>
          <h2 className="flex items-center gap-2 font-display text-2xl uppercase">
            <Target className="text-gold" size={20} /> 勝敗予想スコア
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <div className="mt-4 grid grid-cols-3 gap-3 sm:max-w-md">
            {[
              { label: '予想した試合', value: predictionStats.total },
              { label: '結果判明', value: predictionStats.judged },
              {
                label: '的中率',
                value: predictionStats.judged > 0 ? `${Math.round((predictionStats.hit / predictionStats.judged) * 100)}%` : '—',
              },
            ].map((s) => (
              <div key={s.label} className="liquid-glass rounded-2xl p-4 text-center">
                <p className="font-display text-2xl text-gradient-gold">{s.value}</p>
                <p className="mt-1 text-[10px] font-bold tracking-widest text-foreground/40">{s.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-2 text-[11px] text-foreground/40">
            予想は各試合カードの「予想」ボタンから。結果が判明すると的中判定されます。
          </p>
        </Reveal>
      </section>

      {/* 観戦予定+睡眠プランナー */}
      <section className="mt-12">
        <Reveal>
          <h2 className="flex items-center gap-2 font-display text-2xl uppercase">
            <BedDouble className="text-sky-300" size={20} /> 観戦予定 & 睡眠プランナー
          </h2>
          <p className="mt-1.5 text-xs text-foreground/50">
            「⭐ 観る」を付けた試合に、キックオフ時刻から逆算した就寝・起床プランを自動生成。寝不足と上手く付き合おう。
          </p>
        </Reveal>
        {upcomingBookmarked.length === 0 ? (
          <Reveal delay={80}>
            <div className="liquid-glass mt-4 rounded-2xl p-8 text-center">
              <Star className="mx-auto text-foreground/30" size={28} />
              <p className="mt-3 text-sm font-bold text-foreground/70">まだ観戦予定がありません</p>
              <p className="mt-1.5 text-xs text-foreground/50">
                試合日程から気になるカードに「⭐ 観る」を付けると、ここに観戦プランが並びます。
              </p>
            </div>
          </Reveal>
        ) : (
          <div className="mt-5 space-y-4">
            {upcomingBookmarked.map((m, i) => {
              const sleep = sleepPlanFor(m.kickoff)
              return (
                <Reveal key={m.id} delay={i * 60}>
                  <div className="grid gap-3 lg:grid-cols-[1.2fr_1fr]">
                    <MatchCard match={m} />
                    <div className="liquid-glass flex flex-col justify-center rounded-2xl p-5">
                      <p className="flex items-center gap-2 text-xs font-bold tracking-widest text-sky-300">
                        <AlarmClock size={14} /> SLEEP PLAN
                      </p>
                      <div className="mt-3 flex items-center gap-4">
                        <div>
                          <p className="text-[10px] font-bold text-foreground/40">就寝</p>
                          <p className="font-display text-xl text-foreground/85">{sleep.sleep}</p>
                        </div>
                        <span className="text-foreground/25">→</span>
                        <div>
                          <p className="text-[10px] font-bold text-foreground/40">起床</p>
                          <p className="font-display text-xl text-gradient-gold">{sleep.wake}</p>
                        </div>
                      </div>
                      <p className="mt-3 text-xs leading-relaxed text-foreground/55">{sleep.advice}</p>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        )}
      </section>

    </div>
  )
}
