import { Link } from '@tanstack/react-router';
import { BarChart3, Home, LayoutDashboard, Settings, Users } from 'lucide-react';
import type React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/_layout')({
  component: DashboardLayoutWrapper,
});

function DashboardLayoutWrapper() {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}

const menuItems = [
  { icon: Home, label: 'Home', to: '/dashboard' },
  { icon: BarChart3, label: 'Analytics', to: '/dashboard/analytics' },
  { icon: Users, label: 'Users', to: '/dashboard/users' },
  { icon: Settings, label: 'Settings', to: '/dashboard/settings' },
];

const SidebarMenuItems = React.memo(() => (
  <SidebarMenu>
    {menuItems.map((item) => (
      <SidebarMenuItem key={item.to}>
        <SidebarMenuButton asChild>
          <Link
            to={item.to}
            className={({ isActive }: { isActive: boolean }) =>
              cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 transition-colors',
                isActive
                  ? 'bg-secondary text-secondary-foreground'
                  : 'text-muted-foreground hover:bg-secondary hover:text-secondary-foreground',
              )
            }
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    ))}
  </SidebarMenu>
));

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <Sidebar className="border-r">
          <SidebarHeader>
            <div className="flex items-center gap-2 px-4 py-2">
              <LayoutDashboard className="h-6 w-6" />
              <span className="text-lg font-semibold">Dashboard</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <div className="px-4 py-2">
              <Input placeholder="Search..." aria-label="Search" />
            </div>
            <SidebarMenuItems />
          </SidebarContent>
          <SidebarFooter>
            <div className="px-4 py-2">
              <Button variant="outline" className="w-full">
                Logout
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 overflow-auto">
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-6">
            <SidebarTrigger />
          </header>
          <main className="container mx-auto py-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}