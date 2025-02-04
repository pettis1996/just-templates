"use client";
import React from "react";
import Image from "next/image";

interface SideBarProps {
    selectedSection: string;
    setSelectedSection: (section: string) => void;
    userEmail: string;
}

const SideBar = ({ selectedSection, setSelectedSection, userEmail }: SideBarProps) => {
    return (
        <aside className="w-64 bg-gray-800 text-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center gap-4 mb-8">
                <Image src="/placeholder.svg" alt="User Avatar" width={60} height={60} className="rounded-full" />
                <h2 className="text-xl font-semibold">{userEmail}</h2>
            </div>
            <ul className="space-y-2">
                <li>
                    <button
                        onClick={() => setSelectedSection("status")}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                            selectedSection === "status" ? "bg-indigo-600 text-white" : "text-gray-300 hover:bg-indigo-600 hover:text-white"
                        }`}
                    >
                        Page Status
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => setSelectedSection("templates")}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                            selectedSection === "templates" ? "bg-indigo-600 text-white" : "text-gray-300 hover:bg-indigo-600 hover:text-white"
                        }`}
                    >
                        Add Templates
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => setSelectedSection("components")}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                            selectedSection === "components" ? "bg-indigo-600 text-white" : "text-gray-300 hover:bg-indigo-600 hover:text-white"
                        }`}
                    >
                        Add Components
                    </button>
                </li>
            </ul>
        </aside>
    );
};

export default SideBar;