# 项目开发规则（tod）

本项目栈：Vue 3 + Vite + Tailwind CSS v4 + shadcn-vue + Pinia + FullCalendar  
目标：保持一致的代码风格、稳定的工程体验与优雅的 UI。

## 1. 代码风格
- 使用 `<script setup lang="ts">`，命名语义化，小驼峰。
- 导入路径优先使用别名 `@/`（已在 `vite.config.ts` 配置）。
- 模板样式优先 Tailwind 原子类，避免大段内联样式。

## 2. TypeScript 与路径别名
- 构建侧别名：见 `vite.config.ts`（`"@": "./src"`）。
- 编辑器解析：`tsconfig.app.json` 包含：
  - `"types": ["vite/client"]`
  - `"baseUrl": "."` 与 `"paths": { "@/*": ["./src/*"] }"`
  - 过渡期静音：`"ignoreDeprecations": "6.0"`
- .vue 类型声明：`src/env.d.ts`。

## 3. Tailwind v4 规范
- 使用 `@tailwindcss/vite` 插件；全局样式入口：`src/assets/main.css`（`@import "tailwindcss"`）。
- 主题变量（色彩、半径、字体）统一在 `main.css` 的 `@theme`/`@layer base` 中维护。
- SFC 样式中避免 `@apply ... !important`；若需覆盖，写标准 CSS。
- 视觉基调：圆角 + 软阴影，尽量不用纯黑分割线，使用 `bg-muted/xx`、透明度与阴影区分层次。

## 4. UI 规范（shadcn-vue）
- 新增组件：`npx shadcn-vue add <component>`（如 button、input、checkbox、dialog 等）。
- 引入：`@/components/ui/<name>`；尽量保持组件视觉统一。
- 图标库：`lucide-vue-next`，尺寸/颜色用 Tailwind 类控制。

## 5. 数据与业务
- Todo 字段：`id, text, completed, date(YYYY-MM-DD), time?(HH:mm)`。
- 日历事件映射（`src/stores/calendar.ts`）：
  - 有 `time` → 事件为非 allDay，`start=YYYY-MM-DDTHH:mm:00`。
  - 无 `time` → allDay 事件，日期取 `date`。
- 持久化：`src/stores/todos.ts` 中基于 LocalStorage 的 watch 存取。
- 日期统一使用本地 `YYYY-MM-DD`，避免 `toISOString()` 导致的 UTC 偏移。

## 6. 路由与页面
- 路由表：`src/router/index.ts`；新增视图放在 `src/views`，并在路由注册。
- 布局入口：`src/layouts/DefaultLayout.vue`。

## 7. IDE / 工具
- 推荐 VS Code 扩展：Vue - Official (Volar)；禁用 Vetur（工作区设置已提供）。
- 变更配置后执行：
  - “Volar: Enable Takeover Mode”
  - “Developer: Reload Window”
  - 如仍有红线：“TypeScript: Restart TS server”
- 类型检查：`npx vue-tsc --noEmit`；构建：`npm run build`。

## 8. 提交与分支
- 主分支：`main`；提交信息简洁可读（如 `feat/ui: …`、`fix/tailwind: …`）。
- 推送远程：`git push -u origin main`（仓库：`git@github.com:O1ive2/tod.git`）。

## 9. 安全与合规
- 严禁提交密钥/Token/私密配置；不要在日志中输出敏感信息。

## 10. 常见问题速查
- “找不到模块 '@/…'”：
  - 确认 Volar 启用、Vetur 禁用；`tsconfig.app.json` 中 `paths` 与 `types` 正确。
  - 重载窗口与重启 TS Server。
- Tailwind v4 报 unknown utility / `!important`：
  - 避免在 `@apply` 中使用 `!important`；必要时改为标准 CSS。
- 任务日期出现在当天：
  - 创建时传入 `selectedDate`；不要使用 `toISOString()`；检查 `calendar.ts` 映射。
