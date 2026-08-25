# 代码签名政策（Code Signing Policy）

本页是 Deepseek Harness EAC 项目的公开代码签名政策，供 SignPath Foundation
申请与社区监督使用。

## 签署对象（What gets signed)

仅签署本仓库自动化构建（GitHub Actions / 维护者本机 `npm run dist`）产出的
以下 Windows 可执行文件：

- `Deepseek-Harness-EAC-Setup-v<version>-x64.exe`（NSIS 引导安装器）
- `Deepseek-Harness-EAC-Portable-v<version>-x64.exe`（便携版自解压运行器）

绝不签署：来自第三方未经审核的二进制、非本仓库构建流水线的产物。

## 构建与来源完整性（Build provenance）

- 待签产物必须由本仓库 `main` 分支对应 tag（`vX.Y.Z`）的提交构建而来；
- 构建输入包括：仓库源码、npm registry 上锁定的依赖版本（`package-lock.json`）、
  固定版本的 Node 运行时（`scripts/fetch-node.js` 校验哈希）；
- 每次发布同时上传 `SHA256SUMS.txt`，任何人可复验资产完整性。

## 审批流程（Who approves）

- 签名任务由维护者（@20090106-520）人工触发或审批，不做全自动无审签发；
- 版本号变更、依赖变更、安装器脚本（`build/installer.nsh`）变更的提交必须
  由维护者本人完成或审查后方可进入发布构建。

## 私钥保护（Key protection)

- 签名私钥全程托管于 SignPath Foundation HSM（或等价云 KMS），本项目任何
  成员不持有、不导出私钥材料；
- 访问凭据仅存于 GitHub Actions Secrets / 维护者本地安全存储，绝不入库。

## 异常响应（Incident response）

- 发现未预期产物被签或私钥疑似滥用时，立即通过 SignPath 撤销相关签名并
  在仓库发布安全公告（GitHub Advisory / Release 置顶说明）；
- 受影响版本从 Releases 页面标记撤下，用户经应用内自更新收到修复版。

## 用户验证（How to verify）

```powershell
Get-AuthenticodeSignature .\Deepseek-Harness-EAC-Setup-v<version>-x64.exe
# Status 应为 Valid，且时间戳存在
```

联系渠道：<https://github.com/20090106-520/Deepseek-Harness-EAC/issues>
