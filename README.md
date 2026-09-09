# 我的饥荒模组 Wiki

中文版玩家攻略，版本基线 1.4.5。此页面按用户明确要求只提供中文版。

## 内容维护

- `app/wiki-data.ts`：章节与攻略内容。
- `app/page.tsx`：目录、章节筛选与阅读界面。
- `app/globals.css`：响应式排版。
- `public/items/atlas.png`：模组原有图标图集，使用 CSS 定位展示。

## 事实来源

源文件均位于本目录的上一级模组根目录。

- `modinfo.lua`：模组版本、默认配置。
- `modmain.lua`：实际启用模块，末影龙入口停用。
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

使用生成项目保留的 npm 锁文件。安装依赖后运行 `npm run dev` 预览，`npm run build` 构建。
不运行冒烟测试或模拟测试。页面内容是源码核对后的玩家指南，并未进行游戏实战验证。
