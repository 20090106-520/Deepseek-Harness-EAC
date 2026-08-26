# Deepseek Harness EAC（揽尽万象 · Embr
acing All Creation）

把 [@deepseek-ai/dsh]
(https://www.npmjs.com/package/@deepseek-ai/d
sh)（DeepSeek Harness）封装成开箱即�
�的 Windows 桌面客户端。

- ✅ **免�
��装 Node**：内置独立的 Node 运行时
与 npm CLI，目标机器无需安装 Node.j
s
- ✅ **内置 dsh CLI**：完整打包 `@d
eepseek-ai/dsh` 及其全部插件，离线�
�用
- ✅ **一键启动**：双击即启动
 `dsh web`，自动挑空闲端口，就绪�
�加载到原生窗口（stdout 就绪行与 
HTTP 探测并行判定，首启装依赖自�
��放宽时限）
- ✅ **风格化无边框�
��口**：无原生标题栏/菜单栏，自�
�� 36px 玻璃栏（圆角图标 + 拖拽 + �
�� 菜单 + 窗口控制），Win11 原生圆
角；快捷键 Ctrl+R / F12 / F11 保留
- �
�� **多窗口（v4）**：会话头部「弹
出到独立窗口」分屏多任务；侧边
临时会话浮窗追问（Ctrl+Shift+S，不
写主会话）
- ✅ **系统托盘常驻**�
��点关闭默认隐藏到托盘（可关闭�
��，托盘菜单提供显示/检查更新/�
�启 Web 服务/退出
- ✅ **退出即清�
�**：退出应用有界等待 dsh 进程树�
��正退出（优雅 → 强杀），不留�
�儿进程（v4 根治「退出残留一对�
�程」）
- ✅ **便携版**：`portable` �
��数据（日志、配置）跟随 exe 所�
�目录，拷到 U 盘就能用
- ✅ **与 C
LI 共享配置**：默认沿用 dsh 自身�
� `DSH_HOME`（通常是 `~\.dsh`），已有
会话/API Key 直接生效
- ✅ **跟随官
方更新**：官方 @deepseek-ai/dsh 发新�
��时弹窗提醒，经用户同意后自动�
��载安装，重启生效，失败自动保�
��旧版
- ✅ **客户端自更新 + SHA-256
 校验（v4）**：自动检查上游仓库�
��GitHub→Gitee 双源，Gitee 分片自动�
��并）发布的封装新版本，经用户�
��意后下载（完成内容 SHA-256 校验�
��不一致中止替换并删除文件）、�
��换、重启；便携版/安装版各自适
配
- ✅ **快捷方式自动维护**：按�
��目标 exe」识别既有快捷方式（用
户改名/换图标不再重复新建），�
�定义图标绝不覆盖；⋯ 菜单可关�
��桌面快捷方式自动维护
- ✅ **Deep
Seek 余额小部件**：对话底部统计�
�内联显示「本轮 ¥X.XX · 余额 ¥Y.Y
Y」（自动注入配套 dsh 客户端插件
，点击跳转充值）
- ✅ **文件更改
追踪 + 一键还原 + AI 变更审核（v4�
��**：详情面板「文件」标签页聚�
�本会话改动（行级 diff、逐文件或
全部还原）；「AI 变更审核」可手
动/自动让模型复查自己刚做的改�
�（正确性/安全性/目标一致性）
- 
✅ **会话删除与归档管理（v4）**�
�会话行菜单「删除对话」+ 设置内
归档恢复/删除面板（官方只有归�
�，运行时补丁幂等打通全链路）
-
 ✅ **微信 ClawBot / OpenClaw 桥（v4）*
*：设置页「ClawBot」栏扫码绑定微�
��官方 ClawBot 小程序，微信里直接�
��动常驻 DSH 会话（每用户独立会�
�/工作区/白名单）；OpenAI 兼容端�
�供 OpenClaw 网关接入
- ✅ **会话完�
��系统通知**：agent 任务跑完时弹 W
indows 系统通知，点击回到窗口
- �
� **界面皮肤**：设置页「皮肤」标
签页内置 10 款 Web UI 皮肤（9 款 dsh
-web-ui 皮肤 + 1 款深海女仆工坊）�
�互斥切换、默认不启用、重启生�
�；随包标注出处与许可（详见「�
�面皮肤」章节）
- ✅ **内置社区�
�件套件**（v2.0 起，详见「内置社�
��插件」章节）：插件市场 / 外置�
��觉模型 / 长期记忆 / soul.md 人设�
� / 移动端适配修复，全部随包分�
�、开箱即用
- ✅ **崩溃急救与撤�
�（v4，dsh-undo-savepoint）**：配置与�
��件代码树快照、undo/redo、一键安�
��模式、密钥脱敏 vault —— 配置�
�坏、dsh 起不来也能救
- ✅ **插件�
��停管理（v4）**：设置页「插件 �
� 管理」不重启切换任意插件启停�
��含默认禁用的大肥鱼桌宠）
- ✅ 
**一键迁移（一键夺舍）**：设置�
�选择任意已有 AI 工具目录（如 Cod
ex / Claude 安装目录）→ 自动新建�
�作区与对话 → 发送迁移指令，AI 
在对话中全程可视化提取 skills / MC
P 配置 / 长期记忆
- ✅ **错误日志�
��键复制（v4.1）**：启动失败 / DSH 
服务停止的报错弹窗带「复制日志
」按钮，一键复制完整诊断信息（
错误、堆栈、日志目录、最近日志
尾部）供反馈
- ✅ **应用内反馈入
口（v4.1）**：⋯ 菜单与托盘「反�
�建议…」直达 GitHub Issues，关于弹
窗附交流群号
- ✅ **拖文件进对话
（v4.1，dsh-file-drop）**：把本地文�
�直接拖进对话输入框 —— 文本/�
�码自动注入（上限 256KB，带文件�
�头）；图片注入路径配合 inspect_im
age 让 agent 看图；二进制/超大文件
注入路径提示
- ✅ **设置页边栏自
定义（v4.1，dsh-settings-nav-custom）**�
��设置面板左侧导航底部「自定义�
��栏」，按需显示/隐藏与排序导航
项，localStorage 持久化，默认全显
-
 ✅ **更新保障（v4.1）**：更新前�
�制插件/配置快照（失败中止更新�
��；官方 dsh 更新后上一版本备份�
�留到下次启动确认健康，启动失�
�可一键「回退到上一版本」；便�
�版客户端更新后若新版崩溃自动�
�退上一版；更新完成弹窗明示插�
�/皮肤/会话全部保留

## 快速开始�
��成品用户）

1. 安装方式任选其�
�：

   **winget（推荐，Windows 10+）**
——包管理器安装流程基本不触发
 SmartScreen 弹窗，且自带 SHA-256 校�
�（清单已随库维护并提交 microsoft/
winget-pkgs 上架审核）：

   ```powersh
ell
   winget install --id 20090106-520.Deeps
eek-Harness-EAC
   ```

   **直接下载**�
�打开 [Releases](https://github.com/2009010
6-520/Deepseek-Harness-EAC/releases/latest) �
��面（链接永久有效，始终指向最�
��版），选其一：
   - [Deepseek-Harnes
s-EAC-Portable-v4.6.2-x64.exe](https://github
.com/20090106-520/Deepseek-Harness-EAC/releas
es/latest/download/Deepseek-Harness-EAC-Porta
ble-v4.6.2-x64.exe) —— 免安装便携版
，双击运行
   - [Deepseek-Harness-EAC-Se
tup-v4.6.2-x64.exe](https://github.com/200901
06-520/Deepseek-Harness-EAC/releases/latest/d
ownload/Deepseek-Harness-EAC-Setup-v4.6.2-x64
.exe) —— 安装版，创建桌面/开始�
��单快捷方式

2. 首次运行会显示�
�动动画，随后进入 DeepSeek Harness We
b UI。
3. 如尚未配置 API Key，在界�
�内完成配置即可开始使用（与命�
�行 dsh 完全一致）。

> ⚠️ **务�
�安装到纯英文路径**（如默认的 `C
:\Users\<你>\AppData\Local\Programs\`）：�
��文路径（如 `D:\迅雷下载\`）会触
发 Chromium 渲染进程原生崩溃，窗�
�弹出数秒后自动退出。
>
> 便携版
的数据目录是 exe 旁的 `data\`；安�
�版在 `%APPDATA%\Deepseek Harness EAC\`。

> 若想强制指定 DSH 配置目录，启�
�前设置环境变量 `DSH_HOME` 即可（�
� dsh CLI 行为一致）。

## 跟随官方
更新（用户同意后自动更新）

- �
�动 15 秒后及此后每 6 小时，自动�
��询 npm 官方 registry 上 @deepseek-ai/ds
h 的最新版本；菜单「帮助 → 检�
�更新…」可随时手动检查。
- 发�
�新版本时弹窗询问：**立即更新 / 
跳过此版本 / 稍后**。
- 同意后，�
��置 node + npm 把官方新版本安装到�
��户数据目录的 `agent\`（overlay），
全程写入 staging 目录，成功后才原
子切换，失败自动保留当前版本。
后续更新只下载差异（复用 npm 缓�
��）。更新前自动对插件/配置做保
护快照（失败则中止更新）。
- 完
成后提示**立即重启 / 稍后重启**�
�重启即用新版；启动时 dsh 路径解
析优先使用 overlay、内置版本兜底�
��
- **上一版本备份保留**（v4.1）�
�切换成功后旧版保留为 `agent-previo
us`，直到下次启动确认新版健康才
自动清理；若新版启动失败，启动
失败对话框提供**「回退到上一版�
��并重试」**（优先）与「回退到�
�置版本并重试」一键回退。
- 尊�
�用户 npm 配置：自定义 registry 镜�
�/代理请设 `NPM_CONFIG_REGISTRY`（如 `h
ttps://registry.npmmirror.com`）。

## 客�
��端自更新（封装层）

- 启动 60 �
�后及此后每 12 小时，自动查询上�
��仓库的最新 release（**GitHub Releases
 → Gitee Releases 双源回退**；可用�
�境变量 `DSH_DESKTOP_RELEASE_API` 指向�
�定义镜像 API），比较当前版本。

- 发现新版本时弹窗询问：**立即�
�新 / 跳过此版本 / 稍后**；同意后
带进度条下载安装包（便携版选 `*
-portable-x64.exe`，安装版选 `Setup-*-x6
4.exe`；Gitee 因单文件 100MB 限制拆�
�的 `.part1/.part2` 分片会自动按序下
载并合并），下载到 `<数据目录>\u
pdates\`。
- **SHA-256 内容校验（v4）*
*：下载完成后强制校验文件哈希 �
��— 优先用 GitHub Release 资产自带�
� digest 字段，其次取 Release 附带的
 `SHA256SUMS.txt`（`npm run dist` 自动生�
��，发布时随资产上传）；不一致 
→ 删除文件并中止更新，绝不运�
�被篡改或损坏的安装包。上游未�
�供哈希时记录告警并放行（老 Rele
ase 兼容）。
- 确认重启后：**便携
版**用 detached 脚本等待旧 exe 解锁 
→ 备份 → 原地替换 → 自动启动�
��版本（只读目录自动退化为直接�
��动新 exe）；**安装版**等待进程�
�出后以向导方式启动新安装包。�
�败自动保留当前版本，下次启动�
�续提示待安装更新。
- **崩溃自回
退（v4.1）**：便携版更新后，上一
版 exe 备份与 marker 保留到新版首�
�健康启动；若新版启动失败（上�
�运行非干净退出），下次启动自�
�用上一版还原并保留崩溃副本、�
�系统通知告知。
- 菜单入口：chrom
e 栏 ⋯ 菜单 →「检查客户端更新�
��」；托盘菜单同样可用。跳过版�
��记录在 `settings.json`（`skipClientVers
ion`）。
- **更新源可见可复制**：�
�� 菜单内「更新源」区块与「关于
 Deepseek Harness EAC」对话框展示项目
仓库地址（GitHub），一键复制到剪
贴板。
- 链路自检：`node scripts/chec
k-client-latest.js [--download]`（可设 `DS
H_DESKTOP_RELEASE_API` / `PORTABLE_EXECUTABLE
_DIR`）。

## DeepSeek 余额小部件

- �
��面端读取 `~/.dsh/.credentials.yaml` 的
 `DEEPSEEK_API_KEY`（或环境变量），�
�用 `https://api.deepseek.com/user/balance`�
��每 15 分钟刷新，通过 preload 推送
到 Web UI。
- 配套 dsh 客户端插件（
`assets/plugins/dsh-balance`）在每次启�
�时自动同步进 web profile 并注册到 
`conversation.composer.dock`，在对话底�
�统计栏内联显示：**本轮 ¥X.XX · �
��额 ¥Y.YY**（本轮费用按 token 用量
 × 价格档估算，缓存命中/未命中/
输出分别计价）。
- 价格档默认：
deepseek-chat 2/0.5/8、deepseek-reasoner 与
 deepseek-v4-pro 4/1/16（¥/百万 token）�
��可在 `<数据目录>\settings.json` 的 `
balancePrices.<model>` 覆盖。代理/镜像
可用 `DEEPSEEK_API_BASE` 或 `DEEPSEEK_BALA
NCE_URL` 环境变量。
- 纯浏览器打开
 Web UI 时无桌面壳推送，小部件只�
��示「本轮」费用。

## 快捷方式�
�托盘

- **托盘**：点窗口关闭按钮
默认隐藏到托盘并提示一次；托盘
菜单可显示窗口 / 检查更新 / 开关
会话通知 / 退出。chrome 菜单「关�
�时最小化到托盘」可关闭该行为�
�
- **快捷方式**：便携版首次运行�
��动创建桌面 + 开始菜单快捷方式�
��开始菜单快捷方式同时是 Windows T
oast 通知的前置条件）；每次启动�
��验，exe 被移动后自动重建指向新
位置；从系统临时目录运行时弹窗
提醒移动到固定位置。

## 文件更�
��追踪与回退

- 详情面板新增「文
件」标签页（与 对话/轨迹 并列）
：聚合当前会话 agent 改过的所有�
�件，展示新建/修改/删除标记、行
数变化与行级 diff。
- **数据来源**
：只读复用官方会话日志已持久化
的 `tool/result.data.meta.diffs`（`ctx.fs` 
写前锁内全文），配套 host 插件 `@
deepseek-ai/dsh-file-changes` 注册 `fileCha
nges` 会话投影，零写入、零格式变
更，对 dsh 升级完全稳定。
- **还�
�**：逐文件或全部还原 —— 客户�
��把该文件的变更按逆序发给桌面�
��，壳层做**内容精确匹配后替换**
（新建→删除、删除→恢复、修改
→回写写前全文）；文件已被后续
改动时提示冲突，绝不覆盖未知内
容。
- **对话回退**：沿用 dsh 内置
的会话分叉（消息尾部「从此处分
叉」），可与文件还原组合使用。

- 配套插件随桌面端分发（`assets/p
lugins/`），每次启动自动同步进 web
 profile 并幂等注册。

## 项目文件�
��与 HTML/端口预览

- 「文件」标签
页内新增「全部文件」子视图：VSC
ode 风格的层级文件树（懒加载、�
�录优先排序、文件大小/修改时间�
��本会话改过的文件带绿点标记）�
��点击文件用系统默认程序打开；�
��套 host 插件注册 `GET /api/dsh-files/l
ist`（仅回环）。
- **站内侧边预览
**（可拖宽，宽度持久化）：树中 
HTML 文件的悬停「▶」按钮或「本�
��话修改」列表的「预览」按钮打�
��右侧预览面板；宿主插件以 `GET /
dsh-files/static/<绝对路径>` 提供静态
文件服务，HTML 的相对资源引用（`
./css`、`../img`）随 URL 自然解析，�
�本地打开一致。
- **端口预览**：�
��览面板地址栏可直接输入 `3000` / 
`localhost:5173` 等，宿主插件探测本�
��回环监听端口（`GET /api/dsh-files/po
rts`）并以徽章列出，点击即预览�
�`GET /api/dsh-files/check` 提供在线状�
�检查（面板状态栏显示 HTTP 状态�
�。
- 预览面板带前进/后退/刷新/�
�部打开（系统浏览器）；全部路�
�仅接受回环地址请求。

## 会话内
终端

- 新增「终端」标签页（与 �
��话/轨迹/文件 并列）：在当前会�
��的项目目录下启动持久 PowerShell s
hell，SSE 流式输出、命令历史（↑/
↓）、清屏、重启、断线自动重连
（切换标签页/刷新不丢，回放最�
� 512KB 输出）。
- **编码**：宿主插
件用显式 UTF-8 的 mini-REPL（自建读�
��循环 + `Invoke-Expression`）绕开 Power
Shell 5.1 原生 REPL 对重定向 stdin 的�
��码漂移，中文输入输出双向干净�
��
- **限制**：非 PTY（vim/htop 等全�
�交互程序不支持）；PowerShell 语法
（`&&` 用 `;` 或 `if ($?)` 替代）；多
行脚本请用 `;` 分行。
- 宿主插件�
��由：`GET /dsh-files/term/events`（SSE）
、`POST /dsh-files/term/input`、`POST /dsh-
files/term/close`，全部仅接受回环地�
��请求；断开后 shell 保留 15 分钟�
�

## 会话完成通知

- 监听 dsh 会话
日志（`<DSH_HOME>/sessions/**/session.json
l.zstd`），解码与官方持久化实现�
�致的 zstd 多帧 + JSONL 格式。
- 会�
�格式带 turn 事件的（当前版本）�
� `turn/end`（一轮任务真正跑完，含
 goal 模式整体完成）时通知；旧格
式会话以 `assistant/message` 兜底。子
代理会话不通知，避免刷屏。
- 通
知标题优先使用会话标题（`session/
title`），正文含工作目录与短会话
 ID；点击通知回到主窗口。
- 菜单
「帮助 → 会话完成通知」可随时�
��关（持久化于数据目录 `settings.js
on`）。
- Windows Toast 需要开始菜单�
��捷方式：安装版由安装器创建；�
��携版首次运行自动创建（指向原�
�� exe）。

## 界面皮肤

- 设置页新
增「皮肤」标签页：内置 10 款 Web 
UI 皮肤，卡片式网格展示（名称/�
�介/主色/作者/出处与许可角标）�
�当前皮肤高亮。
- **默认皮肤即"�
�启用任何皮肤"**（原生外观）：10
 款皮肤默认全部以 `disabled: true` �
�册，无需改动即可保持默认外观�
�选中某款后其余自动禁用（互斥�
�换），「恢复默认皮肤」一键还�
�。
- 切换在设置页即时生效于配�
�，**重启 Web 服务后生效**（服务�
�启由桌面端自动完成）。
- 机制�
�皮肤是 browser-only 的 dsh client 插件
（`window.__ModuleLoader__.load({id, factory
})`），桌面端启动时把 `assets/skins/
` 下皮肤包同步进 web profile 的 `node
_modules`，并以 `ui-skin-*` 行注册到 `
cordis.patch.yml`（幂等，已有行不重�
��，保留用户选择）；切换即重写�
��些行的 `disabled` 标记，配套插件 
`@deepseek-ai/dsh-skin-switch`（host 半边 
Typert Remote + 设置页 tab）负责列出/
切换/恢复。
- **内置皮肤一览**：


| 皮肤 | 出处 | 许可 |
| --- | --- | -
-- |
| xp（Windows XP 风格） | [dsh-web-u
i](https://github.com/zhu1090093659/dsh-web-u
i) | BSD-3-Clause |
| qq98（QQ 经典 98 风
格） | 同上 | BSD-3-Clause |
| ths（同�
��顺风格） | 同上 | BSD-3-Clause |
| bl
ue-fantasy（蓝幻） | 同上 | BSD-3-Claus
e |
| dragon-heir（龙裔） | 同上 | BSD-
3-Clause |
| minecraft（我的世界） | �
�上 | BSD-3-Clause |
| trading（交易风�
�） | 同上 | BSD-3-Clause |
| whale-song�
�鲸歌） | 同上 | BSD-3-Clause |
| miku�
�初音未来） | 同上 | BSD-3-Clause |
| 
maid-atelier（深海女仆工坊） | [dsh-d
eep-whale](https://github.com/Small-tailqwq/d
sh-deep-whale) | **CC BY-NC-SA 4.0**（禁止
商用） |

- 皮肤来源与版权：dsh-we
b-ui 九款皮肤包随包分发 `LICENSE`（
BSD-3-Clause，出处/作者字段见皮肤�
�片与包内元数据）；maid-atelier 为�
��生创作（角色原作：上善；DeepSee
k 元素二次设计：ZipZipPipe；本皮肤
：Small-tailqwq），完整署名链见包�
� `NOTICE`，整体仅限非商业使用。�
�皮肤包的 `LICENSE`/`NOTICE`/`README` 随
同步一并分发到 web profile 的 `node_m
odules` 中。

## 内置社区插件（v2.0�
��

以下社区插件随安装包分发（`a
ssets/plugins/`），每次启动自动同步
进 web profile 并幂等注册；`pnpm` 安�
��第三方插件后导致模块双实例时�
��启动时的 heal 流程会自动清理遮�
��包并重建副本。

| 插件 | 功能 | 
设置入口 |
| --- | --- | --- |
| `dsh-web
ui-market` | 社区插件市场：浏览 awes
ome-dsh-plugin.com 收录的全部插件，�
�键安装/卸载（含安装前试启动探�
��）；目录中已被客户端内置的插�
��显示「已内置」徽标并拒绝重复�
��装 | 设置 → 插件 → 插件市场 |

| `zat-dsh-engine` | 第二插件市场（Zat
 可视化市场）：GitHub `dsh-plugin` top
ic 检索、中文插件简介、国内镜像
兜底 | 设置 → 插件 → Zat 标签页 
|
| `dsh-plugin-manager`（v4） | 插件启�
��管理：列出配套/用户/核心插件�
�启用状态，不重启切换启停 | 设�
� → 插件 → 管理 |
| `dsh-message-rewi
nd` | 对话回退（Trae 风格）：悬停�
��意用户消息 →「编辑并回退」→
 从该消息之前分叉新会话并自动�
�发编辑后内容，原会话保留 | 对�
�界面（消息 hover 按钮） |
| `dsh-doc
k-settings` | Skills 与 MCP 管理：技能�
��录浏览（EAC 内置/用户来源徽标�
�打开目录）+ MCP 服务增删改（stdio
 / streamable-http），保存后一键重启
生效 | 设置 → Skills 与 MCP |
| `dsh-p
et` | 桌面宠物：28 个透明动画的悬
浮宠物，空闲呼吸、随机动作、屏
幕游走 | 随包自动启用 |
| `dsh-dafei
yu`（v4） | 大肥鱼桌宠：真实会话�
��态驱动的原生置顶窗口（六态动�
�� + 项目状态卡 + 摸头/戳一戳；角
色素材按 ASSET_LICENSE 分发） | 默认
禁用，「插件 → 管理」启用 |
| `p
icturereader` | 全能读图/读文档：视�
��孪生 adapter（原生缩略图 + 粘贴�
�用自动分析，opencode 等 pi-ai provide
r 也可用，杜绝 UNSUPPORTED_CONTENT）�
�隐私/智能/严谨三模式；本地工具
链（像素扫描/3 引擎 OCR/裁剪/取色
/对比/批量）；pdf/word/excel/ppt 转图
片；可选外部 VLM 桥（OpenAI 兼容端
点） | 设置 → 图片阅读 |
| `dsh-sou
l-md` | soul.md 人设卡：可视化编辑�
�设，热重载即时生效；未配置时�
�册空 section，**完全不影响官方系�
��提示词** | 设置 → 人设卡 |
| `dsh
-web-mobile-fix` | Web UI 移动端适配修�
�� | 随包自动启用 |
| `dsh-easy-setup` 
| 一键迁移（一键夺舍）：选择目�
�� → 新建工作区与对话 → AI 全程
可视化迁移 skills / MCP / 记忆 | 设�
� → 一键迁移 |
| `dsh-change-review`（
v4） | AI 变更审核：监控本会话文�
��改动，手动/自动让模型复查自己
刚做的改动（正确性/安全性/目标�
��致性），配合「文件」页一键还�
�� | 设置 → AI 变更审核 |
| `dsh-undo
-savepoint`（v4） | 崩溃急救与撤销�
�配置/插件代码快照、undo/redo、一�
��安全模式、密钥脱敏 vault、跨机�
��移 ZIP | 对话顶部 undo/redo 按钮 + �
��照面板 |
| `@deepseek-ai/dsh-openclaw-br
idge`（v4） | 微信 ClawBot / OpenClaw 桥
：微信扫码绑定后在小程序里驱动
常驻 DSH 会话；OpenAI 兼容端点；第
三方模型端点 | 设置 → ClawBot |
| `
@deepseek-ai/dsh-float-window`（v4） | 会�
��浮窗：把会话弹出到独立窗口分�
��多任务 | 会话头部「弹出到独立�
��口」 |
| `@dsh-external/dsh-side-session`
（v4） | 侧边临时会话：浮窗追问�
��不写主会话、多种回答引擎 | Ctrl
+Shift+S |
| `dsh-session-manager`（v4） | 
会话删除与归档管理：会话行「删
除对话」+ 归档恢复/删除面板 | 会
话菜单 + 设置面板 |
| `@vlln/dsh-navba
r`（v4） | 对话节点导航条：右缘�
�点串快速跳转 user 消息（悬停预�
�/点击跳转/滚轮切换） | 随包自动
启用 |
| `@deepseek-ai/dsh-conversation-twe
aks`（v4） | 对话微调：隐藏大量工
具调用/结果/思考输出，保留每轮�
��终总结 | 设置 → 通用 |
| `@deepsee
k-ai/dsh-prompt-custom`（v4） | 自定义�
�入提示词：整体替换/追加官方 per
sona | 设置 → 提示词 |
| `@deepseek-ai
/dsh-third-party-thinking`（v4） | 第三�
� OpenAI 兼容模型的 reasoning_effort 控
件（字段名可自定义） | 模型参数
区 |
| `dsh-offpeak`（v4） | 峰谷价格�
��士：高峰时段（北京时间 9-12 / 14
-18 点）发送前拦截提醒，一键继�
�或定时到闲时价自动执行（浏览�
�不在线也执行） | 发送时弹窗（�
�插件 → 管理」可关闭） |

> **Wind
ows 文件锁排队**：运行中的 Web 服�
��加载着原生模块（sqlite-vec 等 DLL�
��时，插件安装/卸载会遇到 `EPERM` 
文件锁 —— 任务会自动排队（`.ds
h-market-pending.json`），下次服务重�
�前（无锁窗口）自动完成，市场�
�面提供「立即重启并完成」按钮�
�
>
> **NSIS 升级修复**：安装器在卸
载旧版前自动结束新旧进程，修复
了旧版 "Failed to uninstall old applicatio
n files: 2"（应用运行中导致文件被�
��）。

## 退出行为三档（v2.2）

�
�题栏「⋯」菜单 →「关闭窗口时�
��：**每次询问 / 后台运行（最小�
�到托盘）/ 直接退出**。选「每次�
��问」时点关闭弹窗（「最小化到�
��台 / 退出程序」+「记住我的选择
」勾选），旧版 `closeToTray` 布尔设
置自动迁移。配置存于 `<userData>/se
ttings.json` 的 `exitAction`。

## 内置 S
kills 分发（v2.2）

`assets/skills/<kebab
-name>/SKILL.md` 随包分发，启动时同�
��进 `~/.dsh/skills/`（dsh 内核默认扫�
��根，零配置）：带 `.eac-skill.json` 
标记的技能随版本覆盖更新；用户
自建同名目录永不覆盖；不删除用
户的任何内容。当前内置：`eac-desk
top-tips`（客户端功能速查）。

## �
��源码构建

要求：Windows + Node.js（
仅构建机需要）+ npm。

```powershell

npm install                    # 安装 dsh /
 electron / electron-builder
npm run fetch-ru
ntime          # 内置 node.exe + npm CLI（
构建与开发都需要）
npm start        
              # 开发模式启动（窗口�
�跑 Web UI）
npm run dist                  
 # 构建 portable + NSIS 安装包，输出�
�� dist/
```

> 网络受限时：Electron �
�进制镜像 `$env:ELECTRON_MIRROR='https://
npmmirror.com/mirrors/electron/'`（可 `npm 
run electron:fetch` 手动补拉）；打包�
��具链镜像 `$env:ELECTRON_BUILDER_BINARIE
S_MIRROR='https://npmmirror.com/mirrors/elect
ron-builder-binaries/'`。
>
> 开发辅助�
�本：`node scripts/check-latest.js`（检�
�/试装更新）、`node scripts/test-watche
r.js`（通知检测单测）、`node scripts
/inspect-session.js <file>`（会话日志事
件词表）。

## 架构

```
┌───�
��──────────────�
��──────────────�
��──────────────�
��─────────┐
│  Electro
n 壳 (main.js)                              
     │
│  · 单实例锁 / 窗口 / 菜�
�� / 生命周期                       │
�
��  · 会话完成监听 (session-watcher.js
) → 系统通知            │
│  · 官
方更新 (updater.js) → 用户同意后安
装 overlay          │
│  · spawn vendor
|resources 里的 node.exe                   
│
└────────────�
�─┬────────────�
�──────────────�
�──────────────�
�┘
               │  dsh web --host 127.0
.0.1 --port 0
               ▼
       内�
� node.exe + @deepseek-ai/dsh
       路径�
�析：用户目录 overlay > 内置包
     
  输出 "dsh web: http://127.0.0.1:<port>"
 
              │  解析 URL，轮询 HTTP 2
00
               ▼
       原生窗口加�
�� Web UI（仅本机回环访问）
```

关
键决策：

| 决策 | 原因 |
| --- | ---
 |
| `asar: false` | dsh 依赖 sharp / node-
pty / koffi 等原生模块，必须以真实
文件落盘 |
| 内置独立 node.exe + npm 
| 预编译原生模块 ABI 与安装时的 N
ode 版本绑定；Electron 内嵌 Node ABI �
��同。内置同版本 node.exe 零配置保
证一致，npm 用于官方更新。注意�
�electron-builder 复制 extraResources 时�
�剥掉嵌套 node_modules，npm 自己的依
赖由 \`afterPack\` 钩子原样补拷（scr
ipts/after-pack.js） |
| `npmRebuild: false`
 | 绝不为 Electron 重编译原生模块�
�否则内置 node.exe 反而加载不了 |
|
 `--port 0` + 解析 stdout | 由 OS 分配�
�闲端口，避免端口冲突；本机回�
�绑定不对外暴露 |
| 退出时 `taskkil
l /T /F` | dsh 会派生 pwsh 等子进程，
按进程树整体回收 |
| 更新走 overla
y + staging 原子切换 | 更新失败零风
险；便携版（资源每次从 exe 解压�
��也能持久更新 |
| 通知读会话日�
�而非 UI 协议 | 持久化格式是官方�
��定接口；UI 的私有 RPC/SSE 协议随�
��本变化，容易失效 |

## 日志与排
障

- `desktop.log`：壳层日志（启动�
��数、端口、通知、更新、退出）

- `dsh-web.log`：dsh web 的完整 stdout/st
derr
- `update.log`：官方更新的 npm 安
装日志

位置：便携版 `data\logs\`；
安装版 `%APPDATA%\Deepseek Harness EAC\log
s\`。
菜单「视图 → 打开日志目录
」可直接打开。

常见问题：

- **W
indows 提示"已保护你的电脑"（SmartS
creen）**：本项目采用零证书分发�
�略（不购买代码签名证书，详见 [
分发信任指南](docs/CODE_SIGNING.md)）�
��—推荐改用 `winget install --id 200901
06-520.Deepseek-Harness-EAC` 安装（基本�
��触发弹窗）；直接下载的 exe 首�
�运行点「更多信息 → 仍要运行」
即可，下载量积累后警告自动消失
；也可用 `Get-FileHash` 对照 Release �
�带的 `SHA256SUMS.txt` 自验文件完整�
�。
- **首次启动慢**：dsh 首次引导
 profile 需要数秒到数十秒，属正常
现象。
- **更新下载慢**：设置环�
�变量 `NPM_CONFIG_REGISTRY=https://registry
.npmmirror.com` 后重启应用。
- **收不
到通知**：确认菜单「会话完成通�
��」已勾选；便携版确认开始菜单�
��存在「Deepseek Harness EAC」快捷方�
�（首次运行自动创建，勿删除）�
�检查 Windows「通知与操作」设置里
应用通知未被禁用。
- **端口被占*
*：应用自动使用空闲端口，无需�
�动处理。

## 目录结构

```
dsh-deskt
op/
├── main.js               # Electro
n 主进程（无边框窗口/托盘/自绘 c
hrome IPC + 余额推送 + 客户端自更新
 + 快捷方式维护）
├── updater.js
            # dsh agent 官方更新引擎（
检查 / 同意后安装 / 回退）
├─�
� client-updater.js     # 客户端（封装�
��）自更新引擎（GitHub/Gitee 双源 + 
分片合并 + 原地替换）
├── bala
nce.js            # DeepSeek 账户余额查�
��（主进程）
├── session-watcher.j
s    # 会话完成监听（zstd 多帧解码
 + turn/end 检测）
├── preload.js   
         # 沙箱预加载（自绘玻璃标�
��栏 + 窗口控制/菜单 IPC + 余额事�
�桥）
├── assets/               # 加
载页、更新进度页、图标、托盘图
标、配套 dsh 插件
│   └── plugi
ns/          # 桌面壳配套（dsh-balance�
��dsh-file-changes、dsh-terminal、
│     
                    # dsh-easy-setup、dsh-sk
in-switch）+ 内置社区插件
│         
                # （dsh-webui-market、dsh-t
ool-vision、
│                         # d
sh-soul-md、dsh-web-mobile-fix，含 vendor 
与自包含依赖）
│                    
     # 全部自动同步进 web profile
├�
��─ scripts/
│   ├── fetch-node.js 
    # 内置 node.exe 复制脚本
│   ├�
��─ fetch-npm.js      # 内置 npm CLI 复�
��脚本
│   ├── build-icon.ps1    # 
生成应用图标（透明圆角蒙版）+ �
��盘图标
│   ├── check-latest.js  
 # agent 更新链路测试工具
│   ├�
�─ check-client-latest.js # 客户端更新
链路测试工具
│   ├── test-watch
er.js   # 通知检测单测
│   └── 
inspect-session.js# 会话日志解析工具

├── build/icon.png        # electron-bu
ilder 图标源
├── vendor/            
   # 内置 node.exe / npm CLI（fetch-runtim
e 生成，不入库）
├── electron-bu
ilder.yml  # 打包配置
└── dist/    
             # 构建产物
```

## License


MIT。基于 [@deepseek-ai/dsh](https://www.n
pmjs.com/package/@deepseek-ai/dsh)（MIT）�
�

本项目的桌面封装最初由 [zouyuxu
an122](https://github.com/zouyuxuan122/Deepse
ek-Harness-EAC) 开发（MIT），本仓库�
�其基础上继续维护与分发。


