"use client"

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProfilePage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">پروفایل کاربری</h2>
      </div>
      <Card>
        <CardHeader className="flex flex-col items-center text-center">
          <Avatar className="w-24 h-24 mb-4">
            <AvatarImage src="https://picsum.photos/seed/user/128/128" />
            <AvatarFallback>AK</AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl">علیرضا کریمی</CardTitle>
          <p className="text-muted-foreground">عضویت: ۱ فروردین ۱۴۰۳</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">نام کامل</Label>
            <Input id="name" defaultValue="علیرضا کریمی" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">ایمیل</Label>
            <Input id="email" type="email" defaultValue="alireza@example.com" />
          </div>
        </CardContent>
        <CardFooter>
          <Button>ذخیره تغییرات</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
