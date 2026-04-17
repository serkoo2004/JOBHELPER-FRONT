"use client";

import { useState } from "react";
import { Shield, Key, Lock, Activity, Users, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const METRICS = [
  { label: "Total users", value: "12,483", icon: Users },
  { label: "Drafts (30d)", value: "38,221", icon: FileText },
  { label: "API requests", value: "1.2M", icon: Activity },
  { label: "Avg latency", value: "186ms", icon: Shield }
];

const AUDIT = [
  { id: "log-1", method: "POST", path: "/api/v1/resumes/auto-draft", status: 200, ip: "10.0.0.12", ua: "Mozilla/5.0", time: "12:48:21", ms: 1248 },
  { id: "log-2", method: "GET", path: "/api/v1/profiles/u_1", status: 200, ip: "10.0.0.12", ua: "Mozilla/5.0", time: "12:48:14", ms: 34 },
  { id: "log-3", method: "POST", path: "/api/v1/auth/login", status: 401, ip: "45.12.88.201", ua: "curl/7.88", time: "12:47:58", ms: 12 },
  { id: "log-4", method: "POST", path: "/api/v1/cover-letters/generate", status: 200, ip: "10.0.0.18", ua: "Mozilla/5.0", time: "12:47:40", ms: 2041 },
  { id: "log-5", method: "POST", path: "/api/v1/flows/document", status: 200, ip: "10.0.0.21", ua: "Mozilla/5.0", time: "12:47:22", ms: 154 }
];

export default function AdminPage() {
  const [adminKey, setAdminKey] = useState("");
  const [authed, setAuthed] = useState(false);

  const submit = () => {
    if (typeof window !== "undefined") localStorage.setItem("cc_admin_key", adminKey);
    setAuthed(true);
    toast.success("Admin key stored.");
  };

  if (!authed) {
    return (
      <div className="max-w-md mx-auto mt-20" data-testid="admin-gate">
        <Card className="p-8">
          <div className="h-12 w-12 rounded-xl border border-[hsl(var(--border))] flex items-center justify-center mb-6">
            <Lock className="h-5 w-5" />
          </div>
          <h1 className="font-heading text-2xl mb-2">Admin gate</h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))] mb-6">
            This panel is protected with <code className="font-mono text-xs">x-admin-key</code>. Set yours below.
          </p>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label>Admin key</Label>
              <Input
                type="password"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submit()}
                placeholder="Your ADMIN_API_KEY"
                data-testid="admin-key-input"
              />
            </div>
            <Button className="w-full" onClick={submit} data-testid="admin-key-submit">
              <Key className="h-4 w-4" /> Authenticate
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8" data-testid="admin-page">
      <div className="flex items-center justify-between">
        <div>
          <div className="label-mono mb-3">System</div>
          <h1 className="font-heading text-4xl font-medium">Admin Dashboard</h1>
        </div>
        <Badge variant="success" dot>
          Authenticated
        </Badge>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {METRICS.map((m) => (
          <Card key={m.label} className="p-6">
            <div className="flex items-center justify-between mb-3">
              <m.icon className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
              <div className="label-mono">{m.label}</div>
            </div>
            <div className="font-heading text-3xl font-medium font-mono">{m.value}</div>
          </Card>
        ))}
      </div>

      <Card>
        <div className="flex items-center justify-between p-6 border-b border-[hsl(var(--border))]">
          <div>
            <h3 className="font-heading text-lg font-medium">Audit log</h3>
            <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">Recent system activity</p>
          </div>
          <Button size="xs" variant="secondary">Export CSV</Button>
        </div>
        <div className="font-mono text-xs">
          <div className="grid grid-cols-[80px_1fr_80px_140px_100px_80px] gap-4 px-6 py-2.5 label-mono border-b border-[hsl(var(--border))]">
            <div>Method</div>
            <div>Path</div>
            <div>Status</div>
            <div>IP</div>
            <div>Time</div>
            <div className="text-right">Duration</div>
          </div>
          {AUDIT.map((a) => (
            <div
              key={a.id}
              className="grid grid-cols-[80px_1fr_80px_140px_100px_80px] gap-4 px-6 py-3 border-b border-[hsl(var(--border))] last:border-0 hover:bg-[hsl(var(--accent))]/50"
            >
              <div>
                <Badge variant={a.method === "POST" ? "default" : "outline"}>{a.method}</Badge>
              </div>
              <div className="truncate">{a.path}</div>
              <div>
                <Badge variant={a.status === 200 ? "success" : "danger"}>{a.status}</Badge>
              </div>
              <div className="text-[hsl(var(--muted-foreground))]">{a.ip}</div>
              <div className="text-[hsl(var(--muted-foreground))]">{a.time}</div>
              <div className="text-right">{a.ms}ms</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
