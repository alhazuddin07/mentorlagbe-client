
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  GraduationCap,
  LogOut,
  User,
  FileText,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { Skeleton } from "@/components/ui/skeleton";
import { signOut, useSession } from "@/lib/auth-client";

import { roleBaseSidebarItems } from "@/config/sidebar-items";
import { isUserRole, type NavItem } from "@/types/sidebar";

function SidebarNavItem({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  const isActive = item.exact
    ? pathname === item.href
    : pathname === item.href || pathname.startsWith(`${item.href}/`);

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        isActive={isActive}
        tooltip={item.label}
        render={
          <Link
            href={item.href}
            onClick={() => setOpenMobile(false)}
          />
        }
      >
        <item.icon />
        <span>{item.label}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export function AppSidebar() {
  const { setOpenMobile } = useSidebar();
  const { data: session, isPending } = useSession();

  const user = session?.user ?? null;

  // Get user role from Better Auth session
  const roleValue = (user as { role?: unknown } | null)?.role;

  const role = isUserRole(roleValue) ? roleValue : "student";

  // Get sidebar groups according to user role
  const sidebarGroups = roleBaseSidebarItems[role];

  const handleSignOut = async () => {
    setOpenMobile(false);
    await signOut();
  };

  return (
    <Sidebar collapsible="icon">

      {/* Brand */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              tooltip="MentorLagbe"
              render={<Link href="/" />}
            >
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <GraduationCap className="size-5" />
              </div>

              <div className="grid flex-1 text-left leading-tight">
                <span className="truncate text-base font-bold">
                  Mentor<span className="text-primary">Lagbe</span>
                </span>

                <span className="truncate text-xs text-muted-foreground">
                  Dashboard
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Dynamic Sidebar */}
      <SidebarContent>
        {sidebarGroups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>
              {group.label}
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarNavItem
                    key={item.href}
                    item={item}
                  />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <SidebarMenu>
          {isPending ? (
            <div className="flex flex-col gap-2 px-2 py-1">
              <div className="flex items-center gap-2">
                <Skeleton className="size-8 rounded-full" />

                <div className="flex flex-1 flex-col gap-1">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-2.5 w-32" />
                </div>
              </div>

              <Skeleton className="h-8 w-full rounded-md" />
            </div>
          ) : user ? (
            <>
              <SidebarMenuItem>
                <SidebarMenuButton
                  size="lg"
                  tooltip="Profile"
                  render={
                    <Link href="/dashboard/profile" />
                  }
                >
                  <Image
                    src={user.image || "/avatar.svg"}
                    alt={user.name}
                    width={32}
                    height={32}
                    className="size-8 shrink-0 rounded-full object-cover"
                  />

                  <div className="grid flex-1 text-left leading-tight">
                    <span className="truncate text-sm font-semibold">
                      {user.name}
                    </span>

                    <span className="truncate text-xs text-muted-foreground">
                      {user.email}
                    </span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Sign Out"
                  onClick={handleSignOut}
                >
                  <LogOut />
                  <span>Sign Out</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </>
          ) : (
            <>
              <SidebarMenuItem>
                <SidebarMenuButton
                  render={<Link href="/sign-in" />}
                >
                  <User />
                  <span>Sign In</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  render={<Link href="/sign-up" />}
                >
                  <FileText />
                  <span>Sign Up</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </>
          )}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
