import { Outlet, useNavigate } from 'react-router-dom';
import { Sidebar } from '../../components/Sidebar/Sidebar.tsx';
import '../index.scss';
import MobileNavbar from '../../components/MobileNavbar/MobileNavbar.tsx';
import { useEffect, useState } from 'react';
import { useAppStore } from '../../store';

export const AuthorizedLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const authData = useAppStore((state) => state.authData);
  const navigate = useNavigate();

  useEffect(() => {
    if (authData === null) {
      navigate('/login');
    }
  }, [authData, navigate]);

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
