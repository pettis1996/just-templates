"use client";
import React, { useState } from "react";
import { useUser } from "@/context/UserContext";
import { redirect } from "next/navigation";
import PageStatus from "./_inc/PageStatus";
import AddTemplates from "./_inc/AddTemplates";
import AddComponents from "./_inc/AddComponents";
import SideBar from "./_inc/Sidebar";

const AdminDashboard = () => {
    const { user, loading } = useUser();
    const [selectedSection, setSelectedSection] = useState("status");

    if (loading) {
        return <div className="text-center py-20 text-gray-600 font-bold">Loading...</div>;
    }

    if (!user) {
        redirect("/sign-in");
    }

    return (
        <div className="container mx-auto px-6 py-16">
            <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Admin Dashboard</h1>

            <div className="flex gap-8">
                <SideBar
                    selectedSection={selectedSection}
                    setSelectedSection={setSelectedSection}
                    userEmail={user?.email ?? ""}
                />

                <div className="flex-1">
                    {selectedSection === "status" && <PageStatus />}
                    {selectedSection === "templates" && <AddTemplates />}
                    {selectedSection === "components" && <AddComponents />}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;