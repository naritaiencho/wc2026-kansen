// 大会ストーリーライン・得点王候補・優勝オッズ — 出典: ESPN, RotoWire, BetMGM(Yahoo Sports), GOAL等(2026-06-11〜12時点)

export interface Storyline {
  title: string
  detail: string
  emoji: string
}

export const storylines: Storyline[] = [
  {
    emoji: '🐐',
    title: 'メッシ(38)、6大会目の「ラストダンス」',
    detail: 'W杯最多出場26試合の記録をさらに更新へ。アルゼンチンが優勝すれば1962年ブラジル以来64年ぶりの連覇。',
  },
  {
    emoji: '👑',
    title: 'ロナウド(41)も6大会目 — 史上初をメッシと同時達成',
    detail: '両雄がピッチに立った瞬間、史上初の「6大会出場」が同時に誕生。ノックアウトでの夢の直接対決にも世界が期待。',
  },
  {
    emoji: '🌎',
    title: '史上初の48チーム・3カ国共催・104試合',
    detail: 'アステカは史上初の「3度のW杯開催スタジアム」に。開幕戦メキシコvs南アフリカは2010年開幕戦と同一カード・同日付という偶然も。',
  },
  {
    emoji: '🌱',
    title: '初出場4カ国の夢舞台',
    detail: 'キュラソー(W杯史上最小の出場国)、ヨルダン、ウズベキスタン(中央アジア初)、カーボベルデ。ハイチは52年ぶり復活出場。',
  },
  {
    emoji: '🇮🇹',
    title: 'イタリア、まさかの3大会連続予選敗退',
    detail: 'プレーオフ決勝でボスニア・ヘルツェゴビナにPK戦で敗北。4度の王者が今大会も不在に。',
  },
  {
    emoji: '⚔️',
    title: '得点王三つ巴: エムバペ vs ケイン vs ハーランド',
    detail: 'エムバペがオッズ筆頭。ケインはバイエルンで公式戦61得点の異次元シーズン。ハーランドは初のW杯でノルウェーは28年ぶり出場。',
  },
  {
    emoji: '✨',
    title: 'ヤマル(18)の戴冠なるか',
    detail: '最年少得点王(ミュラー20歳)・最年少ゴールデンボール(ロナウド21歳)の記録更新候補。ただしハム負傷明けで初戦欠場濃厚。',
  },
  {
    emoji: '🇧🇷',
    title: 'ネイマール(34)が4大会目の復活選出',
    detail: 'アンチェロッティ新生セレソンの切り札に。19歳エステヴァンは負傷で無念の落選。',
  },
  {
    emoji: '🏠',
    title: 'ホスト3カ国の夢',
    detail: '米国はプリシッチを軸に地元の期待を背負う。メキシコには17歳の至宝ヒルベルト・モラ——「メキシコのペドリ」。',
  },
  {
    emoji: '📊',
    title: 'クローゼの16得点記録に王手',
    detail: 'メッシ(13点・あと4点)とエムバペ(12点・あと5点)がW杯通算最多得点記録を追う。大会総得点も史上初の200点超えが確実視。',
  },
]

export interface BootCandidate {
  player: string
  country: string // FIFA code
  club: string
  odds: string
  note: string
}

export const goldenBootCandidates: BootCandidate[] = [
  { player: 'キリアン・エムバペ', country: 'FRA', club: 'レアル・マドリード', odds: '+600', note: '今季43得点。2022年大会得点王(8点)の連覇に挑む' },
  { player: 'ハリー・ケイン', country: 'ENG', club: 'バイエルン', odds: '+700', note: '今季公式戦61得点。2018年大会得点王' },
  { player: 'アーリング・ハーランド', country: 'NOR', club: 'マンチェスター・シティ', odds: '+1400', note: '代表50試合55得点。初のW杯' },
  { player: 'ミケル・オヤルサバル', country: 'ESP', club: 'レアル・ソシエダ', odds: '+1400', note: '優勝候補筆頭の1stチョイスCF' },
  { player: 'リオネル・メッシ', country: 'ARG', club: 'インテル・マイアミ', odds: '+1600', note: 'W杯通算13得点。連覇なら試合数最大化' },
  { player: 'クリスティアーノ・ロナウド', country: 'POR', club: 'アル・ナスル', odds: '+2000', note: '41歳。W杯通算8得点' },
  { player: 'ラミン・ヤマル', country: 'ESP', club: 'バルセロナ', odds: '+2200', note: '「トップ10で最良のバリュー」評。負傷明けが懸念' },
  { player: 'ウスマン・デンベレ', country: 'FRA', club: 'パリ・サンジェルマン', odds: '+2500', note: '2025年バロンドール受賞者' },
  { player: 'ハフィーニャ', country: 'BRA', club: 'バルセロナ', odds: '+2800', note: 'セレソンの主軸アタッカー' },
  { player: 'フリアン・アルバレス', country: 'ARG', club: 'アトレティコ・マドリード', odds: '+3000', note: 'ビニシウス、ハヴァーツも同オッズ帯' },
]

export const titleOdds = [
  { country: 'ESP', odds: '+450', note: 'ユーロ2024王者。各社共通の単独本命' },
  { country: 'FRA', odds: '+500', note: '3大会連続決勝進出を狙う。デシャンは監督最多勝記録更新目前' },
  { country: 'ENG', odds: '+700', note: 'ケイン擁し1966年以来の悲願へ。トゥヘル体制' },
  { country: 'BRA', odds: '+800', note: 'アンチェロッティ新体制+ヴィニシウス&ハフィーニャ' },
  { country: 'POR', odds: '+900', note: 'ネーションズリーグ2025王者。ロナウド最後の大舞台' },
  { country: 'ARG', odds: '+900', note: '前回王者。メッシと共に1962年以来の連覇へ' },
  { country: 'GER', odds: '+1400', note: 'ナーゲルスマン体制。伝統の大会巧者' },
  { country: 'NED', odds: '+2000', note: '日本の初戦の相手。ガクポら攻撃陣に期待' },
]

export const recordsAtStake = [
  { record: '史上初の6大会出場', detail: 'メッシとロナウドが出場した瞬間に同時達成(従来最多5大会)' },
  { record: 'W杯通算最多得点(クローゼ16点)', detail: 'メッシ13点・エムバペ12点が追走中' },
  { record: '監督最多勝利(シェーン16勝)', detail: 'デシャン(フランス)が14勝で更新確実とESPN予測' },
  { record: '1大会総得点(2022年172点)', detail: '104試合制で史上初の200点超えへ' },
  { record: '40歳以上出場選手数(歴代通算7人)', detail: 'ロナウド(41)、ノイアー(40)、ジェコ(40)、モドリッチ(40)、オチョア(40)ら今大会だけで記録更新へ' },
]

export const youngStars = [
  { player: 'ラミン・ヤマル', age: 18, country: 'ESP', club: 'バルセロナ', note: '大会の顔候補。負傷明けで初戦欠場見込み' },
  { player: 'ヒルベルト・モラ', age: 17, country: 'MEX', club: 'クラブ・ティフアナ', note: '「メキシコのペドリ」。2025ゴールドカップ優勝の立役者' },
  { player: 'パウ・クバルシ', age: 19, country: 'ESP', club: 'バルセロナ', note: '優勝候補筆頭の最終ラインを担う若きCB' },
  { player: 'イブラヒム・ンバイェ', age: 18, country: 'SEN', club: 'パリ・サンジェルマン', note: '死の組でフランスに挑むセネガルの切り札' },
  { player: 'ケンドリー・パエス', age: 19, country: 'ECU', club: 'リバープレート', note: '南米屈指のタレント。エクアドル攻撃の核' },
]

export const groupOfDeath = {
  group: 'I',
  teams: ['フランス', 'ノルウェー', 'セネガル', 'イラク'],
  detail:
    'NBC Sports・Bleacher Reportが揃って指名する今大会の「死の組」。首位候補フランスに、ハーランド&ウーデゴール擁する28年ぶり出場のノルウェー、決勝T経験豊富なセネガルの3強が2枚の自動通過枠を争う。',
}
