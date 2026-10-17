// src/renderer/lib/theme.ts
// 主题：四套 —— `netflix`（网飝，**默认**）/ `bilibili`（哔哔）/ `apple`（大果）/ `douban`（豆风）。
// 选择持久化到 localStorage，并同步到 `<html data-theme>` + `<html data-mode>`，驱动 global.css + netflix.css/bilibili.css/apple.css/douban.css 的 CSS 变量。
// 同时通过 IPC 通知主进程设置 nativeTheme.themeSource（按**明暗模式**处理），让窗口底色对齐。
import { useEffect, useState } from 'react';
import { client } from '../api/client';
import {
  DEFAULT_MODE,
  DEFAULT_THEME,
  THEME_DEFAULT_MODE,
  normalizeMode,
  normalizeTheme,
  type Theme,
  type ThemeMode,
} from './themeTokens';

export type { Theme, ThemeMode };
const KEY = 'winbox-theme';
/** ★ 2026-10-17（用户要求「每个主题两种深浅」）：明暗模式独立持久化键 */
const MODE_KEY = 'winbox-theme-mode';
/** 主题切换广播事件（App 据此切换「侧边栏 / Netflix 顶部导航」布局） */
export const THEME_EVENT = 'winbox:theme-changed';

/** 当前主题（从 DOM 读取，本地持久化后的最终生效值）。 */
export function currentTheme(): Theme {
  return normalizeTheme(document.documentElement.getAttribute('data-theme'));
}

/**
 * 当前明暗模式：优先 DOM 上的 `data-mode`（applyTheme 写入）；
 * 没有时回落到**该主题的本色**（老存档首次升级：观感与换肤前一致）。
 */
export function currentMode(): ThemeMode {
  const attr = document.documentElement.getAttribute('data-mode');
  if (attr === 'dark' || attr === 'light') return attr;
  return THEME_DEFAULT_MODE[currentTheme()];
}

/** 当前是否 Netflix 皮肤（布局/组件按此分支） */
export function isNetflix(): boolean {
  return currentTheme() === 'netflix';
}

/** 应用主题：设置 DOM 属性 + 写入 localStorage + 通知主进程对齐原生主题 + 广播给 React。 */
export function applyTheme(t: Theme, mode?: ThemeMode) {
  const theme = normalizeTheme(t);
  // ★ 明暗：给了用给的；没给 = 保持当前（换皮肤不改变明暗偏好）；当前也没有 → 用该主题本色
  const m =
    mode !== undefined
      ? normalizeMode(mode)
      : (() => {
          const cur = currentMode();
          return cur === 'dark' || cur === 'light' ? cur : THEME_DEFAULT_MODE[theme];
        })();
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.setAttribute('data-mode', m);
  try {
    localStorage.setItem(KEY, theme);
    localStorage.setItem(MODE_KEY, m);
  } catch {
    /* ignore */
  }
  // 主进程只需知道亮/暗（按明暗模式，而非按皮肤名）
  void client.setTheme(m === 'light' ? 'light' : 'dark').catch(() => undefined);
  try {
    window.dispatchEvent(new Event(THEME_EVENT));
  } catch {
    /* ignore */
  }
}

/** 初始化：读持久化偏好并应用（在 React 挂载前调用，避免白屏闪烁）。 */
export function initTheme(): Theme {
  let t: Theme = DEFAULT_THEME;
  let m: ThemeMode = DEFAULT_MODE;
  try {
    t = normalizeTheme(localStorage.getItem(KEY));
    m = normalizeMode(localStorage.getItem(MODE_KEY));
  } catch {
    /* ignore */
  }
  // ★ 存档没存过明暗（老版本升级）→ 用该主题本色，观感与升级前一致
  if (!localStorage.getItem(MODE_KEY)) m = THEME_DEFAULT_MODE[t];
  applyTheme(t, m);
  return t;
}

/** React Hook：订阅当前主题（设置页切换后，App 布局立即跟着变） */
export function useTheme(): Theme {
  const [theme, setTheme] = useState<Theme>(() => currentTheme());
  useEffect(() => {
    const onChange = (): void => setTheme(currentTheme());
    window.addEventListener(THEME_EVENT, onChange);
    return () => window.removeEventListener(THEME_EVENT, onChange);
  }, []);
  return theme;
}

/** ★ React Hook：订阅当前明暗模式（设置页切换深浅后立即重渲染） */
export function useThemeMode(): ThemeMode {
  const [mode, setMode] = useState<ThemeMode>(() => currentMode());
  useEffect(() => {
    const onChange = (): void => setMode(currentMode());
    window.addEventListener(THEME_EVENT, onChange);
    return () => window.removeEventListener(THEME_EVENT, onChange);
  }, []);
  return mode;
}