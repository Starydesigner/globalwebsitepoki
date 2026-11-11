import path from "node:path";
import { fileURLToPath } from "node:url";
import sirv from "sirv";
import { defineConfig, type Plugin } from "vite";
import vue from "@vitejs/plugin-vue";
import { viteStaticCopy } from "vite-plugin-static-copy";

const rootDir = fileURLToPath(new URL(".", import.meta.url));
const repoRoot = path.resolve(rootDir, "..");
const assetDir = path.join(repoRoot, "asset");
const cssDir = path.join(repoRoot, "css");
const dataDir = path.join(repoRoot, "data");

/** 开发期挂载仓库根目录静态资源（asset/css/js） */
function repoStaticDev(): Plugin {
  return {
    name: "repo-static-dev",
    configureServer(server) {
      const { middlewares } = server;
      middlewares.use("/asset", sirv(assetDir, { dev: true }));
      middlewares.use("/css", sirv(cssDir, { dev: true }));
      middlewares.use("/data", sirv(dataDir, { dev: true }));

    },
  };
}

const appBase = process.env.VITE_BASE_PATH || "/";
const appBaseHref = appBase.endsWith("/") ? appBase : `${appBase}/`;

export default defineConfig({
  /** GitHub Pages 项目站部署时传入 VITE_BASE_PATH=/仓库名/ */
  base: appBase,
  plugins: [
    {
      name: "inject-html-base",
      transformIndexHtml(html) {
        if (html.includes("<base ")) return html;
        return html.replace("<head>", `<head>\n    <base href="${appBaseHref}" />`);
      },
    },
    vue({
      template: {
        transformAssetUrls: {
          video: [],
          source: [],
          img: [],
          image: [],
        },
      },
    }),
    repoStaticDev(),
    viteStaticCopy({
      targets: [
        { src: path.join(assetDir, "**/*"), dest: "asset" },
        { src: path.join(cssDir, "**/*"), dest: "css" },
        { src: path.join(dataDir, "**/*"), dest: "data" },
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": path.join(rootDir, "src"),
      "@repo": repoRoot,
    },
  },
  server: {
    host: true,
    allowedHosts: true,
    fs: { allow: [repoRoot] },
  },
  build: {
    outDir: path.join(repoRoot, "dist"),
    emptyOutDir: true,
    rollupOptions: {
      input: path.join(rootDir, "index.html"),
    },
  },
});
