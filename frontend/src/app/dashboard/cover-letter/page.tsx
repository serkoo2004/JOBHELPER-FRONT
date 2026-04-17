"use client";

import { useState } from "react";
import { Copy, Sparkles, Download } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input, Textarea, Label } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const SAMPLE = `Dear Hiring Team at Acme,

Your mission of making financial infrastructure as delightful as paying a friend is the kind of problem I've spent my last three years solving. At my current role I led the Checkout v2 shipping plan across three markets, cut friction 34%, and landed us +18% conversion against a hard deadline.

What I'd bring to the Staff Product Engineer role is the boring, unglamorous craft behind that number — small changes shipped weekly, legibility across PM/design/eng, and honest trade-offs when scope tightens.

I'd love the chance to build alongside the people shaping Acme's next billion users.

— Jamie`;

export default function CoverLetterPage() {
  const [company, setCompany] = useState("Acme");
  const [role, setRole] = useState("Staff Product Engineer");
  const [tone, setTone] = useState("Direct");
  const [jd, setJd] = useState("");
  const [output, setOutput] = useState(SAMPLE);
  const [gen, setGen] = useState(false);

  const generate = async () => {
    setGen(true);
    await new Promise((r) => setTimeout(r, 1200));
    setOutput(SAMPLE);
    setGen(false);
    toast.success("Cover letter generated.");
  };

  return (
    <div className="space-y-8" data-testid="cover-letter-page">
      <div>
        <div className="label-mono mb-3">One page. One voice.</div>
        <h1 className="font-heading text-4xl font-medium">Cover Letter</h1>
        <p className="mt-2 text-[hsl(var(--muted-foreground))]">
          Role, company, JD → letter in your voice.
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Context</CardTitle>
            <CardDescription>More detail = more specific.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label>Company</Label>
              <Input value={company} onChange={(e) => setCompany(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Role</Label>
              <Input value={role} onChange={(e) => setRole(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Tone</Label>
              <div className="flex gap-2 flex-wrap">
                {["Direct", "Warm", "Technical", "Narrative"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTone(t)}
                    className={`px-3 h-8 rounded-full border text-xs transition-colors ${
                      tone === t
                        ? "border-[hsl(var(--foreground))] bg-[hsl(var(--foreground))] text-[hsl(var(--background))]"
                        : "border-[hsl(var(--border))]"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Job description</Label>
              <Textarea rows={8} value={jd} onChange={(e) => setJd(e.target.value)} placeholder="Paste JD here…" />
            </div>
            <Button size="lg" className="w-full" onClick={generate} disabled={gen} data-testid="cover-letter-generate">
              <Sparkles className="h-4 w-4" />
              {gen ? "Writing…" : "Generate letter"}
            </Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <div className="flex items-center justify-between p-6 pb-4 border-b border-[hsl(var(--border))]">
            <div>
              <div className="label-mono">Output</div>
              <div className="font-heading text-lg mt-1">
                To {company} · {role}
              </div>
            </div>
            <div className="flex gap-2">
              <Badge variant="mono">{tone}</Badge>
              <Button
                size="xs"
                variant="secondary"
                onClick={() => {
                  navigator.clipboard.writeText(output);
                  toast.success("Copied to clipboard.");
                }}
                data-testid="cover-letter-copy"
              >
                <Copy className="h-3 w-3" /> Copy
              </Button>
              <Button size="xs" variant="secondary">
                <Download className="h-3 w-3" /> Export
              </Button>
            </div>
          </div>
          <div className="p-8">
            <Textarea
              rows={20}
              value={output}
              onChange={(e) => setOutput(e.target.value)}
              className="font-mono text-sm leading-relaxed"
              data-testid="cover-letter-output"
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
