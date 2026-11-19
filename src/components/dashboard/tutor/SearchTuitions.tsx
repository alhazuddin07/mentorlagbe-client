"use client";

import { Search } from "lucide-react";

interface SearchTuitionsProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
}

const SearchTuitions = ({
    searchTerm,
    onSearchChange,
}: SearchTuitionsProps) => {

    return (
        <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <input
                type="text"
                placeholder="Search by title or subject..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="h-11 w-full rounded-lg border bg-background pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary"
            />
        </div>
    );
};

export default SearchTuitions;