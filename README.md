# People's Zoom Readers Theater

[![Deploy PZRT](https://github.com/haroldvandy2013/pzrt-astro/actions/workflows/deploy.yml/badge.svg)](https://github.com/haroldvandy2013/pzrt-astro/actions/workflows/deploy.yml)

**预览网址：<https://haroldvandy2013.github.io/pzrt-astro/>**

**内容管理：<https://app.pagescms.org/>**

Astro + Pages CMS + GitHub Pages，全静态网站，为之后从 Wix 迁移做准备。现在仍使用 GitHub 的项目网址，**没有修改 www.pzrt.org 的 DNS 或原 Wix 网站**。

排版遵循原 Wix 网站：深蓝页眉、Logo 与 Dancing Script 组织名称、Jura 导航/标语、金色标题与页脚；首页按 Who We Are → 海报 → Get Involved 的原顺序呈现。桌面使用单张海报轮播及缩略图，手机恢复上下居中的 Logo/组织名称、居中介绍和横向滑动海报。视频保持两列及 Load More，文章保持三列错落卡片及分页（小屏自适应）。使用原有 Padlet 留言板，保留已确认的邮件联系并去掉聊天/表单；按用户选择不显示 Wix 文章浏览量、点赞和评论统计。

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
- 8 篇旧文章现已导入完整正文和内文图片，使用清理过的 HTML 与限定样式类保留原来的字号、行距、加粗、下划线和高亮。编辑后核对预览；可视化编辑器可能简化这些旧格式。新文章不需要打开 **Preserve original Wix article formatting**，使用标准段落间距即可。**Reading time**、作者照片及 **Last updated date** 都可选。

### 新增、编辑、删除视频

- 在 **Performance videos** 新建条目，填标题、YouTube 视频链接或 11 字符 ID，以及显示顺序（数字小的先显示）。可用 Draft 暂时隐藏。
- 支持 HTTPS `youtube.com/watch?v=…`、`youtu.be/…`、`youtube.com/shorts/…` 或 `youtube.com/embed/…`。
- 视频仍托管在 YouTube。**不要把 mp4 / mov / webm 上传到 GitHub。** 视频卡片使用 YouTube 缩略图；点击海报或标题才加载隐私增强播放器和完整说明，弹窗中可直接打开 YouTube。没有 JavaScript 时海报和标题仍链接 YouTube。列表先显示 6 条，Load More 每次显示更多条目。
- 编辑条目可替换链接；删除条目只删除网站入口，不会删除 YouTube 上的视频。

### 首页、联系信息、图片

在 **Homepage, contact & bulletin wall** 编辑介绍段落、Get Involved 插图、海报轮播和联系信息。保留准确的图片描述，方便屏幕阅读器用户。海报按列表顺序展示：桌面可点箭头或缩略图切换，手机可横向滑动；也支持键盘左右键。

联系地址目前为 `readerstheater2014@gmail.com`，Contact Us 是邮件链接。文章中原来指向 Alexis 的旧邮箱也已更新为此地址。没有 Wix Let's Chat、注册表单或提交表单。

图片上传目录为 `public/media`，只接受常见图片格式；封面和首页图片在构建时生成响应式 WebP。图片有版权，请仅上传有授权的素材。原站图片使用原始全尺寸文件下载，不使用 Wix 的模糊占位缩略图。

### 沿用原 Padlet 留言板

**用户已选择继续使用原留言板：<https://padlet.com/liuyuguan88/1bh5rkyn2isyfofa>。** 与 Wix 嵌入的是同一个板；原有帖子、评论、附件和反应仍存储在 Padlet，不需要导入、复制或重新创建。

1. 在 CMS 的 **Padlet board URL** 保留上面的原板链接，即可继续显示现有内容。
2. 隐私、发帖权限和审核由 Padlet 管理。本次没有修改任何 Padlet 权限。需要调整时，由拥有权限的人登录 Padlet，在 Share 中设置查看权限；希望访客新增帖子时启用 Writer，并按需要设置审核。
3. 如以后要换板，先在自己的 Padlet 账号中完成创建或复制，再填入其 `https://padlet.com/<用户>/<板ID>` 或 `https://padlet.com/embed/<板ID>` 链接，不带查询参数。
4. 页面提供响应式 iframe 和“Open it on Padlet”备用链接。把字段清空并保存可断开显示，**不会删除 Padlet 内容**。不需要、也不要输入密码或 Padlet API key。

## 本次内容范围与尚待迁移事项

源站核对时间：2026-11-07（美国太平洋时间）。

- 保留主要页面：`/`、`/videos/`、`/blog/`、`/bulletin-wall-2021/`、`/contact/`，以及 8 个原 `/post/.../` slug。GitHub 预览网址的前面都有 `/pzrt-astro/`。
- 首页介绍使用原站 Who We Are 正文。照片、Logo、海报来自原站全尺寸媒体。
- 8 篇文章的完整正文、49 个内文图片位置、标题、作者和封面均从原站取回。发布日期按照原网页显示的美国太平洋时间日期保存，避免把午夜 UTC 当作次日；保留原文显示的阅读时间和更新日期。文章仍使用原 slug；文章列表每页 6 篇，包含 `/blog/page/2/`。
- `Zoom Enchanted Evenings` 正文里的原 YouTube 歌曲播放器也已保留，点击才加载视频。
- `The Story of PZRT` 保留原文的历史时间和“currently working”语句，是原文的历史叙述，不表示网站自动更新项目状态。
- 已展开 Wix 的全部 Load More，导入视频页面当时公开列出的 **23 个 YouTube 条目**，包括标题、时长和原有说明。这不代表 YouTube 频道上不存在其他视频；新增或以后发布的内容仍需 CMS 更新。
- 没有迁移 Wix 文章评论、会员或论坛；根据用户确认，不显示文章浏览量、点赞和评论统计。Padlet 使用同一个真实留言板，其内容仍由 Padlet 实时提供。
- 旧健康资源正文及链接按历史原文保留，不应把它们当作现行医疗建议。部分历史资源链接仍是 HTTP 或第三方 PDF；本次没有擅自改写资源内容。之后正式迁移前应另行核对链接、版权与时效。
- 没有把 `/news`、`/programs`、`/meet-the-team` 等未核实的旧/模板内容加入主导航。Pages CMS 账号授权仍需人工完成。

正文保留原站使用的旧版开源 Barlow 字体，许可证位于 `src/styles/fonts/OFL.txt`。没有复制 Wix 的专有 Avenir LT 字体；联系区使用系统字体回退。正文图文环绕和手机主体布局已还原，但内容核对不等于逐像素一致：局部换行、间距、字体回退和第三方组件仍可能不同，不能宣称所有页面、所有屏幕完全一致。

图片源地址为 `https://static.wixstatic.com/media/<原始文件名>`：

补齐的内文图片及作者照片使用 `wix-<原始文件名>` 命名（文件名中的 `~` 改成 `-`，例如 `~mv2` 对应 `-mv2`），仍来自同一 Wix media 地址，使用原始全尺寸文件。

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

GitHub 仓库 **Settings → Pages → Source: GitHub Actions**。`.github/workflows/deploy.yml` 在 main 有新提交时安装锁定依赖、检查、构建、上传和部署。Actions 使用 `contents: read`、`pages: write`、`id-token: write`，不需要部署密钥。因 Pages 文件同步曾超过默认 10 分钟，部署步骤允许等待最多 30 分钟；超时仍会明确失败，不会当作发布成功。部署结果以 badge、Actions 日志和 Pages URL 为准。

静态输出使用 `trailingSlash: always` 和每个路由的 `index.html`，文章深层链接可直接打开/刷新。未知页面有独立 404，不依赖 SPA fallback。

## 以后迁移到 www.pzrt.org（现在不要执行）

先完成内容和版权审查、Padlet 设置、完整迁移和链接检查，备份 Wix，再由域名持有人选择切换时间。

正式切换时：在 `astro.config.mjs` 将 `site` 改为 `https://www.pzrt.org`、`base` 改为 `/`，并把 Markdown URL 插件的 base 一并改为 `/`；更新构建验证脚本的 base。CMS 媒体路径保持 `/media`，不需要重新上传。更新 README 和页面中“Migration preview”提示及测试断言。

在 Pages 设置添加域名，按 GitHub 官方文档配置 DNS、验证域名并启用 HTTPS；需要时添加 `public/CNAME`。保持旧 `/post/.../` 文件名和主要页面路径，检查旧文章跳转、旧外链和搜索引擎索引，再停用 Wix。**当前未添加 CNAME，也未更改任何 DNS。**

参考：[Pages CMS 官方配置](https://pagescms.org/docs/configuration/) · [Astro GitHub Pages](https://docs.astro.build/en/guides/deploy/github/)
