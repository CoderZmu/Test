import React from 'react';
import { Outlet } from 'react-router-dom';
import './styles.scss';

const Layout: React.FC = () => {
  return (
    <div className="layout">
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
