'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useDemo } from '@/hooks/useDemo';
import { Badge } from '@/components/ui/badge';

export function AppHeader() {
  const { isLive, toggleLive } = useDemo();

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur-sm sm:h-16 sm:px-6">
      <div className="flex w-full items-center justify-start gap-4">
        <div className="flex items-center space-x-2 dir-ltr">
            <Label htmlFor="live-demo-toggle" className="flex items-center gap-2 cursor-pointer">
                <Badge variant={isLive ? 'default' : 'secondary'} className={`transition-colors duration-300 ${isLive ? 'bg-green-500 hover:bg-green-600' : ''}`}>
                    {isLive ? 'روشن' : 'خاموش'}
                </Badge>
                دموی زنده
            </Label>
            <Switch id="live-demo-toggle" checked={isLive} onCheckedChange={toggleLive} />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="hidden md:block">
            <h1 className="text-xl font-bold tracking-tight">شبیه‌ساز مشتقه</h1>
        </div>
        <div className="md:hidden">
            <SidebarTrigger />
        </div>
      </div>
    </header>
  );
}
