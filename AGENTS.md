<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# MentorLagbe client

Next.js 16.4 App Router frontend for a tuition marketplace. The REST backend lives in a separate repo; this app only calls it over HTTP.

## Commands

- `npm run dev` — dev server (npm is the package manager; `package-lock.json` only).
- `npm run build` / `npm run start`.
- `npm run lint` — bare `eslint` (not `next lint`). Focus with `npm run lint -- src/path`.
- `npx tsc --noEmit` — there is no typecheck script, and no test framework/tests exist. Verify with lint + tsc + build.

## Next.js 16 specifics

`next.config.ts` enables `cacheComponents`, `partialPrefetching`, and `reactCompiler`. Under Cache Components, reading request data (`cookies`, `headers`, session) outside `<Suspense>` is a build error. Two established escapes in this repo:

- `src/app/(dashboard)/layout.tsx` starts with `export const instant = false;` so the auth-gated dashboard can block on the server. Keep it; other route layouts/pages that read the session need the same opt-out or a Suspense boundary.
- Dynamic fetch pages wrap the data component in `<Suspense>` and call `await connection()` inside it (see `src/components/dashboard/tutor/TuitionsContent.tsx`).

Tailwind is v4 (`@import "tailwindcss"`); there is no `tailwind.config`. Theme tokens live in `src/app/globals.css` and CSS is loaded through `@tailwindcss/turbopack` (configured in `next.config.ts`).

## Structure

- Route groups: `src/app/(root)` public pages, `(auth)` sign-in/sign-up, `(dashboard)` protected.
- Auth gating is per-layout: `(dashboard)/layout.tsx` redirects to `/sign-in` without a session; `dashboard/admin|tutor|student/layout.tsx` redirect to `/dashboard` for the wrong role. Admin is allowed in the tutor and student sections.
- Server session: `getSession()` from `src/lib/get-session.ts`. Client: `authClient` / `useSession` from `src/lib/auth-client.ts`. `clientUserSession()` in `src/lib/client-side-sessions.ts` wraps the `useSession` hook, so it is only valid from `"use client"` components.
- Better Auth config is `src/lib/auth.ts`: MongoDB database `mentor-lagbe`, extra user fields `role` (`student` default) and `plan` (`free`). The user-create hook silently clamps sign-up roles to `student`/`tutor`, so an admin cannot be self-registered through the form. Handler: `src/app/api/auth/[...all]/route.ts`.
- Backend calls live in `src/lib/api/<domain>/<domain>-api.ts` and hit `NEXT_PUBLIC_API_URL` (defaults to `http://localhost:5000`). Start the backend separately or list/detail pages fail.
- UI components in `src/components/ui` are shadcn **base-nova** built on `@base-ui/react`, not Radix. `cn` is re-exported from the `cn` package in `src/lib/utils.ts`. Add components with `npx shadcn@latest add` using `components.json` aliases.

## Gotchas

- Backend paths are inconsistent — `POST /tutions`, `PATCH /tuitions/:id/status`, `GET /browse-tuitions`, `GET /all-tuitions`, `POST /apply-tuitions`, `/users`. Check the backend instead of assuming one spelling.
- Image uploads go directly from the browser to ImgBB (`NEXT_PUBLIC_IMGBB_API_KEY`); `next.config.ts` `images.remotePatterns` only allows `i.ibb.co`, so other remote image hosts will throw at render time.
- Env vars (`.env`, gitignored): `MONGODB_URI`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_IMGBB_API_KEY`.
- Mutations are client components that call an API wrapper, then `router.refresh()` to re-render server data (see `TuitionActions.tsx`, `ManageUsers.tsx`).
