import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import type { TabId } from '../App'

const tabs: { id: TabId; label: string; emoji: string }[] = [
  { id: 'home', label: 'ホーム', emoji: '🏠' },
  { id: 'matches', label: '試合日程', emoji: '📅' },
  { id: 'japan', label: '日本代表', emoji: '🇯🇵' },
  { id: 'groups', label: '組&チーム', emoji: '🌍' },
  { id: 'stats', label: 'ランキング', emoji: '👑' },
  { id: 'watch', label: '視聴ガイド', emoji: '📺' },
  { id: 'my', label: 'マイ観戦', emoji: '⭐' },
]

export default function Nav({ active, onNavigate }: { active: TabId; onNavigate: (tab: TabId) => void }) {
  const [open, setOpen] = useState(false)

  const go = (tab: TabId) => {
    onNavigate(tab)
    setOpen(false)
    window.scrollTo({ top: 0 })
  }

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/5 bg-background/60 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-6 lg:px-12">
        <button onClick={() => go('home')} className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-samurai to-sky-600 font-display text-lg text-white shadow-lg shadow-samurai/40">
            ⚽
          </span>
          <div className="text-left leading-none">
            <p className="font-display text-lg tracking-wide">
              観戦<span className="text-gradient-gold">HQ</span> '26
            </p>
            <p className="mt-0.5 text-[9px] font-bold tracking-[0.25em] text-foreground/40">WORLD CUP 2026 JAPAN HQ</p>
          </div>
        </button>

        {/* desktop pill nav */}
        <nav className="ml-auto hidden items-center gap-1 rounded-full bg-white/[0.04] p-1 ring-1 ring-white/10 lg:flex">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => go(t.id)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
                active === t.id ? 'bg-foreground text-background' : 'text-foreground/60 hover:text-foreground'
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>

        {/* mobile hamburger */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="ml-auto rounded-full bg-white/5 p-2.5 ring-1 ring-white/10 lg:hidden"
          aria-label="メニュー"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* mobile dropdown */}
      {open && (
        <nav className="border-t border-white/5 bg-background/95 px-6 py-4 backdrop-blur-xl lg:hidden">
          <div className="grid grid-cols-2 gap-2">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => go(t.id)}
                className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition ${
                  active === t.id ? 'bg-foreground text-background' : 'bg-white/5 text-foreground/70'
                }`}
              >
                <span>{t.emoji}</span>
                {t.label}
              </button>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
