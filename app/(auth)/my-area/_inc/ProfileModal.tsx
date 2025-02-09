"use client"
import { useUser } from "@/context/UserContext";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { motion } from "framer-motion";

interface Profile {
    nickname: string;
    date_of_birth: string;
    website: string;
    bio: string;
    avatar_url: string;
}

interface ProfileModalProps {
    onClose: () => void;
}

export default function Profile({ onClose }: ProfileModalProps) {
    const supabase = createClient();
    const { user, loading } = useUser();
    const [profile, setProfile] = useState<Profile>({
        nickname: "",
        date_of_birth: "",
        website: "",
        bio: "",
        avatar_url: "",
    });
    const [avatarPreview, setAvatarPreview] = useState("/placeholder.svg");
    
    useEffect(() => {
        if (user) {
            fetchUserProfile();
        }
    }, [user]);

    const fetchUserProfile = async () => {
        const { data, error } = await supabase
            .from("user_profile")
            .select("nickname, date_of_birth, website, bio, avatar_url")
            .eq("id", user?.id)
            .single();

        if (error) {
            console.error(error);
            return;
        }

        if (data) {
            setProfile(data);
            if (data.avatar_url) {
                setAvatarPreview(data.avatar_url);
            }
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    const handleAvatarChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const filePath = `${user?.id}/${file.name}`;
        const { data, error } = await supabase.storage
            .from("avatars")
            .upload(filePath, file, { upsert: true });

        if (error) {
            console.error(error);
            return;
        }

        if (data) {
            const url = supabase.storage.from("avatars").getPublicUrl(filePath).data?.publicUrl;
            if (url) {
                setProfile((prev) => ({ ...prev, avatar_url: url }));
                setAvatarPreview(url);
            }
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const { data, error } = await supabase
            .from("user_profile")
            .upsert(
                {
                    id: user?.id,
                    ...profile,
                    updated_at: new Date(),
                },
                { onConflict: "id" }
            );

        if (error) {
            console.error("Error updating or inserting profile:", error);
            return;
        }

        console.log("Profile updated or inserted successfully:", data);
        onClose(); 
        window.location.reload();
    };

    if (loading) {
        return <div className="text-center py-20 text-gray-600 font-bold">Loading...</div>;
    }

    return (
        <>
            <motion.div
                className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className="bg-white p-8 rounded-xl shadow-md w-11/12 max-w-2xl"
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "100%", opacity: 0 }}
                    transition={{ type: "spring", stiffness: 100 }}
                >
                    <h2 className="text-3xl font-bold mb-6 text-center">Edit Profile</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="flex items-center mb-6">
                            <Image
                                src={avatarPreview}
                                alt="Avatar Preview"
                                width={80}
                                height={80}
                                className="rounded-full mr-4"
                            />
                            <input type="file" onChange={handleAvatarChange} className="file-input" />
                        </div>

                        <div className="mb-6">
                            <label className="block font-semibold mb-2">Nickname</label>
                            <input
                                type="text"
                                name="nickname"
                                value={profile.nickname}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block font-semibold mb-2">Date of Birth</label>
                            <input
                                type="date"
                                name="date_of_birth"
                                value={profile.date_of_birth}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block font-semibold mb-2">Website</label>
                            <input
                                type="text"
                                name="website"
                                value={profile.website}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block font-semibold mb-2">Bio</label>
                            <textarea
                                name="bio"
                                value={profile.bio}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                rows={4}
                            />
                        </div>

                        <div className="flex justify-between">
                            <button
                                type="button"
                                onClick={onClose} // Close modal on "Cancel"
                                className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400 transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-indigo-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </>
    );
}
