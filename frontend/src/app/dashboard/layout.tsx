import { Sidebar, TopBar } from "@/components/dashboard/shell";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[hsl(var(--background))]" data-testid="dashboard-shell">
      <div className="hidden md:flex w-[260px] lg:w-[280px] flex-none border-r border-[hsl(var(--border))]">
        <Sidebar />
      </div>
      <div className="flex-1 min-w-0 flex flex-col">
        <TopBar />
        <main className="flex-1 p-6 md:p-10">{children}</main>
      </div>
    </div>
  );
}
