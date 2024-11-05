import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthLayout } from './layouts/AuthLayout';
import { useTranslation } from 'react-i18next';
import { ObjectsOverviewPage } from './pages/ObjectsOverview/ObjectsOverviewPage.tsx';
import { ErrorPage } from './pages/ErrorPage/ErrorPage.tsx';
import Map from './components/Map/Map';
import { ObjectDetails } from './pages/ObjectDetails/ObjectDetails.tsx';

function App() {
  const { t } = useTranslation();
  const router = createBrowserRouter([
    {
      path: '/',
      element: <div>Init page, check auth and redirect</div>,
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
