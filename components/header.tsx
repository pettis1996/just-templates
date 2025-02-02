"use client"

import Link from "next/link"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"

export default function Header() {
    const { theme, setTheme } = useTheme()

    return (
        <header className="border-b">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold">
                    Template Showcase
                </Link>
                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <Link href="/templates" className="hover:underline">
                                Templates
                            </Link>
                        </li>
                        <li>
                            <Link href="/components" className="hover:underline">
                                Components
                            </Link>
                        </li>
                        <li>
                            <Link href="/premium" className="hover:underline">
                                Premium
                            </Link>
                        </li>
                    </ul>
                </nav>
                <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </div>
        </header>
    )
}