# Career Copilot — Frontend PRD

## Original Problem Statement
"bu benim projemin backend i ve ben buna her detayıyla ayrı ayrı farklı farklı en mükemmel sayfayı oluşturmak istiyorum mesela login register kısmında falan da box şekilnde arka planı blur lu falan en mükemmel şekilde olmalı bu da front end kısmı yazan da olabilecek bir opsiyon en mükemmel şekilde ayarla en iyi sayfayı yap gerekirse proje dosyasını atıyım ordan bak yap frontu baştan back e göre ayarla"

Kullanıcı mevcut FastAPI tabanlı Career Copilot backend'i için premium bir frontend istiyor. Linear / Vercel / Stripe seviyesi kalite. Login/register glassmorphic box, blurred background şart.

## Architecture
- **Framework**: Next.js 14 App Router + TypeScript
- **Styling**: Tailwind CSS + CSS variables + Fontshare (Cabinet Grotesk + Geist) + JetBrains Mono
- **Animation**: Tailwind keyframe animations (CSS-based for SSR reliability) + Framer Motion (AnimatePresence only)
- **State**: Zustand (auth), local state for UI
- **HTTP**: Axios client with `NEXT_PUBLIC_BACKEND_URL` env config
- **Icons**: Lucide React
- **UI primitives**: Radix UI (Dialog, Dropdown, etc.) + custom Button/Card/Input/Badge

## Design System
- Archetype: **Swiss & High-Contrast + Jewel & Luxury** (Linear/Vercel/Raycast inspired)
- Dark-first, light theme supported, system theme available
- Monochrome palette: pure black `#0A0A0A` on white `#FAFAFA`, NO purple gradients
- 8px grid spacing, radius xs(6)→2xl(36)
- Cabinet Grotesk headings with negative tracking; Geist body
- Grain overlay, grid pattern, halo glows, glassmorphism for auth/nav/modal
- CSS keyframes: slide-up, fade-in, gradient-shift, marquee, shimmer

## Pages Built (all routed & rendering)
1. **Landing** (`/`) — Navbar, hero (animated), logo marquee, bento features grid, how-it-works timeline, AI flow pipeline viz, testimonials masonry, pricing (3 plans), CTA, footer
2. **Auth** (`/sign-in`, `/sign-up`) — Glassmorphic box over Unsplash mesh gradient, Google/Apple social options, email/password with password strength checker (sign-up), eye toggle
3. **Dashboard shell** (`/dashboard/*`) — Left sidebar grouped nav (Overview/Build/Grow/System), glass topbar, mobile drawer, user pill with logout
4. **Dashboard home** — Welcome + 4 stat cards with custom SVG sparklines, quick-start with drag-drop hint, coach suggestions panel, recent activity table
5. **Profile editor** — Basics form + photo, skills tag system (add/remove), dynamic lists for experiences/projects/education, sticky AI completeness side panel
6. **Resume Studio** — 3-column: coach warnings + target + version history / center preview (PDF-style render of sample CV) / right 9-template selector (modern_sidebar, executive_grid, minimal_ats, edinburgh_profile, royal_timeline, classic_timeline, burgundy_panel, crimson_edge, onyx_accent)
7. **Cover Letter** — Context form (company, role, tone chips, JD) + output editor with copy/export
8. **Career Tools** (`/career-tools`) — Grid of 7 tools, each with dedicated `/career-tools/[slug]` page (job-match, linkedin, portfolio, interview, roadmap, photo, coach)
9. **Applications Tracker** — Kanban 6-column (Saved → Closed) + Table view toggle + New application modal dialog with salary/link/notes
10. **AI Chat** — Session sidebar + messages with typing indicator
11. **Upload & Analyze CV** — Drag-drop zone + file preview + analysis report (score, strengths, weaknesses, suggestions) + create-draft CTA
12. **Settings** — Vertical tabs: Account (with danger zone), Appearance (theme picker), API Keys, Notifications
13. **Admin Panel** — x-admin-key gate → metrics cards + audit log table with status badges
14. **API client** (`src/lib/api.ts`) — Full wrapper for every backend endpoint from eksikler.txt spec (authApi, profileApi, resumeApi, coverLetterApi, careerApi, applicationsApi, flowApi, aiSessionApi, assetsApi, adminApi, systemApi)

## Environment
- `NEXT_PUBLIC_BACKEND_URL` — user adds their own backend URL in `/app/frontend/.env`
- Default fallback: `http://localhost:8000`
- Admin key stored in `localStorage.cc_admin_key`
- Auth token stored in `localStorage.cc_token`

## Known Limitations / User's Responsibility
- BACKEND IS NOT INCLUDED — user has their own FastAPI backend (per their choice "ben sadece front u istiyorum")
- All AI flows show demo/mock data on the frontend until user wires backend
- Social auth (Google/Apple) buttons present but user must wire through their backend
- User adds their own backend URL, LLM keys (Google/OpenAI), admin key

## What Works End-to-End on Frontend
- Navigation between all 13+ page types
- Dark/light theme toggle with persistence
- Glass-morphic auth pages on animated mesh background
- Form state & validation (sign-up password checker, skill tags, dynamic entry lists)
- Kanban vs Table view toggle with modal dialog for new applications
- Chat UI with mocked AI responses
- Drag-drop file upload with validation
- Admin gate with localStorage key persistence
- Fully responsive (mobile drawer sidebar, stacked grids)

## Next Actions (user-side)
1. Wire `NEXT_PUBLIC_BACKEND_URL` in `/app/frontend/.env` to user's own FastAPI backend
2. Replace demo auth handlers in `/sign-in` and `/sign-up` with real backend JWT/Google login
3. Connect resume/cover-letter/career-tools pages to the `api.ts` helpers (all endpoints already wrapped)
4. Test endpoint compatibility — the API client assumes `/api/v1/...` prefix per eksikler.txt spec

## Backlog (P1)
- Swap mocked AI responses with real calls (uses existing `api.ts` wrappers)
- Add flow-based CV builder step screens (`/dashboard/resume/flow`)
- Resume version diff viewer
- Applications drag-drop reordering (currently just visual)
- PDF/DOCX download streaming

## Files & Structure
```
/app/frontend/
├── package.json (Next.js 14, Framer Motion, Radix, Tailwind)
├── src/
│   ├── app/
│   │   ├── layout.tsx (root, theme provider, toast)
│   │   ├── page.tsx (landing)
│   │   ├── globals.css (CSS tokens + animations)
│   │   ├── (auth)/ — layout.tsx, sign-in/, sign-up/
│   │   └── dashboard/
│   │       ├── layout.tsx (shell)
│   │       ├── page.tsx (home)
│   │       ├── profile/, resume/, cover-letter/, upload-cv/,
│   │       ├── career-tools/ + [slug]/,
│   │       ├── applications/, chat/, settings/, admin/
│   ├── components/
│   │   ├── ui/ (Button, Card, Input, Badge)
│   │   ├── landing/ (Navbar, Hero, LogoBar, Features, HowItWorks, AIFlowViz, Testimonials, Pricing, CTA, Footer)
│   │   ├── dashboard/shell.tsx (Sidebar + TopBar)
│   │   ├── theme-toggle.tsx, logo.tsx, providers.tsx
│   ├── lib/ (api.ts, utils.ts)
│   └── store/auth.ts
```

## Date
2026-04-17 — Initial frontend scaffold complete.
