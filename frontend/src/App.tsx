import { RouterProvider, createRouter } from '@tanstack/react-router';
import useDebugRender from 'tilg';
import { NotFound } from './components/client';
import { routeTree } from './routeTree.gen';
import '@/styles/tailwind.css';

// Set up a Router instance
const router = createRouter({
  routeTree,
  context: {
    head: '',
  },
  defaultPreload: 'intent',
  defaultNotFoundComponent: NotFound,
});

// Register things for typesafety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  useDebugRender();
  return <RouterProvider router={router} />;
}
