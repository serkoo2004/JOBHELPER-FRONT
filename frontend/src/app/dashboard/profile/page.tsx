"use client";

import { useState } from "react";
import { Camera, Plus, Trash2, Sparkles, Save } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input, Textarea, Label } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

type Entry = { id: string; title: string; subtitle: string; period: string; desc: string };

export default function ProfilePage() {
  const [basic, setBasic] = useState({
    name: "", title: "", email: "", phone: "", location: "", website: "", bio: ""
  });
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [experiences, setExperiences] = useState<Entry[]>([]);
  const [education, setEducation] = useState<Entry[]>([]);
  const [projects, setProjects] = useState<Entry[]>([]);

  const addEntry = (setter: React.Dispatch<React.SetStateAction<Entry[]>>) =>
    setter((p) => [...p, { id: crypto.randomUUID(), title: "", subtitle: "", period: "", desc: "" }]);

  const removeEntry = (setter: React.Dispatch<React.SetStateAction<Entry[]>>, id: string) =>
    setter((p) => p.filter((e) => e.id !== id));

  const updateEntry = (
    setter: React.Dispatch<React.SetStateAction<Entry[]>>,
    id: string, field: keyof Entry, value: string
  ) => setter((p) => p.map((e) => (e.id === id ? { ...e, [field]: value } : e)));

  const addSkill = () => {
    const v = skillInput.trim();
    if (v && !skills.includes(v)) setSkills([...skills, v]);
    setSkillInput("");
  };

  return (
    <div className="space-y-8" data-testid="profile-page">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="label-mono mb-3">Your data is the engine</div>
          <h1 className="font-heading text-4xl font-medium">Profile</h1>
          <p className="mt-2 text-[hsl(var(--muted-foreground))]">Fill this in once. Every draft pulls from here.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" data-testid="profile-ai-review">
            <Sparkles className="h-3.5 w-3.5" /> AI review
          </Button>
          <Button size="sm" onClick={() => toast.success("Profile saved.")} data-testid="profile-save">
            <Save className="h-3.5 w-3.5" /> Save
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Basics */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Basics</CardTitle>
            <CardDescription>Start with the essentials. Everything else builds from here.</CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1.5 md:col-span-2">
              <Label>Photo</Label>
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 rounded-xl border border-dashed border-[hsl(var(--border))] flex items-center justify-center bg-[hsl(var(--surface))]">
                  <Camera className="h-5 w-5 text-[hsl(var(--muted-foreground))]" />
                </div>
                <div>
                  <Button size="sm" variant="secondary">Upload photo</Button>
                  <p className="mt-1.5 text-xs text-[hsl(var(--muted-foreground))]">
                    We'll professionalize it — crop, lighting, framing.
                  </p>
                </div>
              </div>
            </div>
            {[
              { k: "name", l: "Full name", p: "Jamie Rivera" },
              { k: "title", l: "Headline", p: "Senior Product Engineer" },
              { k: "email", l: "Email", p: "jamie@work.com" },
              { k: "phone", l: "Phone", p: "+1 555 010 2030" },
              { k: "location", l: "Location", p: "Lisbon, Portugal" },
              { k: "website", l: "Website", p: "https://jamie.dev" }
            ].map((f) => (
              <div key={f.k} className="space-y-1.5">
                <Label>{f.l}</Label>
                <Input
                  placeholder={f.p}
                  value={(basic as any)[f.k]}
                  onChange={(e) => setBasic({ ...basic, [f.k]: e.target.value })}
                  data-testid={`profile-${f.k}`}
                />
              </div>
            ))}
            <div className="space-y-1.5 md:col-span-2">
              <Label>Bio / elevator pitch</Label>
              <Textarea
                placeholder="Two sentences that capture who you are, what you do, and what you're chasing next."
                rows={3}
                value={basic.bio}
                onChange={(e) => setBasic({ ...basic, bio: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        {/* AI side panel */}
        <Card className="h-fit sticky top-24 p-6">
          <div className="label-mono mb-3">Coach · profile</div>
          <h3 className="font-heading text-lg mb-3">Your profile is 64% complete.</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2.5">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[hsl(var(--success))]" />
              <span>Headline and basics — looking sharp.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[hsl(var(--warning))]" />
              <span>Add at least 2 projects with outcomes, not responsibilities.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[hsl(var(--muted-foreground))]" />
              <span>Drop in a bio — one crisp sentence lifts ATS trust.</span>
            </div>
          </div>
        </Card>

        {/* Skills */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Skills & tags</CardTitle>
            <CardDescription>Tap to add. Use what you'd mention on a call, not an essay.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-4">
              <Input
                placeholder="e.g. Product strategy"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                data-testid="profile-skill-input"
              />
              <Button onClick={addSkill} data-testid="profile-skill-add">
                <Plus className="h-4 w-4" /> Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <button
                  key={s}
                  onClick={() => setSkills(skills.filter((x) => x !== s))}
                  className="group"
                >
                  <Badge variant="default" className="hover:border-[hsl(var(--destructive))]/50">
                    {s}
                    <Trash2 className="h-3 w-3 opacity-0 group-hover:opacity-70 transition-opacity" />
                  </Badge>
                </button>
              ))}
              {skills.length === 0 && (
                <div className="text-sm text-[hsl(var(--muted-foreground))]">No skills yet.</div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Dynamic lists */}
        {[
          { title: "Experience", items: experiences, setter: setExperiences, ph: { title: "Senior PM", sub: "Acme Corp", period: "2022 — now" } },
          { title: "Projects", items: projects, setter: setProjects, ph: { title: "Checkout v2", sub: "Acme Corp", period: "2023" } },
          { title: "Education", items: education, setter: setEducation, ph: { title: "BSc Computer Science", sub: "MIT", period: "2018 — 2022" } }
        ].map((section) => (
          <Card key={section.title} className="lg:col-span-3">
            <CardHeader className="flex-row items-center justify-between">
              <div>
                <CardTitle>{section.title}</CardTitle>
                <CardDescription>Keep it tight. Outcomes over responsibilities.</CardDescription>
              </div>
              <Button size="sm" variant="secondary" onClick={() => addEntry(section.setter)}>
                <Plus className="h-3.5 w-3.5" /> Add
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {section.items.length === 0 && (
                <div className="border border-dashed border-[hsl(var(--border))] rounded-lg p-8 text-center text-sm text-[hsl(var(--muted-foreground))]">
                  Nothing yet. Click "Add" to start.
                </div>
              )}
              {section.items.map((e) => (
                <div
                  key={e.id}
                  className="grid md:grid-cols-4 gap-3 p-4 border border-[hsl(var(--border))] rounded-xl"
                >
                  <Input placeholder={section.ph.title} value={e.title}
                    onChange={(ev) => updateEntry(section.setter, e.id, "title", ev.target.value)} />
                  <Input placeholder={section.ph.sub} value={e.subtitle}
                    onChange={(ev) => updateEntry(section.setter, e.id, "subtitle", ev.target.value)} />
                  <Input placeholder={section.ph.period} value={e.period}
                    onChange={(ev) => updateEntry(section.setter, e.id, "period", ev.target.value)} />
                  <div className="flex gap-2 md:col-span-4">
                    <Textarea
                      placeholder="2-3 bullets with outcomes. e.g. Scaled onboarding to 3M users, cut friction 34%."
                      value={e.desc} rows={2}
                      onChange={(ev) => updateEntry(section.setter, e.id, "desc", ev.target.value)}
                    />
                    <Button size="icon" variant="ghost" onClick={() => removeEntry(section.setter, e.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
