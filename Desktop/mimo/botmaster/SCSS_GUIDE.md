# SCSS 使用指南

## 📚 项目已集成 Sass/SCSS

项目已成功从纯CSS迁移到SCSS预处理器，享受更强大的样式编写能力！

## 🎯 SCSS 的优势

### 1. **变量 (Variables)**
```scss
// src/styles/variables.scss
$primary-color: #2196F3;
$spacing-lg: 24px;

// 使用
.button {
  background: $primary-color;
  padding: $spacing-lg;
}
```

### 2. **嵌套 (Nesting)**
```scss
.navigation {
  background: blue;
  
  .nav-menu {
    display: flex;
    
    a {
      color: white;
      
      &:hover {
        opacity: 0.8;
      }
    }
  }
}
```

### 3. **Mixins (混入)**
```scss
// 定义 mixin
@mixin button-primary {
  padding: 12px 24px;
  background: $primary-color;
  color: white;
  border: none;
  border-radius: 6px;
  
  &:hover {
    background: darken($primary-color, 10%);
  }
}

// 使用 mixin
.my-button {
  @include button-primary;
}
```

### 4. **函数 (Functions)**
```scss
// 内置函数
.box {
  background: lighten($primary-color, 20%);
  border: 1px solid darken($primary-color, 10%);
  color: rgba($primary-color, 0.8);
}
```

### 5. **导入 (Import)**
```scss
// 导入变量和mixins
@import '../../styles/variables.scss';
@import '../../styles/mixins.scss';

// 现在可以使用变量和mixins
.component {
  color: $primary-color;
  @include flex-center;
}
```

## 📁 项目 SCSS 结构

```
src/
├── styles/
│   ├── variables.scss   # 全局变量（颜色、尺寸、间距等）
│   ├── mixins.scss      # 可复用的mixins
│   └── global.scss      # 全局样式
├── components/
│   └── ComponentName/
│       └── styles.scss  # 组件样式
└── pages/
    └── PageName/
        └── styles.scss  # 页面样式
```

## 🎨 可用的变量

### 颜色变量
```scss
$primary-color: #2196F3;
$primary-dark: #1976D2;
$primary-light: #e3f2fd;

$secondary-color: #4CAF50;
$error-color: #f44336;
$warning-color: #ff9800;

$text-primary: #333;
$text-secondary: #666;
$text-disabled: #999;
```

### 间距变量
```scss
$spacing-xs: 8px;
$spacing-sm: 12px;
$spacing-md: 16px;
$spacing-lg: 24px;
$spacing-xl: 32px;
```

### 圆角变量
```scss
$radius-sm: 4px;
$radius-md: 6px;
$radius-lg: 8px;
$radius-xl: 12px;
$radius-round: 20px;
```

### 阴影变量
```scss
$shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
$shadow-md: 0 2px 8px rgba(0, 0, 0, 0.1);
$shadow-lg: 0 4px 12px rgba(0, 0, 0, 0.15);
```

## 🛠️ 可用的 Mixins

### 布局 Mixins
```scss
// Flex居中
@include flex-center;

// Flex两端对齐
@include flex-between;

// Flex列布局
@include flex-column;

// 绝对居中
@include absolute-center;
```

### 响应式 Mixins
```scss
// 移动端样式
@include mobile {
  font-size: 14px;
}

// 平板样式
@include tablet {
  font-size: 16px;
}

// 桌面端样式
@include desktop {
  font-size: 18px;
}
```

### 按钮 Mixins
```scss
// 主要按钮
@include button-primary;

// 次要按钮
@include button-secondary;
```

### 卡片 Mixin
```scss
// 卡片样式（带悬停效果）
@include card;
```

### 文本截断 Mixin
```scss
// 单行截断
@include text-ellipsis(1);

// 多行截断
@include text-ellipsis(3);
```

### 动画 Mixins
```scss
// 淡入动画
@include fade-in;

// 上滑动画
@include slide-up;
```

### 滚动条 Mixins
```scss
// 隐藏滚动条
@include hide-scrollbar;

// 自定义滚动条
@include custom-scrollbar(8px, #f0f0f0, #ccc);
```

## 💡 使用示例

### 示例 1: 创建新组件样式

```scss
// src/components/Card/styles.scss
@import '../../styles/variables.scss';
@import '../../styles/mixins.scss';

.card {
  @include card;
  
  .card-header {
    @include flex-between;
    margin-bottom: $spacing-lg;
    
    h3 {
      color: $primary-color;
      margin: 0;
    }
  }
  
  .card-content {
    color: $text-secondary;
    line-height: 1.6;
  }
  
  // 响应式
  @include mobile {
    padding: $spacing-md;
  }
}
```

### 示例 2: 使用嵌套和父选择器

```scss
.button {
  @include button-primary;
  
  // &符号代表父选择器
  &.small {
    padding: $spacing-xs $spacing-md;
    font-size: 12px;
  }
  
  &.large {
    padding: $spacing-md $spacing-xl;
    font-size: 18px;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
```

### 示例 3: 使用颜色函数

```scss
.theme-box {
  // 原色
  background: $primary-color;
  
  // 变亮 20%
  border-top: 2px solid lighten($primary-color, 20%);
  
  // 变暗 10%
  border-bottom: 2px solid darken($primary-color, 10%);
  
  // 半透明
  box-shadow: 0 4px 12px rgba($primary-color, 0.3);
}
```

### 示例 4: 创建响应式布局

```scss
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $spacing-lg;
  
  @include tablet {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @include mobile {
    grid-template-columns: 1fr;
  }
}
```

### 示例 5: 使用循环

```scss
// 生成间距工具类
@each $size in (xs, sm, md, lg, xl) {
  .mt-#{$size} {
    margin-top: var(--spacing-#{$size});
  }
  
  .mb-#{$size} {
    margin-bottom: var(--spacing-#{$size});
  }
}
```

## 🎯 最佳实践

### 1. 始终导入变量和mixins
```scss
// 每个组件样式文件的开头
@import '../../styles/variables.scss';
@import '../../styles/mixins.scss';
```

### 2. 使用变量而非硬编码
```scss
// ❌ 不好
.box {
  color: #2196F3;
  padding: 24px;
}

// ✅ 好
.box {
  color: $primary-color;
  padding: $spacing-lg;
}
```

### 3. 合理使用嵌套（不超过3层）
```scss
// ❌ 嵌套太深
.nav {
  .menu {
    .item {
      .link {
        color: blue; // 太深了
      }
    }
  }
}

// ✅ 合理的嵌套
.nav {
  .menu-item {
    color: blue;
    
    &:hover {
      color: darkblue;
    }
  }
}
```

### 4. 创建可复用的 Mixins
```scss
// 定义通用的 mixin
@mixin card-hover {
  transition: all 0.3s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: $shadow-lg;
  }
}

// 在多个地方使用
.product-card {
  @include card-hover;
}

.post-card {
  @include card-hover;
}
```

### 5. 使用 BEM 命名配合 SCSS
```scss
.card {
  // Block
  
  &__header {
    // Element
    @include flex-between;
  }
  
  &__title {
    // Element
    color: $primary-color;
  }
  
  &--featured {
    // Modifier
    border: 2px solid $primary-color;
  }
}
```

## 🚀 进阶技巧

### 1. 使用 @extend 继承样式
```scss
%button-base {
  padding: $spacing-sm $spacing-lg;
  border: none;
  border-radius: $radius-md;
  cursor: pointer;
}

.button-primary {
  @extend %button-base;
  background: $primary-color;
  color: white;
}

.button-secondary {
  @extend %button-base;
  background: $secondary-color;
  color: white;
}
```

### 2. 使用函数计算
```scss
@function px-to-rem($px) {
  @return $px / 16 * 1rem;
}

.text {
  font-size: px-to-rem(18); // 1.125rem
}
```

### 3. 使用 @if 条件
```scss
@mixin theme-color($theme) {
  @if $theme == 'dark' {
    background: #333;
    color: white;
  } @else {
    background: white;
    color: #333;
  }
}
```

## 📖 学习资源

- [Sass 官方文档](https://sass-lang.com/documentation)
- [Sass 中文文档](https://www.sass.hk/docs/)
- [Sass Guidelines](https://sass-guidelin.es/zh/)

## 🎉 开始使用 SCSS

现在你可以充分利用 SCSS 的强大功能来编写更加优雅和可维护的样式代码了！

