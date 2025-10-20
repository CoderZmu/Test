# 样式重构说明

## 概述

将 `Home` 和 `CreateBot` 页面中的公共样式提取到 `src/styles/` 全局样式文件中，避免样式重复，提高可维护性。

## 改动文件

### 1. `src/styles/variables.scss`
**新增内容：**
- 添加 BotFather 主题相关的 SCSS 变量（以 `$bf-` 前缀命名）
- 包括颜色、尺寸、过渡等变量

```scss
// BotFather 主题变量
$bf-text-color: #8794a1;
$bf-accent-color: #4cb2ff;
$bf-header-color: #fff;
$bf-field-bg-color: #212a33;
// ... 等
```

### 2. `src/styles/global.scss`
**新增内容：**
- CSS 变量定义（`:root`）
- 主容器样式（`#aj_content`, `.tm-main`）
- 介绍区域（`.tm-main-intro`）
- 表单组件（`.tm-field`, `.form-control`, `.tm-input`）
- 按钮样式（`.btn`, `.btn-primary`）
- 提示组件（`.hint-text`, `.help-text`）
- Toast 组件（`.tm-toast-container`, `.tm-toast`）
- 表格组件（`.tm-table-wrap`, `.tm-row`）
- 响应式设计媒体查询
- 各种动画关键帧

**总计新增：** ~670 行公共样式代码

### 3. `src/pages/Home/styles.scss`
**重构前：** 336 行
**重构后：** 69 行（减少 267 行，减少 79.5%）

**保留内容：**
- 仅保留 Home 页面特有的搜索表单样式（`.tm-main-search-form`）

**移除内容：**
- 所有公共 CSS 变量定义
- 主容器、介绍区域等通用组件样式
- 表格、行、按钮等通用组件样式

### 4. `src/pages/CreateBot/styles.scss`
**重构前：** 482 行
**重构后：** 19 行（减少 463 行，减少 96.1%）

**保留内容：**
- 仅保留 CreateBot 页面特有的头像上传交互效果

**移除内容：**
- 所有公共 CSS 变量定义
- 所有通用组件样式

## 提取的公共组件样式

### 布局组件
- `#aj_content` - 页面主容器
- `.tm-main` - 内容区域
- `.tm-main-intro` - 介绍区域
- `.tm-section` - 区域容器

### 表单组件
- `.tm-field` - 表单字段容器
- `.form-control` / `.tm-input` - 输入框
- `.tm-field-const-prefix` - 固定前缀（如 t.me/）
- `textarea.tm-input` - 文本域

### 交互组件
- `.tm-search-clear` - 清除按钮
- `.tm-search-loading` - 加载动画
- `.icon-before` / `.icon-search-clear` - 图标

### 提示组件
- `.hint-text` - 提示文本（支持 success/error/loading 状态）
- `.help-text` - 帮助文本

### 按钮组件
- `.btn` - 按钮基础样式
- `.btn-primary` - 主要按钮

### Toast 组件
- `.tm-toast-container` - Toast 容器
- `.tm-toast` - Toast 消息（支持 success/error 类型）

### 表格组件
- `.tm-table-wrap` - 表格包装器
- `.tm-row` - 行容器
- `.tm-row-pic` - 行图片
- `.tm-row-value` / `.tm-row-description` - 行内容
- `.tm-row-link` - 带箭头的行
- `.tm-row-add` - 添加按钮行
- `.tm-row-container` - 空状态容器
- `.tm-row-results-empty` - 空结果提示

### 动画
- `@keyframes rotate-circle` - 旋转动画
- `@keyframes resize-circle` - 调整大小动画
- `@keyframes shake` - 抖动动画
- `@keyframes rotation` - 加载动画

### 响应式设计
- 移动端（≤768px）适配
- 桌面端（≥769px）优化
- 触摸设备优化
- 暗黑模式适配

## 使用方式

### 在页面中使用
```scss
// 只需引入基础文件
@import '../../styles/variables.scss';
@import '../../styles/mixins.scss';

// 然后直接写页面特有样式即可
// 公共样式会自动生效（通过 global.scss）
```

### 示例：新建页面
```scss
// src/pages/NewPage/styles.scss
@import '../../styles/variables.scss';
@import '../../styles/mixins.scss';

// 页面特有样式
.custom-element {
  // 可以直接使用全局定义的 CSS 变量
  color: var(--accent-color);
  background: var(--field-bg-color);
}
```

## 优势

### 1. **代码复用**
- 公共样式只需维护一份
- 减少重复代码约 730 行

### 2. **一致性**
- 所有页面使用相同的组件样式
- 确保视觉统一

### 3. **可维护性**
- 修改公共样式只需改一处
- 降低维护成本

### 4. **性能优化**
- 减少样式文件大小
- 提高加载速度

### 5. **扩展性**
- 新页面可直接使用公共样式
- 快速开发

## 注意事项

1. **CSS 变量命名**
   - 全局 CSS 变量使用 `--` 前缀
   - SCSS 变量使用 `$bf-` 前缀

2. **样式优先级**
   - 页面特有样式可以覆盖全局样式
   - 使用相同的类名时，页面样式优先级更高

3. **引入顺序**
   - 确保 `global.scss` 在 `src/index.tsx` 或 `App.tsx` 中引入
   - 页面样式在组件中引入

## 后续优化建议

1. **组件化**
   - 考虑将一些复杂的样式提取为独立的组件样式文件
   - 如 `components/_toast.scss`, `components/_button.scss`

2. **主题支持**
   - 基于现有的 CSS 变量系统
   - 可轻松实现多主题切换

3. **工具类**
   - 可以添加更多实用的工具类
   - 如间距、对齐等

4. **文档**
   - 为每个公共组件编写使用文档
   - 包括示例代码和效果图

## 总结

通过这次重构：
- ✅ 移除了约 730 行重复代码
- ✅ 提高了代码可维护性
- ✅ 确保了样式一致性
- ✅ 为后续开发奠定了良好基础

