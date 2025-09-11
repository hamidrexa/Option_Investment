"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState("");
  const { toast } = useToast();

  const handleSave = () => {
    // In a real application, this would securely save the key on the server.
    // For this demo, we'll just show a confirmation toast.
    console.log("API Key to save:", apiKey);
    toast({
      title: "Settings Saved",
      description: "Your API key has been configured (simulated).",
    });
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
      </div>
       <Card>
        <CardHeader>
          <CardTitle>API Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="apiKey">Gemini API Key</Label>
                <Input 
                    id="apiKey" 
                    type="password" 
                    placeholder="Enter your Gemini API Key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                />
            </div>
        </CardContent>
        <CardFooter>
            <Button onClick={handleSave}>Save</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>More Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This section will contain demo controls, API toggles, export options, and other application settings.</p>
        </CardContent>
      </Card>
    </div>
  );
}
