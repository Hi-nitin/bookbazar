"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function BookLiveSearch() {
    const router = useRouter();

    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handler = setTimeout(() => {
            if (query.trim()) {
                fetchSuggestions();
            } else {
                setSuggestions([]);
            }
        }, 300);

        return () => clearTimeout(handler);
    }, [query]);

    const fetchSuggestions = async () => {
        setLoading(true);

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/book/suggestions?q=${encodeURIComponent(query)}`
            );

            const data = await res.json();

            setSuggestions(data.data || []);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        const searchTerm = query.trim();

        if (!searchTerm) return;

        router.push(
            `/searchbook/${encodeURIComponent(searchTerm)}`
        );

        setSuggestions([]);
    };

    const handleSuggestionClick = (suggestion: string) => {
        router.push(
            `/searchbook/${encodeURIComponent(suggestion)}`
        );

        setSuggestions([]);
    };

    return (
        <div className="max-w-md mx-auto mt-6 relative">

            <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSearch();
                    }
                }}
                type="search"
                placeholder="Search books..."
                className="w-full p-3 border rounded-lg bg-white dark:bg-zinc-900 text-black dark:text-white border-gray-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {loading && (
                <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Searching...
                </div>
            )}

            {suggestions.length > 0 && (
                <div className="absolute left-0 right-0 mt-1 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-lg shadow-lg z-50 overflow-hidden">

                    {suggestions.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => handleSuggestionClick(item)}
                            className="px-4 py-3 cursor-pointer text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700 hover:text-black dark:hover:text-white transition"
                        >
                            {item}
                        </div>
                    ))}

                </div>
            )}
        </div>
    );
}