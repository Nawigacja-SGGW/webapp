import { Outlet } from 'react-router-dom';
import { Sidebar } from '../../components/Sidebar/Sidebar';

export const AuthLayout = () => {
  return (
    <div>
      <Sidebar />
      <Outlet />
    </div>
  );
};
