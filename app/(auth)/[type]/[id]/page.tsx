"use client";
import { Item, ItemType } from "@/app/types";
import Image from "next/image";
import { redirect, useParams } from "next/navigation";
import { CustomBadge } from "@/components/CustomBadge";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function ItemPage() {
    const { user, loading } = useUser();
    const { type, id } = useParams() as { type: ItemType; id: string };
    const [item, setItem] = useState<Item | null>(null);

    useEffect(() => {
        const fetchItem = async () => {
            const supabase = createClient();
            const tableName = type === "templates" ? "website_templates" : "component_templates";

            const { data, error } = await supabase.from(tableName).select("*").eq("id", id).single();

            if (error) {
                console.error("Error fetching item:", error.message);
            } else {
                setItem(data);
            }
        };

        if (id) fetchItem();
    }, [id, type]);

    if (!user && !loading) redirect("/sign-in");

    if (loading) {
        return <div className="text-center py-20 text-gray-600 font-bold">Loading...</div>;
    }

    if (!item) {
        return <div className="text-center text-red-600 font-bold py-20">Item not found</div>;
    }

    return (
        <div className="container mx-auto px-6 py-16">
            <h1 className="text-4xl font-bold mb-12 text-center text-gray-800">{item.title}</h1>

            <div className="max-w-4xl mx-auto">
                <div className="relative w-full h-72 bg-gray-100 rounded-xl overflow-hidden shadow-lg mb-8">
                    <Image src={item.banner_url || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                </div>

                <div className="flex flex-wrap gap-3 mb-8">
                    <CustomBadge>Type: {type}</CustomBadge>
                    <CustomBadge>Category: {item.category}</CustomBadge>
                    <CustomBadge>Author: {item.author || "Unknown"}</CustomBadge>
                </div>

                <h2 className="text-3xl font-semibold mb-4">Description</h2>
                <p className="text-gray-600 text-lg mb-10 leading-relaxed">{item.description}</p>

                <div className="flex gap-6">
                    <a
                        href={item.repo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-indigo-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-indigo-700 font-semibold transition"
                    >
                        Go to Repo
                    </a>
                    <a
                        href={item.dl_url}
                        className="bg-yellow-500 text-black px-6 py-3 rounded-full shadow-md hover:bg-yellow-600 font-semibold transition"
                    >
                        Download
                    </a>
                </div>
            </div>
        </div>
    );
}