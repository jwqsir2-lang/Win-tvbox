// src/renderer/lib/themeTokens.ts
// 主题「值层」：纯数据 + 纯函数，**不碰 DOM/window**（便于单测与引擎侧引用）。
// 四套皮肤：`netflix`（网飝，**默认**）/ `bilibili`（哔哔）/ `apple`（大果）/ `douban`（大豆）。
// ★ 2026-10-09（用户要求「皮肤不要叫豆风，叫大豆；风格重新修改，大改」）：`douban` 展示名改「大豆」，
//   视觉整体重做 —— **Material 3 Expressive × 豆瓣**（豆绿 #2E9629 主色 / 暖纸白底 / 大圆角 /
//   弹性动效），参考开源设计语言：Material 3 Expressive、豆瓣 App 新版、Arc/Linear 的层级光影。
// ★ 2026-10-08（用户要求「照参考图做一套外观」）：新增 `douban`（当时名「豆风」，Material You 靛蓝版）。
// ★ 2026-09-30（用户定稿）：`netflix`（网飝）/ `bilibili`（哔哔）/ `apple`（大果）。
// ★ 2026-09-30（用户要求）：删除两个经典主题（dark/light）—— 不再可选，旧存档值一律回落默认皮肤。
// DOM 应用逻辑见 ./theme.ts（applyTheme / currentTheme / useTheme）。
export type Theme = 'netflix' | 'bilibili' | 'apple' | 'douban';

/** ★ 2026-10-17（用户要求「每个主题设计两种深浅色系」）：外观明暗模式 ——
 *   每个皮肤都有 深/浅 两套配色（CSS 覆盖层 `[data-mode]`），按主题×明暗自由组合。 */
export type ThemeMode = 'dark' | 'light';

/** 默认皮肤（首次启动 / 值非法时使用） */
export const DEFAULT_THEME: Theme = 'netflix';

/** ★ 明暗模式默认值（键值非法时）：与第一版皮肤观感对齐 —— 网飝深色、哔哔/大果/大豆浅色 */
export const DEFAULT_MODE: ThemeMode = 'dark';

/** 各主题的**本色**明暗（用户没选过明暗时随主题走，换皮肤不丢失明暗偏好以外的观感） */
export const THEME_DEFAULT_MODE: Record<Theme, ThemeMode> = {
  netflix: 'dark',
  bilibili: 'light',
  apple: 'light',
  douban: 'light',
};

/** 主题展示名（设置页按此渲染切换项） */
export const THEME_LABELS: Record<Theme, string> = {
  netflix: '🎬 网飝',
  bilibili: '📺 哔哔',
  apple: '🍎 大果',
  douban: '🫘 大豆',
};

/** 明暗模式展示名（设置页按此渲染切换项） */
export const THEME_MODE_LABELS: Record<ThemeMode, string> = {
  dark: '🌙 深色',
  light: '☀️ 浅色',
};

/** 任意值 → 合法主题（非法/空/旧值 → 默认皮肤网飝） */
export function normalizeTheme(v: unknown): Theme {
  return v === 'netflix' || v === 'bilibili' || v === 'apple' || v === 'douban' ? v : DEFAULT_THEME;
}

/** 任意值 → 合法明暗模式（非法 → 深色） */
export function normalizeMode(v: unknown): ThemeMode {
  return v === 'dark' || v === 'light' ? v : DEFAULT_MODE;
}