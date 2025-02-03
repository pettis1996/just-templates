"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import React, { useState } from "react";
import { Item, ItemType } from "../types";

const data: Record<ItemType, Item[]> = {
    templates: [
        { id: 1, title: "Blog Template", description: "A clean and modern blog layout", author: "Admin", image: "/placeholder.svg", category: "Blog" },
        { id: 2, title: "Portfolio Template", description: "Showcase your work with style", author: "Admin", image: "/placeholder.svg", category: "Portfolio" },
        { id: 3, title: "E-commerce Template", description: "Start selling products online", author: "Admin", image: "/placeholder.svg", category: "E-commerce" },
    ],
    components: [
        { id: 1, title: "Navigation Bar", description: "Responsive top navigation", author: "Admin", image: "/placeholder.svg", category: "Navigation" },
        { id: 2, title: "Hero Section", description: "Eye-catching hero with CTA", author: "Admin", image: "/placeholder.svg", category: "Hero" },
        { id: 3, title: "Footer", description: "Comprehensive footer with links", author: "Admin", image: "/placeholder.svg", category: "Footer" },
    ],
};

export default function DynamicPage() {
    const { type } = useParams() as { type: ItemType };

    const items = data[type] || [];
    const categories = [...new Set(items.map((item) => item.category))];

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const toggleCategory = (category: string) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((c) => c !== category)
                : [...prev, category]
        );
    };

    const filteredItems =
        selectedCategories.length === 0
            ? items
            : items.filter((item) => selectedCategories.includes(item.category));

    return (
        <div className="container mx-auto px-6 py-16">
            <h1 className="text-4xl font-bold text-center mb-12">Explore Free {type === "templates" ? "Website Templates" : "Component Templates"}</h1>

            <div className="flex">
                {/* Sidebar Filter */}
                <aside className="w-72 p-6 bg-white shadow-xl rounded-lg mr-10">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-800">Categories</h2>
                    <ul className="space-y-4">
                        {categories.map((category) => (
                            <li key={category}>
                                <label className="flex items-center cursor-pointer text-gray-700">
                                    <input
                                        type="checkbox"
                                        checked={selectedCategories.includes(category)}
                                        onChange={() => toggleCategory(category)}
                                        className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                    />
                                    <span className="ml-3 text-lg">{category}</span>
                                </label>
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* Content Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 flex-1">
                    {filteredItems.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                        >
                            <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.title}
                                className="w-full h-56 object-cover"
                            />
                            <div className="p-6">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-3">{item.title}</h2>
                                <p className="text-gray-600 mb-4">{item.description}</p>
                                <Link
                                    href={`/${type}/${item.id}`}
                                    className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-indigo-700 transition"
                                >
                                    View Details →
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}