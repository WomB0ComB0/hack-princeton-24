import { RouterProvider, createRouter } from '@tanstack/react-router';
import useDebugRender from 'tilg';
import { routeTree } from './routeTree.gen';

// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
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
