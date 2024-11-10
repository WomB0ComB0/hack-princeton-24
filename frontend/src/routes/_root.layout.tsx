import { Providers } from '@/providers'
import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_root/layout')({  // Keep this path
  component: RootLayout,
})

function RootLayout() {
  return (
    <Providers>
      <Outlet />
    </Providers>
  )
}