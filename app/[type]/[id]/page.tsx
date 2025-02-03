"use client";

import { Item, ItemType } from "@/app/types";
import { useParams } from "next/navigation";

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

export default function ItemPage() {
    const { type, id } = useParams() as { type: ItemType; id: string };

    const item = data[type]?.find((item) => item.id === parseInt(id));

    if (!item) {
        return <div>Item not found</div>;
    }

    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-3xl font-bold mb-8 text-center">{item.title}</h1>
            <div className="max-w-2xl mx-auto">
                <img src={item.image} alt={item.title} className="w-full h-64 object-cover mb-8" />
                <p className="text-gray-600 mb-4">{item.description}</p>
                <p className="text-gray-600">Category: {item.category}</p>
            </div>
        </div>
    );
}
