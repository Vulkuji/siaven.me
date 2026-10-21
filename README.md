# Siaven Portfolio

`siaven.me` 的静态作品集，使用 React、TypeScript、Motion、Radix 与 Tailwind CSS，以 Cloudflare Workers 静态资源形式部署。首页为可拖动的作品画布，另有作品档案、作品详情与个人简历页面，支持亮色与暗色主题。

## 目录

- `src/components/canvas/`：作品画布，包含拖动与惯性、滚轮平移、双击回到中心和空闲漂浮。
- `src/components/archive-view.tsx`：作品档案的错落网格、统一 4:5 作品卡片、分类筛选与鼠标跟随滚动；以跟随鼠标的手电光照亮作品，暗场颜色由主题令牌 `--room` 与 `--veil` 定义。
- `src/components/work-detail.tsx`：基于 Radix Dialog 的作品详情，展示完整图集与描述。
- `src/components/resume-view.tsx`：个人简历页面，内容来自 `src/data/resume.ts`。
- `src/components/pointer-layer.tsx`：十字光标、作品编号与跟随光晕。
- `src/components/ornaments.tsx`：玻璃文件夹、分类图标、轨道与套准标记、混合模式标语。
- `src/hooks/`：哈希路由、画布平移与档案手电光定位。
- `src/i18n.ts`、`src/locales/`：基于 i18next 的中英文界面；`zh.json`、`en.json` 为界面文案，作品与简历内容以 `{ zh, en }` 结构存放在数据文件中。
- `src/data/portfolio.ts`：作品类型、分类与个人信息；`works.json` 由导出脚本生成。
- `src/data/resume.ts`：中英文简历内容。
- `src/data/canvas-layout.ts`：画布尺寸、初始中心与各元素坐标。
- `src/index.css`、`src/styles/`：主题令牌与按区域拆分的样式。
- `static/`：作品图片（`works/`、`covers/`、`cards/`）、头像、站点图标（`favicon.svg`、`favicon.ico`、`apple-touch-icon.png`）与响应头（`_headers`）。
- `content/works.json`：作品与素材文件夹的对应关系，以及首页封面的裁切范围和档案卡片的取景。
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

Vite 构建客户端资源，预渲染脚本生成静态 HTML 并为内联脚本写入 CSP 哈希；浏览器通过 React hydration 接管交互。字体由 Fontsource 自托管。视图通过哈希切换：`#archive`、`#archive/<分类>`、`#resume`、`#works/<作品 ID>`。英文版位于 `/en/`，页头的语言切换会改写地址并记住选择；首次访问首页时，非中文浏览器会进入英文版。

## 素材更新

```sh
npm run export -- /path/to/网站作品整理
```

每个作品对应一个以两位序号开头的文件夹，序号与 `content/works.json` 的 `folder` 一致。文件夹内的图片按文件名排序展示，GIF 转为动态 WebP；作品标题取自文件夹名称（去掉序号，下划线显示为 ·）；`介绍.txt` 提供所属分类、作品标签（`中文 / ENGLISH`）、`英文名称`、`英文介绍`、一句话介绍，以及可选的项目背景、我负责的部分、设计思路和最终成果；详细描述的英文分别写在 `英文项目背景`、`英文我负责的部分`、`英文设计思路`、`英文最终成果`。缺少必填字段时导出会报错并指出文件夹。导出脚本会重建 `static/assets/works`、`covers`、`cards` 与 `src/data/works.json`。

`content/works.json` 中每件作品的 `card` 决定作品档案卡片的 4:5 取景：`image` 为素材文件夹内按文件名排序的第几张图（从 1 开始）；`focus` 为对焦点 `[横向, 纵向]`，取值 0–1，0 为左或上边缘，1 为右或下边缘；`zoom` 为取景范围，1 表示该图能容纳的最大 4:5 范围，数值越小画面放大越多。`cover` 的 `crop` 为首页封面的裁切框 `[左, 上, 右, 下]`，同样取值 0–1。

## 部署

Cloudflare Workers Builds 连接本仓库：推送到 `main` 分支后执行 `npx wrangler deploy`，按 `wrangler.jsonc` 先运行 `npm run build`，再将 `dist/` 作为静态资源发布到自定义域 `siaven.me`。未匹配路径返回 `404.html`，Node 版本由 `.node-version` 指定。

公开内容包括 Siaven 标识、作者署名 lingshan.zhu、用户指定的 Google 头像、设计作品与 Gmail 联系邮箱。作品图片经重新编码并去除元数据。部署仅发布 `dist/`。
