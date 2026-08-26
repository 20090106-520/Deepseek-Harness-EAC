# Deepseek Harness EAC（揽尽万象 · E mbr
acing All Creation）

把 [@deepseek-ai /dsh]
(https://www.npmjs.com/package/@deepse ek-ai/d
sh)（DeepSeek Harness）封装成� �箱即�
�的 Windows 桌面客户端。 

- ✅ **免�
��装 Node**：内置� �立的 Node 运行时
与 npm CLI，目标� ��器无需安装 Node.j
s
- ✅ **内置 ds h CLI**：完整打包 `@d
eepseek-ai/dsh` � ��其全部插件，离线�
�用
- ✅ * *一键启动**：双击即启动
 `dsh web` ，自动挑空闲端口，就绪�
�加� ��到原生窗口（stdout 就绪行与 
HTT P 探测并行判定，首启装依赖自� 
��放宽时限）
- ✅ **风格化无� �框�
��口**：无原生标题栏/菜 单栏，自�
�� 36px 玻璃栏（圆� ��图标 + 拖拽 + �
�� 菜单 + 窗� ��控制），Win11 原生圆
角；快捷� � Ctrl+R / F12 / F11 保留
- �
�� **� ��窗口（v4）**：会话头部「弹
出� ��独立窗口」分屏多任务；侧边
� �时会话浮窗追问（Ctrl+Shift+S，不
 写主会话）
- ✅ **系统托盘常驻**� ��
��点关闭默认隐藏到托盘（� �关闭�
��，托盘菜单提供显示 /检查更新/�
�启 Web 服务/退出
-  ✅ **退出即清�
�**：退出应用� ��界等待 dsh 进程树�
��正退出 （优雅 → 强杀），不留�
�儿� �程（v4 根治「退出残留一对�
� 程」）
- ✅ **便携版**：`portable` � �
��数据（日志、配置）跟随 ex e 所�
�目录，拷到 U 盘就能用
-  ✅ **与 C
LI 共享配置**：默认沿� � dsh 自身�
� `DSH_HOME`（通常是 ` ~\.dsh`），已有
会话/API Key 直接生 效
- ✅ **跟随官
方更新**：官方 @ deepseek-ai/dsh 发新�
��时弹窗提 醒，经用户同意后自动�
��载� ��装，重启生效，失败自动保�
� ��旧版
- ✅ **客户端自更新 + SHA-2 56
 校验（v4）**：自动检查上游仓 库�
��GitHub→Gitee 双源，Gitee � ��片自动�
��并）发布的封装� �版本，经用户�
��意后下载（ 完成内容 SHA-256 校验�
��不一� ��中止替换并删除文件）、�
�� �换、重启；便携版/安装版各自适 
配
- ✅ **快捷方式自动维护**：按 �
��目标 exe」识别既有快捷方 式（用
户改名/换图标不再重复新 建），�
�定义图标绝不覆盖；� �� 菜单可关�
��桌面快捷方式� ��动维护
- ✅ **Deep
Seek 余额小部� �**：对话底部统计�
�内联显示� ��本轮 ¥X.XX · 余额 ¥Y.Y
Y」（自� �注入配套 dsh 客户端插件
，点击� ��转充值）
- ✅ **文件更改
追踪 +  一键还原 + AI 变更审核（v4�
�� ��**：详情面板「文件」标签页聚� �
�本会话改动（行级 diff、逐文� ��或
全部还原）；「AI 变更审核� �可手
动/自动让模型复查自己刚� �的改�
�（正确性/安全性/目标� ��致性）
- 
✅ **会话删除与归档� �理（v4）**�
�会话行菜单「删� �对话」+ 设置内
归档恢复/删除面 板（官方只有归�
�，运行时补� ��幂等打通全链路）
-
 ✅ **微信 C lawBot / OpenClaw 桥（v4）*
*：设置页 「ClawBot」栏扫码绑定微�
��官 方 ClawBot 小程序，微信里直接�
� ���动常驻 DSH 会话（每用户独立� ��
�/工作区/白名单）；OpenAI 兼 容端�
�供 OpenClaw 网关接入
- ✅  **会话完�
��系统通知**：agent  任务跑完时弹 W
indows 系统通知， 点击回到窗口
- �
� **界面皮肤* *：设置页「皮肤」标
签页内置 10  款 Web UI 皮肤（9 款 dsh
-web-ui 皮� � + 1 款深海女仆工坊）�
�互斥� ��换、默认不启用、重启生�
�� �随包标注出处与许可（详见「�
 �面皮肤」章节）
- ✅ **内置社区 �
�件套件**（v2.0 起，详见「内 置社�
��插件」章节）：插件� ��场 / 外置�
��觉模型 / 长期� �忆 / soul.md 人设�
� / 移动端适� ��修复，全部随包分�
�、开箱� �用
- ✅ **崩溃急救与撤�
�（v4� ��dsh-undo-savepoint）**：配置与�
� �件代码树快照、undo/redo、一键安 �
��模式、密钥脱敏 vault ——  配置�
�坏、dsh 起不来也能救
-  ✅ **插件�
��停管理（v4）**� �设置页「插件 �
� 管理」不重� ��切换任意插件启停�
��含默� �禁用的大肥鱼桌宠）
- ✅ 
**一键 迁移（一键夺舍）**：设置�
�� �择任意已有 AI 工具目录（如 Cod
e x / Claude 安装目录）→ 自动新建� 
�作区与对话 → 发送迁移指令� �AI 
在对话中全程可视化提取 skill s / MC
P 配置 / 长期记忆
- ✅ **错� �日志�
��键复制（v4.1）**：启 动失败 / DSH 
服务停止的报错弹窗 带「复制日志
」按钮，一键复制� ��整诊断信息（
错误、堆栈、日� �目录、最近日志
尾部）供反馈
-  ✅ **应用内反馈入
口（v4.1）**：� �� 菜单与托盘「反�
�建议…」� ��达 GitHub Issues，关于弹
窗附交流 群号
- ✅ **拖文件进对话
（v4.1， dsh-file-drop）**：把本地文�
�直� ��拖进对话输入框 —— 文本/�
� �码自动注入（上限 256KB，带文件� �
�头）；图片注入路径配合 inspe ct_im
age 让 agent 看图；二进制/超� �文件
注入路径提示
- ✅ **设置页 边栏自
定义（v4.1，dsh-settings-nav-c ustom）**�
��设置面板左侧导航 底部「自定义�
��栏」，按需� ��示/隐藏与排序导航
项，localStora ge 持久化，默认全显
-
 ✅ **更新� ��障（v4.1）**：更新前�
�制插� �/配置快照（失败中止更新�
�� �；官方 dsh 更新后上一版本备份� 
�留到下次启动确认健康，启动� ���
�可一键「回退到上一版本� �；便�
�版客户端更新后若新版 崩溃自动�
�退上一版；更新完� ��弹窗明示插�
�/皮肤/会话全部 保留

## 快速开始�
��成品用� �）

1. 安装方式任选其�
�：

    **winget（推荐，Windows 10+）**
—— 包管理器安装流程基本不触发
 Sma rtScreen 弹窗，且自带 SHA-256 校�
� ��（清单已随库维护并提交 microsoft /
winget-pkgs 上架审核）：

   ```powe rsh
ell
   winget install --id 20090106-520. Deeps
eek-Harness-EAC
   ```

   **直接下 载**�
�打开 [Releases](https://github .com/2009010
6-520/Deepseek-Harness-EAC/rele ases/latest) �
��面（链接永久有 效，始终指向最�
��版），选� ��一：
   - [Deepseek-Harnes
s-EAC-Portabl e-v4.6.4-x64.exe](https://github
.com/200901 06-520/Deepseek-Harness-EAC/releas
es/latest /download/Deepseek-Harness-EAC-Porta
ble-v4. 6.3-x64.exe) —— 免安装便携版
，� �击运行
   - [Deepseek-Harness-EAC-Se
tup -v4.6.4-x64.exe](https://github.com/200901
0 6-520/Deepseek-Harness-EAC/releases/latest/d 
ownload/Deepseek-Harness-EAC-Setup-v4.6.4-x6 4
.exe) —— 安装版，创建桌面/开� ���
��单快捷方式

2. 首次运行 会显示�
�动动画，随后进入 Dee pSeek Harness We
b UI。
3. 如尚未配置  API Key，在界�
�内完成配置即可 开始使用（与命�
�行 dsh 完全� �致）。

> ⚠️ **务�
�安装到� �英文路径**（如默认的 `C
:\Users\<� ��>\AppData\Local\Programs\`）：�
�� 文路径（如 `D:\迅雷下载\`）会触
 发 Chromium 渲染进程原生崩溃，窗� �
�弹出数秒后自动退出。
>
> 便� ��版
的数据目录是 exe 旁的 `data\`� ��安�
�版在 `%APPDATA%\Deepseek Harne ss EAC\`。

> 若想强制指定 DSH 配置 目录，启�
�前设置环境变量 `DS H_HOME` 即可（�
� dsh CLI 行为一� �）。

## 跟随官方
更新（用户同� ��后自动更新）

- �
�动 15 秒后 及此后每 6 小时，自动�
��询  npm 官方 registry 上 @deepseek-ai/ds
h � �最新版本；菜单「帮助 → 检�
� ��更新…」可随时手动检查。
- 发� ��
�新版本时弹窗询问：**立即更 新 / 
跳过此版本 / 稍后**。
- 同� �后，�
��置 node + npm 把官方新 版本安装到�
��户数据目录的  `agent\`（overlay），
全程写入 stagin g 目录，成功后才原
子切换，失� �自动保留当前版本。
后续更新只 下载差异（复用 npm 缓�
��）� �更新前自动对插件/配置做保
护� �照（失败则中止更新）。
- 完
成 后提示**立即重启 / 稍后重启**�
 �重启即用新版；启动时 dsh 路径� ��
析优先使用 overlay、内置版本兜 底�
��
- **上一版本备份保留** （v4.1）�
�切换成功后旧版保留 为 `agent-previo
us`，直到下次启动� �认新版健康才
自动清理；若新版 启动失败，启动
失败对话框提供* *「回退到上一版�
��并重试」 **（优先）与「回退到�
�置版� �并重试」一键回退。
- 尊�
�用 户 npm 配置：自定义 registry 镜�
� ��/代理请设 `NPM_CONFIG_REGISTRY`（如 ` h
ttps://registry.npmmirror.com`）。

## � ���
��端自更新（封装层）

- � ��动 60 �
�后及此后每 12 小时， 自动查询上�
��仓库的最新 rel ease（**GitHub Releases
 → Gitee Releases  双源回退**；可用�
�境变量 `DS H_DESKTOP_RELEASE_API` 指向�
�定义� �像 API），比较当前版本。

- 发� �新版本时弹窗询问：**立即�
�� �� / 跳过此版本 / 稍后**；同意后
 带进度条下载安装包（便携版选 `* 
-portable-x64.exe`，安装版选 `Setup-*- x6
4.exe`；Gitee 因���文件 100MB � ��制拆�
�的 `.part1/.part2` 分片会 自动按序下
载并合并），下载到  `<数据目录>\u
pdates\`。
- **SHA-256 � �容校验（v4）*
*：下载完成后强� �校验文件哈希 �
��— 优先用  GitHub Release 资产自带�
� digest � �段，其次取 Release 附带的
 `SHA256S UMS.txt`（`npm run dist` 自动生�
�� �，发布时随资产上传）；不一致  
→ 删除文件并中止更新，绝不运� ��
�被篡改或损坏的安装包。上� �未�
�供哈希时记录告警并放行 （老 Rele
ase 兼容）。
- 确认重启� ��：**便携
版**用 detached 脚本等待 旧 exe 解锁 
→ 备份 → 原地替换  → 自动启动�
��版本（只读目 录自动退化为直接�
��动新 exe ）；**安装版**等待进程�
�出后 以向导方式启动新安装包。�
�� ��自动保留当前版本，下次启动� 
�续提示待安装更新。
- **崩溃自 回
退（v4.1）**：便携版更新后，� ��一
版 exe 备份与 marker 保留到新� ��首�
�健康启动；若新版启动� �败（上�
�运行非干净退出）， 下次启动自�
�用上一版还原并� ��留崩溃副本、�
�系统通知告� �。
- 菜单入口：chrom
e 栏 ⋯ 菜单  →「检查客户端更新�
��」； 托盘菜单同样可用。跳过版�
�� ��记录在 `settings.json`（`skipClientVers 
ion`）。
- **更新源可见可复制**� ��
�� 菜单内「更新源」区块� �「关于
 Deepseek Harness EAC」对话框 展示项目
仓库地址（GitHub），一� ��复制到剪
贴板。
- 链路自检：`n ode scripts/chec
k-client-latest.js [--downl oad]`（可设 `DS
H_DESKTOP_RELEASE_API` /  `PORTABLE_EXECUTABLE
_DIR`）。

## DeepSee k 余额小部件

- �
��面端读取  `~/.dsh/.credentials.yaml` 的
 `DEEPSEEK_AP I_KEY`（或环境变量），�
�用 `ht tps://api.deepseek.com/user/balance`�
�� ��每 15 分钟刷新，通过 preload 推送 
到 Web UI。
- 配套 dsh 客户端插件� ��
`assets/plugins/dsh-balance`）在每次� ���
�时自动同步进 web profile 并� ��册到 
`conversation.composer.dock`，在 对话底�
�统计栏内联显示：**� �轮 ¥X.XX · �
��额 ¥Y.YY**（本� ��费用按 token 用量
 × 价格档估算 ，缓存命中/未命中/
输出分别计� �）。
- 价格档默认：
deepseek-chat 2 /0.5/8、deepseek-reasoner 与
 deepseek-v4- pro 4/1/16（¥/百万 token）�
��可 在 `<数据目录>\settings.json` 的 `
bal ancePrices.<model>` 覆盖。代理/镜像
� ��用 `DEEPSEEK_API_BASE` 或 `DEEPSEEK_BALA 
NCE_URL` 环境变量。
- 纯浏览器打� �
 Web UI 时无桌面壳推送，小部件� ���
��示「本轮」费用。

## 快 捷方式�
�托盘

- **托盘**：点� �口关闭按钮
默认隐藏到托盘并提 示一次；托盘
菜单可显示窗口 / � ��查更新 / 开关
会话通知 / 退出� �chrome 菜单「关�
�时最小化到� �盘」可关闭该行为�
�
- **快捷� ��式**：便携版首次运行�
��动 创建桌面 + 开始菜单快捷方式�
� ���开始菜单快捷方式同时是 Window s T
oast 通知的前置条件）；每次� �动�
��验，exe 被移动后自动� �建指向新
位置；从系统临时目录 运行时弹窗
提醒移动到固定位置� ��

## 文件更�
��追踪与回退

-  详情面板新增「文
件」标签页（ 与 对话/轨迹 并列）
：聚合当前� ��话 agent 改过的所有�
�件，展� ��新建/修改/删除标记、行
数变化 与行级 diff。
- **数据来源**
：只� ��复用官方会话日志已持久化
的 ` tool/result.data.meta.diffs`（`ctx.fs` 
写 前锁内全文），配套 host 插件 `@
d eepseek-ai/dsh-file-changes` 注册 `fileCha 
nges` 会话投影，零写入、零格式� �
更，对 dsh 升级完全稳定。
- **� ��
�**：逐文件或全部还原 ——  客户�
��把该文件的变更按逆 序发给桌面�
��，壳层做**内� �精确匹配后替换**
（新建→删除� ��删除→恢复、修改
��回写写� �全文）；文件已被后续
改动时提 示冲突，绝不覆盖未知内
容。
- * *对话回退**：沿用 dsh 内置
的会� �分叉（消息尾部「从此处分
叉」 ），可与文件还原组合使用。

- � ��套插件随桌面端分发（`assets/p
lu gins/`），每次启动自动同步进 web
  profile 并幂等注册。

## 项目文件� ��
��与 HTML/端口预览

- 「文件� ��标签
页内新增「全部文件」子� �图：VSC
ode 风格的层级文件树（� �加载、�
�录优先排序、文件大 小/修改时间�
��本会话改过的 文件带绿点标记）�
��点击文� ��用系统默认程序打开；�
��� � host 插件注册 `GET /api/dsh-files/l
is t`（仅回环）。
- **站内侧边预览
 **（可拖宽，宽度持久化）：树中  
HTML 文件的悬停「▶」按钮或「� ��
��话修改」列表的「预览」 按钮打�
��右侧预览面板；宿� ��插件以 `GET /
dsh-files/static/<绝对� ��径>` 提供静态
文件服务，HTML 的 相对资源引用（`
./css`、`../img`）� �� URL 自然解析，�
�本地打开一 致。
- **端口预览**：�
��览面 板地址栏可直接输入 `3000` / 
`local host:5173` 等，宿主插件探测本�
� ��回环监听端口（`GET /api/dsh-files/ po
rts`）并以徽章列出，点击即预� ���
�`GET /api/dsh-files/check` 提供� �线状�
�检查（面板状态栏显示  HTTP 状态�
�。
- 预览面板带前� ��/后退/刷新/�
�部打开（系统� �览器）；全部路�
�仅接受回环 地址请求。

## 会话内
终端

- 新� ��「终端」标签页（与 �
��话/ 轨迹/文件 并列）：在当前会�
� ��的项目目录下启动持久 PowerShell  s
hell，SSE 流式输出、命令历史（ ↑/
↓）、清屏、重启、断线自动 重连
（切换标签页/刷新不丢，回 放最�
� 512KB 输出）。
- **编码* *：宿主插
件用显式 UTF-8 的 mini-RE PL（自建读�
��循环 + `Invoke-Exp ression`）绕开 Power
Shell 5.1 原生 REP L 对重定向 stdin 的�
��码漂移� ��中文输入输出双向干净�
��
-  **限制**：非 PTY（vim/htop 等全�
� ��交互程序不支持）；PowerShell 语� �
（`&&` 用 `;` 或 `if ($?)` 替代）； 多
行脚本请用 `;` 分行。
- 宿主� �件�
��由：`GET /dsh-files/term/eve nts`（SSE）
、`POST /dsh-files/term/input `、`POST /dsh-
files/term/close`，全部� �接受回环地�
��请求；断开后  shell 保留 15 分钟�
�

## 会话完 成通知

- 监听 dsh 会话
日志（`<DS H_HOME>/sessions/**/session.json
l.zstd`）� ��解码与官方持久化实现�
�致� � zstd 多帧 + JSONL 格式。
- 会�
� 格式带 turn 事件的（当前版本）� 
� `turn/end`（一轮任务真正跑完� �含
 goal 模式整体完成）时通知； 旧格
式会话以 `assistant/message` 兜� ��。子
代理会话不通知，避免刷� �。
- 通
知标题优先使用会话标题 （`session/
title`），正文含工作目� ��与短会话
 ID；点击通知回到主� �口。
- 菜单
「帮助 → 会话完成� ��知」可随时�
��关（持久化� �数据目录 `settings.js
on`）。
- Windo ws Toast 需要开始菜单�
��捷方� ��：安装版由安装器创建；�
�� �携版首次运行自动创建（指向原� �
�� exe）。

## 界面皮肤

- 设� �页新
增「皮肤」标签页：内置 10  款 Web 
UI 皮肤，卡片式网格展示� ��名称/�
�介/主色/作者/出处与� ��可角标）�
�当前皮肤高亮。
-  **默认皮肤即"�
�启用任何皮肤 "**（原生外观）：10
 款皮肤默认� ��部以 `disabled: true` �
�册，无� �改动即可保持默认外观�
�选中 某款后其余自动禁用（互斥�
�� ��），「恢复默认皮肤」一键还� 
�。
- 切换在设置页即时生效于� ��
�，**重启 Web 服务后生效**（ 服务�
�启由桌面端自动完成）� ��
- 机制�
�皮肤是 browser-only 的  dsh client 插件
（`window.__ModuleLoader __.load({id, factory
})`），桌面端启� �时把 `assets/skins/
` 下皮肤包同步� �� web profile 的 `node
_modules`，并以  `ui-skin-*` 行注册到 `
cordis.patch.yml` （幂等，已有行不重�
��，保� ��用户选择）；切换即重写�
�� �些行的 `disabled` 标记，配套插件  
`@deepseek-ai/dsh-skin-switch`（host 半边  
Typert Remote + 设置页 tab）负责列� ��/
切换/恢复。
- **内置皮肤一览* *：


| 皮肤 | 出处 | 许可 |
| --- |  --- | -
-- |
| xp（Windows XP 风格） | [ dsh-web-u
i](https://github.com/zhu109009365 9/dsh-web-u
i) | BSD-3-Clause |
| qq98（QQ  经典 98 风
格） | 同上 | BSD-3-Clause  |
| ths（同�
��顺风格） | 同� � | BSD-3-Clause |
| bl
ue-fantasy（蓝幻� �� | 同上 | BSD-3-Claus
e |
| dragon-heir� ��龙裔） | 同上 | BSD-
3-Clause |
| min ecraft（我的世界） | �
�上 | BSD- 3-Clause |
| trading（交易风�
�） |  同上 | BSD-3-Clause |
| whale-song�
� 鲸歌） | 同上 | BSD-3-Clause |
| miku� 
�初音未来） | 同上 | BSD-3-Clause  |
| 
maid-atelier（深海女仆工坊） |  [dsh-d
eep-whale](https://github.com/Small-t ailqwq/d
sh-deep-whale) | **CC BY-NC-SA 4.0* *（禁止
商用） |

- 皮肤来源与版 权：dsh-we
b-ui 九款皮肤包随包分� � `LICENSE`（
BSD-3-Clause，出处/作者� ��段见皮肤�
�片与包内元数据� �；maid-atelier 为�
��生创作（� �色原作：上善；DeepSee
k 元素二次 设计：ZipZipPipe；本皮肤
：Small-tai lqwq），完整署名链见包�
� `NOTI CE`，整体仅限非商业使用。�
�� ��肤包的 `LICENSE`/`NOTICE`/`README` 随
 同步一并分发到 web profile 的 `node_m 
odules` 中。

## 内置社区插件（v2. 0�
��

以下社区插件随安装包� ��发（`a
ssets/plugins/`），每次启动 自动同步
进 web profile 并幂等注册 ；`pnpm` 安�
��第三方插件后导 致模块双实例时�
��启动时的  heal 流程会自动清理遮�
��包� �重建副本。

| 插件 | 功能 | 
设� �入口 |
| --- | --- | --- |
| `dsh-web
ui- market` | 社区插件市场：浏览 awes
o me-dsh-plugin.com 收录的全部插件，� 
�键安装/卸载（含安装前试启动 探�
��）；目录中已被客户端� ��置的插�
��显示「已内置」� �标并拒绝重复�
��装 | 设置 � � 插件 → 插件市场 |

| `zat-dsh-engi ne` | 第二插件市场（Zat
 可视化市 场）：GitHub `dsh-plugin` top
ic 检索� �中文插件简介、国内镜像
兜底 |  设置 → 插件 → Zat 标签页 
|
| `ds h-plugin-manager`（v4） | 插件启�
� �管理：列出配套/用户/核心插件� ��
�启用状态，不重启切换启停 |  设�
� → 插件 → 管理 |
| `dsh-m essage-rewi
nd` | 对话回退（Trae 风格 ）：悬停�
��意用户消息 →「 编辑并回退」→
 从该消息之前分 叉新会话并自动�
�发编辑后内� ��，原会话保留 | 对�
�界面（� �息 hover 按钮） |
| `dsh-doc
k-settings ` | Skills 与 MCP 管理：技能�
�� 录浏览（EAC 内置/用户来源徽标� 
�打开目录）+ MCP 服务增删改（st dio
 / streamable-http），保存后一键� ��启
生效 | 设置 → Skills 与 MCP |
|  `dsh-p
et` | 桌面宠物：28 个透明动 画的悬
浮宠物，空闲呼吸、随机� ��作、屏
幕游走 | 随包自动启用 | 
| `dsh-dafei
yu`（v4） | 大肥鱼桌宠� ��真实会话�
��态驱动的原生� �顶窗口（六态动�
�� + 项目状 态卡 + 摸头/戳一戳；角
色素材按  ASSET_LICENSE 分发） | 默认
禁用，� ��插件 → 管理」启用 |
| `p
icturere ader` | 全能读图/读文档：视�
�� ��孪生 adapter（原生缩略图 + 粘贴� �
�用自动分析，opencode 等 pi-ai pr ovide
r 也可用，杜绝 UNSUPPORTED_CONTE NT）�
�隐私/智能/严谨三模式； 本地工具
链（像素扫描/3 引擎 OCR /裁剪/取色
/对比/批量）；pdf/word/ excel/ppt 转图
片；可选外部 VLM 桥� ��OpenAI 兼容端
点） | 设置 → 图� �阅读 |
| `dsh-sou
l-md` | soul.md 人设� ��：可视化编辑�
�设，热重载� �时生效；未配置时�
�册空 secti on，**完全不影响官方系�
��提 示词** | 设置 → 人设卡 |
| `dsh
-we b-mobile-fix` | Web UI 移动端适配修� 
�� | 随包自动启用 |
| `dsh-easy-se tup` 
| 一键迁移（一键夺舍）：选 择目�
�� → 新建工作区与对� � → AI 全程
可视化迁移 skills / MCP  / 记忆 | 设�
� → 一键迁移 |
|  `dsh-change-review`（
v4） | AI 变更审� ��：监控本会话文�
��改动，� �动/自动让模型复查自己
刚做的� �动（正确性/安全性/目标�
��� ��性），配合「文件」页一键还� 
�� | 设置 → AI 变更审核 |
| `dsh -undo
-savepoint`（v4） | 崩溃急救与� ��销�
�配置/插件代码快照、undo /redo、一�
��安全模式、密钥� �敏 vault、跨机�
��移 ZIP | 对� �顶部 undo/redo 按钮 + �
��照面� �� |
| `@deepseek-ai/dsh-openclaw-br
idge`� �v4） | 微信 ClawBot / OpenClaw 桥
：� �信扫码绑定后在小程序里驱动
常 驻 DSH 会话；OpenAI 兼容端点；第
� ��方模型端点 | 设置 → ClawBot |
| ` 
@deepseek-ai/dsh-float-window`（v4） | 会 �
��浮窗：把会话弹出到独立� ��口分�
��多任务 | 会话头部� �弹出到独立�
��口」 |
| `@dsh-e xternal/dsh-side-session`
（v4） | 侧边� ��时会话：浮窗追问�
��不写� �会话、多种回答引擎 | Ctrl
+Shift+S  |
| `dsh-session-manager`（v4） | 
会话 删除与归档管理：会话行「删
除� ��话」+ 归档恢复/删除面板 | 会
� �菜单 + 设置面板 |
| `@vlln/dsh-navba
 r`（v4） | 对话节点导航条：右缘� �
�点串快速跳转 user 消息（悬停 预�
�/点击跳转/滚轮切换） | � �包自动
启用 |
| `@deepseek-ai/dsh-conv ersation-twe
aks`（v4） | 对话微调：� ��藏大量工
具调用/结果/思考输出 ，保留每轮�
��终总结 | 设置  → 通用 |
| `@deepsee
k-ai/dsh-prompt-cus tom`（v4） | 自定义�
�入提示词� ��整体替换/追加官方 per
sona | 设� � → 提示词 |
| `@deepseek-ai
/dsh-third -party-thinking`（v4） | 第三�
� Ope nAI 兼容模型的 reasoning_effort 控
件 （字段名可自定义） | 模型参数
� �� |
| `dsh-offpeak`（v4） | 峰谷价格� �
��士：高峰时段（北京时间 9- 12 / 14
-18 点）发送前拦截提醒，� �键继�
�或定时到闲时价自动执 行（浏览�
�不在线也执行） | � ��送时弹窗（�
�插件 → 管理」 可关闭） |

> **Wind
ows 文件锁排队 **：运行中的 Web 服�
��加载着 原生模块（sqlite-vec 等 DLL�
��� ��，插件安装/卸载会遇到 `EPERM` 
� ��件锁 —— 任务会自动排队（`.ds 
h-market-pending.json`），下次服务重� ��
�前（无锁窗口）自动完成，� �场�
�面提供「立即重启并完成 」按钮�
�
>
> **NSIS 升级修复**� �安装器在卸
载旧版前自动结束新 旧进程，修复
了旧版 "Failed to unin stall old applicatio
n files: 2"（应用运 行中导致文件被�
��）。

## � �出行为三档（v2.2）

�
�题栏「 ⋯」菜单 →「关闭窗口时�
�� ：**每次询问 / 后台运行（最小� 
�到托盘）/ 直接退出**。选「每� ���
��问」时点关闭弹窗（「� �小化到�
��台 / 退出程序」+� �记住我的选择
」勾选），旧版 `c loseToTray` 布尔设
置自动迁移。配� ��存于 `<userData>/se
ttings.json` 的 `ex itAction`。

## 内置 S
kills 分发（v2. 2）

`assets/skills/<kebab
-name>/SKILL.md`  随包分发，启动时同�
��进 `~ /.dsh/skills/`（dsh 内核默认扫�
�� ��根，零配置）：带 `.eac-skill.json`  
标记的技能随版本覆盖更新；用� ��
自建同名目录永不覆盖；不删� �用
户的任何内容。当前内置：`ea c-desk
top-tips`（客户端功能速查）� ��

## �
��源码构建

要求：Wind ows + Node.js（
仅构建机需要）+ npm� ��

```powershell

npm install                     # 安装 dsh /
 electron / electron-bu ilder
npm run fetch-ru
ntime          # 内� �� node.exe + npm CLI（
构建与开发都� ��要）
npm start        
              # � ��发模式启动（窗口�
�跑 Web UI� ��
npm run dist                  
 # 构建  portable + NSIS 安装包，输出�
��  dist/
```

> 网络受限时：Electron � 
�进制镜像 `$env:ELECTRON_MIRROR='https ://
npmmirror.com/mirrors/electron/'`（可  `npm 
run electron:fetch` 手动补拉）； 打包�
��具链镜像 `$env:ELECTRON_ BUILDER_BINARIE
S_MIRROR='https://npmmirror. com/mirrors/elect
ron-builder-binaries/'`。 
>
> 开发辅助�
�本：`node scripts/ check-latest.js`（检�
�/试装更新� �、`node scripts/test-watche
r.js`（通知 检测单测）、`node scripts
/inspect-ses sion.js <file>`（会话日志事
件词表� ��。

## 架构

```
┌───�
�� ──────────────� 
��────────────� ��─�
��─────────� �────�
��─────── ──┐
│  Electro
n 壳 (main.js)                               
     │
│  · � �实例锁 / 窗口 / 菜�
�� / 生命 周期                       │
�
��   · 会话完成监听 (session-watcher.js
)  → 系统通知            │
│  · 官 
方更新 (updater.js) → 用户同意后� �
装 overlay          │
│  · spawn ven dor
|resources 里的 node.exe                    
│
└──────────� ��─�
�─┬────────� �───�
�───────── ─────�
�───────� ��──────�
�┘
                │  dsh web --host 127.0
.0.1 --port 0
                ▼
       内�
� node.exe  + @deepseek-ai/dsh
       路径�
�析� �用户目录 overlay > 内置包
     
  � �出 "dsh web: http://127.0.0.1:<port>"
 
               │  解析 URL，轮询 HTTP 2
 00
               ▼
       原生窗口加� ��
�� Web UI（仅本机回环访问）
 ```

关
键决策：

| 决策 | 原因 |
|  --- | ---
 |
| `asar: false` | dsh 依赖 s harp / node-
pty / koffi 等原生模块，� ��须以真实
文件落盘 |
| 内置独立  node.exe + npm 
| 预编译原生模块 ABI  与安装时的 N
ode 版本绑定；Electr on 内嵌 Node ABI �
��同。内置同 版本 node.exe 零配置保
证一致，npm  用于官方更新。注意�
�electron- builder 复制 extraResources 时�
�剥� ��嵌套 node_modules，npm 自己的依
赖 由 \`afterPack\` 钩子原样补拷（scr
i pts/after-pack.js） |
| `npmRebuild: false` 
 | 绝不为 Electron 重编译原生模块� ��
�否则内置 node.exe 反而加载不� �� |
|
 `--port 0` + 解析 stdout | 由 OS  分配�
�闲端口，避免端口冲突� ��本机回�
�绑定不对外暴露 |
|  退出时 `taskkil
l /T /F` | dsh 会派生  pwsh 等子进程，
按进程树整体回� � |
| 更新走 overla
y + staging 原子切 换 | 更新失败零风
险；便携版（� ��源每次从 exe 解压�
��也能持 久更新 |
| 通知读会话日�
�而� � UI 协议 | 持久化格式是官方�
� ��定接口；UI 的私有 RPC/SSE 协议� ��
��本变化，容易失效 |

## � �志与排
障

- `desktop.log`：壳层日� ��（启动�
��数、端口、通知� �更新、退出）

- `dsh-web.log`：dsh w eb 的完整 stdout/st
derr
- `update.log`� �官方更新的 npm 安
装日志

位置� �便携版 `data\logs\`；
安装版 `%APPDA TA%\Deepseek Harness EAC\log
s\`。
菜单� �视图 → 打开日志目录
」可直接� ��开。

常见问题：

- **W
indows 提� ��"已保护你的电脑"（SmartS
creen）* *：本项目采用零证书分发�
�略 （不购买代码签名证书，详见 [
� �发信任指南](docs/CODE_SIGNING.md)）� 
��—推荐改用 `winget install --id  200901
06-520.Deepseek-Harness-EAC` 安装� �基本�
��触发弹窗）；直接下 载的 exe 首�
�运行点「更多信� � → 仍要运行」
即可，下载量积� ��后警告自动消失
；也可用 `Get-Fi leHash` 对照 Release �
�带的 `SHA256 SUMS.txt` 自验文件完整�
�。
- **� ��次启动慢**：dsh 首次引导
 profile  需要数秒到数十秒，属正常
现象 。
- **更新下载慢**：设置环�
� 变量 `NPM_CONFIG_REGISTRY=https://registry 
.npmmirror.com` 后重启应用。
- **收� �
到通知**：确认菜单「会话完成� ���
��」已勾选；便携版确认� �始菜单�
��存在「Deepseek Harnes s EAC」快捷方�
�（首次运行自� �创建，勿删除）�
�检查 Windows� ��通知与操作」设置里
应用通知� �被禁用。
- **端口被占*
*：应用� �动使用空闲端口，无需�
�动处 理。

## 目录结构

```
dsh-deskt
op/
� ��── main.js               # Electro
n � ��进程（无边框窗口/托盘/自绘 c
h rome IPC + 余额推送 + 客户端自更新 
 + 快捷方式维护）
├── updater.j s
            # dsh agent 官方更新引擎 （
检查 / 同意后安装 / 回退）
├ ─�
� client-updater.js     # 客户端 （封装�
��）自更新引擎（GitH ub/Gitee 双源 + 
分片合并 + 原地替� ��）
├── bala
nce.js            # Dee pSeek 账户余额查�
��（主进程� ��
├── session-watcher.j
s    # 会话 完成监听（zstd 多帧解码
 + turn/end  检测）
├── preload.js   
          # 沙箱预加载（自绘玻璃标�
�� �栏 + 窗口控制/菜单 IPC + 余额事� 
�桥）
├── assets/               #  加
载页、更新进度页、图标、托 盘图
标、配套 dsh 插件
│   └─� �� plugi
ns/          # 桌面壳配套（ds h-balance�
��dsh-file-changes、dsh-te rminal、
│     
                    # dsh -easy-setup、dsh-sk
in-switch）+ 内置社 区插件
│         
                # （ dsh-webui-market、dsh-t
ool-vision、
│                          # d
sh-soul-md、dsh- web-mobile-fix，含 vendor 
与自包含依 赖）
│                    
     # 全部 自动同步进 web profile
├�
��─  scripts/
│   ├── fetch-node.js 
     # 内置 node.exe 复制脚本
│   ├� 
��─ fetch-npm.js      # 内置 npm CLI  复�
��脚本
│   ├── build-i con.ps1    # 
生成应用图标（透明圆 角蒙版）+ �
��盘图标
│   ├� ��─ check-latest.js  
 # agent 更新链� �测试工具
│   ├�
�─ check-clie nt-latest.js # 客户端更新
链路测试� ��具
│   ├── test-watch
er.js   # � ��知检测单测
│   └── 
inspect-s ession.js# 会话日志解析工具

├─� �� build/icon.png        # electron-bu
ilder  图标源
├── vendor/            
    # 内置 node.exe / npm CLI（fetch-runtim
e  生成，不入库）
├── electron-bu 
ilder.yml  # 打包配置
└── dist/     
             # 构建产物
```

## Licens e


MIT。基于 [@deepseek-ai/dsh](https:// www.n
pmjs.com/package/@deepseek-ai/dsh)（M IT）�
�

本项目的桌面封装最初 由 [zouyuxu
an122](https://github.com/zouyu xuan122/Deepse
ek-Harness-EAC) 开发（MIT� ��，本仓库�
�其基础上继续维� �与分发。


 