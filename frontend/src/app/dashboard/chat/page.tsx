"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Plus, Sparkles, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Msg = { id: string; role: "user" | "ai"; text: string; time: string };

const SEED_SESSIONS = [
  { id: "s1", title: "Should I leave my current role?", last: "just now" },
  { id: "s2", title: "Rewrite headline for Stripe", last: "2h ago" },
  { id: "s3", title: "Interview prep — Linear", last: "yesterday" }
];

const SEED: Msg[] = [
  { id: "m1", role: "ai", text: "I'm your career coach. Ask me anything about your search — positioning, negotiations, interview prep, follow-ups.", time: "now" }
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>(SEED);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [selected, setSelected] = useState("s1");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    if (!input.trim()) return;
    const userMsg: Msg = { id: crypto.randomUUID(), role: "user", text: input.trim(), time: "now" };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setThinking(true);
    await new Promise((r) => setTimeout(r, 900));
    setMessages((m) => [
      ...m,
      {
        id: crypto.randomUUID(),
        role: "ai",
        text: "Good question. Here's how I'd frame it — pick the option that lets you learn the thing you're worst at, not the thing you're best at. Growth shows up on the edges.",
        time: "now"
      }
    ]);
    setThinking(false);
  };

  return (
    <div className="h-[calc(100vh-10rem)] grid md:grid-cols-[280px_1fr] gap-4" data-testid="chat-page">
      {/* Sidebar: sessions */}
      <Card className="p-4 hidden md:flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="label-mono">Sessions</div>
          <Button size="xs" variant="ghost">
            <Plus className="h-3 w-3" /> New
          </Button>
        </div>
        <div className="space-y-1 flex-1 overflow-y-auto">
          {SEED_SESSIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelected(s.id)}
              className={cn(
                "w-full text-left p-3 rounded-lg transition-colors",
                selected === s.id
                  ? "bg-[hsl(var(--accent))] text-[hsl(var(--foreground))]"
                  : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--accent))]/60"
              )}
            >
              <div className="text-sm truncate">{s.title}</div>
              <div className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">{s.last}</div>
            </button>
          ))}
        </div>
      </Card>

      {/* Main chat */}
      <Card className="flex flex-col overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-[hsl(var(--border))]">
          <div>
            <div className="label-mono">Coach</div>
            <div className="font-heading text-base">Should I leave my current role?</div>
          </div>
          <Sparkles className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((m) => (
            <div
              key={m.id}
              className={cn("flex gap-3", m.role === "user" ? "flex-row-reverse" : "")}
            >
              <div
                className={cn(
                  "h-7 w-7 rounded-full flex items-center justify-center flex-none",
                  m.role === "user"
                    ? "bg-[hsl(var(--foreground))] text-[hsl(var(--background))]"
                    : "border border-[hsl(var(--border))]"
                )}
              >
                {m.role === "user" ? <User className="h-3.5 w-3.5" /> : <Sparkles className="h-3.5 w-3.5" />}
              </div>
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                  m.role === "user"
                    ? "bg-[hsl(var(--accent))] text-[hsl(var(--foreground))]"
                    : "text-[hsl(var(--foreground))]"
                )}
              >
                {m.text}
              </div>
            </div>
          ))}
          {thinking && (
            <div className="flex gap-3">
              <div className="h-7 w-7 rounded-full border border-[hsl(var(--border))] flex items-center justify-center">
                <Sparkles className="h-3.5 w-3.5" />
              </div>
              <div className="flex gap-1 items-center px-4 py-2.5">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--muted-foreground))] animate-pulse"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-[hsl(var(--border))]">
          <div className="relative">
            <Textarea
              placeholder="Ask your coach…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              rows={2}
              className="pr-14"
              data-testid="chat-input"
            />
            <Button
              size="icon"
              onClick={send}
              disabled={thinking}
              className="absolute right-2 bottom-2 h-9 w-9"
              data-testid="chat-send"
            >
              <Send className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
