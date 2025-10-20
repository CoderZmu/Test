# 快速开始指南

## 🎯 5分钟上手

### 1. 安装依赖

```bash
yarn install
```

### 2. 启动开发服务器

```bash
yarn start
```

访问 http://localhost:3000 查看效果

## 📖 框架核心概念

### 路由系统

所有路由配置在 `src/router/index.tsx`：

```typescript
const router = createBrowserRouter([
  {
    path: '/',           // 路由路径
    element: <Layout />, // 布局组件
    children: [          // 子路由
      { index: true, element: <Home /> },      // 首页 /
      { path: 'about', element: <About /> },   // /about
      { path: 'dashboard', element: <Dashboard /> }, // /dashboard
    ],
  },
]);
```

**路由导航：**
```typescript
import { Link, useNavigate } from 'react-router-dom';

// 使用Link组件
<Link to="/about">关于</Link>

// 使用编程式导航
const navigate = useNavigate();
navigate('/dashboard');
```

### Redux状态管理

#### 读取状态
```typescript
import { useAppSelector } from './store/hooks';

// 在组件中使用
const count = useAppSelector((state) => state.counter.value);
const user = useAppSelector((state) => state.user);
```

#### 更新状态
```typescript
import { useAppDispatch } from './store/hooks';
import { increment, login } from './store/slices/...';

const dispatch = useAppDispatch();

// 触发action
dispatch(increment());
dispatch(login('用户名'));
```

#### 创建新的Slice
```typescript
// src/store/slices/mySlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MyState {
  value: string;
}

const mySlice = createSlice({
  name: 'mySlice',
  initialState: { value: '' } as MyState,
  reducers: {
    setValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setValue } = mySlice.actions;
export default mySlice.reducer;
```

## 🚀 常见任务

### 任务1: 添加新页面

**步骤：**

1. 创建页面组件：
```bash
mkdir -p src/pages/MyPage
touch src/pages/MyPage/index.tsx
touch src/pages/MyPage/styles.css
```

2. 编写组件代码：
```typescript
// src/pages/MyPage/index.tsx
import React from 'react';
import './styles.css';

const MyPage: React.FC = () => {
  return (
    <div className="my-page">
      <h1>我的新页面</h1>
    </div>
  );
};

export default MyPage;
```

3. 添加路由：
```typescript
// src/router/index.tsx
import MyPage from '../pages/MyPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      // ... 其他路由
      { path: 'my-page', element: <MyPage /> },
    ],
  },
]);
```

4. 添加导航链接（可选）：
```typescript
// src/components/Navigation/index.tsx
<Link to="/my-page" className={isActive('/my-page')}>
  我的页面
</Link>
```

### 任务2: 添加新的Redux状态

**步骤：**

1. 创建slice：
```bash
touch src/store/slices/settingsSlice.ts
```

2. 定义状态和reducers：
```typescript
// src/store/slices/settingsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  theme: 'light' | 'dark';
  language: string;
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    theme: 'light',
    language: 'zh-CN',
  } as SettingsState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
  },
});

export const { setTheme, setLanguage } = settingsSlice.actions;
export default settingsSlice.reducer;
```

3. 添加到store：
```typescript
// src/store/index.ts
import settingsReducer from './slices/settingsSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    settings: settingsReducer, // 添加新reducer
  },
});
```

4. 在组件中使用：
```typescript
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setTheme } from '../store/slices/settingsSlice';

const MyComponent = () => {
  const theme = useAppSelector((state) => state.settings.theme);
  const dispatch = useAppDispatch();

  const toggleTheme = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
  };

  return (
    <button onClick={toggleTheme}>
      当前主题: {theme}
    </button>
  );
};
```

### 任务3: 创建可复用组件

**步骤：**

1. 创建组件文件：
```bash
mkdir -p src/components/Button
touch src/components/Button/index.tsx
touch src/components/Button/styles.css
```

2. 编写组件：
```typescript
// src/components/Button/index.tsx
import React from 'react';
import './styles.css';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ 
  onClick, 
  children, 
  variant = 'primary' 
}) => {
  return (
    <button 
      className={`custom-button ${variant}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
```

3. 在页面中使用：
```typescript
import Button from '../../components/Button';

<Button onClick={() => console.log('点击')}>
  点击我
</Button>
```

## 💡 开发技巧

### 1. 使用React DevTools
- 安装 [React Developer Tools](https://react.dev/learn/react-developer-tools)
- 查看组件树和props

### 2. 使用Redux DevTools
- 安装 [Redux DevTools Extension](https://github.com/reduxjs/redux-devtools)
- Redux Toolkit默认已启用
- 可以查看state变化、action历史

### 3. 热重载
- 修改代码后自动刷新
- Redux状态会在刷新后重置

### 4. 类型检查
```bash
# 运行TypeScript类型检查
yarn tsc --noEmit
```

### 5. 代码格式化
建议安装VSCode扩展：
- ESLint
- Prettier

## 🐛 常见问题

### Q: 路由不工作怎么办？
**A:** 检查以下几点：
1. 确保在 `App.tsx` 中使用了 `<RouterProvider router={router} />`
2. 确保路由路径正确
3. 检查是否有404处理

### Q: Redux状态更新了但组件没有重新渲染？
**A:** 
1. 确保使用 `useAppSelector` 而不是普通的 `useSelector`
2. 确保在 `index.tsx` 中包裹了 `<Provider store={store}>`

### Q: 如何处理异步操作？
**A:** 使用Redux Toolkit的 `createAsyncThunk`：
```typescript
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchUser = createAsyncThunk(
  'user/fetch',
  async (userId: string) => {
    const response = await fetch(`/api/user/${userId}`);
    return response.json();
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: { data: null, loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      });
  },
});
```

## 📚 下一步

1. 阅读 [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) 了解详细的项目结构
2. 查看 [Redux Toolkit文档](https://redux-toolkit.js.org/) 学习更多状态管理技巧
3. 学习 [React Router文档](https://reactrouter.com/) 掌握高级路由功能
4. 探索示例代码，理解最佳实践

## 🎉 开始编码吧！

现在你已经掌握了基础知识，可以开始构建你的应用了！

