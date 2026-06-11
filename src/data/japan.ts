// 日本代表データ — 出典: JFA公式(2026-05-15発表の最終メンバー)、各種報道(2026-06-12時点)

export interface SquadPlayer {
  num: number
  name: string
  pos: 'GK' | 'DF' | 'MF' | 'FW'
  club: string
  age: number
  note?: string
}

export const japanStaff = {
  manager: '森保一',
  note: '2022年カタール大会に続き2大会連続指揮。日本は8大会連続8回目のW杯出場。',
  coaches: ['名波浩', '齊藤俊秀', '中村俊輔', '前田遼一', '長谷部誠'],
  captain: '板倉滉',
}

/** 6/11-12発表の最新ニュース */
export const japanBreaking = {
  date: '2026-06-12',
  title: '【速報】主将・遠藤航が負傷離脱 — 町野修斗を追加招集、新キャプテンは板倉滉',
  body: '左足のケガの状態が回復せず、遠藤航(リバプール)のW杯不出場が6/11に決定。本人は今活動をもっての代表引退も表明した。代替として町野修斗(ボルシアMG)が2大会連続の追加招集となり、背番号6を引き継ぐ。新主将には板倉滉が就任。',
}

export const japanSquad: SquadPlayer[] = [
  { num: 1, name: '鈴木彩艶', pos: 'GK', club: 'パルマ(伊)', age: 23, note: 'セリエAで正GKとしてフル稼働' },
  { num: 12, name: '大迫敬介', pos: 'GK', club: 'サンフレッチェ広島', age: 26 },
  { num: 23, name: '早川友基', pos: 'GK', club: '鹿島アントラーズ', age: 27 },
  { num: 2, name: '菅原由勢', pos: 'DF', club: 'ヴェルダー・ブレーメン(独)', age: 25 },
  { num: 3, name: '谷口彰悟', pos: 'DF', club: 'シント＝トロイデン(白)', age: 34 },
  { num: 4, name: '板倉滉', pos: 'DF', club: 'アヤックス(蘭)', age: 29, note: '新キャプテン。最終ラインの要' },
  { num: 5, name: '長友佑都', pos: 'DF', club: 'FC東京', age: 39, note: '日本最多の5大会連続選出' },
  { num: 16, name: '渡辺剛', pos: 'DF', club: 'フェイエノールト(蘭)', age: 29 },
  { num: 20, name: '瀬古歩夢', pos: 'DF', club: 'ル・アーヴル(仏)', age: 26 },
  { num: 21, name: '伊藤洋輝', pos: 'DF', club: 'バイエルン・ミュンヘン(独)', age: 27 },
  { num: 22, name: '冨安健洋', pos: 'DF', club: 'アヤックス(蘭)', age: 27, note: 'コンディションと相談しながらの起用か' },
  { num: 25, name: '鈴木淳之介', pos: 'DF', club: 'FCコペンハーゲン(丁)', age: 22 },
  { num: 6, name: '町野修斗', pos: 'FW', club: 'ボルシアMG(独)', age: 26, note: '遠藤航の離脱を受け2大会連続の追加招集。背番号6を継承' },
  { num: 7, name: '田中碧', pos: 'MF', club: 'リーズ・ユナイテッド(英)', age: 27 },
  { num: 8, name: '久保建英', pos: 'MF', club: 'レアル・ソシエダ(西)', age: 25, note: '攻撃の創造主。ラ・リーガ2G4A' },
  { num: 10, name: '堂安律', pos: 'MF', club: 'フランクフルト(独)', age: 27, note: 'ブンデス移籍1年目から主力定着' },
  { num: 13, name: '中村敬斗', pos: 'MF', club: 'スタッド・ランス(仏)', age: 25, note: '三笘不在の左サイドを担う' },
  { num: 14, name: '伊東純也', pos: 'MF', club: 'KRCヘンク(白)', age: 33 },
  { num: 15, name: '鎌田大地', pos: 'MF', club: 'クリスタル・パレス(英)', age: 29 },
  { num: 17, name: '鈴木唯人', pos: 'MF', club: 'フライブルク(独)', age: 24 },
  { num: 24, name: '佐野海舟', pos: 'MF', club: 'マインツ05(独)', age: 25, note: 'ボール奪取力はブンデス屈指' },
  { num: 9, name: '後藤啓介', pos: 'FW', club: 'シント＝トロイデン(白)', age: 21 },
  { num: 11, name: '前田大然', pos: 'FW', club: 'セルティック(蘇)', age: 28, note: 'スプリント能力は世界級' },
  { num: 18, name: '上田綺世', pos: 'FW', club: 'フェイエノールト(蘭)', age: 27, note: 'エールディビジ得点王(25G)。日本のエース' },
  { num: 19, name: '小川航基', pos: 'FW', club: 'NECナイメヘン(蘭)', age: 28 },
  { num: 26, name: '塩貝健人', pos: 'FW', club: 'ヴォルフスブルク(独)', age: 21, note: '滑り込みでW杯初選出' },
]

export const japanAbsentees = [
  { name: '遠藤航', club: 'リバプール(英)', reason: '左足負傷により6/11離脱が決定。今活動をもって代表引退を表明' },
  { name: '三笘薫', club: 'ブライトン(英)', reason: '直前の負傷により選外' },
  { name: '南野拓実', club: 'モナコ(仏)', reason: '負傷により選外' },
  { name: '守田英正', club: 'スポルティング(葡)', reason: 'メンバー選外' },
]

export interface OpponentInfo {
  code: string
  nameJa: string
  fifaRank: string
  manager: string
  style: string
  keyPlayers: { name: string; club: string; note: string }[]
  h2h: string
  absences?: string
}

export const opponents: OpponentInfo[] = [
  {
    code: 'NED',
    nameJa: 'オランダ',
    fifaRank: '7位',
    manager: 'ロナルド・クーマン',
    style: '4-3-3基調のポゼッション+プレミア仕込みのフィジカル。26人中15人がプレミアリーグ所属。',
    keyPlayers: [
      { name: 'メンフィス・デパイ', club: 'コリンチャンス', note: '代表通算55得点はオランダ歴代最多' },
      { name: 'コーディ・ガクポ', club: 'リバプール', note: '今季プレミア7G5A' },
      { name: 'フィルジル・ファン・ダイク', club: 'リバプール', note: '世界最高峰CB。最終ラインの統率者' },
      { name: 'フレンキー・デ・ヨング', club: 'バルセロナ', note: '中盤の心臓' },
      { name: 'デンゼル・ダンフリース', club: 'インテル', note: '右サイドの破壊者' },
    ],
    h2h: '日本の0勝1分2敗(2010年W杯では0-1、スナイデルに決勝点を許した)',
    absences: 'シャビ・シモンズ(ACL断裂)、ユリエン・ティンバー、フリンポンが負傷欠場 — オランダの創造性は低下中',
  },
  {
    code: 'TUN',
    nameJa: 'チュニジア',
    fifaRank: '44位',
    manager: 'サブリ・ラムシ',
    style: '規律あるコンパクトなローブロック+カウンター。CAF予選を10戦9勝1分・22得点無失点というW杯史上初の「予選無失点」で突破。',
    keyPlayers: [
      { name: 'エリエス・スキリ', club: 'フランクフルト', note: '主将・81キャップ。守備の盾' },
      { name: 'ハンニバル・メジュブリ', club: 'バーンリー', note: 'マンU育ちの最も危険な攻撃タレント' },
      { name: 'モンタサル・タルビ', club: 'ロリアン', note: '鉄壁守備のリーダー' },
    ],
    h2h: '日本の5勝1敗。ただし直近の2022年キリンカップでは0-3完敗 — 雪辱戦でもある',
  },
  {
    code: 'SWE',
    nameJa: 'スウェーデン',
    fifaRank: '38位',
    manager: 'グラハム・ポッター',
    style: '3バック/4バックを使い分ける可変システム+強力2トップ。プレーオフでウクライナ・ポーランドを撃破した「大会のダークホース」。',
    keyPlayers: [
      { name: 'アレクサンデル・イサク', club: 'リバプール', note: '英国記録£1.25億の男。骨折からの回復途上が不安要素' },
      { name: 'ビクトル・ギョケレシュ', club: 'アーセナル', note: '今季プレミア21得点。アーセナル得点王' },
      { name: 'ビクトル・リンデロフ', club: '—', note: '守備の経験値' },
    ],
    h2h: '日本の1勝2分2敗。初対戦は1936年ベルリン五輪3-2「ベルリンの奇跡」。2002年以来24年ぶりの対戦',
  },
]

export interface JapanMatchPlan {
  matchId: number
  vs: string
  dateLabel: string
  watchLabel: string
  broadcast: string
  keyMatchups: string[]
  tacticalPoint: string
}

export const japanMatchPlans: JapanMatchPlan[] = [
  {
    matchId: 10,
    vs: 'オランダ',
    dateLabel: '6/15(月) 5:00 キックオフ',
    watchLabel: '月曜早朝5時 — 4:30起きで朝活観戦。試合後そのまま出勤コース',
    broadcast: 'NHK総合 + DAZN無料配信',
    keyMatchups: [
      '中村敬斗(左WB) vs ダンフリース — 三笘不在の左サイドは中村の攻撃力が試合の天秤',
      '佐野海舟・鎌田 vs デ・ヨング&グラフェンベルフ — 中盤の主導権争いがすべての起点',
      '上田綺世 vs ファン・ダイク — エールディビジ得点王がプレミア最高CBに挑む大会屈指の矛盾対決',
      '3バック(板倉・渡辺・伊藤洋輝) vs デパイ&ガクポ — 歴代最多得点者を封じられるか',
    ],
    tacticalPoint:
      'ボール奪取後の速攻と最終ライン裏のスペース攻略が勝機。シモンズ・ティンバー不在でオランダの創造性は低下しており、識者の勝率予想は日本22.6%/引分32.3%/オランダ45.2%——十分に番狂わせ圏内。',
  },
  {
    matchId: 36,
    vs: 'チュニジア',
    dateLabel: '6/21(日) 13:00 キックオフ',
    watchLabel: '日曜昼13時 — 家族そろってリビング観戦のゴールデンタイム',
    broadcast: '日テレ系(10:25〜) + NHK BS + DAZN無料配信',
    keyMatchups: [
      '久保・堂安の崩し vs 予選無失点のローブロック — 引いた相手をこじ開ける「日本の積年の課題」',
      '佐野・田中碧 vs スキリ&メジュブリ — カウンターの起点潰しが生命線(遠藤不在の中盤の真価が問われる)',
      'セットプレー×上田の高さ — 密集守備攻略の現実解',
    ],
    tacticalPoint:
      'W杯通算1000試合目のメモリアルマッチ。勝ち点計算上、事実上のmust-win。モンテレイの暑さ・標高も考慮し、前田大然ら走力のある交代カードの使い方が鍵。',
  },
  {
    matchId: 57,
    vs: 'スウェーデン',
    dateLabel: '6/26(金) 8:00 キックオフ',
    watchLabel: '金曜朝8時 — 在宅勤務切替orフレックス出社で完走可能',
    broadcast: 'NHK総合 + DAZN無料配信',
    keyMatchups: [
      '板倉・渡辺・冨安 vs イサク&ギョケレシュ — プレミア21得点男と£1.25億の男の2トップを分断せよ',
      '森保 vs ポッター — 可変システム同士の采配チェス',
      '谷口・伊藤洋輝の対人守備 — 高さで上回られるセットプレーが最大リスク',
    ],
    tacticalPoint:
      '首位通過を懸けた大一番になる公算大。イサクのコンディション次第で脅威度が大きく変動。第2戦までの結果次第では引き分けOKの試合運びも選択肢。',
  },
]

export const japanHistory = {
  appearances: '8大会連続8回目(1998年フランス大会から)',
  best: 'ベスト16が4回(2002年・2010年・2018年・2022年)',
  last: '2022年カタール大会はドイツ・スペインを撃破してE組首位通過。ラウンド16でクロアチアにPK戦で敗退、「新しい景色(ベスト8)」に届かず。',
  goal: '今大会の目標は史上初のベスト8超え。',
}

export const breakthroughScenarios = [
  '【ルール】各組上位2チーム(24)+12組の3位のうち成績上位8チーム=計32チームがラウンド32進出。3位でも十分チャンスあり。',
  '【理想形】オランダ戦で勝ち点1以上 → チュニジア戦勝利 → スウェーデン戦引き分け以上で首位通過も視野。',
  '【現実ライン】チュニジア・スウェーデンに連勝すれば勝ち点6で、オランダ戦の結果に関係なくほぼ2位以内が確定。',
  '【3位救済ライン】勝ち点4(1勝1分)なら3位でも上位8チーム入りが濃厚。勝ち点3でも得失点差次第で残る可能性(※48チーム制初開催のため推定)。',
  '【ブックメーカー評価】突破オッズはオランダ−125、日本+275、スウェーデン+500、チュニジア+1200。日本は2番手評価。',
  '【決勝Tの相手】F組1位はC組(ブラジル/モロッコ/スコットランド/ハイチ)2位と、F組2位はC組1位と対戦予定。',
]
