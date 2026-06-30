import { useState } from 'react'
import { AppStateProvider } from './state/AppState'
import AuroraBackground from './components/AuroraBackground'
import Nav from './components/Nav'
import HomePage from './pages/HomePage'
import MatchesPage from './pages/MatchesPage'
import BracketPage from './pages/BracketPage'
import JapanPage from './pages/JapanPage'
import GroupsPage from './pages/GroupsPage'
import StatsPage from './pages/StatsPage'
import WatchPage from './pages/WatchPage'
import MyPage from './pages/MyPage'

export type TabId = 'home' | 'matches' | 'bracket' | 'japan' | 'groups' | 'stats' | 'watch' | 'my'

export default function App() {
  const [tab, setTab] = useState<TabId>('home')

  const navigate = (next: TabId) => {
    setTab(next)
    window.scrollTo({ top: 0 })
  }

  return (
    <AppStateProvider>
      <AuroraBackground />
      <Nav active={tab} onNavigate={navigate} />
      <main className="relative z-10 pt-16">
        {tab === 'home' && <HomePage onNavigate={navigate} />}
        {tab === 'matches' && <MatchesPage />}
        {tab === 'bracket' && <BracketPage />}
        {tab === 'japan' && <JapanPage />}
        {tab === 'groups' && <GroupsPage />}
        {tab === 'stats' && <StatsPage />}
        {tab === 'watch' && <WatchPage />}
        {tab === 'my' && <MyPage />}
      </main>
      <footer className="relative z-10 border-t border-white/5 py-10">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-12">
          <p className="font-black text-xl tracking-wide text-gradient-gold">W杯手帳 '26</p>
          <p className="mt-2 text-xs leading-relaxed text-foreground/40">
            FIFAワールドカップ2026 観戦コンパニオン — 日時はすべて日本時間(JST)。
            <br />
            データは2026年6月12日時点のFIFA公式・DAZN公式・JFA公式発表および各種報道に基づくファンメイドの非公式アプリです。
          </p>
        </div>
      </footer>
    </AppStateProvider>
  )
}
