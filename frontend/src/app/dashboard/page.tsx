"use client";

import Link from "next/link";
import {
  ArrowUpRight, Sparkles, FileText, Briefcase, TrendingUp, Clock,
  Wand2, MessageSquare, Upload, Target
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/store/auth";

const stats = [
  { label: "Drafts", value: "12", change: "+3 this week", icon: FileText, trend: [3, 5, 4, 7, 6, 9, 12] },
  { label: "Applications", value: "24", change: "+6 this week", icon: Briefcase, trend: [10, 12, 14, 18, 19, 22, 24] },
  { label: "Interviews", value: "5", change: "+2 vs last", icon: MessageSquare, trend: [1, 1, 2, 2, 3, 4, 5] },
  { label: "ATS avg", value: "92", change: "↑ 4 pts", icon: Target, trend: [74, 78, 80, 82, 87, 90, 92] }
];

function Sparkline({ data }: { data: number[] }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const w = 80;
  const h = 26;
  const pts = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / (max - min || 1)) * h;
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <svg width={w} height={h} className="text-[hsl(var(--foreground))]/70">
      <polyline points={pts} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function DashboardHome() {
  const { user } = useAuth();
  const firstName = user?.name?.split(" ")[0] || "there";

  return (
    <div className="space-y-10" data-testid="dashboard-home">
      {/* Welcome */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 animate-slide-up">
        <div>
          <div className="label-mono mb-3">
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-medium tracking-tight">
            Good morning, {firstName}.
          </h1>
          <p className="mt-3 text-[hsl(var(--muted-foreground))] max-w-xl">
            You have 2 drafts awaiting review and 1 application on the move. Let's keep shipping.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" asChild>
            <Link href="/dashboard/upload-cv" data-testid="home-upload-cv">
              <Upload className="h-4 w-4" /> Upload CV
            </Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/resume" data-testid="home-new-resume">
              <Sparkles className="h-4 w-4" /> Auto-draft
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="p-6 hover:border-[hsl(var(--foreground))]/20 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className="h-8 w-8 rounded-md border border-[hsl(var(--border))] flex items-center justify-center">
                <s.icon className="h-4 w-4" />
              </div>
              <Sparkline data={s.trend} />
            </div>
            <div className="font-heading text-3xl font-medium">{s.value}</div>
            <div className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">{s.label}</div>
            <div className="mt-3 text-xs flex items-center gap-1 text-[hsl(var(--success))]">
              <TrendingUp className="h-3 w-3" /> {s.change}
            </div>
          </Card>
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Quick Start */}
        <div className="lg:col-span-2">
          <Card className="relative overflow-hidden p-8 md:p-10">
            <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
            <div className="relative">
              <Badge variant="mono" className="mb-5">Quick start</Badge>
              <h2 className="font-heading text-2xl md:text-3xl font-medium tracking-tight">
                Drop a CV. Get a reviewed draft.
              </h2>
              <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))] max-w-md">
                PDF, DOCX, or TXT. We'll parse it, flag issues, and match it to the best template.
              </p>
              <div className="mt-8 border border-dashed border-[hsl(var(--border))] rounded-xl p-8 text-center bg-[hsl(var(--background))]">
                <Wand2 className="h-6 w-6 mx-auto text-[hsl(var(--muted-foreground))]" />
                <p className="mt-3 text-sm">
                  <Link href="/dashboard/upload-cv" className="underline underline-offset-4">
                    Drag & drop a CV
                  </Link>{" "}
                  or use the flow-based builder
                </p>
                <div className="mt-4 flex gap-2 justify-center">
                  <Button size="sm" asChild>
                    <Link href="/dashboard/upload-cv">Upload</Link>
                  </Button>
                  <Button size="sm" variant="secondary" asChild>
                    <Link href="/dashboard/resume">Start flow</Link>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* AI Suggestions */}
        <div>
          <Card className="p-6 h-full">
            <div className="flex items-center justify-between mb-4">
              <div className="label-mono">Coach · today</div>
              <Sparkles className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
            </div>
            <div className="space-y-4">
              {[
                { title: "Sharpen your staff eng bullet", desc: "Rewrite from 'Built' → 'Scaled to 3M users'." },
                { title: "Answer 'Why leave?'", desc: "Prep a 45s version for Thursday call." },
                { title: "Follow up: Acme recruiter", desc: "3 days since last email. Draft nudge." }
              ].map((s, i) => (
                <div key={i} className="group">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-medium leading-tight">{s.title}</div>
                      <div className="text-xs text-[hsl(var(--muted-foreground))] mt-1">{s.desc}</div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--foreground))]" />
                  </div>
                  {i < 2 && <div className="divider-soft mt-4" />}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Recent Activity */}
      <Card>
        <div className="flex items-center justify-between p-6 border-b border-[hsl(var(--border))]">
          <div>
            <h3 className="font-heading text-lg font-medium">Recent activity</h3>
            <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">Latest from your studio</p>
          </div>
          <Button variant="ghost" size="sm">See all →</Button>
        </div>
        <div className="divide-y divide-[hsl(var(--border))]">
          {[
            { name: "Senior PM — Stripe", type: "Resume v3", status: "Reviewed", time: "12m ago", variant: "success" as const },
            { name: "Staff Engineer — Linear", type: "Cover letter", status: "Generated", time: "2h ago", variant: "default" as const },
            { name: "Notion — Product Eng", type: "Application", status: "Phone screen", time: "yesterday", variant: "warning" as const },
            { name: "Figma — Sr Designer", type: "Resume v1", status: "Draft", time: "2 days ago", variant: "outline" as const }
          ].map((r, i) => (
            <div key={i} className="flex items-center gap-4 px-6 py-4 hover:bg-[hsl(var(--accent))]/50 transition-colors">
              <div className="h-8 w-8 rounded-md bg-[hsl(var(--muted))] flex items-center justify-center text-xs font-mono">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{r.name}</div>
                <div className="text-xs text-[hsl(var(--muted-foreground))]">{r.type}</div>
              </div>
              <Badge variant={r.variant}>{r.status}</Badge>
              <div className="text-xs text-[hsl(var(--muted-foreground))] flex items-center gap-1.5 w-24 justify-end">
                <Clock className="h-3 w-3" /> {r.time}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
