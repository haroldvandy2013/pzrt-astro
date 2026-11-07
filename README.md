# People's Zoom Readers Theater

[![Deploy PZRT](https://github.com/haroldvandy2013/pzrt-astro/actions/workflows/deploy.yml/badge.svg)](https://github.com/haroldvandy2013/pzrt-astro/actions/workflows/deploy.yml)

**预览网址：<https://haroldvandy2013.github.io/pzrt-astro/>**

**内容管理：<https://app.pagescms.org/>**

Astro + Pages CMS + GitHub Pages，全静态网站，为之后从 Wix 迁移做准备。现在仍使用 GitHub 的项目网址，**没有修改 www.pzrt.org 的 DNS 或原 Wix 网站**。

排版遵循原 Wix 网站：深蓝页眉、Logo 与 Dancing Script 组织名称、Jura 导航/标语、金色标题与页脚；首页按 Who We Are → 单张海报轮播及缩略图 → Get Involved 的原顺序呈现。视频保持两列，文章保持三列卡片（小屏自适应）。不再使用重新设计的宣传大标题或首页文章区。保留已确认的邮件联系、去掉聊天/表单和空 Padlet 状态。

## 非前端维护者：从这里开始

1. 打开 [Pages CMS](https://app.pagescms.org/)，用有此仓库写入权限的 GitHub 账号登录。
2. 按页面提示授权 Pages CMS 访问 `haroldvandy2013/pzrt-astro`。仓库公开不等于已经完成 CMS 授权；需要账号持有人亲自完成。
3. 选择仓库和 **main** 分支。根目录 `.pages.yml` 会提供 Articles、Performance videos 和 Homepage, contact & bulletin wall 三组编辑入口。
4. 保存后 CMS 会把变更提交到 GitHub。等待 [Actions 部署](https://github.com/haroldvandy2013/pzrt-astro/actions/workflows/deploy.yml) 显示绿色成功，再刷新预览。构建失败时，旧的成功版本不会被替换。

此仓库是 PUBLIC：文章、图片和设置都公开。不要上传私人资料、API key 或视频文件。Pages CMS 是独立服务，网站访客不需要登录 CMS。

### 新增、编辑、删除文章

- 在 **Articles** 点新增，填写标题、日期、作者、简短介绍、封面、图片描述和正文。正文使用可视化编辑器，可插入图片或 HTTPS 链接。
- 新文章的 **Migration status** 选 `complete`；`Original Wix article` 可以留空。只有未完整导入的旧文章选 `excerpt`，并保留原文链接。
- **Draft** 开启时，文章不会出现在网站，也不会生成公开文章页面；它仍在公开 GitHub 仓库中，不适合保存私密草稿。
- 文章网址由文件名决定，例如 `the-story-of-pzrt.md` → `/pzrt-astro/post/the-story-of-pzrt/`。改标题不会改变现有网址；不要随意重命名已经发布的文章文件。
- 编辑现有条目并保存即可更新。删除条目会删除它的文章页。文章链接采用 `https://…`、`mailto:…` 或站内 `/post/…/`；图片由上传功能生成 `/media/…` 路径，程序会自动处理 GitHub Pages 前缀。

### 新增、编辑、删除视频

- 在 **Performance videos** 新建条目，填标题、YouTube 视频链接或 11 字符 ID，以及显示顺序（数字小的先显示）。可用 Draft 暂时隐藏。
- 支持 HTTPS `youtube.com/watch?v=…`、`youtu.be/…`、`youtube.com/shorts/…` 或 `youtube.com/embed/…`。
- 视频仍托管在 YouTube。**不要把 mp4 / mov / webm 上传到 GitHub。** 视频卡片使用 YouTube 缩略图；点击 Play here 才加载隐私增强播放器，另有直接打开 YouTube 的链接。
- 编辑条目可替换链接；删除条目只删除网站入口，不会删除 YouTube 上的视频。

### 首页、联系信息、图片

在 **Homepage, contact & bulletin wall** 编辑介绍段落、Get Involved 插图、海报轮播和联系信息。保留准确的图片描述，方便屏幕阅读器用户。海报按列表顺序展示，可点箭头或缩略图切换，也支持键盘左右键。

联系地址目前为 `fingerag@drexel.edu`，Contact Us 是邮件链接。没有 Wix Let's Chat、注册表单或提交表单。

图片上传目录为 `public/media`，只接受常见图片格式；封面和首页图片在构建时生成响应式 WebP。图片有版权，请仅上传有授权的素材。原站图片使用原始全尺寸文件下载，不使用 Wix 的模糊占位缩略图。

### 临时空 Padlet 留言板

**目前没有创建真实 Padlet 板，也没有连接旧板。** 网站展示明确的空/未配置状态，不假装能提交留言。

1. 用自己的 Padlet 账号创建一个 **NEW、EMPTY** board；不要复制旧板或导入历史留言。
2. 设置合适的隐私与访客权限。需要访客能新增帖子时，使用 Padlet 的 Writer 权限，并按需要启用审核。此行为由 Padlet 提供，不是静态网站后台。
3. 复制 `https://padlet.com/<用户>/<板ID>` 或 `https://padlet.com/embed/<板ID>` 链接，不带查询参数。
4. 在 CMS 的 **New Padlet board URL** 粘贴链接并保存。重新部署后，页面显示响应式 iframe 和“Open it on Padlet”备用链接。
5. 随时把字段清空并保存，即可恢复空状态。**不需要、也不要输入 Padlet API key。**

## 本次内容范围与尚待迁移事项

源站核对时间：2026-11-06（美国太平洋时间）。

- 保留主要页面：`/`、`/videos/`、`/blog/`、`/bulletin-wall-2021/`、`/contact/`，以及 8 个原 `/post/.../` slug。GitHub 预览网址的前面都有 `/pzrt-astro/`。
- 首页介绍使用原站 Who We Are 正文。照片、Logo、海报来自原站全尺寸媒体。
- 文章元数据（标题、作者、发布日期）核对了 Wix BlogPosting 结构化数据。`The Story of PZRT` 和 `Take the Chance` 已导入正文；其余 **6 篇目前是选段**，页面明确标记并链接完整原文。仍需导入这些完整正文、全部内文图片，并核对格式/图片描述。
- `The Story of PZRT` 保留原文的历史时间和“currently working”语句，是 2026 年原文，不表示网站自动更新项目状态。正文图片仅选择部分原图，未承诺完整媒体迁移。
- 视频仅预置 6 个经核对的 YouTube 条目。Wix 的 Load More 后还有更多视频，**没有声称迁移了全部视频**。后续可在 CMS 继续添加。
- 没有迁移 Wix 文章评论、会员、论坛或旧 Padlet 历史；也没有复制 `/news`、`/programs`、`/meet-the-team` 等未核实的旧/模板内容到主导航。
- 旧健康资源文章保留为历史选段；完整导入前应核对过期链接、联系电话和医疗资源时效，不应把历史资源当作现行医疗建议。
- Padlet 创建及 Pages CMS 账号授权仍需人工完成。

图片源地址为 `https://static.wixstatic.com/media/<原始文件名>`：

| 本地文件 | 原始文件名 |
|---|---|
| pzrt-logo.jpg | a76bb0_2b0ed1ec5a13418185fac03ccd5150d7~mv2.jpg |
| zoom-rehearsal.png | a76bb0_fdbf24318981474494dccce1b7d10507~mv2.png |
| rising-setting-sun.png | a76bb0_57a32b8efff74598ba6841823105201d~mv2.png |
| no-time-to-give-up.png | a76bb0_2e7d833270a644158a00aad278a2957d~mv2.png |
| clybourne-park.png | a76bb0_bbb16dc304f1475480fc7a8c2ba9d137~mv2.png |
| story-of-pzrt.png | a76bb0_ca40dde863044743b0f82e38f6db0ebf~mv2.png |
| mark-story.png | a76bb0_7110cff82eef46b6ab7dad545a56d358~mv2.png |
| pandemic-mask.png | a76bb0_543300df264349fea77af0e5af3a97c0~mv2.png |
| no-shame.jpeg | a76bb0_bff26df21b4749a09af0854f97642797~mv2.jpeg |
| take-the-chance.jpg | 87f4aa163a794af7a9a45e9e409d4fd3.jpg |
| evolution.jpg | a76bb0_718e92bcc83842dfa4a974ded7a93a81~mv2.jpg |
| zoom-enchanted.jpg | a76bb0_14ea33d60aaf4d50b565807e47dfff3b~mv2.jpg |
| first-performance.jpg | a76bb0_1a189971713a4a1bae9271a45773edfc~mv2.jpg |
| supreme-court-poster.png | a76bb0_a57bd1aa41bc4038a0e50900850029f1~mv2.png |
| no-shame-poster.jpg | a76bb0_8365980c00214441903d0100a6e11470~mv2.jpg |
| just-one-more-poster.png | a76bb0_2f54bd5f071e44959563bde7eea1b487~mv2.png |
| get-involved.png | a76bb0_fe8dc36981c8431991525d570b2e12c7~mv2.png |

## 开发与部署

使用 Node **24 LTS**（Astro 最低要求 22.23.4），npm 和已提交的 lockfile：

```sh
npm ci
npm run dev
# 打开命令输出的地址，并带上 /pzrt-astro/
npm run verify
npm run preview
```

`npm run verify` 执行 Astro 类型/内容检查、URL 和 CMS 配置测试、静态构建、生成页面链接检查。严格内容校验和图片缺失会让构建明确失败，不会悄悄发布损坏页面。

可选浏览器检查（首次需下载 Chromium）：

```sh
npx playwright install chromium
node scripts/verify-preview.mjs https://haroldvandy2013.github.io/pzrt-astro/ /tmp/pzrt-screenshots
```

GitHub 仓库 **Settings → Pages → Source: GitHub Actions**。`.github/workflows/deploy.yml` 在 main 有新提交时安装锁定依赖、检查、构建、上传和部署。Actions 使用 `contents: read`、`pages: write`、`id-token: write`，不需要部署密钥。部署结果以 badge、Actions 日志和 Pages URL 为准。

静态输出使用 `trailingSlash: always` 和每个路由的 `index.html`，文章深层链接可直接打开/刷新。未知页面有独立 404，不依赖 SPA fallback。

## 以后迁移到 www.pzrt.org（现在不要执行）

先完成内容和版权审查、Padlet 设置、完整迁移和链接检查，备份 Wix，再由域名持有人选择切换时间。

正式切换时：在 `astro.config.mjs` 将 `site` 改为 `https://www.pzrt.org`、`base` 改为 `/`，并把 Markdown URL 插件的 base 一并改为 `/`；更新构建验证脚本的 base。CMS 媒体路径保持 `/media`，不需要重新上传。更新 README 和页面中“Migration preview”提示及测试断言。

在 Pages 设置添加域名，按 GitHub 官方文档配置 DNS、验证域名并启用 HTTPS；需要时添加 `public/CNAME`。保持旧 `/post/.../` 文件名和主要页面路径，检查旧文章跳转、旧外链和搜索引擎索引，再停用 Wix。**当前未添加 CNAME，也未更改任何 DNS。**

参考：[Pages CMS 官方配置](https://pagescms.org/docs/configuration/) · [Astro GitHub Pages](https://docs.astro.build/en/guides/deploy/github/)
