"use client";

import { useState } from "react";
import { User, Palette, Key, Bell, Trash2, Save } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "account", label: "Account", icon: User },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "api", label: "API keys", icon: Key },
  { id: "notifications", label: "Notifications", icon: Bell }
];

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [tab, setTab] = useState("account");

  return (
    <div className="space-y-8" data-testid="settings-page">
      <div>
        <div className="label-mono mb-3">Configuration</div>
        <h1 className="font-heading text-4xl font-medium">Settings</h1>
      </div>

      <div className="grid md:grid-cols-[220px_1fr] gap-8">
        <aside className="space-y-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                tab === t.id
                  ? "bg-[hsl(var(--accent))] text-[hsl(var(--foreground))]"
                  : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--accent))]/60 hover:text-[hsl(var(--foreground))]"
              )}
              data-testid={`settings-tab-${t.id}`}
            >
              <t.icon className="h-4 w-4" /> {t.label}
            </button>
          ))}
        </aside>

        <div className="space-y-4">
          {tab === "account" && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Profile</CardTitle>
                  <CardDescription>Name, email, and how you show up.</CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label>Full name</Label>
                    <Input defaultValue="Jamie Rivera" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Email</Label>
                    <Input defaultValue="jamie@work.com" type="email" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Password</Label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Timezone</Label>
                    <Input defaultValue="Europe/Lisbon" />
                  </div>
                </CardContent>
              </Card>
              <Card className="border-[hsl(var(--destructive))]/30">
                <CardHeader>
                  <CardTitle className="text-[hsl(var(--destructive))]">Danger zone</CardTitle>
                  <CardDescription>Delete your workspace and everything in it. Irreversible.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="destructive" data-testid="settings-delete-account">
                    <Trash2 className="h-4 w-4" /> Delete account
                  </Button>
                </CardContent>
              </Card>
            </>
          )}

          {tab === "appearance" && (
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Dark, light, or let the system decide.</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-3 gap-3">
                {[
                  { k: "light", label: "Light", tone: "bg-white border" },
                  { k: "dark", label: "Dark", tone: "bg-zinc-900" },
                  { k: "system", label: "System", tone: "bg-gradient-to-r from-white via-zinc-500 to-zinc-900" }
                ].map((o) => (
                  <button
                    key={o.k}
                    onClick={() => setTheme(o.k)}
                    className={cn(
                      "rounded-xl border p-3 text-left transition-all",
                      theme === o.k
                        ? "border-[hsl(var(--foreground))]"
                        : "border-[hsl(var(--border))] hover:border-[hsl(var(--foreground))]/40"
                    )}
                    data-testid={`theme-${o.k}`}
                  >
                    <div className={cn("h-20 w-full rounded-md mb-2", o.tone)} />
                    <div className="text-sm font-medium">{o.label}</div>
                  </button>
                ))}
              </CardContent>
            </Card>
          )}

          {tab === "api" && (
            <Card>
              <CardHeader>
                <CardTitle>API keys</CardTitle>
                <CardDescription>Wire your own LLMs. We never touch them.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1.5">
                  <Label>Google API key</Label>
                  <Input type="password" placeholder="AIza…" />
                </div>
                <div className="space-y-1.5">
                  <Label>OpenAI API key</Label>
                  <Input type="password" placeholder="sk-…" />
                </div>
                <div className="space-y-1.5">
                  <Label>Admin key (x-admin-key)</Label>
                  <Input type="password" placeholder="Set in your backend .env" />
                </div>
                <Button onClick={() => toast.success("Saved.")}>
                  <Save className="h-4 w-4" /> Save keys
                </Button>
              </CardContent>
            </Card>
          )}

          {tab === "notifications" && (
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>How we nudge you.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "Weekly review: applications without follow-ups",
                  "When an ATS score drops below 85 after edit",
                  "New templates & features",
                  "Product tips based on your stage"
                ].map((n) => (
                  <label
                    key={n}
                    className="flex items-center justify-between py-2.5 border-b border-[hsl(var(--border))] last:border-0 cursor-pointer"
                  >
                    <span className="text-sm">{n}</span>
                    <input type="checkbox" defaultChecked className="h-4 w-4 accent-[hsl(var(--foreground))]" />
                  </label>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
