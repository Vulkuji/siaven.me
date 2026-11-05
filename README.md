# Siaven Portfolio

`siaven.me` 的静态作品集，使用 React、TypeScript、Motion、Radix 与 Tailwind CSS，以 Cloudflare Workers 静态资源形式部署。首页是一条随滚动贯穿全页的蓝色绳子串起的长页：个人信息、精选作品、工作经历与联系方式；另有全部作品页、作品详情和可拖动的画布版。

## 目录

- `src/App.tsx`：页面组装。首页与全部作品页共用绳子、光标和页面动效，画布版独立。
- `src/components/home/`：首页各区块（首屏、自述、精选作品、经历、联系）。
- `src/components/all-work.tsx`：全部作品页，含行业筛选、网格与列表两种布局。
- `src/components/rope-layer.tsx`、`src/lib/rope.ts`：绳子。路径用 d3-shape 的 B 样条生成，保证处处平滑，挂点吸附在绳子穿过段落边界的位置，结尾画出 logo 的猫。
- `src/components/site-header.tsx`：页头、中英文切换。
- `src/components/work-detail.tsx`：基于 Radix Dialog 的作品详情。
- `src/components/canvas/`：画布版（`#playground`），包含拖动与惯性、滚轮平移、双击回到中心和空闲漂浮。
- `src/hooks/`：哈希路由、换页遮罩、手电光、景深、文字点亮、字母响应鼠标、进场清晰、页头配色、画布平移。
- `src/i18n.ts`、`src/locales/`：基于 i18next 的中英文界面；作品与简历内容以 `{ zh, en }` 结构存放在数据文件中。中文页以英文为大标题、中文为辅助，英文页只显示英文。
- `src/data/portfolio.ts`：作品类型、分类与个人信息；`works.json` 由导出脚本生成。
- `src/data/showcase.ts`：精选作品的顺序、底色、背景大字与每张图的位置。
- `src/data/rope-routes.ts`：绳子在各区块的控制点。
- `src/data/resume.ts`：中英文简历内容。
- `src/data/canvas-layout.ts`：画布尺寸、初始中心与各元素坐标。
- `src/index.css`、`src/styles/`：主题令牌与按区域拆分的样式。
- `static/`：作品图片（`works/`、`covers/`、`cards/`、`showcase/`）、背景肌理（`texture/`）、站点标识（`favicon.svg` 同时用于页头，另有 `favicon.ico`、`apple-touch-icon.png`）与响应头（`_headers`）。
- `content/works.json`：作品与素材文件夹的对应关系，以及各处图片的裁切。
- `tools/export.mjs`：读取素材文件夹，生成 WebP 图片与 `src/data/works.json`。
- `tools/prerender.mjs`：将 React 页面预渲染为静态 HTML，分别输出中文（`/`）与英文（`/en/`）页面。
- `wrangler.jsonc`：Worker 名称、构建命令、静态资源目录与自定义域。

## 开发与构建

```sh
npm ci
npm run dev
npm run build
npm run preview
```

Vite 构建客户端资源，预渲染脚本生成静态 HTML 并为内联脚本写入 CSP 哈希；浏览器通过 React hydration 接管交互。字体由 Fontsource 自托管。路由通过哈希切换：`#all-work`、`#all-work/<分类>`、`#playground`、`#works/<作品 ID>`，其余哈希是首页锚点（`#works`、`#experience`、`#contact`）。英文版位于 `/en/`，页头的语言切换会改写地址并记住选择；首次访问首页时，非中文浏览器会进入英文版。

## 素材更新

```sh
npm run export -- /path/to/网站作品整理
```

每个作品对应一个以两位序号开头的文件夹，序号与 `content/works.json` 的 `folder` 一致。文件夹内的图片按文件名排序展示，GIF 转为动态 WebP；作品标题取自文件夹名称（去掉序号，下划线显示为 ·）；`介绍.txt` 提供所属分类、作品标签（`中文 / ENGLISH`）、`英文名称`、`英文介绍`、一句话介绍，以及可选的项目背景、我负责的部分、设计思路和最终成果；详细描述的英文分别写在 `英文项目背景`、`英文我负责的部分`、`英文设计思路`、`英文最终成果`。缺少必填字段时导出会报错并指出文件夹。导出脚本会重建 `static/assets/works`、`covers`、`cards`、`showcase` 与 `src/data/works.json`。

`content/works.json` 中每件作品的 `card` 决定作品档案卡片的 4:5 取景：`image` 为素材文件夹内按文件名排序的第几张图（从 1 开始）；`focus` 为对焦点 `[横向, 纵向]`，取值 0–1，0 为左或上边缘，1 为右或下边缘；`zoom` 为取景范围，1 表示该图能容纳的最大 4:5 范围，数值越小画面放大越多。`cover` 的 `crop` 为画布版封面的裁切框 `[左, 上, 右, 下]`，同样取值 0–1。`showcase` 列出首页精选作品的配图：`image` 是第几张图，`crop` 为裁切框（省略则用整张），`width` 为输出宽度；图的摆放位置和背景大字在 `src/data/showcase.ts`，换字后要按实测更新其中的 `em`（最宽一行的字宽）。

## 部署

Cloudflare Workers Builds 连接本仓库：推送到 `main` 分支后执行 `npx wrangler deploy`，按 `wrangler.jsonc` 先运行 `npm run build`，再将 `dist/` 作为静态资源发布到自定义域 `siaven.me`。未匹配路径返回 `404.html`，Node 版本由 `.node-version` 指定。

公开内容包括 Siaven 标识、作者署名 lingshan.zhu、设计作品与 Gmail 联系邮箱。作品图片经重新编码并去除元数据。部署仅发布 `dist/`。
