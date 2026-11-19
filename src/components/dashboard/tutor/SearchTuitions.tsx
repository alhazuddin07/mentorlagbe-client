"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { ITuition } from "@/types/tuitions/tuitions";

interface SearchTuitionsProps {
    tuitions: ITuition[];
    onSearch: (filtered: ITuition[]) => void;
}

const SearchTuitions = ({ tuitions, onSearch }: SearchTuitionsProps) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (value: string) => {
        setSearchTerm(value);

        const searchValue = value.toLowerCase().trim();

        const filtered = tuitions.filter((tuition) =>
            tuition.title.toLowerCase().includes(searchValue) ||
            tuition.subject.toLowerCase().includes(searchValue)
        );

        onSearch(filtered);
    };

    return (
        <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <input
                type="text"
                placeholder="Search by title or subject..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="h-11 w-full rounded-lg border bg-background pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary"
            />
        </div>
    );
};

export default SearchTuitions;;