# 生产部署（SPA）

构建产物目录：**仓库根目录 `dist/`**（由 `frontend/npm run build` 生成）。

## 构建

```bash
cd frontend
npm install
npm run build
```

## 服务器要求

- 静态托管 `dist/` 下全部文件（`index.html`、`assets/`、`asset/`、`css/`、`data/` 等）。
- **History 模式**：除静态资源外，未知 path 须 **回退到 `index.html`**，由 Vue Router 接管。

### Nginx 示例

```nginx
server {
  listen 80;
  server_name example.com;
  root /var/www/zto-global/dist;
  index index.html;

  location /assets/ {
    try_files $uri =404;
    expires 7d;
  }

  location / {
    try_files $uri $uri/ /index.html;
  }
}
```

### 本地预览

```bash
cd frontend
npm run preview
```

## 旧书签

访问 `/products.html` 等仍会 **301/redirect** 到 `/products`（见 `src/router/index.ts`）。
