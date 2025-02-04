"use client"
import { useUser } from "@/context/UserContext";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function MyArea() {
    const { user, loading } = useUser();

    if (!user) redirect("/sign-in");

    const lastViewedTemplates = [
        { id: 1, title: "Portfolio Template", image: "/placeholder.svg" },
        { id: 2, title: "E-commerce Template", image: "/placeholder.svg" },
    ];

    const savedTemplates = [
        { id: 3, title: "Blog Template", image: "/placeholder.svg" },
        { id: 4, title: "Navigation Bar", image: "/placeholder.svg" },
    ];

    if (loading) {
        return <div className="text-center py-20 text-gray-600 font-bold">Loading...</div>;
    }

    return (
        <div className="container mx-auto px-6 py-16">
            <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">My Area</h1>

            <div className="bg-white p-8 rounded-xl shadow-md flex gap-8 items-center mb-16">
                <Image src="/placeholder.svg" alt="Profile Avatar" width={80} height={80} className="rounded-full" />
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">{user.email}</h2>
                    <p className="text-gray-600">Welcome back! Let`s build something amazing.</p>
                </div>
            </div>

            <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-6">Last Viewed Templates</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {lastViewedTemplates.map((template) => (
                        <div
                            key={template.id}
                            className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1"
                        >
                            <Image src={template.image} alt={template.title} width={120} height={80} className="rounded mb-4" />
                            <h3 className="text-lg font-semibold">{template.title}</h3>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-6">Saved Templates</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {savedTemplates.map((template) => (
                        <div
                            key={template.id}
                            className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1"
                        >
                            <Image src={template.image} alt={template.title} width={120} height={80} className="rounded mb-4" />
                            <h3 className="text-lg font-semibold">{template.title}</h3>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-3xl font-semibold mb-6">Profile Stats</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="bg-indigo-600 text-white p-8 rounded-xl text-center">
                        <h3 className="text-2xl font-bold">10</h3>
                        <p>Viewed Templates</p>
                    </div>
                    <div className="bg-indigo-600 text-white p-8 rounded-xl text-center">
                        <h3 className="text-2xl font-bold">5</h3>
                        <p>Saved Templates</p>
                    </div>
                    <div className="bg-indigo-600 text-white p-8 rounded-xl text-center">
                        <h3 className="text-2xl font-bold">15</h3>
                        <p>Comments</p>
                    </div>
                    <div className="bg-indigo-600 text-white p-8 rounded-xl text-center">
                        <h3 className="text-2xl font-bold">3</h3>
                        <p>Projects Started</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
