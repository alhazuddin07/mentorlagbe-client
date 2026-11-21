
import {
    LayoutDashboard,
    Search,
    Crown,
    BriefcaseBusiness,
    FileText,
    PlusCircle,
    UserRound,
    Users,
    ClipboardList,
    CreditCard,
} from "lucide-react";

import type { RoleSidebarItems } from "@/types/sidebar";

export const roleBaseSidebarItems: RoleSidebarItems = {
    student: [
        {
            label: "Platform",
            items: [
                {
                    label: "Dashboard",
                    href: "/dashboard",
                    icon: LayoutDashboard,
                    exact: true,
                },
                {
                    label: "Browse Tuitions",
                    href: "/tuitions",
                    icon: Search,
                },
                {
                    label: "Pro Plans",
                    href: "/pricing",
                    icon: Crown,
                },
            ],
        },
        {
            label: "Tuition",
            items: [
                {
                    label: "My Applications",
                    href: "/dashboard/student/my-applications",
                    icon: FileText,
                },
            ],
        },
        {
            label: "Account",
            items: [
                {
                    label: "Profile",
                    href: "/dashboard/profile",
                    icon: UserRound,
                },
            ],
        },
    ],

    tutor: [
        {
            label: "Platform",
            items: [
                {
                    label: "Dashboard",
                    href: "/dashboard",
                    icon: LayoutDashboard,
                    exact: true,
                },
                {
                    label: "Browse Tuitions",
                    href: "/tuitions",
                    icon: Search,
                },
                {
                    label: "Pro Plans",
                    href: "/pricing",
                    icon: Crown,
                },
            ],
        },
        {
            label: "Tuition",
            items: [
                {
                    label: "My Tuitions",
                    href: "/dashboard/tutor/my-tuitions",
                    icon: BriefcaseBusiness,
                },
                {
                    label: "Applications",
                    href: "/dashboard/tutor/applicants",
                    icon: FileText,
                },
                {
                    label: "Post Tuition",
                    href: "/dashboard/tutor/post-tuition",
                    icon: PlusCircle,
                },
            ],
        },
        {
            label: "Account",
            items: [
                {
                    label: "Profile",
                    href: "/dashboard/profile",
                    icon: UserRound,
                },
            ],
        },
    ],

    admin: [
        {
            label: "Platform",
            items: [
                {
                    label: "Dashboard",
                    href: "/dashboard",
                    icon: LayoutDashboard,
                    exact: true,
                },
            ],
        },
        {
            label: "Management",
            items: [
                {
                    label: "Manage Users",
                    href: "/dashboard/admin/users",
                    icon: Users,
                },
                {
                    label: "Manage Tuitions",
                    href: "/dashboard/admin/tuitions",
                    icon: ClipboardList,
                },
                {
                    label: "Transactions",
                    href: "/dashboard/admin/transactions",
                    icon: CreditCard,
                },
            ],
        },
        {
            label: "Account",
            items: [
                {
                    label: "Profile",
                    href: "/dashboard/profile",
                    icon: UserRound,
                },
            ],
        },
    ],
};
