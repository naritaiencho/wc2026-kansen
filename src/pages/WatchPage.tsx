import { CheckCircle2, CircleDollarSign, Radio, Tv2 } from 'lucide-react'
import {
  broadcastOverview,
  daznInfo,
  terrestrialInfo,
  freeViewingSummary,
  paidSummary,
  broadcastBadgeLegend,
} from '../data/broadcast'
import { allMatches } from '../data/matches'
import BroadcastBadge from '../components/BroadcastBadge'
import MatchCard from '../components/MatchCard'
import Reveal from '../components/Reveal'

export default function WatchPage() {
  const freeMatches = allMatches.filter((m) => m.broadcast === 'free')
  const exclusiveCount = allMatches.filter((m) => m.broadcast === 'exclusive').length
  const sharedCount = allMatches.filter((m) => m.broadcast === 'shared').length

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-12">
      <Reveal>
        <h1 className="font-display text-4xl uppercase tracking-wide sm:text-5xl">
          How to <span className="text-gradient-gold">Watch</span>
        </h1>
        <p className="mt-2 text-sm text-foreground/55">
          「何時から、どこで、無料で見られるのか」——2026年大会の日本国内視聴を完全整理。
        </p>
      </Reveal>

      {/* overview */}
      <Reveal delay={80}>
        <div className="mt-8 grid gap-3 md:grid-cols-3">
          {broadcastOverview.map((o) => (
            <div key={o} className="liquid-glass rounded-2xl p-4 text-xs leading-relaxed text-foreground/65">
              {o}
            </div>
          ))}
        </div>
      </Reveal>

      {/* legend */}
      <Reveal delay={120}>
        <div className="liquid-glass mt-6 rounded-2xl p-5">
          <p className="text-sm font-bold text-foreground/80">このアプリのバッジの読み方</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {(['free', 'shared', 'exclusive'] as const).map((key) => (
              <div key={key} className="flex items-start gap-2.5">
                <BroadcastBadge type={key} />
                <p className="text-[11px] leading-relaxed text-foreground/55">{broadcastBadgeLegend[key].desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[11px] text-foreground/40">
            集計: DAZN無料 {freeMatches.length}試合 / 地上波あり {sharedCount}試合 / DAZN独占 {exclusiveCount}試合(決勝T組み合わせ確定前の暫定値)
          </p>
        </div>
      </Reveal>

      {/* free ways */}
      <section className="mt-12">
        <Reveal>
          <h2 className="flex items-center gap-2 font-display text-3xl uppercase tracking-wide">
            <CheckCircle2 className="text-pitch" size={26} />
            無料で観る<span className="text-gradient-gold">4つの方法</span>
          </h2>
        </Reveal>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {freeViewingSummary.map((f, i) => (
            <Reveal key={f.way} delay={i * 70}>
              <div className="liquid-glass card-hover h-full rounded-2xl p-5">
                <p className="text-sm font-bold text-pitch">{f.way}</p>
                <p className="mt-2 text-xs leading-relaxed text-foreground/70">{f.what}</p>
                <p className="mt-2 text-[11px] text-foreground/45">👉 {f.how}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* DAZN */}
      <section className="mt-12">
        <Reveal>
          <h2 className="flex items-center gap-2 font-display text-3xl uppercase tracking-wide">
            <CircleDollarSign className="text-gold" size={26} />
            DAZN<span className="text-gradient-gold">プラン比較</span>
          </h2>
          <p className="mt-2 text-sm text-foreground/55">{daznInfo.coverage}。無料枠: {daznInfo.freeMatches[0]}</p>
        </Reveal>
        <Reveal delay={80}>
          <div className="liquid-glass mt-6 overflow-x-auto rounded-2xl p-4">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="text-left text-[11px] font-bold tracking-widest text-foreground/40">
                  <th className="px-3 py-2">プラン</th>
                  <th className="px-3 py-2">料金</th>
                  <th className="px-3 py-2">メモ</th>
                </tr>
              </thead>
              <tbody>
                {daznInfo.plans.map((p) => (
                  <tr key={p.name} className="border-t border-white/5">
                    <td className="px-3 py-3 font-bold">{p.name}</td>
                    <td className="px-3 py-3 text-gradient-gold font-display tracking-wide">{p.price}</td>
                    <td className="px-3 py-3 text-xs text-foreground/55">{p.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-3 rounded-xl bg-gold/5 p-4 text-xs leading-relaxed text-foreground/60 ring-1 ring-gold/20">
            💰 {paidSummary}
          </p>
        </Reveal>
      </section>

      {/* terrestrial */}
      <section className="mt-12">
        <Reveal>
          <h2 className="flex items-center gap-2 font-display text-3xl uppercase tracking-wide">
            <Tv2 className="text-sky-300" size={26} />
            地上波・BS<span className="text-gradient-gold">放送局別ガイド</span>
          </h2>
        </Reveal>
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {terrestrialInfo.map((t, i) => (
            <Reveal key={t.station} delay={i * 70}>
              <div className="liquid-glass card-hover h-full rounded-2xl p-5">
                <div className="flex items-center justify-between">
                  <p className="text-base font-bold">{t.station}</p>
                  <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-[11px] font-bold text-foreground/60 ring-1 ring-white/10">
                    {t.matches}
                  </span>
                </div>
                <p className="mt-2.5 text-xs leading-relaxed text-foreground/70">
                  <span className="font-bold text-sky-300">日本戦: </span>
                  {t.japanMatches}
                </p>
                {t.note && <p className="mt-1.5 text-[11px] leading-relaxed text-foreground/45">{t.note}</p>}
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={100}>
          <p className="mt-3 flex items-center gap-2 text-xs text-foreground/45">
            <Radio size={13} /> ラジオ: 日本戦は文化放送・ニッポン放送が実況中継(radiko対応)。
          </p>
        </Reveal>
      </section>

      {/* free matches list */}
      <section className="mt-12">
        <Reveal>
          <h2 className="font-display text-3xl uppercase tracking-wide">
            DAZN<span className="text-gradient-gold">無料配信の試合</span>
          </h2>
          <p className="mt-2 text-sm text-foreground/55">
            無料アカウント登録だけで観られる試合。日本が決勝Tへ進めばその試合もすべて無料に。
          </p>
        </Reveal>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {freeMatches.map((m, i) => (
            <Reveal key={m.id} delay={(i % 2) * 80}>
              <MatchCard match={m} />
            </Reveal>
          ))}
        </div>
      </section>

      <p className="mt-12 text-xs leading-relaxed text-foreground/35">
        ※ 2026年6月12日時点のDAZN・NHK・日本テレビ・フジテレビの公式発表と報道に基づく。料金・編成は変更される場合があります。NHK総合の試合数は発表媒体により33〜34試合と幅があります。
      </p>
    </div>
  )
}
