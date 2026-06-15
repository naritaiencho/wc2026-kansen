import { useEffect, useState } from 'react'

// 公式データのランタイム取得フック。
// マウント時 + タブ可視化時 + 一定間隔で fetcher を呼び、最新値を保持する。
// 取得失敗(null)時は値を更新しない → 呼び出し側のビルド時staticが生き続ける。
// fetcher はモジュールスコープの安定参照を渡す前提（remoteData.results 等）。
export function useRemoteData<T>(fetcher: () => Promise<T | null>, intervalMs = 5 * 60 * 1000): T | null {
  const [data, setData] = useState<T | null>(null)

  useEffect(() => {
    let alive = true
    const load = async () => {
      const v = await fetcher()
      if (alive && v != null) setData(v)
    }
    void load()
    const tick = () => {
      if (document.visibilityState === 'visible') void load()
    }
    const id = window.setInterval(tick, intervalMs)
    document.addEventListener('visibilitychange', tick)
    return () => {
      alive = false
      window.clearInterval(id)
      document.removeEventListener('visibilitychange', tick)
    }
  }, [fetcher, intervalMs])

  return data
}
