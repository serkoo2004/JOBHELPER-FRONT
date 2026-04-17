"use client";

import { useState } from "react";
import { Plus, LayoutGrid, Rows, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input, Label, Textarea } from "@/components/ui/input";
import * as Dialog from "@radix-ui/react-dialog";
import { toast } from "sonner";

type Status = "saved" | "applied" | "screen" | "onsite" | "offer" | "rejected";
type App = { id: string; company: string; role: string; status: Status; updated: string; salary?: string; link?: string };

const COLUMNS: { id: Status; label: string }[] = [
  { id: "saved", label: "Saved" },
  { id: "applied", label: "Applied" },
  { id: "screen", label: "Phone screen" },
  { id: "onsite", label: "Onsite" },
  { id: "offer", label: "Offer" },
  { id: "rejected", label: "Closed" }
];

const SEED: App[] = [
  { id: "a1", company: "Stripe", role: "Sr Product Engineer", status: "onsite", updated: "2d ago", salary: "$240k" },
  { id: "a2", company: "Linear", role: "Staff Engineer", status: "screen", updated: "today", salary: "$260k" },
  { id: "a3", company: "Notion", role: "Product Engineer", status: "applied", updated: "5d ago" },
  { id: "a4", company: "Figma", role: "Sr Designer", status: "saved", updated: "1w ago" },
  { id: "a5", company: "Vercel", role: "DX Engineer", status: "applied", updated: "3d ago" },
  { id: "a6", company: "Arc", role: "Product Engineer", status: "rejected", updated: "2w ago" }
];

export default function ApplicationsPage() {
  const [apps, setApps] = useState<App[]>(SEED);
  const [view, setView] = useState<"kanban" | "table">("kanban");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ company: "", role: "", salary: "", link: "", notes: "" });

  const create = () => {
    if (!form.company || !form.role) return;
    setApps([
      {
        id: crypto.randomUUID(),
        company: form.company,
        role: form.role,
        status: "saved",
        updated: "just now",
        salary: form.salary,
        link: form.link
      },
      ...apps
    ]);
    setForm({ company: "", role: "", salary: "", link: "", notes: "" });
    setOpen(false);
    toast.success("Added to Saved.");
  };

  const statusColor: Record<Status, any> = {
    saved: "outline",
    applied: "default",
    screen: "warning",
    onsite: "default",
    offer: "success",
    rejected: "danger"
  };

  return (
    <div className="space-y-8" data-testid="applications-page">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <div className="label-mono mb-3">Your pipeline</div>
          <h1 className="font-heading text-4xl font-medium">Applications</h1>
          <p className="mt-2 text-[hsl(var(--muted-foreground))]">
            Track every company. AI-coached per application.
          </p>
        </div>
        <div className="flex gap-2">
          <div className="flex rounded-md border border-[hsl(var(--border))] p-0.5">
            <Button
              size="sm"
              variant={view === "kanban" ? "primary" : "ghost"}
              onClick={() => setView("kanban")}
              data-testid="applications-view-kanban"
            >
              <LayoutGrid className="h-3.5 w-3.5" /> Board
            </Button>
            <Button
              size="sm"
              variant={view === "table" ? "primary" : "ghost"}
              onClick={() => setView("table")}
              data-testid="applications-view-table"
            >
              <Rows className="h-3.5 w-3.5" /> Table
            </Button>
          </div>
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <Button size="sm" data-testid="applications-new">
                <Plus className="h-3.5 w-3.5" /> New
              </Button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
              <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[95%] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-6 shadow-xl">
                <Dialog.Title className="font-heading text-xl mb-1">New application</Dialog.Title>
                <Dialog.Description className="text-sm text-[hsl(var(--muted-foreground))] mb-6">
                  We'll put it in <span className="font-medium text-[hsl(var(--foreground))]">Saved</span>.
                </Dialog.Description>
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <Label>Company</Label>
                    <Input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Stripe" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Role</Label>
                    <Input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="Staff Engineer" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label>Salary (optional)</Label>
                      <Input value={form.salary} onChange={(e) => setForm({ ...form, salary: e.target.value })} placeholder="$240k" />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Link</Label>
                      <Input value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} placeholder="https://…" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Notes</Label>
                    <Textarea rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
                  </div>
                </div>
                <div className="mt-6 flex justify-end gap-2">
                  <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
                  <Button onClick={create} data-testid="applications-create-submit">Save</Button>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>

      {view === "kanban" ? (
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-3">
          {COLUMNS.map((col) => {
            const items = apps.filter((a) => a.status === col.id);
            return (
              <div key={col.id} className="min-h-[400px]">
                <div className="flex items-center justify-between mb-2 px-1">
                  <div className="label-mono">{col.label}</div>
                  <div className="text-xs text-[hsl(var(--muted-foreground))]">{items.length}</div>
                </div>
                <div className="space-y-2">
                  {items.map((a) => (
                    <Card key={a.id} className="p-3 hover:border-[hsl(var(--foreground))]/20 transition-colors cursor-grab">
                      <div className="text-xs text-[hsl(var(--muted-foreground))]">{a.company}</div>
                      <div className="text-sm font-medium mt-1">{a.role}</div>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-[10px] text-[hsl(var(--muted-foreground))]">{a.updated}</span>
                        {a.salary && <Badge variant="outline">{a.salary}</Badge>}
                      </div>
                    </Card>
                  ))}
                  {items.length === 0 && (
                    <div className="border border-dashed border-[hsl(var(--border))] rounded-lg p-3 text-xs text-[hsl(var(--muted-foreground))] text-center">
                      Empty
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <Card>
          <div className="divide-y divide-[hsl(var(--border))]">
            <div className="grid grid-cols-12 px-6 py-3 label-mono gap-3">
              <div className="col-span-3">Company</div>
              <div className="col-span-4">Role</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2">Salary</div>
              <div className="col-span-1 text-right">Link</div>
            </div>
            {apps.map((a) => (
              <div key={a.id} className="grid grid-cols-12 px-6 py-3.5 gap-3 items-center hover:bg-[hsl(var(--accent))]/50 transition-colors">
                <div className="col-span-3 text-sm font-medium">{a.company}</div>
                <div className="col-span-4 text-sm">{a.role}</div>
                <div className="col-span-2">
                  <Badge variant={statusColor[a.status]}>{a.status}</Badge>
                </div>
                <div className="col-span-2 text-sm">{a.salary || "—"}</div>
                <div className="col-span-1 text-right">
                  {a.link && <ExternalLink className="h-3.5 w-3.5 inline text-[hsl(var(--muted-foreground))]" />}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
