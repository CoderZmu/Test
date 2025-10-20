# BotMaster - React + Redux + Router 项目框架

一个基于 React 19、TypeScript、Redux Toolkit 和 React Router 的现代化前端项目框架。

## ✨ 特性

- 🚀 **React 19** - 最新的React版本
- 📦 **Redux Toolkit** - 现代化的Redux状态管理
- 🛣️ **React Router v7** - 强大的路由管理
- 🔷 **TypeScript** - 完整的类型支持
- 🎨 **Sass/SCSS** - 强大的CSS预处理器
- 📱 **Ant Design Mobile** - 优质的移动端UI组件库
- 📁 **清晰的目录结构** - 易于维护和扩展

## 📦 安装

```bash
# 克隆项目
git clone <your-repo-url>

# 进入项目目录
cd botmaster

# 安装依赖
yarn install
```

## 🚀 快速开始

```bash
# 启动开发服务器
yarn start

# 构建生产版本
yarn build

# 运行测试
yarn test
```

应用将在 [http://localhost:3000](http://localhost:3000) 启动

## 📁 项目结构

```
src/
├── components/          # 可复用组件
│   ├── Layout/         # 主布局组件（包含导航和页脚）
│   └── Navigation/     # 导航栏组件
├── pages/              # 页面组件
│   ├── Home/          # 首页（计数器示例）
│   ├── About/         # 关于页面
│   └── Dashboard/     # 控制面板（状态管理演示）
├── router/             # 路由配置
│   └── index.tsx      # React Router配置
├── store/              # Redux状态管理
│   ├── slices/        # Redux切片
│   │   ├── counterSlice.ts  # 计数器状态
│   │   └── userSlice.ts     # 用户状态
│   ├── index.ts       # Store配置
│   └── hooks.ts       # 类型化的Redux Hooks
├── types/              # TypeScript类型定义
└── App.tsx             # 根组件
```

详细的项目结构说明请查看 [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)

## 🎯 核心功能

### 1️⃣ 路由管理

使用 React Router v7 的 `createBrowserRouter` API：

```typescript
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      // ...
    ],
  },
]);
```

**特点：**
- ✅ 嵌套路由
- ✅ 404错误处理
- ✅ 布局复用
- ✅ 类型安全

### 2️⃣ 状态管理

使用 Redux Toolkit 的 `createSlice`：

```typescript
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1 },
    decrement: (state) => { state.value -= 1 },
  },
});
```

**使用类型化的Hooks：**
```typescript
import { useAppSelector, useAppDispatch } from './store/hooks';

const count = useAppSelector((state) => state.counter.value);
const dispatch = useAppDispatch();
dispatch(increment());
```

## 🛠️ 开发指南

### 添加新页面

1. 在 `src/pages/` 创建新文件夹
2. 创建 `index.tsx` 和 `styles.css`
3. 在 `src/router/index.tsx` 添加路由

```typescript
// src/pages/NewPage/index.tsx
import React from 'react';
import './styles.css';

const NewPage: React.FC = () => {
  return <div>新页面</div>;
};

export default NewPage;

// src/router/index.tsx
import NewPage from '../pages/NewPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: 'new-page', element: <NewPage /> },
    ],
  },
]);
```

### 添加新的Redux Slice

1. 在 `src/store/slices/` 创建新文件
2. 使用 `createSlice` 定义状态和reducers
3. 在 `src/store/index.ts` 导入并添加到store

```typescript
// src/store/slices/todoSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TodoState {
  items: string[];
}

const todoSlice = createSlice({
  name: 'todo',
  initialState: { items: [] } as TodoState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.items.push(action.payload);
    },
  },
});

export const { addTodo } = todoSlice.actions;
export default todoSlice.reducer;

// src/store/index.ts
import todoReducer from './slices/todoSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    todo: todoReducer, // 添加新的reducer
  },
});
```

## 📚 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| React | 19.2.0 | UI框架 |
| TypeScript | 4.4.2 | 类型支持 |
| React Router | 7.9.4 | 路由管理 |
| Redux Toolkit | 2.9.1 | 状态管理 |
| React Redux | 9.2.0 | React绑定 |
| Sass | 1.93.2 | CSS预处理器 |
| Ant Design Mobile | 5.41.1 | 移动端UI组件库 |

## 🎨 示例页面

### 首页 (/)
- 显示计数器示例
- 展示用户登录状态
- Redux状态管理演示

### 关于页面 (/about)
- 项目介绍
- 技术栈展示
- 功能特性列表

### 控制面板 (/dashboard)
- 用户登录/登出
- 计数器控制
- 应用状态展示

## 📝 最佳实践

1. **组件分离** - 页面组件和可复用组件分开管理
2. **状态管理** - 全局状态用Redux，局部状态用useState
3. **类型安全** - 充分利用TypeScript
4. **SCSS样式** - 使用变量、mixins和嵌套
5. **代码组织** - 按功能模块组织

## 🔗 相关文档

- [React 文档](https://react.dev/)
- [Redux Toolkit 文档](https://redux-toolkit.js.org/)
- [React Router 文档](https://reactrouter.com/)
- [TypeScript 文档](https://www.typescriptlang.org/)
- [Sass 文档](https://sass-lang.com/)
- [Ant Design Mobile 文档](https://mobile.ant.design/)
- [SCSS 使用指南](./SCSS_GUIDE.md) - 项目中的SCSS使用方法
- [Ant Design Mobile 使用指南](./ANTD_MOBILE_GUIDE.md) - antd-mobile组件使用方法

## 📄 许可证

MIT

---

**享受编码！** 🚀
