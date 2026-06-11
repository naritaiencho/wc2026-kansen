// 日本国内の放送・配信体制 — 出典: DAZN公式プレスリリース(2025-12-04, 2026-05-30)、NHK・日テレ・フジ発表、各種報道(2026-06-12時点)

export const broadcastOverview = [
  '今大会は電通がFIFAから放映権を取得し、DAZN・NHK・日本テレビ・フジテレビに分配。テレビ朝日・TBS・ABEMAは撤退した。',
  '全104試合をライブで観られるのはDAZNだけ。地上波は計58〜59試合(NHK 33〜34+日テレ15+フジ10)。',
  '2022年のABEMA全試合無料のような動きは今回はなし。U-NEXTやAmazonプライムにも配信権はない。',
]

export const daznInfo = {
  coverage: '全104試合ライブ配信(全試合見逃し配信つき)',
  freeMatches: [
    '日本戦は全試合無料(グループステージ3試合+決勝トーナメント進出時の全試合)',
    '準決勝2試合・3位決定戦・決勝も無料',
    '無料アカウント登録(Freemium)だけで視聴可能。有料プラン契約は不要',
  ],
  plans: [
    { name: 'DAZN Standard(月額)', price: '4,200円/月', note: 'W杯キャンペーン: 5/30〜7/20の新規加入で最初3カ月1,980円/月。期間中解約OK' },
    { name: 'DAZN Standard(年間一括)', price: '32,000円/年', note: '実質2,667円/月' },
    { name: 'DAZN SOCCER(年間)', price: '最初3カ月980円/月→以降2,600円/月', note: 'サッカー特化の最安プラン。7/20までの加入が条件' },
    { name: 'ABEMA de DAZN', price: '3,800円/月', note: 'ABEMAアプリから全104試合視聴可。年間一括30,000円' },
  ],
}

export const terrestrialInfo = [
  {
    station: 'NHK総合',
    matches: '33〜34試合(開幕戦・決勝を含む)',
    japanMatches: '日本戦は6/15オランダ戦(5:00)と6/26スウェーデン戦(8:00)を生中継',
    note: '日本が決勝トーナメント2回戦以降に進めば全試合を地上波生中継。NHK ONEで同時・見逃し配信あり',
  },
  {
    station: '日本テレビ系',
    matches: '15試合(GS9+決勝T6)',
    japanMatches: '日本戦は6/21チュニジア戦(13:00キックオフ、放送は10:25〜)',
    note: '2026年大会で地上波放映に復帰',
  },
  {
    station: 'フジテレビ系',
    matches: '10試合(GS5+決勝T5)',
    japanMatches: 'グループステージの日本戦はなし。日本が決勝T進出した場合の1回戦を放送予定',
    note: '',
  },
  {
    station: 'NHK BSプレミアム4K',
    matches: '全104試合(生中継+録画)',
    japanMatches: '6/21チュニジア戦もBSで放送',
    note: '衛星契約+4K環境が必要',
  },
]

export const freeViewingSummary = [
  { way: 'DAZN無料配信', what: '日本戦全試合+準決勝2試合+3位決定戦+決勝', how: '無料アカウント登録のみでOK' },
  { way: 'NHK総合・日テレ・フジ(地上波)', what: '計58〜59試合(開幕戦・日本戦・決勝含む)', how: 'テレビがあれば無料' },
  { way: 'NHK ONE', what: 'NHK地上波分の同時・見逃し配信', how: 'NHK受信契約世帯' },
  { way: 'ラジオ', what: '日本戦は文化放送・ニッポン放送が実況中継', how: 'radikoでも' },
]

export const paidSummary =
  '地上波未放送の約45試合(DAZN独占)をライブで見るならDAZN有料プランが必要。最安はDAZN SOCCER年間プラン(最初3カ月980円/月)。W杯期間だけならStandard月額キャンペーン1,980円×2カ月という手も。'

export const broadcastBadgeLegend = {
  exclusive: { label: 'DAZN独占', desc: 'DAZNだけがライブ配信(有料プラン)' },
  free: { label: 'DAZN無料', desc: '無料アカウント登録だけで視聴OK' },
  shared: { label: '地上波あり', desc: 'NHK/日テレ/フジでも放送(+DAZN配信)' },
}
