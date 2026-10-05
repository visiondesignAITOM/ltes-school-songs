# 播放器注音字型

原始檔：使用者提供 BpmfGenSenRounded.zip 中的 Regular 字重，未修改字型。
來源：https://github.com/ButTaiwan/bpmfvs
授權：SIL Open Font License 1.1；原始授權與 NOTICE 隨附。

播放器內嵌完整字型，不需要使用者另行安裝，未限制為目前兩首歌的字形子集。
漢字與注音由字型一起呈現，逐字高亮與大小切換一起作用。
readings.js 依現有歌詞注音及作者讀音表產生 IVS 選擇子，並驗證實際 TTF cmap 支援。
「伐 ㄈㄚˊ、攜 ㄒㄧㄝˊ、模 ㄇㄨˊ、築 ㄓㄨˋ」保留現有資料與獨立注音排版，不自行修改。
未建立對照的新字音及字型載入失敗時使用原有排版。

重新產生對照：下載作者 phonetic/phonic_table_Z.txt，執行
`node qa/build-bpmf-map.cjs /path/to/phonic_table_Z.txt`，檢查輸出再更新 readings.js。
