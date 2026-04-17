"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea, Input, Label } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const configs: Record<string, { title: string; desc: string; inputs: { label: string; key: string; type?: "text" | "textarea"; placeholder?: string }[]; output: string }> = {
  "job-match": {
    title: "Job match",
    desc: "Paste a JD. We'll score fit, flag gaps, and suggest rewrites.",
    inputs: [
      { label: "Target role", key: "role", type: "text", placeholder: "Staff Product Engineer" },
      { label: "Job description", key: "jd", type: "textarea", placeholder: "Paste JD…" }
    ],
    output: `Match: 82%

Strengths:
• Shipping + metrics language matches what they optimize for
• Team leadership signals are present

Gaps:
• No explicit "payments / checkout" line — add 1 bullet
• They emphasize "zero-to-one" — your bullets are mostly scale/refine

Rewrites:
— Before: "Scaled onboarding to 3M users"
— After:  "Designed and shipped onboarding v1 → 3M users in 9 months"`
  },
  linkedin: {
    title: "LinkedIn optimize",
    desc: "Your current headline + About, optimized.",
    inputs: [
      { label: "Current headline", key: "headline", type: "text" },
      { label: "Current About", key: "about", type: "textarea" }
    ],
    output: `Headline → "Staff Product Engineer · Scaling onboarding + checkout to 10M+ users"

About →
I've spent the last 3 years turning "make it fast, make it clear" into shipping plans that actually ship. Checkout v2 across 3 countries (+18% conversion). Onboarding funnel to 3M users (−34% friction). I care about the craft: clarity under ambiguity, honest trade-offs, weekly small wins. Based in Lisbon, happy to relocate for a mission I believe in.`
  },
  portfolio: {
    title: "Portfolio summary",
    desc: "Projects → narrative hiring managers actually read.",
    inputs: [
      { label: "Project titles (one per line)", key: "projects", type: "textarea" }
    ],
    output: `This is Jamie's work told three ways:

The narrative: engineer who owns the unglamorous 80%.
The numbers: 3M users, 34% friction down, 18% conversion up.
The taste: four shipped systems across two continents, each leaving the product measurably sharper than they found it.`
  },
  interview: {
    title: "Interview prep",
    desc: "Q bank, STAR drills, and follow-ups — per role.",
    inputs: [
      { label: "Role", key: "role", type: "text" },
      { label: "Company", key: "company", type: "text" }
    ],
    output: `1. Tell me about a time you disagreed with a PM.
   STAR draft: When we were scoping Checkout v2, PM pushed for a big-bang shipping plan…

2. Walk me through a system you're proud of.
3. How do you pick what not to work on?
4. What's a time you missed a deadline?

Drill:
— Say each out loud. Time yourself. 60–90s each.
— Record. Listen back for filler, ambiguity, metrics.`
  },
  roadmap: {
    title: "Career roadmap",
    desc: "Skill gap audit → 90-day plan.",
    inputs: [
      { label: "Target role (next step)", key: "next", type: "text" },
      { label: "Current role", key: "now", type: "text" }
    ],
    output: `90-day plan

Month 1 — Ship 1 staff-level artifact (RFC, architecture doc) publicly.
Month 2 — Interview a hiring manager at your target company. Identify 2 gaps.
Month 3 — Close one gap visibly (talk, repo, blog). Apply with evidence.

This compounds because it forces: public writing, signal > noise, and an actual reason the target company will remember you.`
  },
  photo: {
    title: "Photo assistant",
    desc: "Upload a headshot. We'll return composition + framing feedback.",
    inputs: [
      { label: "Notes (what's the role / vibe?)", key: "notes", type: "textarea" }
    ],
    output: `Composition: subject 60% of the frame — reduce to 45% to breathe.
Background: too busy, crop up from shoulders.
Light: side-lit, good. Push +5 contrast for professional feel.
Framing: eyes at 1/3 from top (rule of thirds) — currently center. Recrop.
Mood: confident but warm. This works for Staff/Principal IC + mid-manager roles.`
  },
  coach: {
    title: "Application coach",
    desc: "Paste a specific application. Get one sharp next action.",
    inputs: [
      { label: "Where you are", key: "where", type: "textarea", placeholder: "e.g. 'Phone screen done, waiting 5 days'" }
    ],
    output: `One next action:

Send a 3-line follow-up to the recruiter. Thank them. State the role title. Offer one short sentence reiterating why you'd make the team faster (not better — *faster*). This is the sentence hiring managers forward.

Template →
"Hi [name], thanks for the call on Tuesday. Still super excited about the [role]. If useful: I've been through the Checkout v2 launch you're planning — happy to share what I'd avoid."`
  }
};

export default function ToolPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const cfg = configs[slug];

  const [values, setValues] = useState<Record<string, string>>({});
  const [output, setOutput] = useState("");
  const [gen, setGen] = useState(false);

  if (!cfg) {
    return (
      <div className="space-y-6">
        <Link href="/dashboard/career-tools" className="text-sm text-[hsl(var(--muted-foreground))] inline-flex items-center gap-2">
          <ArrowLeft className="h-3.5 w-3.5" /> Back
        </Link>
        <h1 className="font-heading text-3xl">Tool not found.</h1>
      </div>
    );
  }

  const run = async () => {
    setGen(true);
    await new Promise((r) => setTimeout(r, 1100));
    setOutput(cfg.output);
    setGen(false);
    toast.success(`${cfg.title} complete.`);
  };

  return (
    <div className="space-y-8" data-testid={`tool-page-${slug}`}>
      <div>
        <Link href="/dashboard/career-tools" className="text-sm text-[hsl(var(--muted-foreground))] inline-flex items-center gap-2 mb-4 hover:text-[hsl(var(--foreground))]">
          <ArrowLeft className="h-3.5 w-3.5" /> All tools
        </Link>
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="label-mono mb-2">Career tool</div>
            <h1 className="font-heading text-4xl font-medium">{cfg.title}</h1>
            <p className="mt-2 text-[hsl(var(--muted-foreground))]">{cfg.desc}</p>
          </div>
          <Badge variant="mono">{slug}</Badge>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card className="p-6 space-y-4">
          <div className="label-mono">Inputs</div>
          {cfg.inputs.map((field) => (
            <div key={field.key} className="space-y-1.5">
              <Label>{field.label}</Label>
              {field.type === "textarea" ? (
                <Textarea
                  rows={6}
                  value={values[field.key] || ""}
                  onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
                  placeholder={field.placeholder}
                />
              ) : (
                <Input
                  value={values[field.key] || ""}
                  onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
                  placeholder={field.placeholder}
                />
              )}
            </div>
          ))}
          <Button size="lg" className="w-full" onClick={run} disabled={gen} data-testid="tool-run">
            <Sparkles className="h-4 w-4" /> {gen ? "Running…" : "Run"}
          </Button>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="label-mono">Output</div>
            {output && <Badge variant="success" dot>Ready</Badge>}
          </div>
          <div className="min-h-[300px]">
            {output ? (
              <pre className="font-mono text-sm whitespace-pre-wrap leading-relaxed text-[hsl(var(--foreground))]">
                {output}
              </pre>
            ) : (
              <div className="h-[280px] border border-dashed border-[hsl(var(--border))] rounded-lg flex items-center justify-center text-sm text-[hsl(var(--muted-foreground))]">
                Run a query to see output.
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
