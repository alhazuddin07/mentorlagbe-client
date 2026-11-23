'use client';

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  UserRound,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import BrandLogo from "@/components/shared/brand-logo";
import { useSession, signOut } from "@/lib/auth-client";
import { cn } from "cn";

const roleBadgeClass: Record<string, string> = {
  admin:
    "bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400",
  tutor:
    "bg-primary/10 text-primary",
  student:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400",
};

const publicNavItems = [
  { label: "Home", href: "/" },
  { label: "Browse Tuitions", href: "/tuitions" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
] as const;

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { data: session, isPending } = useSession();
  const user = session?.user ?? null;
  const role = ((user as { role?: string } | null)?.role ?? "student").toLowerCase();
  const roleLabel = role.charAt(0).toUpperCase() + role.slice(1);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const handleSignOut = async () => {
    setMenuOpen(false);
    setProfileOpen(false);
    await signOut();
    router.refresh();
    router.push('/sign-in');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <BrandLogo />

        {/* Public navigation items (desktop) */}
        <ul className="hidden items-center gap-1 md:flex">
          {publicNavItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                  isActive(item.href) && "bg-muted text-foreground"
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {/* Loading skeleton */}
          {isPending && (
            <div className="hidden h-8 w-28 animate-pulse rounded-lg bg-muted sm:block" />
          )}

          {/* Unauthenticated — desktop */}
          {!isPending && !user && (
            <div className="hidden items-center gap-2 sm:flex">
              <Button
                variant="outline"
                nativeButton={false}
                render={<Link href="/sign-in" />}
                className="border-primary/40 text-primary hover:text-primary aria-expanded:text-primary dark:hover:bg-primary/10"
              >
                Sign In
              </Button>
              <Button nativeButton={false} render={<Link href="/sign-up" />}>
                Sign Up
              </Button>
            </div>
          )}

          {/* Authenticated — desktop avatar + dropdown */}
          {!isPending && user && (
            <div className="relative hidden md:block">
              {/* Avatar button */}
              <button
                type="button"
                aria-expanded={profileOpen}
                aria-haspopup="menu"
                aria-label="Open profile menu"
                onClick={() => setProfileOpen((o) => !o)}
                className="flex items-center gap-2 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="relative block size-9 overflow-hidden rounded-full border-2 border-primary/30">
                  <Image
                    src={user.image || "/avatar.svg"}
                    alt={user.name}
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                </span>

                <ChevronDown
                  className={cn(
                    "size-4 text-muted-foreground transition-transform duration-200",
                    profileOpen && "rotate-180"
                  )}
                />
              </button>

              {/* Backdrop */}
              {profileOpen && (
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setProfileOpen(false)}
                />
              )}

              {/* Dropdown */}
              {profileOpen && (
                <div className="absolute right-0 z-50 mt-2 w-64 rounded-2xl border bg-popover p-4 shadow-xl">

                  {/* Close button */}
                  <div className="mb-3 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setProfileOpen(false)}
                      className="rounded-full p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                      aria-label="Close menu"
                    >
                      <X className="size-4" />
                    </button>
                  </div>

                  {/* User info */}
                  <div className="flex items-center gap-3">
                    <div className="relative size-12 shrink-0 overflow-hidden rounded-full border-2 border-primary/20">
                      <Image
                        src={user.image ?? "/avatar.svg"}
                        alt={user.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold leading-tight">
                        {user.name}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {user.email}
                      </p>
                      {/* Role badge */}
                      <span
                        className={cn(
                          "mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize leading-none",
                          roleBadgeClass[role] ?? roleBadgeClass.student
                        )}
                      >
                        {roleLabel}
                      </span>
                    </div>
                  </div>

                  <div className="my-3 border-t border-border" />

                  {/* Actions */}
                  <div className="flex flex-col gap-1.5">
                    <Button
                      variant="default"
                      size="sm"
                      nativeButton={false}
                      render={
                        <Link href="/dashboard" onClick={() => setProfileOpen(false)} />
                      }
                      className="w-full justify-start gap-2"
                    >
                      <LayoutDashboard className="size-4" />
                      Dashboard
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      nativeButton={false}
                      render={
                        <Link
                          href="/profile"
                          onClick={() => setProfileOpen(false)}
                        />
                      }
                      className="w-full justify-start gap-2"
                    >
                      <UserRound className="size-4" />
                      Update Profile
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleSignOut}
                      className="w-full justify-start gap-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
                    >
                      <LogOut className="size-4" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Hamburger (mobile) */}
          <Button
            variant="ghost"
            size="icon"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </nav>

      {/* ── Mobile menu ── */}
      {menuOpen && (
        <div
          id="mobile-nav-menu"
          className="border-t bg-background px-4 pb-5 pt-2 md:hidden"
        >
          {/* Nav links */}
          <ul className="flex flex-col gap-1">
            {publicNavItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "flex min-h-11 items-center rounded-lg px-3 py-2 text-base font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground active:bg-muted",
                    isActive(item.href) && "bg-muted text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-3 border-t border-border pt-3">
            {user ? (
              <div className="space-y-3">
                {/* User card */}
                <div className="flex items-center gap-3 rounded-xl border bg-muted/40 p-3">
                  <div className="relative size-12 shrink-0 overflow-hidden rounded-full border-2 border-primary/20">
                    <Image
                      src={user.image ?? "/avatar.svg"}
                      alt={user.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{user.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {user.email}
                    </p>
                    {/* Role badge */}
                    <span
                      className={cn(
                        "mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize leading-none",
                        roleBadgeClass[role] ?? roleBadgeClass.student
                      )}
                    >
                      {roleLabel}
                    </span>
                  </div>
                </div>

                {/* Action buttons */}
                <Button
                  nativeButton={false}
                  render={
                    <Link
                      href="/dashboard"
                      onClick={() => setMenuOpen(false)}
                    />
                  }
                  className="min-h-11 w-full justify-start gap-2"
                >
                  <LayoutDashboard className="size-4" />
                  Dashboard
                </Button>

                <Button
                  variant="outline"
                  nativeButton={false}
                  render={
                    <Link
                      href="/profile"
                      onClick={() => setMenuOpen(false)}
                    />
                  }
                  className="min-h-11 w-full justify-start gap-2"
                >
                  <UserRound className="size-4" />
                  Update Profile
                </Button>

                <Button
                  variant="ghost"
                  onClick={handleSignOut}
                  className="min-h-11 w-full justify-start gap-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  <LogOut className="size-4" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  nativeButton={false}
                  render={<Link href="/sign-in" />}
                  className="min-h-11 border-primary/40 text-primary hover:text-primary dark:hover:bg-primary/10"
                >
                  Sign In
                </Button>
                <Button
                  nativeButton={false}
                  render={<Link href="/sign-up" />}
                  className="min-h-11"
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
