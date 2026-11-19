"use client";

import { ITuition } from "@/types/tuitions/tuitions";

interface FilterTuitionsProps {
    tuitions: ITuition[];
    subject: string;
    classLevel: string;
    mode: string;
    onSubjectChange: (value: string) => void;
    onClassLevelChange: (value: string) => void;
    onModeChange: (value: string) => void;
}

const FilterTuitions = ({
    tuitions,
    subject,
    classLevel,
    mode,
    onSubjectChange,
    onClassLevelChange,
    onModeChange,
}: FilterTuitionsProps) => {

    const subjects = [...new Set(tuitions.map((item) => item.subject))];
    const classes = [...new Set(tuitions.map((item) => item.classLevel))];

    return (
        <div className="flex flex-wrap gap-3">

            {/* Subject Filter */}
            <select
                value={subject}
                onChange={(e) => onSubjectChange(e.target.value)}
                className="h-11 rounded-lg border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary"
            >
                <option value="all">All Subjects</option>

                {subjects.map((item) => (
                    <option key={item} value={item}>
                        {item}
                    </option>
                ))}
            </select>

            {/* Class Level Filter */}
            <select
                value={classLevel}
                onChange={(e) => onClassLevelChange(e.target.value)}
                className="h-11 rounded-lg border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary"
            >
                <option value="all">All Classes</option>

                {classes.map((item) => (
                    <option key={item} value={item}>
                        {item}
                    </option>
                ))}
            </select>

            {/* Mode Filter */}
            <select
                value={mode}
                onChange={(e) => onModeChange(e.target.value)}
                className="h-11 rounded-lg border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary"
            >
                <option value="all">All Modes</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
            </select>

        </div>
    );
};

export default FilterTuitions;