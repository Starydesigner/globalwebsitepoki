# 中通国际官网

全站已 **Vue 3 + Vite SPA** 化，源码在 `frontend/`，构建产物在 `dist/`。

## 本地开发

```bash
cd frontend
npm install
npm run dev
```

浏览器打开终端提示地址（默认 [http://localhost:5173](http://localhost:5173)）。主要路由：`/`、`/products`、`/online-send`、`/cross-border` 等。

## 生产构建与部署

```bash
cd frontend
npm run build
```

产出在仓库根目录 **`dist/`**（勿提交 git，见 `.gitignore`）。部署说明见 [docs/DEPLOY.md](docs/DEPLOY.md)（Nginx history fallback → `index.html`）。

## 文档

| 文档 | 说明 |
|------|------|
| [docs/VITE-MIGRATION.md](docs/VITE-MIGRATION.md) | Vue 迁移阶段与架构 |
| [docs/DEPLOY.md](docs/DEPLOY.md) | 上线与静态托管 |

## 2026-11-03 · Vue 全站改造（main）

### 架构

- **SPA + Vue Router**：单入口 `frontend/index.html`，11 个业务路由；旧 `*.html` URL 自动 redirect 到新 path。
- **页面类型**：内容页（`ContentPageApp` + `HomeMain` 等）、寄递（`ShippingApp`）、跨境（`CrossBorderApp`）、产品落地（`LandingPageApp` / `ProductLandingApp`）。
- **公共壳**：`SiteLayout`（Header / Mega / Footer / FloatTools）、`AppLink` 站内客户端路由。
- **交互**：原根目录 `js/*.js` 已移除，逻辑在 `frontend/src/composables/**`；静态 JSON 仍在 `data/`。

### 结构与清理

- 首页：Hero + 产品 / 使命 / 新闻 分区组件 + `composables/home`。
- 产品页、寄递面板、Mega/页脚、跨境分产品块、企业咨询表单等组件化。
- 删除根目录静态页 HTML、`partials/`、`js/`、MasterGo 导出 HTML 等不再参与构建的文件。

### 说明

- 业务样式与图片仍在仓库根目录 **`css/`**、**`asset/`**，构建时复制到 `dist/`。
- 运单查询等部分接口仍为前端 mock / 本地 JSON，接真实 API 为后续可选优化。

---

## 历史更新记录（静态站时期）

<details>
<summary>2026-10-30 及更早（点击展开）</summary>

### 2026-10-30

- **合并 `huiyu` → `main`**：页脚二维码气泡；首页产品与新闻小屏布局；页脚样式 `site-footer.css?v=12`。
- **物流产品**：粒子背景、港澳/海外卡片与落地页 `inner-local` / `overseas-local` / `solution`。
- **导航 Mega**：跨境双列与落地页链接。

### 2026-10-27 ~ 2026-10-28

- 在线寄件、跨境落地页、Banner 与 Tab 样式统一；`online-send` / `rates` / 运费卡片与清关表单等（详见原静态页迭代）。

</details>
