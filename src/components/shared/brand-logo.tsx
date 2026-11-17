import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { cn } from "cn";

/**
 * Shared brand heading for MentorLagbe.
 * Used in the Navbar and on the Home page so the logo's
 * style and size stay identical everywhere.
 */
export default function BrandLogo({
  className,
  href = "/",
}: {
  className?: string;
  href?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 text-xl font-bold tracking-tight sm:text-2xl",
        className
      )}
    >
      <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <GraduationCap className="size-5" />
      </span>
      <span>
        Mentor<span className="text-primary">Lagbe</span>
      </span>
    </Link>
  );
}
