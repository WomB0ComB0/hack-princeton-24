import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(auth)/_auth/layout')({
  component: LayoutComponent,
});

function LayoutComponent() {
  return (
    <div>
      <h1>Layout</h1>
      <Outlet />
    </div>
  );
}
