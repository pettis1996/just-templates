"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import React, { useState } from "react";
import { Item, ItemType } from "../types";

const data: Record<ItemType, Item[]> = {
    templates: [
        { id: 1, title: "Blog Template", description: "A clean and modern blog layout", image: "/placeholder.svg", category: "Blog" },
        { id: 2, title: "Portfolio Template", description: "Showcase your work with style", image: "/placeholder.svg", category: "Portfolio" },
        { id: 3, title: "E-commerce Template", description: "Start selling products online", image: "/placeholder.svg", category: "E-commerce" },
    ],
    components: [
        { id: 1, title: "Navigation Bar", description: "Responsive top navigation", image: "/placeholder.svg", category: "Navigation" },
        { id: 2, title: "Hero Section", description: "Eye-catching hero with CTA", image: "/placeholder.svg", category: "Hero" },
        { id: 3, title: "Footer", description: "Comprehensive footer with links", image: "/placeholder.svg", category: "Footer" },
    ],
};

export default function DynamicPage() {
    const { type } = useParams() as { type: ItemType };

    const items = data[type] || [];
    const categories = [...new Set(items.map((item) => item.category))];

    const [selectedCategory, setSelectedCategory] = useState<string>("All");

    const filteredItems = selectedCategory === "All"
        ? items
        : items.filter((item) => item.category === selectedCategory);

    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-3xl font-bold mb-8 text-center">Free {type}</h1>

            <div className="flex justify-center mb-8">
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="p-2 border rounded"
                >
                    <option value="All">All Categories</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredItems.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
                    >
                        <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-48 object-cover" />
                        <div className="p-6">
                            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                            <p className="text-gray-600 mb-4">{item.description}</p>
                            <Link
                                href={`/${type}/${item.id}`}
                                className="text-indigo-600 font-semibold hover:text-indigo-800 transition-colors"
                            >
                                View Details →
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
