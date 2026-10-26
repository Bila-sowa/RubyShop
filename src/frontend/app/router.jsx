import { createBrowserRouter } from 'react-router';
import { Layout } from '@/components/layout/Layout.jsx';
import { HomePage } from '@/pages/home/HomePage.jsx';
import { NotFoundPage } from '@/pages/not-found/NotFoundPage.jsx';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: '*', Component: NotFoundPage },
    ],
  },
]);
