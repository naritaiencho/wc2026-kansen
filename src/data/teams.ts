import type { Team } from './types'

// 全48出場国データ — 出典: FIFA公式、各国代表発表、各種報道(2026-06-12時点のリサーチに基づく)
// fifaRankは2026年6月時点の最新値(情報源により±1〜2の揺れあり)

export const teams: Team[] = [
  // ===== グループA =====
  {
    code: 'MEX', nameJa: 'メキシコ', nameEn: 'Mexico', flag: '🇲🇽', iso2: 'mx', group: 'A',
    fifaRank: 14, appearances: 18, bestResult: 'ベスト8(1970, 1986)', manager: 'ハビエル・アギーレ',
    star: { name: 'サンティアゴ・ヒメネス', position: 'FW', club: 'ACミラン', note: 'セリエAで戦うエースストライカー' },
    second: { name: 'エドソン・アルバレス', position: 'MF', club: 'フェネルバフチェ', note: '主将を務める潰し屋アンカー' },
    style: 'アギーレ流の現実的な堅守速攻と高い球際強度',
    funFact: '史上初の3度目のW杯開催国(1970, 1986, 2026)。17歳の天才ヒルベルト・モラ「メキシコのペドリ」にも注目。',
  },
  {
    code: 'RSA', nameJa: '南アフリカ', nameEn: 'South Africa', flag: '🇿🇦', iso2: 'za', group: 'A',
    fifaRank: 60, appearances: 4, bestResult: 'グループステージ', manager: 'ウーゴ・ブロース',
    star: { name: 'ロンウェン・ウィリアムズ', position: 'GK', club: 'マメロディ・サンダウンズ', note: '主将。PKストップの名手' },
    second: { name: 'ライル・フォスター', position: 'FW', club: 'バーンリー', note: 'プレミアで戦う点取り屋' },
    style: '若く運動量豊富な攻撃的ポゼッション',
    funFact: '予選で勝ち点3剥奪のハンデを背負いながら首位通過。自力出場は2002年以来。',
  },
  {
    code: 'KOR', nameJa: '韓国', nameEn: 'South Korea', flag: '🇰🇷', iso2: 'kr', group: 'A',
    fifaRank: 25, appearances: 12, bestResult: '4位(2002)', manager: 'ホン・ミョンボ',
    star: { name: 'ソン・フンミン', position: 'FW', club: 'ロサンゼルスFC', note: '主将。2025年にMLS移籍したアジアの至宝' },
    second: { name: 'イ・ガンイン', position: 'MF', club: 'パリ・サンジェルマン', note: '左足の技巧が光る創造主' },
    style: 'ソン・フンミンを軸とした高強度プレッシングと速攻',
    funFact: '1986年から11大会連続出場はアジア最長記録。2002年自国開催では4位とアジア勢最高成績。',
  },
  {
    code: 'CZE', nameJa: 'チェコ', nameEn: 'Czech Republic', flag: '🇨🇿', iso2: 'cz', group: 'A',
    fifaRank: 40, appearances: 10, bestResult: '準優勝(1934, 1962 ※チェコスロバキア)', manager: 'ミロスラフ・コウベク',
    star: { name: 'パトリク・シック', position: 'FW', club: 'レバークーゼン', note: '決定力抜群の長身エース' },
    second: { name: 'トマーシュ・ソウチェク', position: 'MF', club: 'ウェストハム', note: 'セットプレーで脅威の長身MF' },
    style: '堅牢な守備ブロックとセットプレーの勝負強さ',
    funFact: 'チェコ単独では2006年以来20年ぶり。プレーオフでアイルランド、デンマークを連続PK戦で撃破。',
  },

  // ===== グループB =====
  {
    code: 'CAN', nameJa: 'カナダ', nameEn: 'Canada', flag: '🇨🇦', iso2: 'ca', group: 'B',
    fifaRank: 30, appearances: 3, bestResult: 'グループステージ(1986, 2022)', manager: 'ジェシー・マーシュ',
    star: { name: 'アルフォンソ・デイヴィス', position: 'DF', club: 'バイエルン', note: '主将。世界最速級の左サイドバック' },
    second: { name: 'ジョナタン・デイヴィッド', position: 'FW', club: 'ユヴェントス', note: '代表歴代最多得点を更新中のエース' },
    style: 'マーシュ流ハイプレスと縦に速いダイレクト攻撃',
    funFact: '史上初の自国開催。デイヴィスはガーナの難民キャンプ生まれで2022年にカナダ史上初のW杯ゴール。',
  },
  {
    code: 'BIH', nameJa: 'ボスニア・ヘルツェゴビナ', nameEn: 'Bosnia and Herzegovina', flag: '🇧🇦', iso2: 'ba', group: 'B',
    fifaRank: 64, appearances: 2, bestResult: 'グループステージ(2014)', manager: 'セルゲイ・バルバレズ',
    star: { name: 'エディン・ジェコ', position: 'FW', club: 'シャルケ04', note: '40歳の代表歴代最多得点レジェンド' },
    second: { name: 'エルメディン・デミロビッチ', position: 'FW', club: 'シュトゥットガルト', note: 'ブンデスで活躍する万能型FW' },
    style: 'ジェコをターゲットにした堅守からの直線的攻撃',
    funFact: '12年ぶり2回目。プレーオフ決勝でイタリアをPK戦で撃破し、3大会連続予選敗退に追い込んだ張本人。',
  },
  {
    code: 'QAT', nameJa: 'カタール', nameEn: 'Qatar', flag: '🇶🇦', iso2: 'qa', group: 'B',
    fifaRank: 56, appearances: 2, bestResult: 'グループステージ(2022)', manager: 'フレン・ロペテギ',
    star: { name: 'アクラム・アフィフ', position: 'FW', club: 'アル・サッド', note: 'アジア最優秀選手に複数回輝いた司令塔' },
    second: { name: 'アルモエズ・アリ', position: 'FW', club: 'アル・ドゥハイル', note: '2019年アジア杯得点王' },
    style: 'ロペテギが植え付けるポゼッション志向',
    funFact: '予選を勝ち抜いてのW杯出場は今回が初(2022年は開催国枠)。アジアカップ2連覇の実力国。',
  },
  {
    code: 'SUI', nameJa: 'スイス', nameEn: 'Switzerland', flag: '🇨🇭', iso2: 'ch', group: 'B',
    fifaRank: 19, appearances: 13, bestResult: 'ベスト8(1934, 1938, 1954)', manager: 'ムラト・ヤキン',
    star: { name: 'グラニト・ジャカ', position: 'MF', club: 'サンダーランド', note: '主将。中盤を統率する精神的支柱' },
    second: { name: 'マヌエル・アカンジ', position: 'DF', club: 'インテル', note: 'ビルドアップに優れた世界屈指のCB' },
    style: '組織的で隙のない安定感抜群の試合運び',
    funFact: '6大会連続13回目。直近3大会すべてグループステージ突破の欧州屈指の安定勢力。',
  },

  // ===== グループC =====
  {
    code: 'BRA', nameJa: 'ブラジル', nameEn: 'Brazil', flag: '🇧🇷', iso2: 'br', group: 'C',
    fifaRank: 6, appearances: 23, bestResult: '優勝5回(1958-2002)', manager: 'カルロ・アンチェロッティ',
    star: { name: 'ヴィニシウス・ジュニオール', position: 'FW', club: 'レアル・マドリード', note: '世界最高峰のドリブラー' },
    second: { name: 'ハフィーニャ', position: 'FW', club: 'バルセロナ', note: '得点もアシストも量産する右ウイング' },
    style: 'アンチェロッティ流の現実主義に個の打開力を融合',
    funFact: '全23大会出場は世界唯一。ネイマール(34)が4大会目の復活選出。2002年以来24年ぶりの戴冠を狙う。',
  },
  {
    code: 'MAR', nameJa: 'モロッコ', nameEn: 'Morocco', flag: '🇲🇦', iso2: 'ma', group: 'C',
    fifaRank: 7, appearances: 7, bestResult: '4位(2022)', manager: 'モハメド・ワフビ',
    star: { name: 'アシュラフ・ハキミ', position: 'DF', club: 'パリ・サンジェルマン', note: '2025年アフリカ最優秀選手。世界最高の右SB' },
    second: { name: 'ブラヒム・ディアス', position: 'MF', club: 'レアル・マドリード', note: '技巧派アタッカー' },
    style: '鉄壁の守備組織からハキミの右サイドを起点とする速攻',
    funFact: '2022年にアフリカ勢初のベスト4。開幕3カ月前にレグラギ監督が辞任し、U-20W杯優勝監督のワフビが昇格。',
  },
  {
    code: 'HAI', nameJa: 'ハイチ', nameEn: 'Haiti', flag: '🇭🇹', iso2: 'ht', group: 'C',
    fifaRank: 83, appearances: 2, bestResult: 'グループステージ(1974)', manager: 'セバスティアン・ミニェ',
    star: { name: 'ダックンス・ナゾン', position: 'FW', club: 'エステグラル', note: '各国を渡り歩いたベテランのエースFW' },
    second: { name: 'ダンレー・ジャン・ジャック', position: 'MF', club: 'フィラデルフィア・ユニオン', note: '中盤の心臓' },
    style: '粘り強い守備ブロックからの高速カウンター',
    funFact: '52年ぶり2回目の出場。国内の治安危機で予選を一度も母国開催できず、キュラソーを「ホーム」に奇跡の突破。',
  },
  {
    code: 'SCO', nameJa: 'スコットランド', nameEn: 'Scotland', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', iso2: 'gb-sct', group: 'C',
    fifaRank: 42, appearances: 9, bestResult: 'グループステージ(突破経験なし)', manager: 'スティーヴ・クラーク',
    star: { name: 'スコット・マクトミネイ', position: 'MF', club: 'ナポリ', note: 'セリエA優勝&MVP。予選最終戦ではオーバーヘッド弾' },
    second: { name: 'アンドリュー・ロバートソン', position: 'DF', club: 'リバプール', note: '主将。世界トップクラスの左SB' },
    style: '堅い守備ブロックとセットプレー、終盤の勝負強さ',
    funFact: '28年ぶり9回目の出場。予選最終戦デンマーク戦はAT2発の劇的勝利。過去8回で一度もGS突破なし——今回こそ。',
  },

  // ===== グループD =====
  {
    code: 'USA', nameJa: 'アメリカ', nameEn: 'United States', flag: '🇺🇸', iso2: 'us', group: 'D',
    fifaRank: 17, appearances: 12, bestResult: '3位(1930)', manager: 'マウリシオ・ポチェッティーノ',
    star: { name: 'クリスティアン・プリシッチ', position: 'FW', club: 'ACミラン', note: '「キャプテン・アメリカ」の異名を持つ絶対的エース' },
    second: { name: 'ウェストン・マッケニー', position: 'MF', club: 'ユヴェントス', note: '万能性が武器のダイナミックな中盤' },
    style: 'ポチェッティーノ流ハイプレスと高インテンシティ',
    funFact: '1994年以来32年ぶりの自国開催(共催)。地元ベッターの賭け金はUSMNTに集中している。',
  },
  {
    code: 'PAR', nameJa: 'パラグアイ', nameEn: 'Paraguay', flag: '🇵🇾', iso2: 'py', group: 'D',
    fifaRank: 41, appearances: 9, bestResult: 'ベスト8(2010)', manager: 'グスタボ・アルファロ',
    star: { name: 'ミゲル・アルミロン', position: 'MF', club: 'アトランタ・ユナイテッド', note: '豊富な運動量と推進力の攻撃的MF' },
    second: { name: 'フリオ・エンシソ', position: 'FW', club: 'ストラスブール', note: '創造性あふれる若き技巧派' },
    style: 'アルファロ流の堅守と球際の強さの南米的サッカー',
    funFact: '16年ぶり9回目の出場。前回2010年は優勝国スペインに0-1と惜敗してのベスト8。',
  },
  {
    code: 'AUS', nameJa: 'オーストラリア', nameEn: 'Australia', flag: '🇦🇺', iso2: 'au', group: 'D',
    fifaRank: 27, appearances: 7, bestResult: 'ベスト16(2006, 2022)', manager: 'トニー・ポポヴィッチ',
    star: { name: 'ジャクソン・アーバイン', position: 'MF', club: 'ザンクトパウリ', note: '攻守に走り回る中盤のダイナモ' },
    second: { name: 'マシュー・ライアン', position: 'GK', club: 'レバンテ', note: '主将を務める歴戦の守護神' },
    style: '3バック基調の組織的守備と粘り強さ',
    funFact: '6大会連続7回目。2022年は2006年以来のベスト16入り。',
  },
  {
    code: 'TUR', nameJa: 'トルコ', nameEn: 'Türkiye', flag: '🇹🇷', iso2: 'tr', group: 'D',
    fifaRank: 22, appearances: 3, bestResult: '3位(2002)', manager: 'ヴィンチェンツォ・モンテッラ',
    star: { name: 'アルダ・ギュレル', position: 'MF', club: 'レアル・マドリード', note: '左足の魔術師と称される若きファンタジスタ' },
    second: { name: 'ハカン・チャルハノール', position: 'MF', club: 'インテル', note: '主将。精密なキックで試合を操る' },
    style: 'ギュレルとユルドゥズを軸にしたテクニカルな攻撃',
    funFact: '3位に輝いた2002年以来24年ぶりの出場。プレーオフ決勝でコソボを下して滑り込んだ。',
  },

  // ===== グループE =====
  {
    code: 'GER', nameJa: 'ドイツ', nameEn: 'Germany', flag: '🇩🇪', iso2: 'de', group: 'E',
    fifaRank: 10, appearances: 21, bestResult: '優勝4回(1954-2014)', manager: 'ユリアン・ナーゲルスマン',
    star: { name: 'ジャマル・ムシアラ', position: 'MF', club: 'バイエルン', note: '重傷から復帰した魔法のドリブラー' },
    second: { name: 'フロリアン・ヴィルツ', position: 'MF', club: 'リバプール', note: '創造性の塊である攻撃の中心' },
    style: 'ナーゲルスマン流の可変システムとポジショナルプレー',
    funFact: '2018年・2022年と2大会連続GS敗退の屈辱。3大会連続の悪夢回避が至上命題。',
  },
  {
    code: 'CUW', nameJa: 'キュラソー', nameEn: 'Curaçao', flag: '🇨🇼', iso2: 'cw', group: 'E',
    fifaRank: 82, appearances: 1, bestResult: '初出場', manager: 'ディック・アドフォカート',
    star: { name: 'レアンドロ・バクーナ', position: 'MF', club: 'ウードゥルFK', note: '主将。元アストン・ヴィラの万能型MF' },
    second: { name: 'タヒス・チョン', position: 'MF', club: 'シェフィールド・ユナイテッド', note: '元マンU育ちの技巧派' },
    style: 'オランダ仕込みのパスサッカー(選手の多くがオランダ育ち)',
    funFact: '人口約15.6万人、W杯史上最小の出場国。78歳アドフォカートは大会史上最高齢監督で、史上初めて3つの異なる国をW杯へ導いた。',
  },
  {
    code: 'CIV', nameJa: 'コートジボワール', nameEn: 'Ivory Coast', flag: '🇨🇮', iso2: 'ci', group: 'E',
    fifaRank: 33, appearances: 4, bestResult: 'グループステージ', manager: 'エメルス・ファエ',
    star: { name: 'アマド・ディアロ', position: 'FW', club: 'マンチェスター・ユナイテッド', note: '切れ味鋭いドリブルの右ウイング' },
    second: { name: 'フランク・ケシエ', position: 'MF', club: 'アル・アハリ', note: '主将。元ミランのパワフルな中盤' },
    style: '身体能力を活かしたカウンターとバランス重視の組織',
    funFact: '12年ぶり4回目。2024年自国開催アフリカ杯でGS敗退寸前から大逆転優勝。ドログバ世代も果たせなかったGS突破が悲願。',
  },
  {
    code: 'ECU', nameJa: 'エクアドル', nameEn: 'Ecuador', flag: '🇪🇨', iso2: 'ec', group: 'E',
    fifaRank: 23, appearances: 5, bestResult: 'ベスト16(2006)', manager: 'セバスティアン・ベッカセセ',
    star: { name: 'モイセス・カイセド', position: 'MF', club: 'チェルシー', note: '世界最高峰の守備的MF' },
    second: { name: 'ピエロ・インカピエ', position: 'DF', club: 'アーセナル', note: '対人戦の強さが光る左利きCB' },
    style: '南米予選屈指の堅守(18試合失点5)とカイセドの中盤支配',
    funFact: '勝ち点剥奪のハンデを背負いながら南米予選2位で突破。19歳の至宝ケンドリー・パエスにも注目。',
  },

  // ===== グループF =====
  {
    code: 'NED', nameJa: 'オランダ', nameEn: 'Netherlands', flag: '🇳🇱', iso2: 'nl', group: 'F',
    fifaRank: 8, appearances: 12, bestResult: '準優勝(1974, 1978, 2010)', manager: 'ロナルド・クーマン',
    star: { name: 'フィルジル・ファン・ダイク', position: 'DF', club: 'リバプール', note: '主将。世界最高のセンターバック' },
    second: { name: 'メンフィス・デパイ', position: 'FW', club: 'コリンチャンス', note: '代表歴代最多55得点のエース' },
    style: '伝統の4-3-3を基調としたクーマン流ポゼッション',
    funFact: '決勝進出3回はいずれも敗戦。「W杯を制したことのない最強国」の汚名返上を狙う。日本の初戦の相手。',
  },
  {
    code: 'JPN', nameJa: '日本', nameEn: 'Japan', flag: '🇯🇵', iso2: 'jp', group: 'F',
    fifaRank: 18, appearances: 8, bestResult: 'ベスト16(2002, 2010, 2018, 2022)', manager: '森保一',
    star: { name: '久保建英', position: 'MF', club: 'レアル・ソシエダ', note: '攻撃を牽引する日本のエース' },
    second: { name: '上田綺世', position: 'FW', club: 'フェイエノールト', note: 'エールディビジ得点王(25G)に輝いた点取り屋' },
    style: '3バックの可変システムによる組織的プレスと鋭い速攻',
    funFact: '8大会連続8回目。2025年3月に開催国以外で世界最速の出場権獲得。前回はドイツ・スペイン撃破。悲願の初ベスト8へ。',
  },
  {
    code: 'SWE', nameJa: 'スウェーデン', nameEn: 'Sweden', flag: '🇸🇪', iso2: 'se', group: 'F',
    fifaRank: 38, appearances: 13, bestResult: '準優勝(1958)', manager: 'グラハム・ポッター',
    star: { name: 'ビクトル・ギョケレシュ', position: 'FW', club: 'アーセナル', note: '今季プレミア21得点。圧倒的フィジカルの点取り屋' },
    second: { name: 'アレクサンデル・イサク', position: 'FW', club: 'リバプール', note: '英国記録£1.25億の男。骨折からの回復途上' },
    style: 'ポッター流可変システム+世界的2大ストライカーの縦に速い攻撃',
    funFact: '8年ぶり13回目。プレーオフ決勝でポーランドを3-2で破り土壇場で滑り込んだ「大会のダークホース」。',
  },
  {
    code: 'TUN', nameJa: 'チュニジア', nameEn: 'Tunisia', flag: '🇹🇳', iso2: 'tn', group: 'F',
    fifaRank: 45, appearances: 7, bestResult: 'グループステージ(突破経験なし)', manager: 'サブリ・ラムシ',
    star: { name: 'エリエス・スキリ', position: 'MF', club: 'フランクフルト', note: '主将・81キャップの中盤の支柱' },
    second: { name: 'ハンニバル・メジュブリ', position: 'MF', club: 'バーンリー', note: 'マンU育ちの最も危険な攻撃タレント' },
    style: '規律あるローブロックの堅守からのカウンター',
    funFact: 'CAF予選を22得点無失点で突破——W杯史上初の「予選無失点」。7回目の出場で初のGS突破を狙う。',
  },

  // ===== グループG =====
  {
    code: 'BEL', nameJa: 'ベルギー', nameEn: 'Belgium', flag: '🇧🇪', iso2: 'be', group: 'G',
    fifaRank: 9, appearances: 15, bestResult: '3位(2018)', manager: 'ルディ・ガルシア',
    star: { name: 'ケビン・デ・ブライネ', position: 'MF', club: 'ナポリ', note: '34歳ラストW杯。予選6得点と健在の世界最高級パサー' },
    second: { name: 'ジェレミー・ドク', position: 'FW', club: 'マンチェスター・シティ', note: '今季21ゴール関与。爆発的加速のウインガー' },
    style: 'タレント豊富な攻撃的ポゼッション',
    funFact: '黄金世代のラストダンス。デ・ブライネ、ルカクら最後の挑戦で2018年3位超えを狙う。',
  },
  {
    code: 'EGY', nameJa: 'エジプト', nameEn: 'Egypt', flag: '🇪🇬', iso2: 'eg', group: 'G',
    fifaRank: 29, appearances: 4, bestResult: 'グループステージ', manager: 'ホッサム・ハッサン',
    star: { name: 'モハメド・サラー', position: 'FW', club: 'リバプール', note: 'エジプトの至宝。今回が真の勝負の大会' },
    second: { name: 'オマル・マルムーシュ', position: 'FW', club: 'マンチェスター・シティ', note: 'サラーの相棒となる高速アタッカー' },
    style: 'サラーを軸にした堅守カウンター',
    funFact: '3大会ぶり4回目。実はW杯での勝利はまだゼロ——サラーと共に歴史的初勝利を狙う。',
  },
  {
    code: 'IRN', nameJa: 'イラン', nameEn: 'Iran', flag: '🇮🇷', iso2: 'ir', group: 'G',
    fifaRank: 20, appearances: 7, bestResult: 'グループステージ', manager: 'アミル・ガレノエイ',
    star: { name: 'メフディ・タレミ', position: 'FW', club: 'オリンピアコス', note: '101キャップ56得点の絶対的エース' },
    second: { name: 'アリレザ・ジャハンバフシュ', position: 'FW', club: 'デンデル', note: 'アジア人初の欧州主要リーグ得点王' },
    style: '堅守速攻とセットプレーの強さ',
    funFact: '4大会連続7回目だが過去6回すべてGS敗退。今大会は3位救済枠もあり史上最大のチャンス。',
  },
  {
    code: 'NZL', nameJa: 'ニュージーランド', nameEn: 'New Zealand', flag: '🇳🇿', iso2: 'nz', group: 'G',
    fifaRank: 85, appearances: 3, bestResult: 'グループステージ(2010年は3分無敗)', manager: 'ダレン・ベイズリー',
    star: { name: 'クリス・ウッド', position: 'FW', club: 'ノッティンガム・フォレスト', note: '34歳の主将。プレミア実績十分の長身FW' },
    second: { name: 'リベラート・カカーチェ', position: 'DF', club: 'レクサム', note: '攻守の鍵を握る欧州組SB' },
    style: 'ウッドへのロングボールと堅い守備ブロック',
    funFact: '2010年大会は3戦全引き分け「無敗のままGS敗退」という珍記録保持国。',
  },

  // ===== グループH =====
  {
    code: 'ESP', nameJa: 'スペイン', nameEn: 'Spain', flag: '🇪🇸', iso2: 'es', group: 'H',
    fifaRank: 2, appearances: 17, bestResult: '優勝(2010)', manager: 'ルイス・デ・ラ・フエンテ',
    star: { name: 'ラミン・ヤマル', position: 'FW', club: 'バルセロナ', note: '18歳の世界最高峰タレント。負傷明けで初戦欠場濃厚' },
    second: { name: 'ペドリ', position: 'MF', club: 'バルセロナ', note: '中盤の頭脳。ポゼッションの心臓部' },
    style: 'ポゼッション支配のティキタカ進化形',
    funFact: 'EURO2024王者にして優勝オッズ筆頭(+450)。2010年以来2度目の世界制覇へ。',
  },
  {
    code: 'CPV', nameJa: 'カーボベルデ', nameEn: 'Cape Verde', flag: '🇨🇻', iso2: 'cv', group: 'H',
    fifaRank: 67, appearances: 1, bestResult: '初出場', manager: 'ブビスタ',
    star: { name: 'ライアン・メンデス', position: 'FW', club: 'ウードゥルFK', note: '36歳主将。代表最多94キャップのレジェンド' },
    second: { name: 'ローガン・コスタ', position: 'DF', club: 'ビジャレアル', note: '欧州5大リーグ所属唯一の選手' },
    style: '堅守速攻の組織型カウンター',
    funFact: '人口約52万人の島国が初出場。アフリカ予選でカメルーンを抑えて首位通過した奇跡のストーリー。',
  },
  {
    code: 'KSA', nameJa: 'サウジアラビア', nameEn: 'Saudi Arabia', flag: '🇸🇦', iso2: 'sa', group: 'H',
    fifaRank: 61, appearances: 7, bestResult: 'ベスト16(1994)', manager: 'ゲオルギオス・ドニス',
    star: { name: 'サレム・アル・ドサリ', position: 'MF', club: 'アル・ヒラル', note: '主将。2022年に王者アルゼンチンから決勝点を奪った男' },
    second: { name: 'フィラス・アル・ブライカン', position: 'FW', club: 'アル・アハリ', note: '今予選チーム最多5得点' },
    style: '国内組中心の組織的カウンター',
    funFact: '開幕2カ月前にルナール監督を電撃解任してドニスを招聘。1994年以来のGS突破が悲願。',
  },
  {
    code: 'URU', nameJa: 'ウルグアイ', nameEn: 'Uruguay', flag: '🇺🇾', iso2: 'uy', group: 'H',
    fifaRank: 16, appearances: 15, bestResult: '優勝(1930, 1950)', manager: 'マルセロ・ビエルサ',
    star: { name: 'フェデリコ・バルベルデ', position: 'MF', club: 'レアル・マドリード', note: '今季20ゴール関与の万能エンジン' },
    second: { name: 'ダルウィン・ヌニェス', position: 'FW', club: 'アル・ヒラル', note: '1トップを担う点取り屋' },
    style: 'ビエルサ流ハイプレス&縦に速い攻撃',
    funFact: '初代王者(1930)。スアレス&カバーニが代表引退し、約20年ぶりに両雄不在で挑む新時代の大会。',
  },

  // ===== グループI =====
  {
    code: 'FRA', nameJa: 'フランス', nameEn: 'France', flag: '🇫🇷', iso2: 'fr', group: 'I',
    fifaRank: 1, appearances: 17, bestResult: '優勝(1998, 2018)', manager: 'ディディエ・デシャン',
    star: { name: 'キリアン・エムバペ', position: 'FW', club: 'レアル・マドリード', note: '主将。2022年決勝ハットの男が3大会連続の頂点を狙う' },
    second: { name: 'ウスマン・デンベレ', position: 'FW', club: 'パリ・サンジェルマン', note: '2025年バロンドール受賞者' },
    style: '個の質で圧倒する効率的カウンター',
    funFact: 'FIFAランク1位。デシャン監督は今大会限りで退任表明——3度目の優勝でラストを飾れるか。',
  },
  {
    code: 'SEN', nameJa: 'セネガル', nameEn: 'Senegal', flag: '🇸🇳', iso2: 'sn', group: 'I',
    fifaRank: 15, appearances: 4, bestResult: 'ベスト8(2002)', manager: 'パプ・チャウ',
    star: { name: 'サディオ・マネ', position: 'FW', club: 'アル・ナスル', note: '34歳・代表歴代最多53得点。大会後の代表引退を表明済み' },
    second: { name: 'イリマン・ンジャイ', position: 'FW', club: 'エバートン', note: 'プレミアで覚醒した新世代の旗手' },
    style: 'フィジカルとスピードのアスレチックサッカー',
    funFact: 'アフリカ最強級の黄金世代。2002年初出場でいきなりベスト8の再現を狙う。18歳ンバイェ(PSG)も切り札。',
  },
  {
    code: 'IRQ', nameJa: 'イラク', nameEn: 'Iraq', flag: '🇮🇶', iso2: 'iq', group: 'I',
    fifaRank: 57, appearances: 2, bestResult: 'グループステージ(1986)', manager: 'グレアム・アーノルド',
    star: { name: 'アイメン・フセイン', position: 'FW', club: 'アル・カルマ', note: '代表33得点の英雄。プレーオフで出場を決める決勝点' },
    second: { name: 'ジダン・イクバル', position: 'MF', club: 'ユトレヒト', note: 'マンU育ちの中盤の要' },
    style: '闘争心あふれる守備的インテンシティ',
    funFact: '1986年以来40年ぶり2回目。大陸間プレーオフを勝ち抜き、元豪州代表監督アーノルドの下で歴史的帰還。',
  },
  {
    code: 'NOR', nameJa: 'ノルウェー', nameEn: 'Norway', flag: '🇳🇴', iso2: 'no', group: 'I',
    fifaRank: 31, appearances: 4, bestResult: 'ベスト16(1998)', manager: 'スターレ・ソルバッケン',
    star: { name: 'アーリング・ハーランド', position: 'FW', club: 'マンチェスター・シティ', note: '欧州予選16ゴールの怪物、待望のW杯デビュー' },
    second: { name: 'マルティン・ウーデゴール', position: 'MF', club: 'アーセナル', note: '主将にして攻撃の設計者' },
    style: 'ハーランド最優先の電撃カウンター',
    funFact: '28年ぶり4回目の出場。予選でイタリアを2度撃破する完璧な戦いで首位通過。',
  },

  // ===== グループJ =====
  {
    code: 'ARG', nameJa: 'アルゼンチン', nameEn: 'Argentina', flag: '🇦🇷', iso2: 'ar', group: 'J',
    fifaRank: 3, appearances: 19, bestResult: '優勝(1978, 1986, 2022)', manager: 'リオネル・スカローニ',
    star: { name: 'リオネル・メッシ', position: 'FW', club: 'インテル・マイアミ', note: '38歳・史上初の6大会目。おそらくラストW杯' },
    second: { name: 'フリアン・アルバレス', position: 'FW', club: 'アトレティコ・マドリード', note: '2022年優勝の立役者から絶対的エース格へ' },
    style: 'スカローニ流の柔軟な試合運び',
    funFact: '前回王者。連覇すれば1962年ブラジル以来64年ぶりの偉業。',
  },
  {
    code: 'ALG', nameJa: 'アルジェリア', nameEn: 'Algeria', flag: '🇩🇿', iso2: 'dz', group: 'J',
    fifaRank: 28, appearances: 5, bestResult: 'ベスト16(2014)', manager: 'ウラディミール・ペトコビッチ',
    star: { name: 'リヤド・マフレズ', position: 'FW', club: 'アル・アハリ', note: '113キャップ38得点の主将。ラストW杯を公言' },
    second: { name: 'モハメド・アムラ', position: 'FW', club: 'ヴォルフスブルク', note: '予選10ゴールの俊足ストライカー' },
    style: 'マフレズを軸にしたテクニカルな攻撃',
    funFact: '12年ぶりの出場。ジダンの息子ルカ・ジダン(GK)がアルジェリア代表を選択して話題に。',
  },
  {
    code: 'AUT', nameJa: 'オーストリア', nameEn: 'Austria', flag: '🇦🇹', iso2: 'at', group: 'J',
    fifaRank: 24, appearances: 8, bestResult: '3位(1954)', manager: 'ラルフ・ラングニック',
    star: { name: 'ダビド・アラバ', position: 'DF', club: 'レアル・マドリード', note: '主将。CL4度制覇の精神的支柱' },
    second: { name: 'マルセル・ザビッツァー', position: 'MF', club: 'ドルトムント', note: 'ラングニックサッカーの体現者' },
    style: 'ラングニック流ゲーゲンプレス',
    funFact: '28年ぶりの出場。ラングニックはバイエルン監督就任を断ってまでこのチームを率いた。',
  },
  {
    code: 'JOR', nameJa: 'ヨルダン', nameEn: 'Jordan', flag: '🇯🇴', iso2: 'jo', group: 'J',
    fifaRank: 63, appearances: 1, bestResult: '初出場', manager: 'ジャマル・セラミ',
    star: { name: 'ムサ・アル・タアマリ', position: 'FW', club: 'レンヌ', note: '「ヨルダンのメッシ」。クラブで7得点11アシストの大黒柱' },
    second: { name: 'アリ・オルワン', position: 'FW', club: 'アル・サイリヤ', note: '予選9得点。ハットトリックで初出場を決めた英雄' },
    style: '堅守からタアマリの個で刺すカウンター',
    funFact: '初出場でいきなり前回王者アルゼンチン(=本物のメッシ)と同組という劇的な巡り合わせ。',
  },

  // ===== グループK =====
  {
    code: 'POR', nameJa: 'ポルトガル', nameEn: 'Portugal', flag: '🇵🇹', iso2: 'pt', group: 'K',
    fifaRank: 5, appearances: 9, bestResult: '3位(1966)', manager: 'ロベルト・マルティネス',
    star: { name: 'クリスティアーノ・ロナウド', position: 'FW', club: 'アル・ナスル', note: '41歳・史上初の6大会目。キャリア唯一欠けたタイトルへ' },
    second: { name: 'ヴィティーニャ', position: 'MF', club: 'パリ・サンジェルマン', note: 'CL王者PSGの中盤を操る真の心臓' },
    style: '中盤支配のポゼッション',
    funFact: 'ネーションズリーグ2025王者。ロナウド最後の大舞台に充実の中盤が揃った。',
  },
  {
    code: 'COD', nameJa: 'コンゴ民主共和国', nameEn: 'DR Congo', flag: '🇨🇩', iso2: 'cd', group: 'K',
    fifaRank: 46, appearances: 2, bestResult: 'グループステージ(1974 ※ザイール)', manager: 'セバスティアン・デサーブル',
    star: { name: 'ヨアン・ウィサ', position: 'FW', club: 'ニューカッスル', note: 'プレミアで活躍する「レオパルズ」最大の危険人物' },
    second: { name: 'セドリック・バカンブ', position: 'FW', club: 'レアル・ベティス', note: '代表21得点のベテラン' },
    style: 'フィジカルの強さを活かした堅守速攻',
    funFact: '1974年のザイール以来52年ぶり2回目。大陸間プレーオフを勝ち抜いた劇的な復活。ワン・ビサカらプレミア組も。',
  },
  {
    code: 'UZB', nameJa: 'ウズベキスタン', nameEn: 'Uzbekistan', flag: '🇺🇿', iso2: 'uz', group: 'K',
    fifaRank: 50, appearances: 1, bestResult: '初出場', manager: 'ファビオ・カンナバーロ',
    star: { name: 'アブドゥコディル・フサノフ', position: 'DF', club: 'マンチェスター・シティ', note: '22歳CB。ウズベキスタン人初のプレミアリーガー' },
    second: { name: 'エルドール・ショムロドフ', position: 'FW', club: 'バシャクシェヒル', note: '主将で代表歴代最多44得点' },
    style: 'カンナバーロ仕込みの堅守',
    funFact: '中央アジア初のW杯出場国。監督は2006年W杯優勝主将のカンナバーロという胸熱の組み合わせ。',
  },
  {
    code: 'COL', nameJa: 'コロンビア', nameEn: 'Colombia', flag: '🇨🇴', iso2: 'co', group: 'K',
    fifaRank: 13, appearances: 7, bestResult: 'ベスト8(2014)', manager: 'ネストル・ロレンソ',
    star: { name: 'ルイス・ディアス', position: 'FW', club: 'バイエルン', note: '左サイドの魔術師。攻撃の生命線' },
    second: { name: 'ハメス・ロドリゲス', position: 'MF', club: 'ミネソタ・ユナイテッド', note: '2014年大会得点王が34歳で帰還' },
    style: '左サイド偏重の華麗なアタック',
    funFact: '2大会ぶりの出場。2014年得点王ハメスと現エースのディアス、新旧スターの共演。',
  },

  // ===== グループL =====
  {
    code: 'ENG', nameJa: 'イングランド', nameEn: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', iso2: 'gb-eng', group: 'L',
    fifaRank: 4, appearances: 17, bestResult: '優勝(1966)', manager: 'トーマス・トゥヘル',
    star: { name: 'ハリー・ケイン', position: 'FW', club: 'バイエルン', note: '主将・代表歴代最多得点。今季公式戦61得点の怪物シーズン' },
    second: { name: 'ジュード・ベリンガム', position: 'MF', club: 'レアル・マドリード', note: '世界最高峰の万能MF' },
    style: 'トゥヘル流の実利的ポゼッション',
    funFact: 'W杯でイングランドを率いるのがドイツ人監督という歴史的皮肉。1966年以来60年ぶりの優勝へ。',
  },
  {
    code: 'CRO', nameJa: 'クロアチア', nameEn: 'Croatia', flag: '🇭🇷', iso2: 'hr', group: 'L',
    fifaRank: 11, appearances: 7, bestResult: '準優勝(2018)', manager: 'ズラトコ・ダリッチ',
    star: { name: 'ルカ・モドリッチ', position: 'MF', club: 'ACミラン', note: '40歳・5大会目。代表196キャップの生ける伝説' },
    second: { name: 'ヨシュコ・グバルディオル', position: 'DF', club: 'マンチェスター・シティ', note: '世界最高額級のDF' },
    style: '中盤の支配力と大会での勝負強さ',
    funFact: '人口約380万人ながら直近2大会で準優勝・3位という大会巧者。',
  },
  {
    code: 'GHA', nameJa: 'ガーナ', nameEn: 'Ghana', flag: '🇬🇭', iso2: 'gh', group: 'L',
    fifaRank: 73, appearances: 5, bestResult: 'ベスト8(2010)', manager: 'カルロス・ケイロス',
    star: { name: 'アントワーヌ・セメンヨ', position: 'FW', club: 'マンチェスター・シティ', note: '2026年1月に£6250万でシティ移籍の爆発的ウインガー' },
    second: { name: 'イニャキ・ウィリアムズ', position: 'FW', club: 'アスレティック・ビルバオ', note: 'スペインではなくガーナを選んだ強力FW' },
    style: '縦に速いアスレチックな攻撃',
    funFact: 'エースのクドゥス(トッテナム)が負傷で落選の衝撃。2010年「スアレスのハンド」の悲劇のリベンジへ。',
  },
  {
    code: 'PAN', nameJa: 'パナマ', nameEn: 'Panama', flag: '🇵🇦', iso2: 'pa', group: 'L',
    fifaRank: 34, appearances: 2, bestResult: 'グループステージ(2018)', manager: 'トーマス・クリスチャンセン',
    star: { name: 'アダルベルト・カラスキージャ', position: 'MF', club: 'プマスUNAM', note: '2023年ゴールドカップMVPの創造的エンジン' },
    second: { name: 'アミル・ムリージョ', position: 'DF', club: 'ベシクタシュ', note: '2018年大会も経験した右SB' },
    style: '組織的な堅守と素早い切り替え',
    funFact: '2回目の出場で、初出場の2018年と同じくまたもイングランドと同組(前回は1-6)。W杯初勝利が悲願。',
  },
]

export const teamMap: Record<string, Team> = Object.fromEntries(teams.map((t) => [t.code, t]))

export const teamName = (code: string): string => teamMap[code]?.nameJa ?? code

export const groupList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']

export const teamsByGroup = (group: string): Team[] => teams.filter((t) => t.group === group)

/** flagcdn.com のSVG国旗URL(Windows環境でも確実に表示) */
export const flagUrl = (code: string, width: 80 | 160 = 80): string => {
  const iso2 = teamMap[code]?.iso2
  return iso2 ? `https://flagcdn.com/w${width}/${iso2}.png` : ''
}
