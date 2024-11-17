import { Outlet } from 'react-router-dom';
import { Sidebar } from '../../components/Sidebar/Sidebar.tsx';
import '../index.scss';
import MobileNavbar from '../../components/MobileNavbar/MobileNavbar.tsx';
import { useState } from 'react';

export const AuthLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="auth-layout">
      <MobileNavbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="auth-layout__container">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <Outlet />
      </div>
    </div>
  );
};
