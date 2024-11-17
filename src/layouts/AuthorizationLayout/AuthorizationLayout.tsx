import { Outlet } from 'react-router-dom';
import './AuthorizationLayout.scss';

export const AuthorizationLayout = () => {
  return (
    <div className="authorization-layout">
      <div className="authorization-layout__logo">
        <div className="authorization-layout__logo-container">
          <img src="../../../public/logo.png" alt="logo" />
        </div>
      </div>
      <div className="authorization-layout__content">
        <div className="authorization-layout__logos">
          <div className="authorization-layout__logo-wrapper">
            <img src="../../../public/logo.png" alt="logo" />
          </div>
          <div className="authorization-layout__divider" />
          <div className="authorization-layout__logo-wrapper">
            <img src="../../../public/logo-sggw.png" alt="sggw" />
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};
