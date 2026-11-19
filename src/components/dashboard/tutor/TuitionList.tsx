"use client";

import { useState } from "react";
import { BookOpen } from "lucide-react";
import { ITuition } from "@/types/tuitions/tuitions";
import TuitionCard from "./TuitionCard";
import SearchTuitions from "./SearchTuitions";
import FilterTuitions from "./FilterTuitions";

const TuitionList = ({ tuitions }: { tuitions: ITuition[] }) => {

    // Search state
    const [searchTerm, setSearchTerm] = useState("");

    // Filter states
    const [subject, setSubject] = useState("all");
    const [classLevel, setClassLevel] = useState("all");
    const [mode, setMode] = useState("all");

    // Search + Filter
    const filteredTuitions = tuitions.filter((tuition) => {

        const search = searchTerm.toLowerCase().trim();

        const matchesSearch =
            tuition.title.toLowerCase().includes(search) ||
            tuition.subject.toLowerCase().includes(search);

        const matchesSubject =
            subject === "all" || tuition.subject === subject;

        const matchesClass =
            classLevel === "all" || tuition.classLevel === classLevel;

        const matchesMode =
            mode === "all" || tuition.mode === mode;

        return (
            matchesSearch &&
            matchesSubject &&
            matchesClass &&
            matchesMode
        );
    });

    return (
        <>
            <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row">

                <SearchTuitions
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                />

                <FilterTuitions
                    tuitions={tuitions}
                    subject={subject}
                    classLevel={classLevel}
                    mode={mode}
                    onSubjectChange={setSubject}
                    onClassLevelChange={setClassLevel}
                    onModeChange={setMode}
                />

            </div>

            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                    Available Tuitions
                </h2>

                <p className="text-sm text-muted-foreground">
                    {filteredTuitions.length} Listings Found
                </p>
            </div>

            {filteredTuitions.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredTuitions.map((item) => (
                        <TuitionCard key={item._id} tuition={item} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed px-6 py-20 text-center">
                    <div className="mb-4 rounded-full bg-muted p-4">
                        <BookOpen className="size-10 text-muted-foreground" />
                    </div>

                    <h3 className="text-xl font-semibold">
                        No Tuitions Found
                    </h3>

                    <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                        No tuition listings match your search or filters.
                        Try changing your selection.
                    </p>
                </div>
            )}
        </>
    );
};

export default TuitionList;