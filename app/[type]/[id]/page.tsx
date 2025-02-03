"use client";
import { Item, ItemType } from "@/app/types";
import Image from "next/image";
import { useParams } from "next/navigation";
import { CustomBadge } from "@/components/CustomBadge";

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

export default function ItemPage() {
    const { type, id } = useParams() as { type: ItemType; id: string };

    const item = data[type]?.find((item) => item.id === parseInt(id));

    if (!item) {
        return <div className="text-center text-red-600 font-bold">Item not found</div>;
    }

    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-3xl font-bold mb-8 text-center">{item.title}</h1>

            <div className="max-w-2xl mx-auto">
                <div className="relative w-full h-60 bg-gray-100 mb-5">
                    <Image src={item.image} alt={item.title} fill className="object-cover rounded" />
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                    <CustomBadge>Template Type: {type}</CustomBadge>
                    <CustomBadge>Template Category: {item.category}</CustomBadge>
                    <CustomBadge>Created At: {new Date().toLocaleDateString()}</CustomBadge>
                    <CustomBadge>Last updated: {new Date().toLocaleDateString()}</CustomBadge>
                    <CustomBadge>Author: {item.author || "Unknown"}</CustomBadge>
                </div>

                <h2 className="text-2xl font-bold mb-4">Template Description</h2>
                <p className="text-gray-600 mb-4">{item.description}</p>
            </div>
        </div>
    );
}