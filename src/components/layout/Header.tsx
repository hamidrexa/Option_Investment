'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useDemo } from '@/hooks/useDemo';
import { Badge } from '@/components/ui/badge';
import { PanelRightClose } from 'lucide-react';

export function AppHeader() {
  const { isLive, toggleLive } = useDemo();

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur-sm sm:h-16 sm:px-6">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="md:hidden">
            <PanelRightClose />
          </SidebarTrigger>
          <div className="flex items-center gap-x-2">
            <Switch id="live-demo-toggle" checked={isLive} onCheckedChange={toggleLive} />
            <Label htmlFor="live-demo-toggle" className="flex items-center gap-2 cursor-pointer">
              دموی زنده
              <Badge variant={isLive ? 'default' : 'secondary'} className={`transition-colors duration-300 ${isLive ? 'bg-green-500 hover:bg-green-600' : ''}`}>
                  {isLive ? 'روشن' : 'خاموش'}
              </Badge>
            </Label>
          </div>
        </div>
        
        <div className="hidden md:block">
            <h1 className="text-xl font-bold tracking-tight">شبیه‌ساز مشتقه</h1>
        </div>
      </div>
    </header>
  );
}
