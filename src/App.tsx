import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthLayout } from './layouts/AuthLayout';
import { ObjectsOverviewPage } from './pages/ObjectsOverview/ObjectsOverviewPage.tsx';
import { ErrorPage } from './pages/ErrorPage/ErrorPage.tsx';
import { Settings } from './components/Settings/Settings.tsx';

function App() {
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
          element: <div>Map component</div>,
        },
        {
          path: '/home/settings',
          element: <Settings />,
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
