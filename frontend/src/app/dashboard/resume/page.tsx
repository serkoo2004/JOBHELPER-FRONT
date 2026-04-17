"use client";

import { useState } from "react";
import { Sparkles, Wand2, FileText, Download, RotateCcw, Check, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input, Textarea, Label } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const templates = [
  { id: "modern_sidebar", name: "Modern Sidebar", tag: "Versatile" },
  { id: "executive_grid", name: "Executive Grid", tag: "Leadership" },
  { id: "minimal_ats", name: "Minimal ATS", tag: "ATS-safe" },
  { id: "edinburgh_profile", name: "Edinburgh Profile", tag: "Academic" },
  { id: "royal_timeline", name: "Royal Timeline", tag: "Narrative" },
  { id: "classic_timeline", name: "Classic Timeline", tag: "Traditional" },
  { id: "burgundy_panel", name: "Burgundy Panel", tag: "Editorial" },
  { id: "crimson_edge", name: "Crimson Edge", tag: "Confident" },
  { id: "onyx_accent", name: "Onyx Accent", tag: "Premium" }
];

const warnings = [
  { level: "warning", msg: "3 of your bullets start with 'Responsible for'. Flip to 'Owned / Shipped / Cut'." },
  { level: "info", msg: "Summary could use 1 concrete metric — ATS favors outcomes." },
  { level: "success", msg: "Contact info is ATS-safe. Headline matches target role." }
];

export default function ResumeStudioPage() {
  const [selectedTemplate, setSelectedTemplate] = useState("executive_grid");
  const [targetRole, setTargetRole] = useState("");
  const [jd, setJd] = useState("");
  const [generating, setGenerating] = useState(false);

  const onGenerate = async () => {
    setGenerating(true);
    await new Promise((r) => setTimeout(r, 1200));
    setGenerating(false);
    toast.success("Auto-draft ready. Opening in Studio.");
  };

  return (
    <div className="space-y-8" data-testid="resume-studio">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <div className="label-mono mb-3">Studio</div>
          <h1 className="font-heading text-4xl font-medium">Resume Studio</h1>
          <p className="mt-2 text-[hsl(var(--muted-foreground))] max-w-xl">
            Draft, review, template, export. One surface.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" data-testid="resume-import">
            <FileText className="h-3.5 w-3.5" /> Import existing
          </Button>
          <Button size="sm" onClick={onGenerate} disabled={generating} data-testid="resume-autodraft">
            <Wand2 className="h-3.5 w-3.5" />
            {generating ? "Drafting…" : "Auto-draft"}
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-4">
        {/* Left: warnings & controls */}
        <div className="lg:col-span-4 space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="label-mono">Coach · live review</div>
              <Badge variant="success" dot>ATS 94</Badge>
            </div>
            <div className="space-y-4">
              {warnings.map((w, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span
                    className={`mt-1.5 h-1.5 w-1.5 rounded-full flex-none ${
                      w.level === "success"
                        ? "bg-[hsl(var(--success))]"
                        : w.level === "warning"
                        ? "bg-[hsl(var(--warning))]"
                        : "bg-[hsl(var(--muted-foreground))]"
                    }`}
                  />
                  <p className="text-sm leading-relaxed">{w.msg}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <div className="label-mono">Target</div>
            <div className="space-y-2">
              <Label>Target role</Label>
              <Input
                placeholder="Senior Product Engineer"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                data-testid="resume-target-role"
              />
            </div>
            <div className="space-y-2">
              <Label>Job description (optional)</Label>
              <Textarea
                placeholder="Paste the JD. We'll tailor every bullet."
                rows={5}
                value={jd}
                onChange={(e) => setJd(e.target.value)}
                data-testid="resume-jd"
              />
            </div>
          </Card>

          <Card className="p-6">
            <div className="label-mono mb-3">Version history</div>
            <div className="space-y-2">
              {[
                { v: "v3", note: "Tailored for Acme — Staff Eng", time: "12m ago", current: true },
                { v: "v2", note: "Added Checkout v2 outcomes", time: "2d ago" },
                { v: "v1", note: "Initial auto-draft", time: "5d ago" }
              ].map((v) => (
                <div
                  key={v.v}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                    v.current
                      ? "border-[hsl(var(--foreground))] bg-[hsl(var(--accent))]"
                      : "border-[hsl(var(--border))] hover:bg-[hsl(var(--accent))]/60"
                  }`}
                >
                  <div className="font-mono text-xs w-10">{v.v}</div>
                  <div className="flex-1">
                    <div className="text-sm">{v.note}</div>
                    <div className="text-xs text-[hsl(var(--muted-foreground))]">{v.time}</div>
                  </div>
                  {!v.current && (
                    <Button variant="ghost" size="xs" className="gap-1">
                      <RotateCcw className="h-3 w-3" /> Restore
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Middle: Preview */}
        <div className="lg:col-span-5">
          <Card className="h-full">
            <div className="flex items-center justify-between p-4 border-b border-[hsl(var(--border))]">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span className="label-mono">Preview · {selectedTemplate.replace("_", " ")}</span>
              </div>
              <div className="flex gap-1.5">
                <Button size="xs" variant="secondary">
                  <Download className="h-3 w-3" /> PDF
                </Button>
                <Button size="xs" variant="secondary">
                  <Download className="h-3 w-3" /> DOCX
                </Button>
              </div>
            </div>
            <div className="p-8 aspect-[8.5/11] bg-white text-zinc-900 m-4 rounded-lg shadow-md">
              <div className="border-b border-zinc-300 pb-4 mb-4">
                <h2 className="font-heading text-2xl">Jamie Rivera</h2>
                <div className="text-sm text-zinc-600 mt-1">Senior Product Engineer · Lisbon</div>
                <div className="text-xs text-zinc-500 mt-1">jamie@work.com · jamie.dev · +1 555 010 2030</div>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="text-[10px] tracking-widest uppercase text-zinc-500 mb-1">Summary</div>
                  <div className="text-xs leading-relaxed text-zinc-700">
                    Shipped checkout systems used by 12M users across 3 countries. Loves turning vague
                    product asks into measurable shipping plans.
                  </div>
                </div>
                <div>
                  <div className="text-[10px] tracking-widest uppercase text-zinc-500 mb-1">Experience</div>
                  <div className="text-xs font-medium">Staff Product Engineer — Acme</div>
                  <div className="text-[10px] text-zinc-500">2022 — Present · Lisbon</div>
                  <ul className="list-disc pl-4 text-xs text-zinc-700 mt-1 space-y-0.5">
                    <li>Scaled onboarding funnel to 3M monthly signups, cut friction 34%.</li>
                    <li>Shipped Checkout v2 across 3 markets with +18% conversion.</li>
                  </ul>
                </div>
                <div>
                  <div className="text-[10px] tracking-widest uppercase text-zinc-500 mb-1">Education</div>
                  <div className="text-xs font-medium">BSc Computer Science — MIT</div>
                  <div className="text-[10px] text-zinc-500">2018 — 2022</div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right: Templates */}
        <div className="lg:col-span-3">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-4 w-4" />
              <div className="label-mono">Templates</div>
            </div>
            <div className="space-y-2.5 max-h-[640px] overflow-y-auto pr-1">
              {templates.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTemplate(t.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${
                    selectedTemplate === t.id
                      ? "border-[hsl(var(--foreground))] bg-[hsl(var(--accent))]"
                      : "border-[hsl(var(--border))] hover:bg-[hsl(var(--accent))]/60"
                  }`}
                  data-testid={`template-${t.id}`}
                >
                  <div className="aspect-[3/4] rounded bg-[hsl(var(--muted))] mb-2" />
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-medium">{t.name}</div>
                      <div className="text-[10px] text-[hsl(var(--muted-foreground))] mt-0.5">{t.tag}</div>
                    </div>
                    {selectedTemplate === t.id && <Check className="h-3.5 w-3.5" />}
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
