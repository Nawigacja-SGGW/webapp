import { Outlet } from 'react-router-dom';
import './AuthorizationLayout.scss';

export const AuthorizationLayout = () => {
  return (
    <div className="authorization-layout">
      <div className="authorization-layout__logo">
        <div>logo</div>
      </div>
      <div className="authorization-layout__content">
        <div className="authorization-layout__logos">
          {/* <img src="" alt="logo" /> */}
          <p>logo</p>
          <div className="authorization-layout__divider" />
          <img src="../../../public/logo sggw 2.png" alt="sggw" />
        </div>
        <Outlet />
      </div>
    </div>
  );
};
