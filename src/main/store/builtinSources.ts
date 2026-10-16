// src/main/store/builtinSources.ts
// ★★★ 2026-10-17（用户要求「把旧版内置源加入新版」）：首次启动且无任何源时注入的默认配置 ★★★
// 5 个苹果 CMS 采集站（与旧版 tvbox-desktop 同款，实测可用）+ 用户直播订阅。
// 仅当用户没有任何源（全新安装 / 空配置）时注入一次；用户导入自己的订阅后以用户配置为准。
import type { SourceBean } from '../../shared/types';

/** 内置点播源（旧版 tvbox-desktop 同款 5 站，type=1 = cms-json） */
export const BUILTIN_SOURCES: SourceBean[] = [
  {
    key: 'ffzy',
    name: '非凡资源',
    type: 1,
    api: 'http://cj.ffzyapi.com/api.php/provide/vod',
    searchable: 1,
    quickSearch: 1,
    changeable: 1,
    filterable: 1,
    playUrl: '',
    ext: '',
    jar: '',
    playerType: -1,
    categories: null,
    timeout: 0,
    click: '',
    style: '',
  },
  {
    key: 'liangzi',
    name: '量子资源',
    type: 1,
    api: 'http://cj.lziapi.com/api.php/provide/vod',
    searchable: 1,
    quickSearch: 1,
    changeable: 1,
    filterable: 1,
    playUrl: '',
    ext: '',
    jar: '',
    playerType: -1,
    categories: null,
    timeout: 0,
    click: '',
    style: '',
  },
  {
    key: 'dytt',
    name: '电影天堂',
    type: 1,
    api: 'http://caiji.dyttzyapi.com/api.php/provide/vod',
    searchable: 1,
    quickSearch: 1,
    changeable: 1,
    filterable: 1,
    playUrl: '',
    ext: '',
    jar: '',
    playerType: -1,
    categories: null,
    timeout: 0,
    click: '',
    style: '',
  },
  {
    key: 'hongniu',
    name: '红牛资源',
    type: 1,
    api: 'http://www.hongniuzy2.com/api.php/provide/vod',
    searchable: 1,
    quickSearch: 1,
    changeable: 1,
    filterable: 1,
    playUrl: '',
    ext: '',
    jar: '',
    playerType: -1,
    categories: null,
    timeout: 0,
    click: '',
    style: '',
  },
  {
    key: 'zy360',
    name: '360资源',
    type: 1,
    api: 'http://360zy.com/api.php/provide/vod',
    searchable: 1,
    quickSearch: 1,
    changeable: 1,
    filterable: 1,
    playUrl: '',
    ext: '',
    jar: '',
    playerType: -1,
    categories: null,
    timeout: 0,
    click: '',
    style: '',
  },
];

/**
 * 内置直播订阅说明：
 *   旧版用的 live.zbds.top/tv/iptv4.txt 实测已返回空内容（2026-10-17 检验），
 *   公开直播源衰减极快，内置一个会过期的 URL 反而误导。故**直播不内置远程订阅**——
 *   应用自带本地 TXT/M3U 导入（配置页 → 直播 → 导入），用户可导入任意自有直播文件。
 *   如需开机即有直播，把直播文件放到 安装目录/data/ 下再在配置页导入即可。
 */
