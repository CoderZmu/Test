import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import CreateBot from '../pages/CreateBot';
import BotDetail from '../pages/BotDetail';
import CommandDetail from '../pages/CommandDetail';
import CommandEdit from '../pages/CommandEdit';

// 404 页面组件
const NotFound: React.FC = () => (
  <div style={{ 
    padding: '50px', 
    textAlign: 'center',
    maxWidth: '600px',
    margin: '0 auto'
  }}>
    <h1 style={{ fontSize: '72px', color: '#2196F3', margin: '0' }}>404</h1>
    <h2 style={{ color: '#666' }}>页面未找到</h2>
    <p style={{ color: '#999' }}>抱歉，您访问的页面不存在。</p>
    <a 
      href="/" 
      style={{ 
        display: 'inline-block',
        marginTop: '20px',
        padding: '12px 24px',
        background: '#2196F3',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '6px'
      }}
    >
      返回首页
    </a>
  </div>
);

// 创建路由配置
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'create-bot',
        element: <CreateBot />,
      },
      {
        path: 'botfather/bot/:botId',
        element: <BotDetail />,
      },
      {
        path: 'botfather/bot/:botId/commands',
        element: <CommandDetail />,
      },
      {
        path: 'botfather/bot/:botId/commandcreate',
        element: <CommandEdit />,
      },
      {
        path: 'botfather/bot/:botId/command/:commandName',
        element: <CommandEdit />,
      },
      {
        path: '404',
        element: <NotFound />,
      },
      {
        path: '*',
        element: <Navigate to="/404" replace />,
      },
    ],
  },
]);

export default router;
