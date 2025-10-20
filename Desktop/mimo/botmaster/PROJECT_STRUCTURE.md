# 项目结构说明

## 📁 目录结构

```
src/
├── components/          # 可复用组件
│   ├── Layout/         # 主布局组件
│   │   ├── index.tsx
│   │   └── styles.css
│   └── Navigation/     # 导航栏组件
│       ├── index.tsx
│       └── styles.css
├── pages/              # 页面组件
│   ├── Home/          # 首页
│   │   ├── index.tsx
│   │   └── styles.css
│   ├── About/         # 关于页面
│   │   ├── index.tsx
│   │   └── styles.css
│   └── Dashboard/     # 控制面板
│       ├── index.tsx
│       └── styles.css
├── router/             # 路由配置
│   └── index.tsx
├── store/              # Redux状态管理
│   ├── slices/        # Redux切片
│   │   ├── counterSlice.ts
│   │   └── userSlice.ts
│   ├── index.ts       # Store配置
│   └── hooks.ts       # 类型化的Redux Hooks
├── types/              # TypeScript类型定义
│   └── index.ts
├── App.tsx             # 根组件
├── App.css             # 全局样式
├── index.tsx           # 应用入口
└── index.css           # 基础样式
```

## 🚀 技术栈

- **React 19.2.0** - UI框架
- **TypeScript 4.4.2** - 类型支持
- **React Router 7.9.4** - 路由管理
- **Redux Toolkit 2.9.1** - 状态管理
- **React Redux 9.2.0** - React-Redux绑定

## 📝 核心功能

### 1. 路由管理 (React Router)

路由配置位于 `src/router/index.tsx`，使用 `createBrowserRouter` API：

```typescript
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'dashboard', element: <Dashboard /> },
      // ...
    ],
  },
]);
```

**特点：**
- ✅ 嵌套路由支持
- ✅ 404错误页面处理
- ✅ 布局组件复用
- ✅ 类型安全的路由配置

### 2. 状态管理 (Redux Toolkit)

#### Store 配置
位于 `src/store/index.ts`，使用 `configureStore`：

```typescript
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
  },
});
```

#### Redux Slices
使用 `createSlice` 创建状态切片：

**Counter Slice** (`store/slices/counterSlice.ts`)
- `increment` - 增加计数
- `decrement` - 减少计数
- `incrementByAmount` - 按指定数量增加
- `reset` - 重置计数

**User Slice** (`store/slices/userSlice.ts`)
- `login` - 用户登录
- `logout` - 用户登出
- `updateName` - 更新用户名

#### 类型化的Hooks
位于 `src/store/hooks.ts`：

```typescript
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
```

**使用示例：**
```typescript
const count = useAppSelector((state) => state.counter.value);
const dispatch = useAppDispatch();
dispatch(increment());
```

### 3. 组件架构

#### Layout 组件
- 提供应用的整体布局结构
- 包含导航栏和页脚
- 使用 `<Outlet />` 渲染子路由

#### Navigation 组件
- 响应式导航栏
- 显示当前用户状态
- 高亮当前激活路由

#### 页面组件
- **Home** - 首页，展示计数器示例
- **About** - 关于页面，展示技术栈信息
- **Dashboard** - 控制面板，管理用户和计数器状态

## 🎯 使用指南

### 添加新页面

1. 在 `src/pages/` 创建新页面文件夹
2. 创建 `index.tsx` 和 `styles.css`
3. 在 `src/router/index.tsx` 添加路由配置

### 添加新的Redux Slice

1. 在 `src/store/slices/` 创建新slice文件
2. 使用 `createSlice` 定义状态和reducers
3. 在 `src/store/index.ts` 中导入并添加到store

### 创建新组件

1. 在 `src/components/` 创建组件文件夹
2. 创建 `index.tsx` 和 `styles.css`
3. 导出组件供页面使用

## 🛠️ 开发命令

```bash
# 安装依赖
yarn install

# 启动开发服务器
yarn start

# 构建生产版本
yarn build

# 运行测试
yarn test
```

## 📦 依赖包说明

### 核心依赖
- `react` & `react-dom` - React核心库
- `react-router-dom` - 路由管理
- `@reduxjs/toolkit` - Redux官方工具集
- `react-redux` - React Redux绑定

### 开发依赖
- `typescript` - TypeScript支持
- `@types/*` - 类型定义
- `react-scripts` - CRA脚本

## 🎨 样式管理

项目采用模块化CSS：
- 每个组件/页面有独立的样式文件
- 避免全局样式污染
- 使用语义化的类名

## 🔒 类型安全

项目全面使用TypeScript：
- 定义了 `RootState` 和 `AppDispatch` 类型
- 使用类型化的Redux Hooks
- 所有组件都有类型注解

## 📚 最佳实践

1. **组件分离** - 页面组件和可复用组件分开管理
2. **状态管理** - 全局状态用Redux，局部状态用useState
3. **代码组织** - 按功能模块组织代码结构
4. **类型安全** - 充分利用TypeScript的类型检查
5. **样式模块化** - 每个组件维护自己的样式文件

## 🚦 项目特点

- ✅ 清晰的目录结构
- ✅ 类型安全的开发体验
- ✅ 可扩展的架构设计
- ✅ 现代化的开发工具链
- ✅ 完整的示例代码
- ✅ 响应式布局设计

