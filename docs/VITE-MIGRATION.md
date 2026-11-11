# Vite + Vue 站点迁移

## 阶段进度（已全部完成 ✅）

| 阶段 | 状态 | 说明 |
|------|------|------|
| **运行时深度 Vue** | ✅ | 无 `v-html` / 外链脚本注入 |
| **结构深度 Vue** | ✅ | 布局/产品/寄递/跨境分产品块/企业咨询表单组件化 |
| **SPA + Vue Router** | ✅ | 单入口 + 11 路由 + 旧 `*.html` redirect |
| **站内导航** | ✅ | 全局 `AppLink`（客户端路由，保留 `tel`/`mailto`/外链 `<a>`） |
| **发布** | ✅ | 见 [DEPLOY.md](./DEPLOY.md) |

## SPA 架构

| 项 | 位置 |
|----|------|
| 启动 | `frontend/index.html` → `src/main.ts` |
| 路由 | `src/router/index.ts` + `src/config/sitePaths.ts` |
| 站内链 | `AppLink`（`main.ts` 全局注册） |
| 页面 meta | `src/config/pages.ts` |
| 按路由 CSS | `src/config/loadPageStyles.ts` |

### 路由

`/` · `/online-send` · `/rates` · `/products` · `/cross-border` · `/inner-local` · `/overseas-local` · `/solution` · `/enterprise-inquiry` · `/placeholder` · `/nav-framework-demo`

## 常用命令

```bash
cd frontend
npm run dev
npm run build
npm run preview
```

## 资源

- **样式/静态**：`css/`、`asset/` → 复制到 `dist/`
- **JSON**：`data/` → `dist/data/`（运费地区、关税等）
- **根目录 `js/`**：已删除，逻辑在 `frontend/src/composables/**`

## HTML

仅 **`frontend/index.html`**（Vite 壳）与构建产物 **`dist/index.html`**。

## 类型说明

寄递/使命等 **DOM 密集型 composable** 仍带 `// @ts-nocheck`（自旧 JS 迁入）；边界为 `export function initX(): () => void`，见 `src/types/legacy-dom-shims.d.ts`。后续可按模块逐步补类型。
