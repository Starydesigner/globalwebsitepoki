# Aurora Beam（React Bits Pro）与 Vue 工程说明

[React Bits Pro · Aurora Beam](https://pro.reactbits.dev/docs/components/aurora-beam) 面向 **React + shadcn**。本仓库为 **Vue 3 + Vite**，不能直接使用 `npx shadcn@latest add @reactbits-starter/aurora-beam-tw`，除非单独接 React 子应用或官方提供 **与框架无关** 的实现。

## 与官方步骤的对照

| 官方步骤 | 本项目 |
|----------|--------|
| 1. 配置 `components.json` + Pro registry + `REACTBITS_LICENSE_KEY` | **不适用**（无 shadcn `components.json`）。 |
| 2. `npx shadcn@latest add @reactbits-starter/aurora-beam-tw` | **未安装**。 |
| 3. 在页面引入 | 「中通科技简介」区块**未使用** Aurora 动效；若以后要接，需重新实现或引入官方可移植版本。 |

## 若以后要接 Aurora Beam

1. 按 [Installation](https://pro.reactbits.dev/docs/installation) 取得授权与安装说明。  
2. 优先确认是否有 **WebGL/Canvas 裸实现** 或可嵌入的脚本；再包一层 Vue 组件。  
3. 若无，只能加 **React 孤岛 / 微前端** 承载官方组件，成本较高。

（历史上曾用 Canvas 做过一版 Vue 近似，已按产品要求从「中通科技简介」移除，相关文件已删除。）
