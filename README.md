# 🍸 下班后的赛博酒馆 (Cyberpunk Bar)

> 一款基于 Vue 3 + TypeScript + Vite 的现代化调酒菜单应用，支持 AI 智能调酒推荐、多维度筛选、一键分享等功能。

![Vue 3](https://img.shields.io/badge/Vue-3-42b883?style=flat&logo=vue.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=flat&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-8.0-646cff?style=flat&logo=vite)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ 功能特性

### 🎯 核心功能
- **海量酒谱数据库** - 包含 100+ 种经典鸡尾酒和创意调酒
- **智能筛选系统** - 支持按基酒、口味、特色、难度等多维度快速筛选
- **AI 智能调酒** - 豆包 AI 驱动，根据你的喜好推荐或生成专属鸡尾酒
- **一键分享** - 生成精美分享卡片，支持保存到相册

### 📱 用户体验
- **响应式设计** - 完美适配手机、平板、桌面等各种屏幕
- **PWA 支持** - 可安装到手机桌面，像原生 App 一样使用
- **丝滑动画** - Vue 3 Transition + CSS 动画，操作流畅
- **本地收藏** - 收藏喜爱的酒谱，离线也能查看

### 🤖 AI 功能
- **AI 调酒推荐** - 描述心情或场景，AI 为你推荐合适的鸡尾酒
- **AI 配方生成** - 输入想要的风味，AI 生成独特配方
- **智能调整** - 根据手边材料自动调整配方

## 🛠️ 技术栈

| 类别 | 技术 |
|------|------|
| **框架** | Vue 3.5 + Composition API |
| **语言** | TypeScript 5.0 |
| **构建** | Vite 8.0 |
| **状态管理** | Pinia |
| **样式** | Tailwind CSS 4.0 |
| **动画** | Vue Transition + CSS |
| **PWA** | vite-plugin-pwa |
| **测试** | Vitest + Vue Test Utils |
| **AI** | 豆包大模型 API |

## 🚀 快速开始

### 环境要求
- Node.js >= 18.0
- npm 或 pnpm 或 yarn

### 安装步骤

```bash
# 克隆项目
git clone https://github.com/Zola-ops/cocktail-menu.git

# 进入项目目录
cd cocktail-menu

# 安装依赖
npm install

# 配置环境变量
cp .env.example .env
# 编辑 .env 文件，填入你的 API Key
```

### 环境变量配置

```env
# 豆包 API 配置
VITE_API_BASE_URL=https://your-api-endpoint.com
VITE_API_KEY=your-api-key
VITE_API_MODEL=doubao-seed-2.0-lite
VITE_API_TEMPERATURE=1
VITE_API_MAX_TOKENS=9128
```

### 启动开发

```bash
# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview

# 运行测试
npm run test
```

## 📁 项目结构

```
cocktail-menu/
├── public/                # 静态资源
├── src/
│   ├── assets/           # 图片、图标等资源
│   ├── components/       # Vue 组件
│   │   ├── AIGenerateCocktail.vue  # AI 调酒
│   │   ├── AddCocktail.vue         # 添加酒谱
│   │   ├── CocktailCard.vue        # 酒谱卡片
│   │   ├── CocktailDetail.vue      # 酒谱详情
│   │   ├── FilterBar.vue           # 筛选栏
│   │   ├── Header.vue              # 顶部导航
│   │   ├── ShareCard.vue           # 分享卡片
│   │   └── ...
│   ├── composables/      # 组合式函数
│   ├── config/           # 配置文件
│   ├── data/             # 酒谱数据
│   │   └── cocktails.ts # 鸡尾酒数据库
│   ├── types/            # TypeScript 类型定义
│   ├── App.vue           # 根组件
│   └── main.ts           # 入口文件
├── tests/                # 单元测试
├── .env.example          # 环境变量示例
├── index.html            # HTML 入口
├── vite.config.ts        # Vite 配置
├── vitest.config.ts      # Vitest 配置
└── package.json
```

## 🎨 界面预览

### 主页
- 精美的酒馆风格 UI 设计
- 流畅的动画过渡效果
- 智能搜索和筛选

### 酒谱详情
- 清晰的材料和步骤展示
- 难度等级可视化
- 一键收藏和分享

### AI 调酒
- 智能对话式交互
- 实时配方生成
- 个性化推荐

## 🔧 配置说明

### 豆包 API 配置

本项目使用豆包大模型 API 进行 AI 调酒推荐。需要在 [火山引擎控制台](https://console.volcengine.com/) 获取 API Key。

支持的模型：
- `doubao-seed-2.0-lite` (推荐，速度快)
- `doubao-seed-2.0` (效果更好)

### PWA 配置

PWA 配置在 `vite.config.ts` 中：

```typescript
VitePWA({
  registerType: 'autoUpdate',
  manifest: {
    name: '下班后的赛博酒馆',
    short_name: '赛博酒馆',
    theme_color: '#1a1a2e',
  }
})
```

## 🧪 测试

```bash
# 运行所有测试
npm run test

# 监听模式
npm run test:watch

# 生成覆盖率报告
npm run test:coverage
```

测试文件位于 `tests/` 目录，使用 Vitest + Vue Test Utils。

## 📦 部署

### Vercel (推荐)

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel
```

### Netlify

```bash
# 构建
npm run build

# 部署 dist 目录
```

### Docker

```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📄 License

本项目基于 MIT License 开源 - 详见 [LICENSE](LICENSE) 文件

## 🙏 致谢

- [Vue 3](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架
- [豆包大模型](https://www.volcengine.com/product/doubao) - AI 能力支持

---

**访问地址**: http://bar.lazozola.site

**作者**: [Zola](https://github.com/Zola-ops)
