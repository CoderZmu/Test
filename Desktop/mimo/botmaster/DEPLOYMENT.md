# GitHub Pages 部署指南

本项目已配置为自动部署到 GitHub Pages。

## 配置说明

### 1. package.json 配置

已添加以下配置：

- **homepage**: `https://coderzmu.github.io/Test` - GitHub Pages 的 URL
- **deploy 脚本**: 手动部署命令
- **predeploy 脚本**: 部署前自动构建

### 2. GitHub Actions 自动部署

工作流文件位置: `.github/workflows/github-pages-deploy.yml`

**触发条件**:
- 当代码推送到 `main` 或 `master` 分支时自动触发
- 可在 GitHub Actions 页面手动触发

**部署流程**:
1. 检出代码
2. 设置 Node.js 环境（版本 18）
3. 安装依赖（使用 yarn）
4. 构建项目
5. 上传构建产物
6. 部署到 GitHub Pages

### 3. 首次设置步骤

在 GitHub 仓库中启用 GitHub Pages：

1. 进入你的 GitHub 仓库: https://github.com/CoderZmu/Test
2. 点击 **Settings** (设置)
3. 在左侧菜单中找到 **Pages**
4. 在 **Source** 部分选择 **GitHub Actions**
5. 保存设置

### 4. 部署方式

#### 方式一：自动部署（推荐）

只需将代码推送到 main/master 分支：

```bash
git add .
git commit -m "你的提交信息"
git push origin main
```

GitHub Actions 会自动构建并部署。

#### 方式二：手动部署

使用 gh-pages 包手动部署：

```bash
# 安装依赖（如果还没安装）
yarn install

# 手动部署
yarn deploy
```

### 5. 查看部署状态

1. 进入 GitHub 仓库
2. 点击 **Actions** 标签
3. 查看最新的工作流运行状态

部署成功后，网站将在以下地址访问：
**https://coderzmu.github.io/Test**

### 6. 本地测试

在推送到 GitHub 之前，建议先在本地测试构建：

```bash
# 构建项目
yarn build

# 预览构建结果（需要安装 serve）
npx serve -s build
```

### 7. 故障排查

**如果部署失败**:

1. 检查 GitHub Actions 日志查看错误信息
2. 确保 package.json 中的 homepage 字段正确
3. 确保 GitHub Pages 在仓库设置中已启用
4. 检查仓库的 Actions 权限设置

**常见问题**:

- **404 错误**: 检查 homepage 路径是否正确匹配仓库名称
- **样式丢失**: 确保所有资源路径使用相对路径
- **路由问题**: 如果使用 BrowserRouter，考虑改用 HashRouter

### 8. 环境变量

如需在构建时使用环境变量，在 GitHub Actions 工作流中添加：

```yaml
- name: Build
  run: yarn build
  env:
    REACT_APP_API_URL: ${{ secrets.API_URL }}
```

## 注意事项

- 构建输出目录为 `build/`（CRA 默认）
- 确保 `.github/` 目录被提交到 Git
- 首次部署后可能需要几分钟才能访问
- 每次推送到主分支都会触发重新部署

