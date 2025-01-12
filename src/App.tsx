import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthorizedLayout } from './layouts/AuthLayout';
import { ObjectsOverviewPage } from './pages/ObjectsOverview/ObjectsOverviewPage.tsx';
import { ErrorPage } from './pages/ErrorPage/ErrorPage.tsx';
import { Settings } from './components/Settings/Settings.tsx';
import Map from './components/Map/Map';
import { ObjectDetails } from './pages/ObjectDetails/ObjectDetails.tsx';
import { AuthorizationLayout } from './layouts/AuthorizationLayout/AuthorizationLayout.tsx';
import { LoginPage } from './pages/LoginPage/LoginPage.tsx';
import { RegisterPage } from './pages/RegisterPage/RegisterPage.tsx';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage/ForgotPasswordPage.tsx';
import { ChangePasswordPage } from './pages/ChangePasswordPage/ChangePasswordPage.tsx';
import { GuidePage } from './pages/GuidePage/GuidePage.tsx';
import { ProfilePage } from './pages/ProfilePage/ProfilePage.tsx';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <AuthorizationLayout />,
      children: [
        { path: '/', element: <LoginPage /> },
        { path: 'login', element: <LoginPage /> },
        { path: 'register', element: <RegisterPage /> },
        { path: 'forgot-password', element: <ForgotPasswordPage /> },
        { path: 'change-password', element: <ChangePasswordPage /> },
      ],
    },
    {
      path: '/home',
      element: <AuthorizedLayout />,
      children: [
        {
          path: '/home/map',
          element: <Map />,
        },
        {
          path: '/home/guide',
          element: <GuidePage />,
        },
        {
          path: '/home/settings',
          element: <Settings />,
        },
        {
          path: '/home/profile',
          element: <ProfilePage />,
        },
        // TODO: Add a route for specific object like /object/id
        {
          path: '/home/objects',
          element: <ObjectsOverviewPage />,
        },
        {
          path: '/home/objects/:id',
          element: <ObjectDetails />,
        },
      ],
    },
    {
      path: '*',
      element: <ErrorPage />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
