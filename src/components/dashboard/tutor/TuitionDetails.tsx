import Image from "next/image";
import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    BookOpen,
    GraduationCap,
    MapPin,
    CalendarDays,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { getTuitionById } from "@/lib/api/tuitions/tuitions-api";
import ApplyNow from "@/components/dashboard/tutor/ApplyNow";


interface Props {
    params: Promise<{ id: string }>;
}

const TuitionDetails = async ({ params }: Props) => {
    const { id } = await params;

    const tuition = await getTuitionById(id);

    if (!tuition) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-muted/40">
            <div className="container mx-auto max-w-6xl px-4 py-10">

                {/* Banner */}
                <div className="relative h-64 w-full overflow-hidden rounded-2xl bg-muted shadow-md sm:h-80 md:h-96">
                    {tuition.bannerImage ? (
                        <Image
                            src={tuition.bannerImage}
                            alt={tuition.title}
                            fill
                            priority
                            className="object-cover"
                             sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    ) : (
                        <div className="flex size-full items-center justify-center">
                            <BookOpen className="size-12 text-muted-foreground" />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

                    <div className="absolute bottom-0 left-0 p-6 sm:p-8">
                        <div className="mb-3 flex flex-wrap gap-2">
                            <Badge variant="secondary">{tuition.subject}</Badge>
                            <Badge
                                className={cn(
                                    tuition.mode === "online"
                                        ? "bg-green-100 text-green-700 border-green-200"
                                        : "bg-blue-100 text-blue-700 border-blue-200"
                                )}
                            >
                                {tuition.mode}
                            </Badge>
                        </div>
                        <h1 className="text-2xl font-bold text-white sm:text-4xl">
                            {tuition.title}
                        </h1>
                    </div>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">

                    {/* Left column */}
                    <div className="space-y-8 lg:col-span-2">

                        {/* Tuition Details */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Tuition Details</CardTitle>
                            </CardHeader>
                            <CardContent className="p-4">

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    {/* Subject */}
                                    <div className="flex items-center gap-3 rounded-xl border p-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
                                            <BookOpen size={20} />
                                        </div>

                                        <div>
                                            <p className="text-sm text-muted-foreground">Subject</p>
                                            <p className="font-medium">{tuition.subject}</p>
                                        </div>
                                    </div>

                                    {/* Class Level */}
                                    <div className="flex items-center gap-3 rounded-xl border p-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
                                            <GraduationCap size={20} />
                                        </div>

                                        <div>
                                            <p className="text-sm text-muted-foreground">Class Level</p>
                                            <p className="font-medium">{tuition.classLevel}</p>
                                        </div>
                                    </div>

                                    {/* Mode */}
                                    <div className="flex items-center gap-3 rounded-xl border p-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
                                            <MapPin size={20} />
                                        </div>

                                        <div>
                                            <p className="text-sm text-muted-foreground">Mode</p>
                                            <p className="font-medium capitalize">{tuition.mode}</p>
                                        </div>
                                    </div>

                                    {/* Location */}
                                    <div className="flex items-center gap-3 rounded-xl border p-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
                                            <MapPin size={20} />
                                        </div>

                                        <div>
                                            <p className="text-sm text-muted-foreground">Location</p>
                                            <p className="font-medium">
                                                {tuition.location || "Not specified"}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Days Per Week */}
                                    <div className="flex items-center gap-3 rounded-xl border p-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
                                            <CalendarDays size={20} />
                                        </div>

                                        <div>
                                            <p className="text-sm text-muted-foreground">Days Per Week</p>
                                            <p className="font-medium">
                                                {tuition.daysPerWeek} days
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Description */}
                        <Card>
                            <CardHeader>
                                <CardTitle>About this Tuition</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="whitespace-pre-line leading-relaxed text-muted-foreground">
                                    {tuition.description}
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right column (sticky sidebar) */}
                    <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">

                        {/* Fee + CTA */}
                        <Card>
                            <CardContent className="pt-6">
                                <p className="text-sm text-muted-foreground">Monthly Fee</p>
                                <p className="mt-1 text-4xl font-bold">
                                    ৳{tuition.monthlyFee}
                                    <span className="text-base font-normal text-muted-foreground">
                                        {" "}/month
                                    </span>
                                </p>

                                <Separator className="my-5" />

                                <ApplyNow tuition={tuition} />
                            </CardContent>
                        </Card>

                        {/* Tutor */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Your Tutor</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-16 w-16">
                                        <AvatarImage
                                            src={tuition.tutoreImage}
                                            alt={tuition.tutorName || "Tutor"}
                                        />
                                        <AvatarFallback className="text-lg font-semibold">
                                            {(tuition.tutorName || "T").charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className="min-w-0">
                                        <p className="truncate font-semibold">
                                            {tuition.tutorName || "Not available"}
                                        </p>
                                        <p className="truncate text-sm text-muted-foreground">
                                            {tuition.tutorEmail || "Not available"}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </aside>
                </div>
            </div>
        </main>
    );
};

export default TuitionDetails;