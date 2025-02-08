"use client"
import { useUser } from "@/context/UserContext";
import Image from "next/image";
import { redirect } from "next/navigation";
import { User, Globe, Calendar, Edit3 } from "lucide-react";
import { useState, useEffect } from "react";
import ProfileModal from "./_inc/ProfileModal";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";

interface Profile {
    nickname: string;
    date_of_birth: string;
    website: string;
    bio: string;
    avatar_url: string;
}

interface Template {
    id: string;
    title: string;
    description: string;
    author: string;
    type: string;
    category: string;
    created_at: string;
    repo_url: string;
    dl_url: string;
    banner_url: string;
    image?: string;
}

interface LastViewedTemplate {
    template_id: string;
}

interface SavedTemplate {
    template_id: string;
}

export default function MyArea() {
    const { user, loading } = useUser();
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [lastViewedTemplates, setLastViewedTemplates] = useState<Template[]>([]);
    const [savedTemplates, setSavedTemplates] = useState<Template[]>([]);

    const supabase = createClient();

    if (!user && !loading) redirect("/sign-in");

    const fetchProfileData = async () => {
        if (!user) return;

        const { data, error } = await supabase
            .from("user_profile")
            .select("nickname, date_of_birth, website, bio, avatar_url")
            .eq("id", user.id)
            .single();

        if (error) {
            console.error("Error fetching profile data:", error);
            return;
        }
        setProfile(data);
    };

    const fetchLastViewedTemplates = async () => {
        if (!user) return;

        try {
            const { data: lastViewedData, error: lastViewedError } = await supabase
                .from("last_viewed_templates")
                .select("template_id, component_id, template_type, viewed_at")
                .eq("user_id", user.id)
                .order("viewed_at", { ascending: false });

            if (lastViewedError) throw new Error(`Error fetching last viewed templates: ${lastViewedError.message}`);

            const lastViewedTemplateIds = lastViewedData.map((template: LastViewedTemplate) => template.template_id);

            const { data: websiteTemplates, error: websiteTemplatesError } = await supabase
                .from("website_templates")
                .select("id, title, description, author, type, category, created_at, repo_url, dl_url, banner_url")
                .in("id", lastViewedTemplateIds);

            if (websiteTemplatesError) throw new Error(`Error fetching website templates: ${websiteTemplatesError.message}`);

            const { data: componentTemplates, error: componentTemplatesError } = await supabase
                .from("component_templates")
                .select("id, title, description, author, type, category, created_at, repo_url, dl_url, banner_url")
                .in("id", lastViewedTemplateIds);

            if (componentTemplatesError) throw new Error(`Error fetching component templates: ${componentTemplatesError.message}`);

            const combinedLastViewed: Template[] = [
                ...websiteTemplates.map((template: Template) => ({
                    ...template,
                    type: "website",
                })),
                ...componentTemplates.map((template: Template) => ({
                    ...template,
                    type: "component",
                })),
            ];

            setLastViewedTemplates(combinedLastViewed);

        } catch (error) {
            console.error("Template fetching error:", error);
        }
    };

    const fetchSavedTemplates = async () => {
        if (!user) return;

        try {
            const { data: savedTemplatesData, error: savedTemplatesError } = await supabase
                .from("saved_templates")
                .select("template_id, component_id, template_type, saved_at")
                .eq("user_id", user.id)
                .order("saved_at", { ascending: false });

            if (savedTemplatesError) throw new Error(`Error fetching saved templates: ${savedTemplatesError.message}`);

            const savedTemplateIds = savedTemplatesData.map((template: SavedTemplate) => template.template_id);

            const { data: websiteTemplates, error: websiteTemplatesError } = await supabase
                .from("website_templates")
                .select("id, title, description, author, type, category, created_at, repo_url, dl_url, banner_url")
                .in("id", savedTemplateIds);

            if (websiteTemplatesError) throw new Error(`Error fetching website templates: ${websiteTemplatesError.message}`);

            const { data: componentTemplates, error: componentTemplatesError } = await supabase
                .from("component_templates")
                .select("id, title, description, author, type, category, created_at, repo_url, dl_url, banner_url")
                .in("id", savedTemplateIds);

            if (componentTemplatesError) throw new Error(`Error fetching component templates: ${componentTemplatesError.message}`);

            const combinedSavedTemplates: Template[] = [
                ...websiteTemplates.map((template: Template) => ({
                    ...template,
                    type: "website",
                })),
                ...componentTemplates.map((template: Template) => ({
                    ...template,
                    type: "component",
                })),
            ];

            setSavedTemplates(combinedSavedTemplates);

        } catch (error) {
            console.error("Saved templates fetching error:", error);
        }
    };

    useEffect(() => {
        if (user) {
            fetchProfileData();
            fetchLastViewedTemplates();
            fetchSavedTemplates();
        }
    }, [user]);

    if (loading) {
        return <div className="text-center py-20 text-gray-600 font-bold">Loading...</div>;
    }

    return (
        <div className="container mx-auto px-6 py-16">
            <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">My Area</h1>

            <div className="bg-white p-8 rounded-xl shadow-md flex gap-8 items-center mb-16">
                <Image src={profile?.avatar_url || "/placeholder.svg"} alt="Profile Avatar" width={80} height={80} className="rounded-full" />
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">{user?.email}</h2>
                    <p className="text-gray-600">Welcome back! Let’s build something amazing.</p>

                    <button
                        onClick={() => {
                            setShowProfileModal(true);
                        }}
                        className="text-indigo-600 font-semibold hover:underline mt-2 block"
                    >
                        Edit Profile
                    </button>
                </div>
            </div>

            {showProfileModal && <ProfileModal onClose={() => setShowProfileModal(false)} />}

            <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-6">Profile Information</h2>
                <div className="bg-gray-50 p-6 rounded-xl shadow-md grid gap-6 md:grid-cols-2">
                    <div className="flex items-center space-x-4">
                        <User className="text-indigo-600 w-6 h-6" />
                        <div>
                            <p className="text-sm text-gray-500">Nickname</p>
                            <p className="text-lg font-semibold">{profile?.nickname || "N/A"}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Calendar className="text-indigo-600 w-6 h-6" />
                        <div>
                            <p className="text-sm text-gray-500">Date of Birth</p>
                            <p className="text-lg font-semibold">{profile?.date_of_birth || "N/A"}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Globe className="text-indigo-600 w-6 h-6" />
                        <div>
                            <p className="text-sm text-gray-500">Website</p>
                            <Link
                                href={profile?.website && !profile?.website.startsWith('http') ? `https://${profile.website}` : profile?.website || "#"}
                                target="_blank"
                                className="text-lg font-semibold text-indigo-600 hover:underline"
                            >
                                {profile?.website || "N/A"}
                            </Link>

                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Edit3 className="text-indigo-600 w-6 h-6" />
                        <div>
                            <p className="text-sm text-gray-500">Bio</p>
                            <p className="text-lg font-semibold">{profile?.bio || "N/A"}</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-6">Last Viewed Templates</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {lastViewedTemplates.map((template) => (
                        <div
                            key={template.id}
                            className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1"
                        >
                            <Image src={template.banner_url || "/placeholder.svg"} alt={template.title} width={120} height={80} className="rounded mb-4" />
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
                            <Image src={template.banner_url || "/placeholder.svg"} alt={template.title} width={120} height={80} className="rounded mb-4" />
                            <h3 className="text-lg font-semibold">{template.title}</h3>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-3xl font-semibold mb-6">Profile Stats</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="bg-indigo-600 text-white p-8 rounded-xl text-center">
                        <h3 className="text-2xl font-bold">{lastViewedTemplates.length}</h3>
                        <p>Viewed Templates</p>
                    </div>
                    <div className="bg-indigo-600 text-white p-8 rounded-xl text-center">
                        <h3 className="text-2xl font-bold">{savedTemplates.length}</h3>
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