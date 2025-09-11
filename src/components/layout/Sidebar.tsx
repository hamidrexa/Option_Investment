'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  AreaChart,
  FileText,
  Settings,
  Bot,
  CandlestickChart,
  Link2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/option-chain/TSLA', label: 'Option Chain', icon: Link2 },
  { href: '/strategy-builder', label: 'Strategy Builder', icon: CandlestickChart },
  { href: '/pnl/pf-001', label: 'P&L Reports', icon: AreaChart },
  { href: '/market-watch', label: 'Market Watch', icon: FileText },
  { href: '/orders', label: 'Orders', icon: FileText },
  { href: '/bots', label: 'Bots', icon: Bot },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 p-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-lg font-bold">D</div>
            <span className="text-lg font-semibold text-sidebar-foreground">DerivaSim</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={{
                    children: item.label,
                    className: 'bg-sidebar-accent text-sidebar-accent-foreground border-sidebar-border'
                  }}
                  className={cn(
                    'group-data-[collapsible=icon]:justify-center'
                  )}
                >
                  <a>
                    <item.icon className="shrink-0" />
                    <span>{item.label}</span>
                  </a>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </>
  );
}
