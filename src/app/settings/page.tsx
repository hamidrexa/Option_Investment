"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/context/ThemeContext";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Sun, Moon } from "lucide-react";

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState("");
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();

  const handleSave = () => {
    console.log("API Key to save:", apiKey);
    toast({
      title: "تنظیمات ذخیره شد",
      description: "کلید API شما پیکربندی شد (شبیه‌سازی).",
    });
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">تنظیمات</h2>
      </div>
       <Card>
        <CardHeader>
          <CardTitle>پیکربندی API</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="apiKey">کلید API Gemini</Label>
                <Input 
                    id="apiKey" 
                    type="password" 
                    placeholder="کلید API Gemini خود را وارد کنید"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                />
            </div>
        </CardContent>
        <CardFooter>
            <Button onClick={handleSave}>ذخیره</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>ظاهر برنامه</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label>تم</Label>
            <RadioGroup
              defaultValue={theme}
              onValueChange={(value) => setTheme(value as 'light' | 'dark')}
              className="flex items-center space-x-4 space-x-reverse"
            >
              <div className="flex items-center space-x-2 space-x-reverse">
                <RadioGroupItem value="light" id="light" />
                <Label htmlFor="light" className="flex items-center gap-2 cursor-pointer">
                  <Sun className="h-5 w-5" />
                  روشن
                </Label>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <RadioGroupItem value="dark" id="dark" />
                <Label htmlFor="dark" className="flex items-center gap-2 cursor-pointer">
                  <Moon className="h-5 w-5" />
                  تاریک
                </Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>تنظیمات بیشتر</CardTitle>
        </CardHeader>
        <CardContent>
          <p>این بخش شامل کنترل‌های دمو، ضامن‌های API، گزینه‌های خروجی و سایر تنظیمات برنامه خواهد بود.</p>
        </CardContent>
      </Card>
    </div>
  );
}
