import { useEffect, useState } from 'react'
import { countdownTo } from '../lib/time'

export default function CountdownTimer({ target, label }: { target: string; label?: string }) {
  const [parts, setParts] = useState(() => countdownTo(target))

  useEffect(() => {
    const id = setInterval(() => setParts(countdownTo(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  if (parts.total <= 0) {
    return (
      <div className="inline-flex items-center gap-2 rounded-full bg-daznred/20 px-4 py-2 ring-1 ring-daznred/60">
        <span className="live-dot h-2.5 w-2.5 rounded-full bg-daznred" />
        <span className="font-bold tracking-wider text-red-200">KICKOFF!</span>
      </div>
    )
  }

  const cell = (value: number, unit: string) => (
    <div className="flex flex-col items-center">
      <div className="liquid-glass rounded-xl px-3 py-2 sm:px-4 sm:py-3">
        <span className="font-display text-2xl tabular-nums tracking-wide text-gradient-gold sm:text-4xl">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="mt-1.5 text-[10px] font-bold tracking-widest text-foreground/50 sm:text-xs">{unit}</span>
    </div>
  )

  return (
    <div>
      {label && <p className="mb-3 text-sm font-bold tracking-widest text-foreground/70">{label}</p>}
      <div className="flex items-start gap-2 sm:gap-3">
        {cell(parts.days, 'DAYS')}
        <span className="pt-2 font-display text-2xl text-foreground/30 sm:text-3xl">:</span>
        {cell(parts.hours, 'HRS')}
        <span className="pt-2 font-display text-2xl text-foreground/30 sm:text-3xl">:</span>
        {cell(parts.minutes, 'MIN')}
        <span className="pt-2 font-display text-2xl text-foreground/30 sm:text-3xl">:</span>
        {cell(parts.seconds, 'SEC')}
      </div>
    </div>
  )
}
