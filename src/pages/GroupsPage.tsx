import { useMemo, useState } from 'react'
import { X } from 'lucide-react'
import { groupList, teamsByGroup, teamMap } from '../data/teams'
import { groupMatches } from '../data/matches'
import { computeStandings } from '../lib/standings'
import { useAppState } from '../state/AppState'
import type { Team } from '../data/types'
import Flag from '../components/Flag'
import Reveal from '../components/Reveal'

function TeamModal({ team, onClose }: { team: Team; onClose: () => void }) {
  const { favTeams, toggleFavTeam } = useAppState()
  const fav = favTeams.includes(team.code)
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      <div
        className="liquid-glass relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-surface/90 p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute right-4 top-4 rounded-full bg-white/5 p-2 text-foreground/60 transition hover:bg-white/10">
          <X size={16} />
        </button>
        <div className="flex items-center gap-4">
          <Flag code={team.code} size="lg" />
          <div>
            <p className="text-[10px] font-bold tracking-[0.3em] text-foreground/40">GROUP {team.group} / {team.nameEn.toUpperCase()}</p>
            <h3 className="font-display text-3xl">{team.nameJa}</h3>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2">
          {[
            { label: 'FIFAランク', value: team.fifaRank ? `${team.fifaRank}位` : '—' },
            { label: '出場回数', value: team.appearances ? `${team.appearances}回目` : '—' },
            { label: '監督', value: team.manager ?? '—' },
          ].map((s) => (
            <div key={s.label} className="rounded-xl bg-white/[0.04] p-3 text-center ring-1 ring-white/5">
              <p className="text-[9px] font-bold tracking-widest text-foreground/40">{s.label}</p>
              <p className="mt-1 text-xs font-bold leading-tight">{s.value}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-foreground/55">
          <span className="font-bold text-gold">過去最高成績: </span>
          {team.bestResult}
        </p>
        {team.style && (
          <p className="mt-2 text-xs text-foreground/55">
            <span className="font-bold text-sky-300">スタイル: </span>
            {team.style}
          </p>
        )}
        {team.star && (
          <div className="mt-4 rounded-2xl bg-gradient-to-r from-gold/10 to-transparent p-4 ring-1 ring-gold/20">
            <p className="text-[10px] font-bold tracking-widest text-gold">STAR PLAYER</p>
            <p className="mt-1 text-base font-bold">{team.star.name}</p>
            <p className="text-[11px] text-foreground/50">{team.star.position} / {team.star.club}</p>
            {team.star.note && <p className="mt-1.5 text-xs text-foreground/65">{team.star.note}</p>}
          </div>
        )}
        {team.second && (
          <div className="mt-2.5 rounded-2xl bg-white/[0.03] p-4 ring-1 ring-white/5">
            <p className="text-[10px] font-bold tracking-widest text-foreground/40">KEY PLAYER</p>
            <p className="mt-1 text-sm font-bold">{team.second.name}</p>
            <p className="text-[11px] text-foreground/50">{team.second.position} / {team.second.club}</p>
            {team.second.note && <p className="mt-1.5 text-xs text-foreground/60">{team.second.note}</p>}
          </div>
        )}
        {team.funFact && (
          <p className="mt-4 rounded-xl bg-samurai/10 p-3.5 text-xs leading-relaxed text-foreground/70 ring-1 ring-samurai/25">
            💡 {team.funFact}
          </p>
        )}
        <button
          onClick={() => toggleFavTeam(team.code)}
          className={`mt-5 w-full rounded-full px-4 py-2.5 text-sm font-bold transition ${
            fav ? 'bg-gold text-background' : 'bg-white/5 text-foreground/70 ring-1 ring-white/15 hover:bg-white/10'
          }`}
        >
          {fav ? '❤️ 推しチーム登録済み(タップで解除)' : '🤍 推しチームに登録'}
        </button>
      </div>
    </div>
  )
}

export default function GroupsPage() {
  const { resultsMap, favTeams } = useAppState()
  const [selected, setSelected] = useState<Team | null>(null)

  const standingsByGroup = useMemo(() => {
    const map: Record<string, ReturnType<typeof computeStandings>> = {}
    for (const g of groupList) {
      map[g] = computeStandings(
        teamsByGroup(g).map((t) => t.code),
        groupMatches.filter((m) => m.group === g),
        resultsMap,
      )
    }
    return map
  }, [resultsMap])

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-12">
      <Reveal>
        <h1 className="font-display text-4xl uppercase tracking-wide sm:text-5xl">
          Groups & <span className="text-gradient-gold">48 Teams</span>
        </h1>
        <p className="mt-2 text-sm text-foreground/55">
          12グループの順位表と全48カ国図鑑。チームをタップすると注目選手・スタイル・雑学が見られます。各組上位2+3位の上位8チームが決勝Tへ。
        </p>
      </Reveal>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {groupList.map((g, gi) => (
          <Reveal key={g} delay={(gi % 3) * 80}>
            <div className={`liquid-glass rounded-2xl p-5 ${g === 'F' ? 'ring-1 ring-samurai/50' : ''}`}>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="font-display text-2xl">
                  GROUP <span className="text-gradient-gold">{g}</span>
                </h2>
                {g === 'F' && (
                  <span className="rounded-full bg-samurai/15 px-2.5 py-0.5 text-[10px] font-bold text-sky-300 ring-1 ring-samurai/40">
                    🇯🇵 日本のグループ
                  </span>
                )}
                {g === 'I' && (
                  <span className="rounded-full bg-daznred/15 px-2.5 py-0.5 text-[10px] font-bold text-red-300 ring-1 ring-daznred/40">
                    💀 死の組
                  </span>
                )}
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-[10px] font-bold tracking-widest text-foreground/35">
                    <th className="py-1 pl-1">チーム</th>
                    <th className="py-1 text-center">試</th>
                    <th className="py-1 text-center">得失</th>
                    <th className="py-1 pr-1 text-center">点</th>
                  </tr>
                </thead>
                <tbody>
                  {standingsByGroup[g].map((row, i) => {
                    const team = teamMap[row.code]
                    return (
                      <tr
                        key={row.code}
                        onClick={() => setSelected(team)}
                        className={`cursor-pointer border-t border-white/5 transition hover:bg-white/[0.04] ${
                          row.code === 'JPN' ? 'bg-samurai/10' : ''
                        }`}
                      >
                        <td className="py-2 pl-1">
                          <span className="flex items-center gap-2">
                            <span className={`w-3 text-center font-display text-xs ${i < 2 ? 'text-pitch' : 'text-foreground/30'}`}>
                              {i + 1}
                            </span>
                            <Flag code={row.code} size="sm" />
                            <span className="truncate text-xs font-bold">
                              {team?.nameJa}
                              {favTeams.includes(row.code) && ' ❤️'}
                            </span>
                          </span>
                        </td>
                        <td className="py-2 text-center text-xs tabular-nums text-foreground/55">{row.played}</td>
                        <td className="py-2 text-center text-xs tabular-nums text-foreground/55">
                          {row.gd > 0 ? `+${row.gd}` : row.gd}
                        </td>
                        <td className="py-2 pr-1 text-center font-display text-sm text-gradient-gold">{row.points}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </Reveal>
        ))}
      </div>

      <p className="mt-8 text-xs text-foreground/35">
        ※ 順位表は公式結果+「マイ観戦」タブで入力した結果から自動計算。並びは勝ち点→得失点差→総得点。
      </p>

      {selected && <TeamModal team={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
