// 歌詞由原始注音 PDF 逐頁轉錄。每個可同步字／英文詞都有 start / end 欄位；
// 未經 MP3 聽讀校對的時間一律保留 null，不以平均分配冒充正式同步。

function createLyricLine(label, text, readings, { sourcePage, start = null, end = null, wordTimings = [] } = {}) {
  const zhuyin = readings.trim() ? readings.trim().split(/\s+/u) : [];
  const tokens = text.match(/[A-Za-z]+|[\u3400-\u9fff]|./gu) || [];
  let readingIndex = 0;
  let timedIndex = 0;
  const words = tokens.map((token) => {
    const isChinese = /[\u3400-\u9fff]/u.test(token);
    const isTimed = isChinese || /[A-Za-z]/u.test(token);
    const timing = isTimed ? wordTimings[timedIndex++] : null;
    return {
      text: token,
      zhuyin: isChinese ? zhuyin[readingIndex++] : '',
      start: timing?.start ?? null,
      end: timing?.end ?? null,
    };
  });

  if (readingIndex !== zhuyin.length || words.some((word) => /[\u3400-\u9fff]/u.test(word.text) && !word.zhuyin)) {
    throw new Error(`歌詞與注音數量不一致：${text}`);
  }

  return { label, sourcePage, start, end, words };
}

const soulLyrics = [
  createLyricLine('Verse 1', '每日書包一背，學習從不停歇，', 'ㄇㄟˇ ㄖˋ ㄕㄨ ㄅㄠ ㄧˋ ㄅㄟˋ ㄒㄩㄝˊ ㄒㄧˊ ㄘㄨㄥˊ ㄅㄨˋ ㄊㄧㄥˊ ㄒㄧㄝ', { sourcePage: 1 }),
  createLyricLine('Verse 1', '思考的翅膀每天起飛，不怕問題我們面對。', 'ㄙ ㄎㄠˇ ㄉㄜ˙ ㄔˋ ㄅㄤˇ ㄇㄟˇ ㄊㄧㄢ ㄑㄧˇ ㄈㄟ ㄅㄨˋ ㄆㄚˋ ㄨㄣˋ ㄊㄧˊ ㄨㄛˇ ㄇㄣ˙ ㄇㄧㄢˋ ㄉㄨㄟˋ', { sourcePage: 1 }),
  createLyricLine('Verse 1', '創意無邊，從不設限，', 'ㄔㄨㄤˋ ㄧˋ ㄨˊ ㄅㄧㄢ ㄘㄨㄥˊ ㄅㄨˋ ㄕㄜˋ ㄒㄧㄢˋ', { sourcePage: 1 }),
  createLyricLine('Verse 1', '藍田精神就像火焰蔓延，', 'ㄌㄢˊ ㄊㄧㄢˊ ㄐㄧㄥ ㄕㄣˊ ㄐㄧㄡˋ ㄒㄧㄤˋ ㄏㄨㄛˇ ㄧㄢˋ ㄇㄢˋ ㄧㄢˊ', { sourcePage: 1 }),
  createLyricLine('Verse 1', '就要一路燒到可探索的知識邊界。', 'ㄐㄧㄡˋ ㄧㄠˋ ㄧˊ ㄌㄨˋ ㄕㄠ ㄉㄠˋ ㄎㄜˇ ㄊㄢˋ ㄙㄨㄛˇ ㄉㄜ˙ ㄓ ㄕˋ ㄅㄧㄢ ㄐㄧㄝˋ', { sourcePage: 1 }),
  createLyricLine('Verse 2', '哲學的眼、藝術的手、永續的魂、語言稱首，', 'ㄓㄜˊ ㄒㄩㄝˊ ㄉㄜ˙ ㄧㄢˇ ㄧˋ ㄕㄨˋ ㄉㄜ˙ ㄕㄡˇ ㄩㄥˇ ㄒㄩˋ ㄉㄜ˙ ㄏㄨㄣˊ ㄩˇ ㄧㄢˊ ㄔㄥ ㄕㄡˇ', { sourcePage: 1 }),
  createLyricLine('Verse 2', '每個小腦袋都有多重宇宙，未來新秀！', 'ㄇㄟˇ ㄍㄜˋ ㄒㄧㄠˇ ㄋㄠˇ ㄉㄞˋ ㄉㄡ ㄧㄡˇ ㄉㄨㄛ ㄔㄨㄥˊ ㄩˇ ㄓㄡˋ ㄨㄟˋ ㄌㄞˊ ㄒㄧㄣ ㄒㄧㄡˋ', { sourcePage: 1 }),
  createLyricLine('Verse 2', '科技在走、思維要有、教育深根、放眼全球，', 'ㄎㄜ ㄐㄧˋ ㄗㄞˋ ㄗㄡˇ ㄙ ㄨㄟˊ ㄧㄠˋ ㄧㄡˇ ㄐㄧㄠˋ ㄩˋ ㄕㄣ ㄍㄣ ㄈㄤˋ ㄧㄢˇ ㄑㄩㄢˊ ㄑㄧㄡˊ', { sourcePage: 1 }),
  createLyricLine('Verse 2', '智慧足、品德優、有自信、求卓越，', 'ㄓˋ ㄏㄨㄟˋ ㄗㄨˊ ㄆㄧㄣˇ ㄉㄜˊ ㄧㄡ ㄧㄡˇ ㄗˋ ㄒㄧㄣˋ ㄑㄧㄡˊ ㄓㄨㄛˊ ㄩㄝˋ', { sourcePage: 1 }),
  createLyricLine('Verse 2', '藍田學子總是一路開頭。', 'ㄌㄢˊ ㄊㄧㄢˊ ㄒㄩㄝˊ ㄗˇ ㄗㄨㄥˇ ㄕˋ ㄧ ㄌㄨˋ ㄎㄞ ㄊㄡˊ', { sourcePage: 1 }),
  createLyricLine('Hook', '藍田 bright glow', 'ㄌㄢˊ ㄊㄧㄢˊ', { sourcePage: 1 }),
  createLyricLine('Hook', '藍田 藍田 bright glow', 'ㄌㄢˊ ㄊㄧㄢˊ ㄌㄢˊ ㄊㄧㄢˊ', { sourcePage: 1 }),
  createLyricLine('Hook', '就是要給懶惰蟲 棒喝當頭！', 'ㄐㄧㄡˋ ㄕˋ ㄧㄠˋ ㄍㄟˇ ㄌㄢˇ ㄉㄨㄛˋ ㄔㄨㄥˊ ㄅㄤˋ ㄏㄜˋ ㄉㄤ ㄊㄡˊ', { sourcePage: 1 }),
  createLyricLine('Hook', '藍田 pure soul', 'ㄌㄢˊ ㄊㄧㄢˊ', { sourcePage: 1 }),
  createLyricLine('Hook', '藍田 藍田 pure soul', 'ㄌㄢˊ ㄊㄧㄢˊ ㄌㄢˊ ㄊㄧㄢˊ', { sourcePage: 1 }),
  createLyricLine('Hook', '藍田學子、品格榜首、歷久彌新、永垂不朽！', 'ㄌㄢˊ ㄊㄧㄢˊ ㄒㄩㄝˊ ㄗˇ ㄆㄧㄣˇ ㄍㄜˊ ㄅㄤˇ ㄕㄡˇ ㄌㄧˋ ㄐㄧㄡˇ ㄇㄧˊ ㄒㄧㄣ ㄩㄥˇ ㄔㄨㄟˊ ㄅㄨˋ ㄒㄧㄡˇ', { sourcePage: 1 }),
  createLyricLine('Pre-Chorus', '我是夢想家，執行力好到家，', 'ㄨㄛˇ ㄕˋ ㄇㄥˋ ㄒㄧㄤˇ ㄐㄧㄚ ㄓˊ ㄒㄧㄥˊ ㄌㄧˋ ㄏㄠˇ ㄉㄠˋ ㄐㄧㄚ', { sourcePage: 2 }),
  createLyricLine('Pre-Chorus', '學會思考、學會欣賞、眼看未來、腳踩當下。', 'ㄒㄩㄝˊ ㄏㄨㄟˋ ㄙ ㄎㄠˇ ㄒㄩㄝˊ ㄏㄨㄟˋ ㄒㄧㄣ ㄕㄤˇ ㄧㄢˇ ㄎㄢˋ ㄨㄟˋ ㄌㄞˊ ㄐㄧㄠˇ ㄘㄞˇ ㄉㄤ ㄒㄧㄚˋ', { sourcePage: 2 }),
  createLyricLine('Pre-Chorus', '眼神有光，步伐不慌，', 'ㄧㄢˇ ㄕㄣˊ ㄧㄡˇ ㄍㄨㄤ ㄅㄨˋ ㄈㄚˊ ㄅㄨˋ ㄏㄨㄤ', { sourcePage: 2 }),
  createLyricLine('Pre-Chorus', '勇敢認錯，擁有太平洋的肩膀，', 'ㄩㄥˇ ㄍㄢˇ ㄖㄣˋ ㄘㄨㄛˋ ㄩㄥˇ ㄧㄡˇ ㄊㄞˋ ㄆㄧㄥˊ ㄧㄤˊ ㄉㄜ˙ ㄐㄧㄢ ㄅㄤˇ', { sourcePage: 2 }),
  createLyricLine('Pre-Chorus', '永不逃避，責任自己扛！', 'ㄩㄥˇ ㄅㄨˋ ㄊㄠˊ ㄅㄧˋ ㄗㄜˊ ㄖㄣˋ ㄗˋ ㄐㄧˇ ㄎㄤˊ', { sourcePage: 2 }),
  createLyricLine('Pre-Chorus', 'Sustainable 土地永續綠意 藍田勇敢 Solo；', 'ㄊㄨˇ ㄉㄧˋ ㄩㄥˇ ㄒㄩˋ ㄌㄩˋ ㄧˋ ㄌㄢˊ ㄊㄧㄢˊ ㄩㄥˇ ㄍㄢˇ', { sourcePage: 2 }),
  createLyricLine('Pre-Chorus', 'Technology 科技創新 便利生活 成為未來新秀；', 'ㄎㄜ ㄐㄧˋ ㄔㄨㄤˋ ㄒㄧㄣ ㄅㄧㄢˋ ㄌㄧˋ ㄕㄥ ㄏㄨㄛˊ ㄔㄥˊ ㄨㄟˊ ㄨㄟˋ ㄌㄞˊ ㄒㄧㄣ ㄒㄧㄡˋ', { sourcePage: 2 }),
  createLyricLine('Pre-Chorus', 'English 都會通 自信有禮世界一把握在手，', 'ㄉㄨ ㄏㄨㄟˋ ㄊㄨㄥ ㄗˋ ㄒㄧㄣˋ ㄧㄡˇ ㄌㄧˇ ㄕˋ ㄐㄧㄝˋ ㄧ ㄅㄚˇ ㄨㄛˋ ㄗㄞˋ ㄕㄡˇ', { sourcePage: 2 }),
  createLyricLine('Pre-Chorus', 'Philosophy 思緒活 探索真理藍田學子有把握！', 'ㄙ ㄒㄩˋ ㄏㄨㄛˊ ㄊㄢˋ ㄙㄨㄛˇ ㄓㄣ ㄌㄧˇ ㄌㄢˊ ㄊㄧㄢˊ ㄒㄩㄝˊ ㄗˇ ㄧㄡˇ ㄅㄚˇ ㄨㄛˋ', { sourcePage: 2 }),
  createLyricLine('Hook', '藍田 STEP Show', 'ㄌㄢˊ ㄊㄧㄢˊ', { sourcePage: 2 }),
  createLyricLine('Hook', '藍田 藍田 STEP Show', 'ㄌㄢˊ ㄊㄧㄢˊ ㄌㄢˊ ㄊㄧㄢˊ', { sourcePage: 2 }),
  createLyricLine('Hook', '永續、科技、語言、哲學，', 'ㄩㄥˇ ㄒㄩˋ ㄎㄜ ㄐㄧˋ ㄩˇ ㄧㄢˊ ㄓㄜˊ ㄒㄩㄝˊ', { sourcePage: 2 }),
  createLyricLine('Hook', '讓困難對我俯伏稱首，', 'ㄖㄤˋ ㄎㄨㄣˋ ㄋㄢˊ ㄉㄨㄟˋ ㄨㄛˇ ㄈㄨˇ ㄈㄨˊ ㄔㄥ ㄕㄡˇ', { sourcePage: 2 }),
  createLyricLine('Hook', '藍田 pure soul', 'ㄌㄢˊ ㄊㄧㄢˊ', { sourcePage: 2 }),
  createLyricLine('Hook', '藍田 藍田 pure soul', 'ㄌㄢˊ ㄊㄧㄢˊ ㄌㄢˊ ㄊㄧㄢˊ', { sourcePage: 2 }),
  createLyricLine('Hook', '藍田學子、品格榜首、歷久彌新、永垂不朽！', 'ㄌㄢˊ ㄊㄧㄢˊ ㄒㄩㄝˊ ㄗˇ ㄆㄧㄣˇ ㄍㄜˊ ㄅㄤˇ ㄕㄡˇ ㄌㄧˋ ㄐㄧㄡˇ ㄇㄧˊ ㄒㄧㄣ ㄩㄥˇ ㄔㄨㄟˊ ㄅㄨˋ ㄒㄧㄡˇ', { sourcePage: 2 }),
];

const lightLyrics = [
  createLyricLine('Verse', '樂學的心 在晨光中閃耀', 'ㄌㄜˋ ㄒㄩㄝˊ ㄉㄜ˙ ㄒㄧㄣ ㄗㄞˋ ㄔㄣˊ ㄍㄨㄤ ㄓㄨㄥ ㄕㄢˇ ㄧㄠˋ', { sourcePage: 1 }),
  createLyricLine('Verse', '熱情的夢乘著希望飛高', 'ㄖㄜˋ ㄑㄧㄥˊ ㄉㄜ˙ ㄇㄥˋ ㄔㄥˊ ㄓㄜ˙ ㄒㄧ ㄨㄤˋ ㄈㄟ ㄍㄠ', { sourcePage: 1 }),
  createLyricLine('Verse', '勇往直前 挑戰冒險心跳', 'ㄩㄥˇ ㄨㄤˇ ㄓˊ ㄑㄧㄢˊ ㄊㄧㄠˇ ㄓㄢˋ ㄇㄠˋ ㄒㄧㄢˇ ㄒㄧㄣ ㄊㄧㄠˋ', { sourcePage: 1 }),
  createLyricLine('Verse', '一筆一劃描出智慧的記號', 'ㄧˋ ㄅㄧˇ ㄧˊ ㄏㄨㄚˋ ㄇㄧㄠˊ ㄔㄨ ㄓˋ ㄏㄨㄟˋ ㄉㄜ˙ ㄐㄧˋ ㄏㄠˋ', { sourcePage: 1 }),
  createLyricLine('Verse', '藍田信念朝著夢想起跑', 'ㄌㄢˊ ㄊㄧㄢˊ ㄒㄧㄣˋ ㄋㄧㄢˋ ㄔㄠˊ ㄓㄜ˙ ㄇㄥˋ ㄒㄧㄤˇ ㄑㄧˇ ㄆㄠˇ', { sourcePage: 1 }),
  createLyricLine('Verse', '每次跨越極限 都是一次自我的擁抱', 'ㄇㄟˇ ㄘˋ ㄎㄨㄚˋ ㄩㄝˋ ㄐㄧˊ ㄒㄧㄢˋ ㄉㄡ ㄕˋ ㄧˊ ㄘˋ ㄗˋ ㄨㄛˇ ㄉㄜ˙ ㄩㄥˇ ㄅㄠˋ', { sourcePage: 1 }),
  createLyricLine('Verse', '幸福洋溢 我們一起攜手創造', 'ㄒㄧㄥˋ ㄈㄨˊ ㄧㄤˊ ㄧˋ ㄨㄛˇ ㄇㄣ˙ ㄧ ㄑㄧˇ ㄒㄧ ㄕㄡˇ ㄔㄨㄤˋ ㄗㄠˋ', { sourcePage: 1 }),
  createLyricLine('Chorus', '在藍田心裡灑下夢的光', 'ㄗㄞˋ ㄌㄢˊ ㄊㄧㄢˊ ㄒㄧㄣ ㄌㄧˇ ㄙㄚˇ ㄒㄧㄚˋ ㄇㄥˋ ㄉㄜ˙ ㄍㄨㄤ', { sourcePage: 1 }),
  createLyricLine('Chorus', '種下一顆希望開出未來模樣', 'ㄓㄨㄥˋ ㄒㄧㄚˋ ㄧˋ ㄎㄜ ㄒㄧ ㄨㄤˋ ㄎㄞ ㄔㄨ ㄨㄟˋ ㄌㄞˊ ㄇㄛˊ ㄧㄤˋ', { sourcePage: 1 }),
  createLyricLine('Chorus', '科技永續的力量', 'ㄎㄜ ㄐㄧˋ ㄩㄥˇ ㄒㄩˋ ㄉㄜ˙ ㄌㄧˋ ㄌㄧㄤˋ', { sourcePage: 1 }),
  createLyricLine('Chorus', '藍田一步步走向 把世界都點亮', 'ㄌㄢˊ ㄊㄧㄢˊ ㄧˊ ㄅㄨˋ ㄅㄨˋ ㄗㄡˇ ㄒㄧㄤˋ ㄅㄚˇ ㄕˋ ㄐㄧㄝˋ ㄉㄡ ㄉㄧㄢˇ ㄌㄧㄤˋ', { sourcePage: 1 }),
  createLyricLine('Chorus', '自主學習 自在飛翔', 'ㄗˋ ㄓㄨˇ ㄒㄩㄝˊ ㄒㄧˊ ㄗˋ ㄗㄞˋ ㄈㄟ ㄒㄧㄤˊ', { sourcePage: 1 }),
  createLyricLine('Chorus', '揚著自信的風笑著起航', 'ㄧㄤˊ ㄓㄜ˙ ㄗˋ ㄒㄧㄣˋ ㄉㄜ˙ ㄈㄥ ㄒㄧㄠˋ ㄓㄜ˙ ㄑㄧˇ ㄏㄤˊ', { sourcePage: 1 }),
  createLyricLine('Chorus', '在藍田心裡灑下夢的光', 'ㄗㄞˋ ㄌㄢˊ ㄊㄧㄢˊ ㄒㄧㄣ ㄌㄧˇ ㄙㄚˇ ㄒㄧㄚˋ ㄇㄥˋ ㄉㄜ˙ ㄍㄨㄤ', { sourcePage: '1-2' }),
  createLyricLine('Chorus', '種下一顆希望開出未來模樣', 'ㄓㄨㄥˋ ㄒㄧㄚˋ ㄧˋ ㄎㄜ ㄒㄧ ㄨㄤˋ ㄎㄞ ㄔㄨ ㄨㄟˋ ㄌㄞˊ ㄇㄛˊ ㄧㄤˋ', { sourcePage: 2 }),
  createLyricLine('Bridge', '哲學的思量 與藝術的想像', 'ㄓㄜˊ ㄒㄩㄝˊ ㄉㄜ˙ ㄙ ㄌㄧㄤˊ ㄩˇ ㄧˋ ㄕㄨˋ ㄉㄜ˙ ㄒㄧㄤˇ ㄒㄧㄤˋ', { sourcePage: 2 }),
  createLyricLine('Bridge', '在我心中畫出築夢天堂', 'ㄗㄞˋ ㄨㄛˇ ㄒㄧㄣ ㄓㄨㄥ ㄏㄨㄚˋ ㄔㄨ ㄓㄨˊ ㄇㄥˋ ㄊㄧㄢ ㄊㄤˊ', { sourcePage: 2 }),
  createLyricLine('Outro', '創新的路 藍田就走在前方', 'ㄔㄨㄤˋ ㄒㄧㄣ ㄉㄜ˙ ㄌㄨˋ ㄌㄢˊ ㄊㄧㄢˊ ㄐㄧㄡˋ ㄗㄡˇ ㄗㄞˋ ㄑㄧㄢˊ ㄈㄤ', { sourcePage: 2 }),
];

window.ltesSongs = [
  {
    id: 'ltes-soul', title: '藍田 Soul', description: '跟著藍田精神一路探索',
    audio: './music/ltes-soul/audio/藍田 Soul.mp3',
    lyricsSource: './music/ltes-soul/lyrics/藍田 Soul 注音版.pdf',
    durationLabel: '2:11', symbol: '✦', contentStatus: 'source-complete', timingStatus: 'unverified', lyrics: soulLyrics,
  },
  {
    id: 'ltes-light', title: '藍田的光', description: '把希望與勇氣唱進每一步',
    audio: './music/ltes-light/audio/藍田的光.mp3',
    lyricsSource: './music/ltes-light/lyrics/藍田的光 注音版.pdf',
    durationLabel: '2:37', symbol: '☼', contentStatus: 'source-complete', timingStatus: 'unverified', lyrics: lightLyrics,
  },
];
