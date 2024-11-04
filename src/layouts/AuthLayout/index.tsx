import { Outlet } from 'react-router-dom';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import '../index.scss';

export const AuthLayout = () => {
  return (
    <div className="container">
      <Sidebar />
      <Outlet />
    </div>
  );
};
