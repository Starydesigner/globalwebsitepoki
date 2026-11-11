# GitHub Pages 发布

仓库：[globalwebsitepoki](https://github.com/Starydesigner/globalwebsitepoki)

## 访问地址

项目站默认地址（推送 `main` 并成功部署后）：

**https://starydesigner.github.io/globalwebsitepoki/**

## 一次性设置（GitHub 网页）

1. 打开仓库 **Settings → Pages**。
2. **Build and deployment → Source** 选择 **GitHub Actions**（不要选 “Deploy from a branch”）。
3. 保存后，向 `main` 推送代码即可触发 [`.github/workflows/github-pages.yml`](../.github/workflows/github-pages.yml)。

## 本地与 GitLab

- 本地 / 中通 GitLab 构建仍使用默认 `base: /`，命令：`cd frontend && npm run build`。
- 仅 CI 构建 GitHub Pages 时设置 `VITE_BASE_PATH=/globalwebsitepoki/`。

## 自定义域名（可选）

在 **Settings → Pages → Custom domain** 绑定域名后，需将生产构建的 `VITE_BASE_PATH` 改为 `/` 并重新调整 workflow。
