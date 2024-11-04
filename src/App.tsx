import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthLayout } from './layouts/AuthLayout';
import { useTranslation } from 'react-i18next';

function App() {
  const { t } = useTranslation();
  const router = createBrowserRouter([
    {
      path: '/',
      element: <div>Home page/Map page</div>,
    },
    {
      path: '/auth',
      element: <div>Auth page</div>,
    },
    {
      path: '/home',
      element: <AuthLayout />,
      children: [
        {
          path: '/home/settings',
          element: <div>{t('exampleTranslation')}</div>,
        },
        {
          path: '/home/profile',
          element: <div>Profile page</div>,
        },
        // TODO: Add a route for specific object like /object/id
        {
          path: '/home/objects',
          element: <h1>Objects</h1>,
        },
      ],
    },
    {
      path: '*',
      element: <div>Redirect do home page?</div>,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
