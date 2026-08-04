# Diego Silva — Portfolio

Senior Full Stack Developer portfolio built with Next.js 15, React 19, TypeScript, and Tailwind CSS v4.

**Live**: [diegosilva.dev](https://diegosilva.dev)

## Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **UI**: React 19, Tailwind CSS v4, shadcn/ui
- **Animations**: Motion (Framer Motion)
- **Typography**: Playfair Display, Inter, JetBrains Mono
- **Theme**: next-themes (dark default)
- **Diagrams**: Mermaid.js (lazy-loaded)

### Backend
- **Server**: Express.js + TypeScript
- **Email**: Resend
- **Validation**: Zod
- **Security**: Rate limiting, CORS

### DevOps
- **Containers**: Docker with multi-stage builds
- **Orchestration**: Docker Compose (prod + dev)
- **Deployment**: Vercel (frontend), Docker (backend)

## Project Structure

```
portfolio_workspace/
├── frontend/           # Next.js application
│   ├── src/
│   │   ├── app/        # App Router pages + layouts
│   │   ├── components/ # UI components (shadcn + custom)
│   │   ├── data/       # Content data files
│   │   ├── lib/        # Utilities, API clients, animations
│   │   └── types/      # TypeScript interfaces + Zod schemas
│   ├── public/         # Static assets
│   └── Dockerfile
├── backend/            # Express API
│   ├── src/
│   │   ├── routes/     # API endpoints
│   │   ├── middleware/  # Rate limiter, error handler
│   │   ├── services/   # Email service
│   │   └── schemas/    # Zod validation schemas
│   └── Dockerfile
├── docker-compose.yml
├── docker-compose.dev.yml
└── vercel.json
```

## Getting Started

### Prerequisites
- Node.js 22+
- Docker (optional, for containerized development)
- Resend API key (for contact form emails)

### Local Development

```bash
# Install frontend dependencies
cd frontend
npm install
npm run dev

# In another terminal, install backend dependencies
cd backend
npm install
npm run dev
```

The frontend runs on [http://localhost:3000](http://localhost:3000) and the backend on [http://localhost:4000](http://localhost:4000).

### Docker Development

```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build
```

### Environment Variables

Copy the example files and fill in your values:

```bash
cp .env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local
```

Required:
- `RESEND_API_KEY` — Resend API key for contact form emails
- `GITHUB_TOKEN` — (optional) GitHub PAT for higher API rate limits

## Sections

1. **Hero** — Animated gradient background with name, title, and CTAs
2. **About** — Professional story with stats
3. **Tech Stack** — 5 categories with animated cards
4. **Experience** — Vertical timeline with staggered scroll animations
5. **Projects** — 4 featured projects with hover effects
6. **Architecture** — Interactive Mermaid diagrams with tab switcher
7. **GitHub** — Live repository data with ISR caching
8. **Contact** — Form with client/server validation and Resend integration

## Deploying

### Vercel (Frontend)

1. Connect your GitHub repository to Vercel
2. Set the framework to Next.js
3. Add environment variables in Vercel dashboard
4. Deploy

### Docker (Full Stack)

```bash
docker compose up --build
```

## License

All rights reserved — Diego Silva, 2026.
