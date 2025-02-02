export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                    <h3 className="text-xl font-bold">TemplateHub</h3>
                    <p className="text-sm text-gray-400">Modern web templates and components</p>
                </div>
                <ul className="flex space-x-4">
                    <li>
                        <a href="#" className="hover:text-indigo-400 transition-colors">
                            About
                        </a>
                    </li>
                    <li>
                        <a href="#" className="hover:text-indigo-400 transition-colors">
                            Contact
                        </a>
                    </li>
                    <li>
                        <a href="#" className="hover:text-indigo-400 transition-colors">
                            Terms
                        </a>
                    </li>
                    <li>
                        <a href="#" className="hover:text-indigo-400 transition-colors">
                            Privacy
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    )
}