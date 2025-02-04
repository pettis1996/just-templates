import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";
import { signOutAction } from "@/app/actions";

export default async function Header() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    return (
        <header className="bg-white shadow-sm">
            <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold text-indigo-600">
                    Just Templates
                </Link>

                <ul className="flex space-x-6 items-center">
                    <li>
                        <Link href="/" className="text-gray-600 hover:text-indigo-600 transition-colors">
                            Home
                        </Link>
                    </li>

                    {user ? (
                        <>
                            <li>
                                <Link href="/my-area" className="text-gray-600 hover:text-indigo-600 transition-colors">
                                    My Area
                                </Link>
                            </li>
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
                            <li>
                                <form action={signOutAction}>
                                    <Button type="submit" size="sm" variant="outline">
                                        Sign out
                                    </Button>
                                </form>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link href="/premium" className="text-gray-600 hover:text-indigo-600 transition-colors">
                                    Premium
                                </Link>
                            </li>
                            <li>
                                <Link href="/sign-in" className="text-gray-600 hover:text-indigo-600 transition-colors">
                                    Sign In
                                </Link>
                            </li>
                            <li>
                                <Link href="/sign-up" className="text-gray-600 hover:text-indigo-600 transition-colors">
                                    Sign Up
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
}