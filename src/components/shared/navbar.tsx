
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X, LogOut, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import BrandLogo from "@/components/shared/brand-logo";
import { cn } from "cn";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

const publicNavItems = [
  { label: "Home", href: "/" },
  { label: "Browse Tuitions", href: "/tuitions" },
  { label: "Pricing", href: "/pricing" },
  { label: "How It Works", href: "/about" },
] as const;

function UserAvatar({ user }: { user?: { image?: string | null; name?: string | null };
}) {
  return (
    <div className="flex items-center gap-2">
      {user?.image ? (
        <Image
          src={user.image}
          alt={user.name || "User"}
          width={36}
          height={36}
          className="h-9 w-9 rounded-full border border-border object-cover"
        />
      ) : (
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
          {user?.name?.charAt(0).toUpperCase() || "U"}
        </div>
      )}

      <span className="hidden max-w-28 truncate text-sm font-medium sm:block">
        {user?.name}
      </span>
    </div>
  );
}

function SignOutButton({
  mobile = false,
  isSigningOut,
  onSignOut,
}: {
  mobile?: boolean;
  isSigningOut: boolean;
  onSignOut: () => void;
}) {
  return (
    <Button
      variant="outline"
      disabled={isSigningOut}
      onClick={onSignOut}
      className={cn(
        "border-primary/40 text-primary hover:bg-primary/10 hover:text-primary",
        mobile && "w-full"
      )}
    >
      {isSigningOut ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <LogOut className="size-4" />
      )}
      Sign Out
    </Button>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Sign Out
  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);

      const { error } = await authClient.signOut();

      if (error) {
        console.error("Sign out failed:", error);
        return;
      }

      setMenuOpen(false);
      router.replace("/sign-in");
      router.refresh();
    } catch (error) {
      console.error("Sign out error:", error);
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Brand */}
        <BrandLogo />

        {/* Desktop Navigation */}
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

        {/* Desktop Auth Actions */}
        <div className="flex items-center gap-3">
          {isPending ? (
            <div className="h-9 w-20 animate-pulse rounded-lg bg-muted" />
          ) : user ? (
            <>
              <UserAvatar user={user} />
              <SignOutButton isSigningOut={isSigningOut} onSignOut={handleSignOut} />
            </>
          ) : (
            <>
              <Button
                variant="outline"
                nativeButton={false}
                render={<Link href="/sign-in" />}
                className="hidden border-primary/40 text-primary hover:text-primary aria-expanded:text-primary dark:hover:bg-primary/10 sm:inline-flex"
              >
                Sign In
              </Button>

              <Button
                nativeButton={false}
                render={<Link href="/sign-up" />}
                className="hidden sm:inline-flex"
              >
                Sign Up
              </Button>
            </>
          )}

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
            className="md:hidden"
          >
            {menuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
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
                    "flex min-h-11 items-center rounded-lg px-3 py-2 text-base font-medium text-muted-foreground transition-colors hover:bg-muted",
                    isActive(item.href) && "bg-muted text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-3 border-t pt-3">
            {isPending ? (
              <div className="h-10 animate-pulse rounded-lg bg-muted" />
            ) : user ? (
              <div className="flex flex-col gap-3">
                <UserAvatar user={user} />
                <SignOutButton
                  mobile
                  isSigningOut={isSigningOut}
                  onSignOut={handleSignOut}
                />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  nativeButton={false}
                  render={<Link href="/sign-in" />}
                  onClick={() => setMenuOpen(false)}
                  className="min-h-11 border-primary/40 text-primary hover:text-primary"
                >
                  Sign In
                </Button>

                <Button
                  nativeButton={false}
                  render={<Link href="/sign-up" />}
                  onClick={() => setMenuOpen(false)}
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