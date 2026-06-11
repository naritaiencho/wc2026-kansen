import type { Broadcast } from '../data/types'

export default function BroadcastBadge({ type, large = false }: { type: Broadcast; large?: boolean }) {
  const base = large
    ? 'px-3 py-1 text-sm font-bold rounded-full inline-flex items-center gap-1.5'
    : 'px-2 py-0.5 text-[11px] font-bold rounded-full inline-flex items-center gap-1'

  if (type === 'free') {
    return (
      <span className={`${base} bg-pitch/15 text-pitch ring-1 ring-pitch/50 animate-pulse-glow`}>
        <span className="h-1.5 w-1.5 rounded-full bg-pitch" />
        DAZN無料
      </span>
    )
  }
  if (type === 'exclusive') {
    return (
      <span className={`${base} bg-daznred/15 text-red-300 ring-1 ring-daznred/50`}>
        <span className="h-1.5 w-1.5 rounded-full bg-daznred" />
        DAZN独占
      </span>
    )
  }
  return (
    <span className={`${base} bg-samurai/15 text-sky-300 ring-1 ring-samurai/50`}>
      <span className="h-1.5 w-1.5 rounded-full bg-samurai" />
      地上波あり
    </span>
  )
}
