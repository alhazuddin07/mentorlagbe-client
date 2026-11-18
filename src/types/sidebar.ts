
import type { LucideIcon } from "lucide-react";

export type UserRole = "student" | "tutor" | "admin";

export type NavItem = {
    label: string;
    href: string;
    icon: LucideIcon;
    exact?: boolean;
};

export type SidebarGroup = {
    label: string;
    items: NavItem[];
};

export type RoleSidebarItems = Record<UserRole, SidebarGroup[]>;

export function isUserRole(role: unknown): role is UserRole {
    return role === "student" || role === "tutor" || role === "admin";
}