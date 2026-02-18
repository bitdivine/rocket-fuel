import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import HomePage from './pages/HomePage';
import BrowseComicsPage from './pages/BrowseComicsPage';
import ComicDetailPage from './pages/ComicDetailPage';
import SubmitComicPage from './pages/SubmitComicPage';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const browseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/browse',
  component: BrowseComicsPage,
});

const comicDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/comic/$id',
  component: ComicDetailPage,
});

const submitRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/submit',
  component: SubmitComicPage,
});

const routeTree = rootRoute.addChildren([indexRoute, browseRoute, comicDetailRoute, submitRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}
