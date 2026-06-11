import { useMemo, useState } from 'react'
import { ArrowRight, CalendarDays, Skull, Sparkles, Tv } from 'lucide-react'
import { allMatches } from '../data/matches'
import { teamName } from '../data/teams'
import { storylines, groupOfDeath } from '../data/storylines'
import { jstDateKey } from '../lib/time'
import ParticleField from '../components/ParticleField'
import CountdownTimer from '../components/CountdownTimer'
import MatchCard from '../components/MatchCard'
import Reveal from '../components/Reveal'
import Flag from '../components/Flag'
import type { TabId } from '../App'

export default function HomePage({ onNavigate }: { onNavigate: (tab: TabId) => void }) {
  const [heroImageOk, setHeroImageOk] = useState(true)
  const now = new Date()

  const nextJapanMatch = useMemo(
    () =>
      allMatches.find(
        (m) => (m.home === 'JPN' || m.away === 'JPN') && new Date(m.kickoff).getTime() > now.getTime(),
      ),
    [],
  )

  const todayKey = jstDateKey(now.toISOString())
  const tomorrowKey = jstDateKey(new Date(now.getTime() + 86400000).toISOString())
  const todayMatches = allMatches.filter((m) => jstDateKey(m.kickoff) === todayKey)
  const tomorrowMatches = allMatches.filter((m) => jstDateKey(m.kickoff) === tomorrowKey)

  return (
    <div>
      {/* ================= HERO ================= */}
      <section className="relative flex min-h-[92vh] w-full items-center justify-center overflow-hidden">
        {heroImageOk && (
          <img
            src="/hero-stadium.png"
            alt=""
            onError={() => setHeroImageOk(false)}
            className="absolute inset-0 h-full w-full object-cover opacity-35"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />
        <ParticleField density={80} />

        <div className="relative z-10 mx-auto max-w-5xl px-6 py-24 text-center">
          <p className="animate-fade-up mb-4 inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 text-xs font-bold tracking-[0.3em] text-gold ring-1 ring-gold/30">
            <Sparkles size={13} />
            FIFA WORLD CUP 2026 — 6.11 ▶ 7.20
          </p>
          <h1
            className="font-display text-[44px] uppercase leading-[1.02] sm:text-[64px] md:text-[84px] animate-fade-up"
            style={{ animationDelay: '150ms' }}
          >
            <span className="text-gradient-hero">寝不足上等。</span>
            <br />
            <span className="text-foreground">
              全<span className="text-gradient-gold">104</span>試合、見逃すな。
            </span>
          </h1>
          <p
            className="animate-fade-up mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-foreground/65 sm:text-base"
            style={{ animationDelay: '350ms' }}
          >
            史上初の48チーム・3カ国共催ワールドカップを、日本時間で完全攻略。
            放送・配信、見どころ、順位表、得点ランキング、観戦プランまで——観戦のすべてが、ここに。
          </p>

          {nextJapanMatch && (
            <div className="animate-fade-up mt-10 flex flex-col items-center" style={{ animationDelay: '550ms' }}>
              <div className="mb-3 flex items-center gap-3">
                <Flag code="JPN" size="md" />
                <span className="text-sm font-bold tracking-widest text-foreground/80">
                  日本代表 次戦{' '}
                  <span className="text-gradient-blue">
                    vs {teamName(nextJapanMatch.home === 'JPN' ? nextJapanMatch.away : nextJapanMatch.home)}
                  </span>{' '}
                  まで
                </span>
              </div>
              <CountdownTimer target={nextJapanMatch.kickoff} />
            </div>
          )}

          <div className="animate-fade-up mt-10 flex flex-wrap items-center justify-center gap-3" style={{ animationDelay: '700ms' }}>
            <button
              onClick={() => onNavigate('japan')}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-samurai to-sky-500 px-6 py-3 text-sm font-bold text-white shadow-xl shadow-samurai/40 transition hover:brightness-110"
            >
              🇯🇵 日本代表 特設ページ
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => onNavigate('matches')}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-bold text-foreground/90 backdrop-blur transition hover:bg-white/10"
            >
              <CalendarDays size={15} />
              全試合スケジュール
            </button>
          </div>

          <div className="animate-fade-up mt-12 grid grid-cols-3 gap-3 sm:gap-6" style={{ animationDelay: '850ms' }}>
            {[
              { value: '104', label: 'MATCHES' },
              { value: '48', label: 'TEAMS' },
              { value: '16', label: 'STADIUMS' },
            ].map((s) => (
              <div key={s.label} className="liquid-glass rounded-2xl px-2 py-4">
                <p className="font-display text-3xl text-gradient-gold sm:text-4xl">{s.value}</p>
                <p className="mt-1 text-[10px] font-bold tracking-[0.25em] text-foreground/40">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TODAY ================= */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
        <Reveal>
          <h2 className="font-display text-3xl uppercase tracking-wide sm:text-4xl">
            <span className="text-gradient-gold">Today</span> & Tomorrow
          </h2>
          <p className="mt-2 text-sm text-foreground/55">今日・明日の試合(日本時間)。早起きの価値があるカードはどれだ。</p>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {[...todayMatches, ...tomorrowMatches].slice(0, 6).map((m, i) => (
            <Reveal key={m.id} delay={i * 80}>
              <MatchCard match={m} />
            </Reveal>
          ))}
          {todayMatches.length === 0 && tomorrowMatches.length === 0 && (
            <p className="text-foreground/50">今日・明日の試合はありません。</p>
          )}
        </div>
        <Reveal delay={200}>
          <button
            onClick={() => onNavigate('matches')}
            className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-gold transition hover:gap-3"
          >
            全試合を見る <ArrowRight size={15} />
          </button>
        </Reveal>
      </section>

      {/* ================= FREE WATCH STRIP ================= */}
      <section className="border-y border-white/5 bg-pitch/5">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-4 px-6 py-10 sm:flex-row sm:items-center lg:px-12">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pitch/15 ring-1 ring-pitch/40">
              <Tv className="text-pitch" size={22} />
            </span>
            <div>
              <p className="font-bold text-pitch">日本戦は全試合「完全無料」で観られる</p>
              <p className="text-xs text-foreground/55">
                DAZN無料配信(登録のみ)+NHK/日テレ地上波。準決勝・3位決定戦・決勝もDAZN無料。
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('watch')}
            className="ml-auto shrink-0 rounded-full bg-pitch/15 px-5 py-2.5 text-sm font-bold text-pitch ring-1 ring-pitch/40 transition hover:bg-pitch/25"
          >
            視聴ガイドを見る
          </button>
        </div>
      </section>

      {/* ================= STORYLINES ================= */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
        <Reveal>
          <h2 className="font-display text-3xl uppercase tracking-wide sm:text-4xl">
            10 <span className="text-gradient-gold">Storylines</span>
          </h2>
          <p className="mt-2 text-sm text-foreground/55">この大会を100倍楽しむための10のストーリー。</p>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {storylines.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 100}>
              <div className="liquid-glass card-hover h-full rounded-2xl p-5">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{s.emoji}</span>
                  <div>
                    <p className="text-sm font-bold leading-snug text-foreground">{s.title}</p>
                    <p className="mt-2 text-xs leading-relaxed text-foreground/55">{s.detail}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= GROUP OF DEATH ================= */}
      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-12">
        <Reveal>
          <div className="liquid-glass relative overflow-hidden rounded-3xl p-8 sm:p-10">
            <div
              className="absolute inset-0 opacity-20"
              style={{ background: 'radial-gradient(circle at 80% 20%, #E5304C 0%, transparent 55%)' }}
            />
            <div className="relative">
              <p className="inline-flex items-center gap-2 rounded-full bg-daznred/15 px-3 py-1 text-xs font-bold tracking-widest text-red-300 ring-1 ring-daznred/40">
                <Skull size={13} /> GROUP OF DEATH
              </p>
              <h3 className="mt-4 font-display text-2xl uppercase sm:text-3xl">
                死の組 — グループ<span className="text-gradient-gold">{groupOfDeath.group}</span>
              </h3>
              <div className="mt-4 flex flex-wrap gap-3">
                {['FRA', 'NOR', 'SEN', 'IRQ'].map((code) => (
                  <span key={code} className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 text-sm font-bold ring-1 ring-white/10">
                    <Flag code={code} size="sm" />
                    {groupOfDeath.teams[['FRA', 'NOR', 'SEN', 'IRQ'].indexOf(code)]}
                  </span>
                ))}
              </div>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-foreground/65">{groupOfDeath.detail}</p>
              <p className="mt-3 text-xs font-bold text-gold">
                💥 6/27(土) 朝4:00 ノルウェー vs フランス — ハーランド vs エムバペの直接対決は最優先でカレンダーへ。
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
