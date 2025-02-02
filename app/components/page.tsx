import Link from "next/link"

const components = [
    { id: 1, title: "Navigation Bar", description: "Responsive top navigation", image: "/placeholder.svg" },
    { id: 2, title: "Hero Section", description: "Eye-catching hero with CTA", image: "/placeholder.svg" },
    { id: 3, title: "Footer", description: "Comprehensive footer with links", image: "/placeholder.svg" },
]

export default function ComponentsPage() {
    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-3xl font-bold mb-8 text-center">Free Components</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {components.map((component) => (
                    <div
                        key={component.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
                    >
                        <img
                            src={component.image || "/placeholder.svg"}
                            alt={component.title}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-6">
                            <h2 className="text-xl font-semibold mb-2">{component.title}</h2>
                            <p className="text-gray-600 mb-4">{component.description}</p>
                            <Link
                                href={`/components/${component.id}`}
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