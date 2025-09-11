'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  AreaChart,
  FileText,
  Settings,
  Bot,
  CandlestickChart,
  Link2,
  UserCircle,
  LogOut,
  ChevronRight,
  PieChart,
  View,
  BarChart,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const menuItems = [
  { href: '/', label: 'داشبورد', icon: LayoutDashboard },
  { href: '/portfolio-glance', label: 'سبد در یک نگاه', icon: PieChart },
  { href: '/market-and-options', label: 'دیده‌بان و زنجیره آپشن', icon: View },
  { href: '/statistical-analysis', label: 'تحلیلهای آماری و سنتیمنت بازار', icon: BarChart },
  { href: '/strategy-builder', label: 'استراتژی ساز', icon: CandlestickChart },
  { href: '/pnl/pf-001', label: 'گزارش سود و زیان', icon: AreaChart },
  { href: '/orders', label: 'سفارشات', icon: FileText },
  { href: '/bots', label: 'ربات‌ها', icon: Bot },
  { href: '/settings', label: 'تنظیمات', icon: Settings },
  { href: '/profile', label: 'پروفایل', icon: UserCircle },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { state, toggleSidebar } = useSidebar();

  return (
    <>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center justify-between p-2">
            <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-lg font-bold">D</div>
                <span className="text-lg font-semibold text-sidebar-foreground">شبیه‌ساز مشتقه</span>
            </div>
            <Button
                variant="ghost"
                size="icon"
                className="hidden md:flex h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                onClick={toggleSidebar}
            >
                <ChevronRight className={cn("transition-transform", state === "collapsed" && "rotate-180")} />
            </Button>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={{
                  children: item.label,
                  className: 'bg-sidebar-accent text-sidebar-accent-foreground border-sidebar-border'
                }}
              >
                <Link href={item.href}>
                  <item.icon className="shrink-0" />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter className="p-2">
          <SidebarMenu>
              <SidebarMenuItem>
                 <SidebarMenuButton
                    asChild
                     tooltip={{
                        children: 'پروفایل',
                        className: 'bg-sidebar-accent text-sidebar-accent-foreground border-sidebar-border'
                     }}
                 >
                    <Link href="/profile" className="flex items-center gap-2 w-full">
                         <Avatar className="w-7 h-7">
                            <AvatarImage src="https://picsum.photos/seed/user/128/128" />
                            <AvatarFallback>AK</AvatarFallback>
                        </Avatar>
                        <span>علیرضا کریمی</span>
                        <LogOut className="h-4 w-4 ml-auto" />
                    </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
          </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
