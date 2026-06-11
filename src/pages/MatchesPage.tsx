import { useMemo, useState } from 'react'
import { Filter } from 'lucide-react'
import { allMatches } from '../data/matches'
import { teams, groupList } from '../data/teams'
import { jstDateKey, formatDateOnly } from '../lib/time'
import { useAppState } from '../state/AppState'
import MatchCard from '../components/MatchCard'
import Reveal from '../components/Reveal'

type StageFilter = 'all' | 'gs1' | 'gs2' | 'gs3' | 'knockout'
type BroadcastFilter = 'all' | 'free' | 'shared' | 'exclusive'

const stageTabs: { id: StageFilter; label: string }[] = [
  { id: 'all', label: '全試合' },
  { id: 'gs1', label: '第1節 6/12-18' },
  { id: 'gs2', label: '第2節 6/19-24' },
  { id: 'gs3', label: '第3節 6/25-28' },
  { id: 'knockout', label: '決勝トーナメント' },
]

export default function MatchesPage() {
  const { bookmarks, favTeams } = useAppState()
  const [stage, setStage] = useState<StageFilter>('all')
  const [group, setGroup] = useState<string>('all')
  const [team, setTeam] = useState<string>('all')
  const [broadcast, setBroadcast] = useState<BroadcastFilter>('all')
  const [japanOnly, setJapanOnly] = useState(false)
  const [bookmarkedOnly, setBookmarkedOnly] = useState(false)
  const [favOnly, setFavOnly] = useState(false)

  const filtered = useMemo(() => {
    return allMatches.filter((m) => {
      if (stage === 'gs1' && !(m.stage === 'group' && m.id <= 24)) return false
      if (stage === 'gs2' && !(m.stage === 'group' && m.id > 24 && m.id <= 48)) return false
      if (stage === 'gs3' && !(m.stage === 'group' && m.id > 48 && m.id <= 72)) return false
      if (stage === 'knockout' && m.stage === 'group') return false
      if (group !== 'all' && m.group !== group) return false
      if (team !== 'all' && m.home !== team && m.away !== team) return false
      if (broadcast !== 'all' && m.broadcast !== broadcast) return false
      if (japanOnly && m.home !== 'JPN' && m.away !== 'JPN') return false
      if (bookmarkedOnly && !bookmarks.includes(m.id)) return false
      if (favOnly && favTeams.length > 0 && !favTeams.includes(m.home) && !favTeams.includes(m.away)) return false
      return true
    })
  }, [stage, group, team, broadcast, japanOnly, bookmarkedOnly, favOnly, bookmarks, favTeams])

  // group matches by JST date
  const byDate = useMemo(() => {
    const map = new Map<string, typeof filtered>()
    for (const m of filtered) {
      const key = jstDateKey(m.kickoff)
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(m)
    }
    return [...map.entries()].sort(([a], [b]) => a.localeCompare(b))
  }, [filtered])

  const selectClass =
    'rounded-full bg-surface px-3 py-1.5 text-xs font-bold text-foreground/80 ring-1 ring-white/10 outline-none focus:ring-gold/50'

  const toggleClass = (active: boolean) =>
    `rounded-full px-3 py-1.5 text-xs font-bold transition ring-1 ${
      active ? 'bg-gold/20 text-gold ring-gold/50' : 'bg-white/5 text-foreground/60 ring-white/10 hover:bg-white/10'
    }`

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-12">
      <Reveal>
        <h1 className="font-display text-4xl uppercase tracking-wide sm:text-5xl">
          Match <span className="text-gradient-gold">Schedule</span>
        </h1>
        <p className="mt-2 text-sm text-foreground/55">
          全104試合・日本時間表記。ワンクリックでGoogleカレンダーに追加、放送区分も一目瞭然。
        </p>
      </Reveal>

      {/* stage tabs */}
      <div className="sticky top-[64px] z-30 -mx-6 mt-6 border-b border-white/5 bg-background/85 px-6 py-3 backdrop-blur-xl lg:-mx-12 lg:px-12">
        <div className="flex flex-wrap items-center gap-2">
          {stageTabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setStage(t.id)}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${
                stage === t.id ? 'bg-foreground text-background' : 'bg-white/5 text-foreground/60 hover:bg-white/10'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="mt-2.5 flex flex-wrap items-center gap-2">
          <Filter size={13} className="text-foreground/40" />
          <select value={group} onChange={(e) => setGroup(e.target.value)} className={selectClass}>
            <option value="all">全グループ</option>
            {groupList.map((g) => (
              <option key={g} value={g}>
                グループ{g}
              </option>
            ))}
          </select>
          <select value={team} onChange={(e) => setTeam(e.target.value)} className={selectClass}>
            <option value="all">全チーム</option>
            {teams.map((t) => (
              <option key={t.code} value={t.code}>
                {t.nameJa}
              </option>
            ))}
          </select>
          <select value={broadcast} onChange={(e) => setBroadcast(e.target.value as BroadcastFilter)} className={selectClass}>
            <option value="all">全放送区分</option>
            <option value="free">DAZN無料のみ</option>
            <option value="shared">地上波ありのみ</option>
            <option value="exclusive">DAZN独占のみ</option>
          </select>
          <button onClick={() => setJapanOnly((v) => !v)} className={toggleClass(japanOnly)}>
            🇯🇵 日本戦
          </button>
          <button onClick={() => setBookmarkedOnly((v) => !v)} className={toggleClass(bookmarkedOnly)}>
            ⭐ 観戦予定
          </button>
          <button onClick={() => setFavOnly((v) => !v)} className={toggleClass(favOnly)} title="マイ観戦で推しチームを登録">
            ❤️ 推しチーム
          </button>
          <span className="ml-auto text-xs font-bold text-foreground/40">{filtered.length}試合</span>
        </div>
      </div>

      {/* match list grouped by date */}
      {byDate.map(([dateKey, matches]) => (
        <section key={dateKey} className="mt-10">
          <div className="mb-4 flex items-center gap-3">
            <h2 className="font-display text-2xl tracking-wide text-gradient-blue">
              {formatDateOnly(matches[0].kickoff)}
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-samurai/40 to-transparent" />
            <span className="text-xs font-bold text-foreground/40">{matches.length}試合</span>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {matches.map((m) => (
              <MatchCard key={m.id} match={m} />
            ))}
          </div>
        </section>
      ))}

      {filtered.length === 0 && (
        <p className="mt-16 text-center text-foreground/50">条件に合う試合がありません。フィルターを変えてみてください。</p>
      )}

      <p className="mt-12 text-xs leading-relaxed text-foreground/35">
        ※ 日時はすべて日本時間(JST)。放送区分はDAZN公式スケジュール(2026年6月版)に基づく。決勝トーナメントの組み合わせは6/28のグループステージ終了後に確定し、地上波の中継カードは各局の編成により変動する場合があります。
      </p>
    </div>
  )
}
