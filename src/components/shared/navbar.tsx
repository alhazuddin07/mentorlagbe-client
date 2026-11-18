'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import BrandLogo from "@/components/shared/brand-logo";
import { useSession, signOut } from "@/lib/auth-client";
import { cn } from "cn";

const publicNavItems = [
  { label: "Home", href: "/" },
  { label: "Browse Tuitions", href: "/tuitions" },
  { label: "Pricing", href: "/pricing" },
  { label: "How It Works", href: "/about" },
  { label: "Dashboard", href: "/dashboard" },
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { data: session, isPending } = useSession();
  const user = session?.user ?? null;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const handleSignOut = async () => {
    setMenuOpen(false);
    setProfileOpen(false);
    await signOut();
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
          {/* Session loading state */}
          {isPending && (
            <div className="hidden h-8 w-28 animate-pulse rounded-lg bg-muted sm:block" />
          )}

          {/* Auth actions (unauthenticated state) */}
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

          {/* User avatar (authenticated state, desktop only — mobile shows it inside the menu) */}
          {!isPending && user && (
            <div className="relative hidden md:block">
              <Button
                variant="ghost"
                size="icon"
                aria-expanded={profileOpen}
                aria-haspopup="menu"
                aria-label="Open profile menu"
                onClick={() => setProfileOpen((open) => !open)}
                className="size-9 rounded-full"
              >
                <Image
                  src={user.image ?? "/avatar.svg"}
                  alt={user.name}
                  width={36}
                  height={36}
                  className="size-9 rounded-full"
                />
              </Button>

              {/* Close on outside click */}
              {profileOpen && (
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setProfileOpen(false)}
                />
              )}

              {/* Profile dropdown (desktop) */}

              {profileOpen && (
                <div className="absolute right-0 z-50 mt-2 w-56 rounded-xl border bg-popover p-3 shadow-lg">

                  {/* Close Button */}
                  <div className="mb-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setProfileOpen(false)}
                      className="rounded-full p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                      aria-label="Close profile menu"
                    >
                      <X className="size-4" />
                    </button>
                  </div>

                  {/* User Info */}
                  <div className="flex items-center gap-3">
                    <Image
                      src={user.image ?? "/avatar.svg"}
                      alt={user.name}
                      width={40}
                      height={40}
                      className="size-10 rounded-full object-cover"
                    />

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">
                        {user.name}
                      </p>

                      <p className="truncate text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  {/* Sign Out */}
                  <Button
                    variant="outline"
                    onClick={handleSignOut}
                    className="mt-3 w-full"
                  >
                    <LogOut className="size-4" />
                    Sign Out
                  </Button>
                </div>
              )}

            </div>
          )}

          {/* Hamburger toggle (mobile / tap) */}
          <Button
            variant="ghost"
            size="icon"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
            className="md:hidden"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile menu (tap) */}
      {menuOpen && (
        <div
          id="mobile-nav-menu"
          className="border-t bg-background px-4 pb-4 pt-2 md:hidden"
        >
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

          {user ? (
            <div className="mt-3">
              <div className="flex items-center gap-3 rounded-lg border p-3">
                <Image
                  src={user.image ?? "/avatar.svg"}
                  alt={user.name}
                  width={40}
                  height={40}
                  className="size-10 rounded-full"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{user.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={handleSignOut}
                className="mt-2 min-h-11 w-full"
              >
                <LogOut className="size-4" />
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="mt-3 grid grid-cols-2 gap-2">
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
      )}
    </header>
  );
}
