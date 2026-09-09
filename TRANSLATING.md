# 翻译 Wiki / Translating the Wiki

阅读无需登录。翻译使用 GitHub 账号提交，由唐小可审核、合并后自动发布。

Reading is public. Sign in to GitHub to submit translations. Tangxiaoke reviews and merges them before publication.

## 添加一种语言 / Add a language

1. 打开 Wiki 的“添加翻译”，输入语言代码，例如 `ja`、`fr`、`de`、`pt-BR`、`zh-Hant`。
2. 选择一个章节，点击“查看英文原文”。复制文档内容作为翻译底稿；也可以参考 `content/` 中的简体中文原文。
3. 点击“登录后创建或编辑译文”。其他编辑者首次编辑按提示 Fork 仓库；仓库所有者无需 Fork，直接编辑。
4. 用完整译文替换草稿中的 `TRANSLATION_DRAFT`。保留一级标题、单段简介和正文结构，文件名不要改。
5. 保存修改并创建 Pull Request。唐小可审核、合并后，语言菜单会自动加入此语言。

1. Open Add a translation and enter a language code, such as `ja`, `fr`, `de`, `pt-BR` or `zh-Hant`.
2. Choose a chapter and open Read English source. Copy the document as your starting point. Simplified Chinese originals are also available in `content/`.
3. Choose Create or edit translation with GitHub. Contributors fork the repository if prompted; repository owners edit directly without forking.
4. Replace all `TRANSLATION_DRAFT` placeholders with the translated document. Keep a level-one title, a one-paragraph introduction and the body, separated by blank lines. Keep the filename unchanged.
5. Save and create a pull request. After Tangxiaoke reviews and merges it, the language appears in the menu automatically.

## 目录与回退 / Files and fallbacks

- 简体中文原文：`content/01-inventory.md` 等文件。
- English baseline: `content/translations/en/01-inventory.md` and the other nine chapters.
- 新译文 / New translation: `content/translations/<language-code>/<original-filename>.md`.
- 语言代码使用规范大小写，如 `pt-BR`、`zh-Hant`，同一种语言不要重复建目录。
- Use canonical language-code casing, such as `pt-BR` and `zh-Hant`. Do not create duplicate folders for the same language.
- 可以逐章翻译。缺少译文的章节显示英文，并标记尚未翻译。
- Translate one chapter at a time. Missing chapters use English and display a fallback notice.
- 链接可用 `?lang=ja#recipes` 指定语言与章节；语言只有审核后才进入菜单。
- Share links such as `?lang=ja#recipes`. Languages appear in the menu only after approval.

## 翻译界面 / Translate the interface

在对应语言目录中添加 `ui.json`，参考 `app/locales/en.json` 的键名，只填写已翻译的字段即可。保持 `{count}`、`{total}`、`{query}` 等占位符不变。简体中文界面在 `app/locales/zh-CN.json` 中维护。中文语言使用中文界面，其他语言缺失的字段回退英文。

Add `ui.json` to the language folder, using the keys in `app/locales/en.json`. Include only the fields you have translated. Preserve placeholders such as `{count}`, `{total}` and `{query}`. Chinese locales use Chinese interface defaults; other locales fall back to English for missing interface fields.

## 审核 / Review

翻译和普通编辑使用同一审核流程，不能绕过审核直接更新网站。新增提交会使之前的批准失效，需要重新审核。不要提交空草稿，也不要在翻译中擅自修改玩法数值。

Translations follow the same review process as other edits. They cannot publish directly. New commits dismiss earlier approvals and need another review. Do not submit placeholder drafts or change gameplay values while translating.
