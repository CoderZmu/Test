# Ant Design Mobile 使用指南

## 🎉 已成功集成 antd-mobile

项目已成功集成 **Ant Design Mobile 5.41.1**，这是蚂蚁金服出品的移动端 React UI 组件库。

## 📦 安装的依赖

```json
{
  "antd-mobile": "^5.41.1",
  "antd-mobile-icons": "^0.3.0"
}
```

## 🎨 主题配置

### 全局主题设置

主题配置文件：`src/config/theme.ts`

```typescript
export const antdMobileTheme = {
  '--adm-color-primary': '#2196F3',      // 主题色
  '--adm-color-success': '#4CAF50',      // 成功色
  '--adm-color-warning': '#ff9800',      // 警告色
  '--adm-color-danger': '#f44336',       // 危险色
  '--adm-color-text': '#333333',         // 主文字色
  '--adm-color-text-secondary': '#666',  // 次要文字色
  '--adm-color-background': '#ffffff',   // 背景色
  '--adm-border-color': '#e0e0e0',      // 边框色
};
```

### 应用配置

在 `App.tsx` 中使用 ConfigProvider：

```typescript
import { ConfigProvider } from 'antd-mobile';
import zhCN from 'antd-mobile/es/locales/zh-CN';
import { antdMobileTheme } from './config/theme';

function App() {
  return (
    <ConfigProvider locale={zhCN} theme={antdMobileTheme}>
      {/* 你的应用内容 */}
    </ConfigProvider>
  );
}
```

## 🧩 常用组件示例

### 1. Button - 按钮

```tsx
import { Button, Space } from 'antd-mobile';

<Space>
  <Button color="primary">主要按钮</Button>
  <Button color="success">成功按钮</Button>
  <Button color="warning">警告按钮</Button>
  <Button color="danger">危险按钮</Button>
  <Button fill="outline">线框按钮</Button>
  <Button fill="none">无背景按钮</Button>
</Space>
```

**常用属性：**
- `color`: 'primary' | 'success' | 'warning' | 'danger' | 'default'
- `fill`: 'solid' | 'outline' | 'none'
- `size`: 'mini' | 'small' | 'middle' | 'large'
- `block`: 是否块级元素
- `loading`: 加载状态
- `disabled`: 禁用状态

### 2. Card - 卡片

```tsx
import { Card } from 'antd-mobile';

<Card title="卡片标题" extra={<span>更多</span>}>
  <div>卡片内容</div>
</Card>
```

**常用属性：**
- `title`: 卡片标题
- `extra`: 右上角额外内容
- `headerStyle`: 头部样式
- `bodyStyle`: 内容区域样式

### 3. Form - 表单

```tsx
import { Form, Input, Button } from 'antd-mobile';

const [form] = Form.useForm();

const handleSubmit = async () => {
  const values = await form.validateFields();
  console.log(values);
};

<Form
  form={form}
  layout="horizontal"
  footer={
    <Button block color="primary" onClick={handleSubmit}>
      提交
    </Button>
  }
>
  <Form.Item
    name="username"
    label="用户名"
    rules={[{ required: true, message: '请输入用户名' }]}
  >
    <Input placeholder="请输入" />
  </Form.Item>
</Form>
```

**常用组件：**
- `Form.Item`: 表单项
- `Input`: 输入框
- `TextArea`: 文本域
- `Picker`: 选择器
- `DatePicker`: 日期选择
- `Stepper`: 步进器
- `Switch`: 开关

### 4. List - 列表

```tsx
import { List, Tag } from 'antd-mobile';

<List header="标题" mode="card">
  <List.Item
    prefix={<UserOutline />}
    extra={<Tag color="success">标签</Tag>}
    description="这是描述文字"
    clickable
  >
    列表项内容
  </List.Item>
</List>
```

**常用属性：**
- `header`: 列表标题
- `mode`: 'default' | 'card'
- `prefix`: 左侧图标
- `extra`: 右侧额外内容
- `description`: 描述文字
- `clickable`: 是否可点击

### 5. TabBar - 标签栏

```tsx
import { TabBar } from 'antd-mobile';
import { AppOutline, UserOutline } from 'antd-mobile-icons';

const [activeKey, setActiveKey] = useState('/');

<TabBar activeKey={activeKey} onChange={setActiveKey}>
  <TabBar.Item key="/" icon={<AppOutline />} title="首页" />
  <TabBar.Item key="/user" icon={<UserOutline />} title="我的" />
</TabBar>
```

### 6. Space - 间距

```tsx
import { Space } from 'antd-mobile';

<Space direction="vertical" block style={{ '--gap': '16px' }}>
  <div>项目1</div>
  <div>项目2</div>
</Space>
```

**常用属性：**
- `direction`: 'horizontal' | 'vertical'
- `block`: 是否块级元素
- `justify`: 'start' | 'end' | 'center' | 'between' | 'around'
- `align`: 'start' | 'end' | 'center' | 'baseline'
- `--gap`: CSS变量设置间距

### 7. Toast - 轻提示

```tsx
import { Toast } from 'antd-mobile';

// 成功提示
Toast.show({
  icon: 'success',
  content: '操作成功',
});

// 失败提示
Toast.show({
  icon: 'fail',
  content: '操作失败',
});

// 加载提示
Toast.show({
  icon: 'loading',
  content: '加载中...',
  duration: 0, // 不自动关闭
});
```

### 8. Dialog - 对话框

```tsx
import { Dialog } from 'antd-mobile';

// 确认对话框
const result = await Dialog.confirm({
  content: '确定要删除吗？',
  confirmText: '确定',
  cancelText: '取消',
});

if (result) {
  console.log('用户点击了确定');
}

// 提示对话框
Dialog.alert({
  content: '这是一条提示',
  confirmText: '我知道了',
});
```

### 9. Tag - 标签

```tsx
import { Tag } from 'antd-mobile';

<Tag color="primary">主要</Tag>
<Tag color="success">成功</Tag>
<Tag color="warning">警告</Tag>
<Tag color="danger">危险</Tag>
<Tag color="default">默认</Tag>
<Tag fill="outline">线框</Tag>
```

### 10. Grid - 栅格

```tsx
import { Grid } from 'antd-mobile';

<Grid columns={2} gap={12}>
  <Grid.Item>
    <div>网格项 1</div>
  </Grid.Item>
  <Grid.Item>
    <div>网格项 2</div>
  </Grid.Item>
</Grid>
```

## 📱 图标使用

### 导入图标

```tsx
import {
  AppOutline,
  UserOutline,
  SearchOutline,
  UnorderedListOutline,
  CheckCircleOutline,
  CloseCircleOutline,
} from 'antd-mobile-icons';

<AppOutline fontSize={24} color="var(--adm-color-primary)" />
```

### 常用图标

- `AppOutline` - 应用
- `UserOutline` - 用户
- `SearchOutline` - 搜索
- `UnorderedListOutline` - 列表
- `CheckCircleOutline` - 成功
- `CloseCircleOutline` - 关闭
- `LeftOutline` - 左箭头
- `RightOutline` - 右箭头
- `DownOutline` - 下箭头
- `UpOutline` - 上箭头
- `AddOutline` - 添加
- `DeleteOutline` - 删除

更多图标请查看：[antd-mobile-icons](https://mobile.ant.design/zh/components/icon)

## 🎯 实际应用示例

### 示例 1: 登录表单

```tsx
import { Form, Input, Button, Toast } from 'antd-mobile';

const LoginForm = () => {
  const [form] = Form.useForm();

  const handleLogin = async () => {
    try {
      const values = await form.validateFields();
      // 处理登录逻辑
      Toast.show({ icon: 'success', content: '登录成功' });
    } catch (error) {
      Toast.show({ icon: 'fail', content: '请填写完整信息' });
    }
  };

  return (
    <Form
      form={form}
      layout="horizontal"
      footer={
        <Button block color="primary" onClick={handleLogin}>
          登录
        </Button>
      }
    >
      <Form.Item
        name="username"
        label="用户名"
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input placeholder="请输入用户名" clearable />
      </Form.Item>
      <Form.Item
        name="password"
        label="密码"
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input type="password" placeholder="请输入密码" clearable />
      </Form.Item>
    </Form>
  );
};
```

### 示例 2: 列表页面

```tsx
import { List, Card, Tag, InfiniteScroll } from 'antd-mobile';

const ListPage = () => {
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = async () => {
    // 加载更多数据
    const newData = await fetchData();
    setData([...data, ...newData]);
    setHasMore(newData.length > 0);
  };

  return (
    <>
      <List>
        {data.map((item) => (
          <List.Item
            key={item.id}
            prefix={<Avatar src={item.avatar} />}
            description={item.desc}
            extra={<Tag color="primary">{item.tag}</Tag>}
          >
            {item.title}
          </List.Item>
        ))}
      </List>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
    </>
  );
};
```

### 示例 3: 底部导航

```tsx
import { TabBar } from 'antd-mobile';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppOutline, UnorderedListOutline, UserOutline } from 'antd-mobile-icons';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { key: '/', title: '首页', icon: <AppOutline /> },
    { key: '/list', title: '列表', icon: <UnorderedListOutline /> },
    { key: '/mine', title: '我的', icon: <UserOutline /> },
  ];

  return (
    <TabBar 
      activeKey={location.pathname} 
      onChange={(key) => navigate(key)}
      style={{ position: 'fixed', bottom: 0, width: '100%' }}
    >
      {tabs.map(item => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  );
};
```

## 🎨 样式定制

### CSS 变量

antd-mobile 使用 CSS 变量进行样式定制：

```scss
.my-component {
  // 使用 antd-mobile 的 CSS 变量
  color: var(--adm-color-primary);
  background: var(--adm-color-background);
  border: 1px solid var(--adm-border-color);
}
```

### 全局样式覆盖

```scss
// 修改全局样式
:root {
  --adm-color-primary: #your-color;
  --adm-color-background: #your-background;
}
```

### 组件级样式

```tsx
<Button
  style={{
    '--background-color': '#ff0000',
    '--border-radius': '20px',
  }}
>
  自定义按钮
</Button>
```

## 📝 最佳实践

### 1. 使用 Space 控制间距

```tsx
// 推荐
<Space direction="vertical" block style={{ '--gap': '16px' }}>
  <Card>卡片1</Card>
  <Card>卡片2</Card>
</Space>

// 不推荐
<div>
  <Card style={{ marginBottom: 16 }}>卡片1</Card>
  <Card>卡片2</Card>
</div>
```

### 2. Form 表单验证

```tsx
// 使用 Form.useForm 和 validateFields
const [form] = Form.useForm();

const handleSubmit = async () => {
  try {
    const values = await form.validateFields();
    // 表单验证通过
  } catch (error) {
    // 表单验证失败
    Toast.show({ icon: 'fail', content: '请检查表单' });
  }
};
```

### 3. Toast 提示反馈

```tsx
// 操作成功
Toast.show({ icon: 'success', content: '操作成功' });

// 操作失败
Toast.show({ icon: 'fail', content: '操作失败' });

// 加载中（需手动关闭）
const handler = Toast.show({
  icon: 'loading',
  content: '加载中...',
  duration: 0,
});

// 完成后关闭
handler.close();
```

### 4. 使用 CSS 变量统一样式

```tsx
// 统一使用 CSS 变量
<div style={{
  color: 'var(--adm-color-text)',
  background: 'var(--adm-color-background)',
}}>
  内容
</div>
```

## 🔗 相关资源

### 官方文档
- [Ant Design Mobile 官网](https://mobile.ant.design/)
- [组件文档](https://mobile.ant.design/zh/components)
- [主题定制](https://mobile.ant.design/zh/guide/theming)

### 项目文档
- [项目 README](./README.md)
- [SCSS 使用指南](./SCSS_GUIDE.md)
- [快速开始](./QUICK_START.md)

## 🎉 开始使用

现在你可以开始使用 antd-mobile 构建你的移动端应用了！

```bash
# 启动开发服务器
yarn start

# 访问 http://localhost:3000
```

查看项目中的三个示例页面，了解如何使用 antd-mobile 组件：
- 📱 首页 - Card、Button、Space、Tag 等
- 📊 控制面板 - Form、Input、List 等
- 📖 关于 - Grid、Tag、Divider 等

Happy Coding! 🚀

