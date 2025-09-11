'use client';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/Sidebar';
import { AppHeader } from '@/components/layout/Header';

export function AppShell({ children }: { children: React.ReactNode }) {
  const sidebarConfig = {
    defaultOpen: true,
    collapsible: 'icon' as const,
  };

  return (
    <SidebarProvider {...sidebarConfig}>
      <Sidebar side="right">
        <AppSidebar />
      </Sidebar>
      <SidebarInset className="min-h-screen flex flex-col">
        <AppHeader />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-background/95">
            {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
