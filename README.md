# Siaven Portfolio

`siaven.me` 的静态作品集，使用 React、TypeScript、shadcn/ui（Radix）与 Tailwind CSS，以 Cloudflare Workers 静态资源形式部署。

## 目录

- `src/components/`：页面、作品列表与详情弹窗。
- `src/components/ui/`：由官方 shadcn CLI 生成的基础组件。
- `src/components/theme-provider.tsx`：基于 next-themes 的亮暗主题、系统偏好与持久化。
- `src/components/hero-collage.tsx`、`design-ribbon.tsx`：基于 Motion 的作品视差与滚动视觉。
- `src/styles/`：首屏叠层、错落作品布局与响应式视觉样式。
- `src/data/`：公开项目数据与站点信息。
- `static/`：脱敏作品图片、站点图标与响应头（`_headers`）。
- `content/works.json`：项目内容与经过审核的 PDF 裁切范围。
- `tools/export.py`：只读导出 PDF 区域，重新编码 WebP 并生成公开数据。
- `tools/prerender.mjs`：将 React 页面预渲染为静态 HTML。
- `wrangler.jsonc`：Worker 名称、构建命令、静态资源目录与自定义域。

## 开发与构建

```sh
npm ci
npm run dev
npm run build
npm run preview
```

Vite 构建脚本生成客户端资源和静态 HTML；浏览器通过 React hydration 接管交互。主题默认跟随系统，可在导航栏切换亮色、暗色并记住选择。预渲染阶段为主题初始化脚本生成 CSP 哈希。Motion 通过 LazyMotion 加载动效，尊重系统减少动态效果设置。构建产物位于 `dist/`，预览地址为 `http://127.0.0.1:4174`。

素材更新使用源文件的独立副本：

```sh
uv run tools/export.py /path/to/source-copy.pdf
```

## 部署

Cloudflare Workers Builds 连接本仓库：推送到 `main` 分支后执行 `npx wrangler deploy`，按 `wrangler.jsonc` 先运行 `npm run build`，再将 `dist/` 作为静态资源发布到自定义域 `siaven.me`。未匹配路径返回 `404.html`，Node 版本由 `.node-version` 指定。

公开内容包括 Siaven 标识、用户指定的 Google 头像、设计作品与 Gmail 联系邮箱。原作品集中的个人介绍素材、肖像、真实姓名、任职与教育资料已从导出范围排除。作品图片由像素重新编码；Google 头像使用无 EXIF/XMP 信息的原始 PNG。部署仅发布 `dist/`。
