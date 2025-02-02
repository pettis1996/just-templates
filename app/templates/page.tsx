import Link from "next/link"

const templates = [
    { id: 1, title: "Blog Template", description: "A clean and modern blog layout", image: "/placeholder.svg" },
    { id: 2, title: "Portfolio Template", description: "Showcase your work with style", image: "/placeholder.svg" },
    { id: 3, title: "E-commerce Template", description: "Start selling products online", image: "/placeholder.svg" },
]

export default function TemplatesPage() {
    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-3xl font-bold mb-8 text-center">Free Templates</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {templates.map((template) => (
                    <div
                        key={template.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
                    >
                        <img src={template.image || "/placeholder.svg"} alt={template.title} className="w-full h-48 object-cover" />
                        <div className="p-6">
                            <h2 className="text-xl font-semibold mb-2">{template.title}</h2>
                            <p className="text-gray-600 mb-4">{template.description}</p>
                            <Link
                                href={`/templates/${template.id}`}
                                className="text-indigo-600 font-semibold hover:text-indigo-800 transition-colors"
                            >
                                View Details →
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}