# 我的饥荒模组 Wiki

《我的饥荒》1.4.5 中文玩家攻略网站，采用《我的世界》物品栏风格。包含 10 个资料章节、关键词搜索、配方与附魔速查，支持手机阅读。

[打开在线 Wiki](https://zhouoneok-lab.github.io/MineStarve/) · [源码仓库](https://github.com/zhouoneok-lab/MineStarve)

网站通过 GitHub Pages 公开发布，所有人均可访问，无需登录。

## 内容维护

- `app/wiki-data.ts`：章节与攻略内容。
- `app/page.tsx`：目录、章节筛选与阅读界面。
- `app/globals.css`：响应式排版。
- `public/items/atlas.png`：模组原有图标图集，使用 CSS 定位展示。

## 事实来源

攻略依据原始模组的以下文件整理。这些 Lua 文件属于游戏模组，不包含在本网页源码仓库中；后续模组更新时需同步核对。

- `modinfo.lua`：模组版本、默认配置。
- `modmain.lua`：实际启用模块。
- `scripts/core_minecraft_inv_hud/data/tuning.lua`：配方、经验、附魔、图腾、奶桶、船、七咒数值。
- `scripts/core_minecraft_inv_hud/data/recipes.lua`：配方材料和科技条件。
- `scripts/mc_enchanting/definitions.lua`：附魔适用范围和互斥。
- `scripts/mc_enchanting/station_service.lua`：书架有效性、交互范围、附魔与砂轮结算。
- `scripts/mc_enchanting/transfer_rules.lua`：转移费用和合并规则。
- `scripts/mc_enchanting/offer_generator.lua`：书架能力、隐藏诅咒。
- `scripts/mc_enchanting/effect_hooks.lua`：采矿白名单与击杀经验。
- `scripts/components/mc_hostile_spawner.lua`：月相、每日额度、地穴与地表生成规则。
- `scripts/core_minecraft_inv_hud/data/hostiles_tuning.lua`、`creeper_tuning.lua`：怪物数值。
- `scripts/components/mc_seven_curses.lua`：绑定、灵魂层数、永燃条件与击杀治疗。
- `scripts/components/mc_totem_protection.lua`：图腾触发流程。
- `scripts/core_minecraft_inv_hud/features/totem_content.lua`：首次出生赠送与猪王兑换。
- `scripts/components/mc_milkable.lua`、`scripts/prefabs/milk_bucket.lua`：挤奶和饮用。
- `scripts/core_minecraft_inv_hud/features/rowboat_content.lua`：划船控制与箱船储物。

## 开发与构建

使用 Node.js 22.13 或更新版本，运行 `npm ci` 安装依赖。

- `npm run dev:pages`：本地预览。
- `npm run build:pages`：构建公开站点到 `docs/`。

更新内容后重新构建，将源码与 `docs/` 一起提交到 `main`。GitHub Pages 从 `main` 分支的 `/docs` 目录自动发布。网站资源路径使用 `/MineStarve/`，更换仓库名称时需同步修改 `.hosting/hosting.json`。`npm run dev`、`npm run build` 同样使用这份发布配置。


## 字体与资源

标题和界面使用 [Fusion Pixel Font](https://github.com/TakWolf/fusion-pixel-font) 2026.09.01 简体中文版本，按 SIL OFL 1.1 分发；授权及上游字体声明随文件保存在 public/fonts。正文保留系统字体以便长文阅读。物品图标沿用模组原有图集。
