import { teamMap, flagUrl } from '../data/teams'

interface FlagProps {
  code: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeClass = { sm: 'w-6 h-4', md: 'w-9 h-6', lg: 'w-14 h-9' }

export default function Flag({ code, size = 'md' }: FlagProps) {
  const team = teamMap[code]
  if (!team) {
    return (
      <span
        className={`${sizeClass[size]} inline-flex items-center justify-center rounded-sm bg-white/10 text-[10px] font-bold text-foreground/60`}
      >
        ?
      </span>
    )
  }
  return (
    <img
      src={flagUrl(code, size === 'lg' ? 160 : 80)}
      alt={`${team.nameJa}の国旗`}
      loading="lazy"
      className={`${sizeClass[size]} rounded-sm object-cover shadow-[0_2px_8px_rgba(0,0,0,0.5)] ring-1 ring-white/15`}
    />
  )
}
