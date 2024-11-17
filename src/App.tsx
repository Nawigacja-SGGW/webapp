import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthLayout } from './layouts/AuthLayout';
import { useTranslation } from 'react-i18next';
import { ObjectsOverviewPage } from './pages/ObjectsOverview/ObjectsOverviewPage.tsx';
import { ErrorPage } from './pages/ErrorPage/ErrorPage.tsx';
import Map from './components/Map/Map';
import { ObjectDetails } from './pages/ObjectDetails/ObjectDetails.tsx';
import { AuthorizationLayout } from './layouts/AuthorizationLayout/AuthorizationLayout.tsx';
import { LoginPage } from './layouts/LoginPage/LoginPage.tsx';
import { RegisterPage } from './layouts/RegisterPage/RegisterPage.tsx';
import { ForgotPasswordPage } from './layouts/ForgotPasswordPage/ForgotPasswordPage.tsx';
import { ChangePasswordPage } from './layouts/ChangePasswordPage/ChangePasswordPage.tsx';

function App() {
  const { t } = useTranslation();
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
      element: <AuthLayout />,
      children: [
        {
          path: '/home/map',
          element: <Map />,
        },
        {
          path: '/home/settings',
          element: <div>{t('exampleTranslation')}</div>,
        },
        {
          path: '/home/profile',
          element: <div>Profile component</div>,
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
