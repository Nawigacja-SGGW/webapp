import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthorizedLayout } from './layouts/AuthLayout';
import {
  ObjectsOverviewPage,
  ErrorPage,
  ObjectDetails,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ChangePasswordPage,
  ProfilePage,
  StatsPage,
  GuidePage,
  RankingPage,
  Settings,
} from './pages';
import Map from './components/Map/Map';
import { AuthorizationLayout } from './layouts/AuthorizationLayout/AuthorizationLayout.tsx';

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
        {
          path: '/home/rank',
          element: <RankingPage />,
        },
        {
          path: '/home/stats',
          element: <StatsPage />,
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
