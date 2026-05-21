# NovaForge Studio

An original, production-ready agency website built with Next.js 15, React, TypeScript, Tailwind CSS, Framer Motion, GSAP ScrollTrigger, and Lenis smooth scrolling.

## Stack

- Next.js App Router
- React Server Components with client islands for motion
- Tailwind CSS theme tokens
- Framer Motion interaction primitives
- GSAP + ScrollTrigger for cinematic scroll sequences
- Lenis for smooth scrolling
- TypeScript, strict mode
- ShadCN-compatible UI primitives

## Local Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Quality Checks

```bash
npm run typecheck
npm run build
```

## Deployment

1. Push this repository to GitHub.
2. Import it in Vercel.
3. Use the default Next.js framework preset.
4. Build command: `npm run build`.
5. Output directory: managed automatically by Vercel.

No environment variables are required for the static demo. Add analytics, CMS, or form-provider secrets in Vercel Project Settings when integrating production services.
