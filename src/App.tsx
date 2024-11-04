import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {useTranslation} from "react-i18next";

function App() {
    const { t } = useTranslation();

    const router = createBrowserRouter([
        {
            path: '/',
            element: <div>{t("exampleTranslationForHomePage")}</div>,
        },
        {
            path: '/auth',
            element: <div>Auth page</div>,
        },
        {
            path: '/settings',
            element: <div>Settings page</div>,
        },
        {
            path: '/profile',
            element: <div>Profile page</div>,
        },
        // TODO: Add a route for specific object like /object/id
        {
            path: '/objects',
            element: <div>Home page</div>,
        },
        {
            path: '*',
            element: <div>Redirect do home page?</div>,
        },
    ]);
    return <RouterProvider router={router} />;
}

export default App;
