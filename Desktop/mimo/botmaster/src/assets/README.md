# Assets 资源文件夹

存放项目中使用的静态资源文件。

## 📁 文件夹结构

```
assets/
├── images/         # 图片文件
│   ├── avatars/   # 头像图片
│   ├── logos/     # Logo 图片
│   └── backgrounds/ # 背景图片
├── icons/          # 图标文件
│   └── *.svg      # SVG 图标
└── fonts/          # 字体文件
```

## 🖼️ images/ - 图片文件

存放各种图片资源，如：
- PNG、JPG、JPEG、GIF、WebP 等格式
- 按用途分类存放在子文件夹中

**示例：**
```
images/
├── avatars/
│   ├── default-avatar.png
│   └── bot-avatar.png
├── logos/
│   ├── logo.png
│   └── logo-dark.png
└── backgrounds/
    └── hero-bg.jpg
```

## 🎨 icons/ - 图标文件

存放 SVG 图标或图标字体文件

**示例：**
```tsx
import { ReactComponent as LogoIcon } from '@/assets/icons/logo.svg';

<LogoIcon width={24} height={24} />
```

## 📝 fonts/ - 字体文件

存放自定义字体文件

**支持格式：**
- `.woff`
- `.woff2`
- `.ttf`
- `.otf`

**使用方法：**
```scss
@font-face {
  font-family: 'CustomFont';
  src: url('../assets/fonts/custom-font.woff2') format('woff2');
}
```

## 💡 使用建议

### 1. 图片导入方式

**方式一：直接导入**
```tsx
import avatar from '@/assets/images/avatars/default-avatar.png';

<img src={avatar} alt="Avatar" />
```

**方式二：动态导入**
```tsx
const imagePath = require('@/assets/images/logos/logo.png');

<img src={imagePath} alt="Logo" />
```

**方式三：使用 public 文件夹**
对于不需要打包处理的静态资源，可以放在 `public/` 文件夹中：
```tsx
<img src="/images/logo.png" alt="Logo" />
```

### 2. 图片优化建议

- ✅ 使用 WebP 格式获得更好的压缩率
- ✅ 提供不同尺寸的图片用于响应式设计
- ✅ 压缩图片以减小文件大小
- ✅ 使用 SVG 格式的矢量图标

### 3. 命名规范

- 使用小写字母和连字符：`hero-banner.png`
- 描述性命名：`user-avatar-placeholder.png`
- 包含尺寸信息（如需要）：`logo-256x256.png`

### 4. TypeScript 支持

如果使用 TypeScript，确保在 `src/react-app-env.d.ts` 中声明图片类型：

```typescript
declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.svg' {
  import * as React from 'react';
  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;
  const src: string;
  export default src;
}
```

## 📦 推荐的图片资源

### 免费图片资源网站
- [Unsplash](https://unsplash.com/) - 高质量免费图片
- [Pexels](https://www.pexels.com/) - 免费摄影图片
- [Pixabay](https://pixabay.com/) - 免费图片和视频

### 图标资源
- [Heroicons](https://heroicons.com/) - 精美的 SVG 图标
- [Lucide Icons](https://lucide.dev/) - 简洁的图标库
- [Phosphor Icons](https://phosphoricons.com/) - 灵活的图标系统

### 图片压缩工具
- [TinyPNG](https://tinypng.com/) - PNG/JPEG 压缩
- [Squoosh](https://squoosh.app/) - 在线图片压缩工具
- [ImageOptim](https://imageoptim.com/) - macOS 图片优化工具

