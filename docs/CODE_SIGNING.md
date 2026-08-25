# 代码签名指南（真实证书的免费与付费路径）

当前成品未签名，Windows SmartScreen 首次运行会弹「已保护你的电脑」（用户点
「更多信息 → 仍要运行」即可通过）。本文档给出接入**真实代码签名证书**的三条
路径与本仓库的接线方式 —— 凭据到位后无需再改任何构建代码。

## 三条路径对比

| 路径 | 费用 | 适用 | SmartScreen |
| --- | --- | --- | --- |
| **SignPath Foundation**（推荐） | **免费**（面向开源项目） | 公开仓库 + OSI 许可证（本项目 MIT 符合） | 信誉随下载量逐步累积，初期仍有提示 |
| Azure Artifact Signing（原 Trusted Signing） | $9.99/月起 | **个人仅限美国/加拿大**；组织支持美加欧盟英国 | 同上，信誉逐步累积 |
| 传统 CA 证书（Certum OSS 最便宜） | 约 €69 首年 + €29/续 | 全球可购，实体智能卡/USB Key | 与 OV 相同，2024 起 EV 也不再即时免提示 |

> 结论：**不花钱的真实证书只有 SignPath Foundation 一条路**。微软商店 MSIX
> 路线由微软代签免费，但需要改造分发形态，不在本仓库范围。

## 本仓库的接线方式

### 方式一：electron-builder 原生环境变量（推荐，零改动）

electron-builder 原生读取以下环境变量，设置后 `npm run dist` 自动对
Setup/Portable 两个 exe 做 Authenticode 签名；不设置则完全跳过：

```powershell
# 本地构建时
$env:CSC_LINK = 'C:\path\to\cert.pfx'        # 也支持 http(s) 直链
$env:CSC_KEY_PASSWORD = 'pfx 密码'
npm run dist
```

GitHub Actions 中把这两个值放进仓库 Secrets（`CSC_LINK` / `CSC_KEY_PASSWORD`）
即可，工作流无需感知。

### 方式二：构建后补签（scripts/sign-release.ps1）

适合 SignPath Foundation 这类在 CI 出包后由其服务签名的流程，或拿到 PFX 后
对已发布的产物补签：

```powershell
# PFX 证书（密码省略时会安全提示输入）
powershell -ExecutionPolicy Bypass -File scripts/sign-release.ps1 `
  -Certificate C:\path\to\cert.pfx

# SignPath Foundation 流程（由其 CLI/Action 完成，此处仅重算校验和）
node scripts/make-release-hashes.js
```

脚本行为：对 `dist/*-x64.exe` 逐个签名（带时间戳）→ `Get-AuthenticodeSignature`
自检 → 重新生成 `SHA256SUMS.txt`。**签名后必须重发校验和**，客户端自更新的
SHA-256 强校验以最新发布值为准。

## 各路径申请步骤

### SignPath Foundation（免费，推荐首选）

前置条件（官方要求）：公开源码仓库、OSI 许可证（MIT ✓）、GitHub 开启 MFA、
使用自动化构建（GitHub Actions）、发布《代码签名政策》页（本仓库已备：
[SIGNING_POLICY.md](../SIGNING_POLICY.md)，申请时把该文件链接提交即可）。

1. 注册 <https://signpath.io> 账号并在 GitHub 开启 MFA；
2. 在 <https://signpath.org> 提交 Foundation 项目申请（附仓库地址与政策页链接）；
3. 审核通过后创建项目与签名策略，安装 SignPath GitHub App 或在 CI 使用
   `signpath` CLI（用户凭据存 Secrets）;
4. 在 release 工作流的打包步骤之后追加签名步骤，产物替换后再上传 Release。

注意：证书主体显示为 “SignPath Foundation” 而非个人名；审核周期数天到数周。

### Azure Artifact Signing（$9.99/月，个人仅美加）

1. Azure 订阅中创建 Artifact Signing 账号 + Public Trust 证书档案，
   完成身份验证；
2. 创建服务主体（`az ad sp create-for-rbac`），输出 JSON 存为 Secret；
3. CI 中 `azure/login@v2` 登录后，用 `signtool /dlib`（Trusted Signing 的
   DLL）或社区 `azure-sign-cli` 签名，随后重算校验和。

### 传统 CA（Certum OSS 为最省钱示例）

1. <https://shop.certum.eu/open-source-code-signing.html> 下单（需身份验证，
   卡片邮寄约 1–2 周）；
2. 激活后从卡片导出/按其文档取得 PFX（或在其 Open SSL 代理工具下签名）；
3. 走上方「方式一」环境变量即可。

## 发布纪律（签名生效后）

- 签名必须带时间戳（脚本默认 DigiCert TSA），保证根证书过期后旧签名仍有效；
- 每次 `npm run dist` 后若手工签名，务必重跑校验和生成，保证 Release 资产与
  `SHA256SUMS.txt` 一致；
- 私钥/PFX 绝不入库；CI 中只经 Secrets 注入。
