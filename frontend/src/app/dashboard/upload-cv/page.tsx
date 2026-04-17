"use client";

import { useState, useRef } from "react";
import { Upload, FileText, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type Analysis = { score: number; strengths: string[]; weaknesses: string[]; suggestions: string[] };

const DEMO: Analysis = {
  score: 82,
  strengths: [
    "Contact info is clean and ATS-safe.",
    "Metrics present in 3 of 4 bullets in most recent role.",
    "Education section compact and appropriate."
  ],
  weaknesses: [
    "Summary is generic — no specific target role.",
    "2 bullets start with 'Responsible for'.",
    "No measurable outcome in 2015–2018 roles."
  ],
  suggestions: [
    "Rewrite summary around 1 hard outcome and 1 positioning line.",
    "Flip 'Responsible for' → strong verbs (Owned, Shipped, Cut, Scaled).",
    "Add 1 measurable line per older role — even small wins count."
  ]
};

export default function UploadCVPage() {
  const [file, setFile] = useState<File | null>(null);
  const [drag, setDrag] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<Analysis | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDrag(false);
    const f = e.dataTransfer.files[0];
    if (f) setFile(f);
  };

  const analyze = async () => {
    if (!file) return;
    setAnalyzing(true);
    await new Promise((r) => setTimeout(r, 1500));
    setResult(DEMO);
    setAnalyzing(false);
    toast.success("Analysis complete.");
  };

  return (
    <div className="space-y-8" data-testid="upload-cv-page">
      <div>
        <div className="label-mono mb-3">Audit mode</div>
        <h1 className="font-heading text-4xl font-medium">Upload & Analyze</h1>
        <p className="mt-2 text-[hsl(var(--muted-foreground))] max-w-xl">
          Drop your existing CV. We'll score it, flag issues, and suggest rewrites.
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-4">
        <Card className="lg:col-span-2 p-6">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDrag(true);
            }}
            onDragLeave={() => setDrag(false)}
            onDrop={onDrop}
            onClick={() => inputRef.current?.click()}
            className={cn(
              "cursor-pointer rounded-xl border-2 border-dashed p-10 text-center transition-all",
              drag
                ? "border-[hsl(var(--foreground))] bg-[hsl(var(--accent))]"
                : "border-[hsl(var(--border))] hover:border-[hsl(var(--foreground))]/30 hover:bg-[hsl(var(--accent))]/50"
            )}
            data-testid="upload-dropzone"
          >
            <div className="h-12 w-12 mx-auto rounded-xl border border-[hsl(var(--border))] flex items-center justify-center mb-4">
              <Upload className="h-5 w-5" />
            </div>
            <div className="font-heading text-lg mb-1">Drop a CV here</div>
            <div className="text-xs text-[hsl(var(--muted-foreground))]">
              PDF, DOCX, or TXT · up to 5MB
            </div>
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.docx,.txt"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              data-testid="upload-input"
            />
          </div>

          {file && (
            <div className="mt-4 flex items-center justify-between rounded-lg border border-[hsl(var(--border))] p-3">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-md bg-[hsl(var(--muted))] flex items-center justify-center">
                  <FileText className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-medium truncate max-w-[180px]">{file.name}</div>
                  <div className="text-xs text-[hsl(var(--muted-foreground))]">
                    {(file.size / 1024).toFixed(0)} KB
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="xs" onClick={() => setFile(null)}>Remove</Button>
            </div>
          )}

          <Button
            className="w-full mt-4"
            size="lg"
            onClick={analyze}
            disabled={!file || analyzing}
            data-testid="upload-analyze"
          >
            <Sparkles className="h-4 w-4" /> {analyzing ? "Analyzing…" : "Analyze CV"}
          </Button>
        </Card>

        <div className="lg:col-span-3">
          {!result && !analyzing && (
            <Card className="p-10 h-full flex flex-col items-center justify-center text-center">
              <div className="h-12 w-12 rounded-xl border border-dashed border-[hsl(var(--border))] flex items-center justify-center mb-4">
                <FileText className="h-5 w-5 text-[hsl(var(--muted-foreground))]" />
              </div>
              <div className="text-sm text-[hsl(var(--muted-foreground))]">
                Upload a file to see analysis.
              </div>
            </Card>
          )}

          {analyzing && (
            <Card className="p-10 h-full flex flex-col items-center justify-center">
              <div className="h-12 w-12 rounded-full border border-[hsl(var(--border))] border-t-[hsl(var(--foreground))] animate-spin mb-5" />
              <div className="font-heading text-lg">Reading your CV…</div>
              <div className="text-sm text-[hsl(var(--muted-foreground))] mt-2">
                Parsing · Scoring · Comparing
              </div>
            </Card>
          )}

          {result && (
            <Card className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="label-mono">Report</div>
                  <div className="font-heading text-2xl mt-1">Your CV scored</div>
                </div>
                <div className="text-right">
                  <div className="font-heading text-5xl font-medium">{result.score}</div>
                  <div className="label-mono">of 100</div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { title: "Strengths", items: result.strengths, variant: "success" as const, Icon: CheckCircle2 },
                  { title: "Weaknesses", items: result.weaknesses, variant: "warning" as const, Icon: AlertCircle },
                  { title: "Rewrites", items: result.suggestions, variant: "default" as const, Icon: Sparkles }
                ].map((col) => (
                  <div key={col.title} className="rounded-xl border border-[hsl(var(--border))] p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <col.Icon className="h-4 w-4" />
                      <div className="label-mono">{col.title}</div>
                    </div>
                    <ul className="space-y-2">
                      {col.items.map((it, i) => (
                        <li key={i} className="text-sm leading-relaxed flex gap-2 items-start">
                          <Badge variant={col.variant} className="text-[10px] mt-0.5">{i + 1}</Badge>
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Button size="lg" data-testid="upload-create-draft">
                  <Sparkles className="h-4 w-4" /> Create draft with fixes
                </Button>
                <Button size="lg" variant="secondary">Download report</Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
