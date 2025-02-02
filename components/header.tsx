import Link from "next/link"

export default function Header() {
    return (
        <header className="bg-white shadow-sm">
            <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold text-indigo-600">
                    Just Templates
                </Link>
                <ul className="flex space-x-6">
                    <li>
                        <Link href="/templates" className="text-gray-600 hover:text-indigo-600 transition-colors">
                            Templates
                        </Link>
                    </li>
                    <li>
                        <Link href="/components" className="text-gray-600 hover:text-indigo-600 transition-colors">
                            Components
                        </Link>
                    </li>
                    <li>
                        <Link href="/premium" className="text-gray-600 hover:text-indigo-600 transition-colors">
                            Premium
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}