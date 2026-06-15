// 日本語サッカーニュースをRSSから取得して data/news.json に書き出す（API枠を消費しない）。
// 依存ゼロ（軽量パーサ）。主=ゲキサカ日本代表。見出し+リンクのみ（本文は転載しない）。
import { writeFile, mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

const FEEDS = [
  { url: 'https://web.gekisaka.jp/feed?category=nationalteam', source: 'ゲキサカ' },
  { url: 'https://web.gekisaka.jp/feed', source: 'ゲキサカ' },
]

function decode(s) {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&')
    .trim()
}

function parseItems(xml, source) {
  const items = []
  const re = /<item[^>]*>([\s\S]*?)<\/item>/g
  let m
  while ((m = re.exec(xml))) {
    const block = m[1]
    const pick = (tag) => {
      const r = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`).exec(block)
      return r ? decode(r[1]) : ''
    }
    const title = pick('title')
    let link = pick('link')
    if (!link) link = pick('guid')
    const date = pick('pubDate')
    if (title && /^https?:\/\//.test(link)) items.push({ date, title, link, source })
  }
  return items
}

async function main() {
  const all = []
  for (const f of FEEDS) {
    try {
      const res = await fetch(f.url, { headers: { 'User-Agent': 'wc2026-techo-bot' } })
      if (!res.ok) continue
      const xml = await res.text()
      all.push(...parseItems(xml, f.source))
    } catch {
      // このフィードはスキップ
    }
  }
  const seen = new Set()
  const out = []
  for (const it of all) {
    if (seen.has(it.link)) continue
    seen.add(it.link)
    out.push(it)
    if (out.length >= 15) break
  }
  await mkdir(join(ROOT, 'data'), { recursive: true })
  if (out.length) {
    await writeFile(join(ROOT, 'data/news.json'), JSON.stringify(out), 'utf-8')
  }
  console.log(`news=${out.length}`)
  if (out[0]) console.log('  top:', out[0].title)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
