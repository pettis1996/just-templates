"use client";
import React, { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddComponent = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [category, setCategory] = useState("");
    const [repoUrl, setRepoUrl] = useState("");
    const [dlUrl, setDlUrl] = useState("");
    const [bannerUrl, setBannerUrl] = useState("");
    const [author, setAuthor] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const supabase = createClient();
        const { data, error } = await supabase
            .from("component_templates")
            .insert([{ title, description, type, category, repo_url: repoUrl, dl_url: dlUrl, banner_url: bannerUrl, author }]);
        
        console.log(data)

        if (error) {
            toast.error("Error adding component: " + error.message);
        } else {
            toast.success("Component added successfully!");
            setTitle("");
            setDescription("");
            setType("");
            setCategory("");
            setRepoUrl("");
            setDlUrl("");
            setBannerUrl("");
            setAuthor("");
        }
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">Add New Component</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-gray-700 mb-2">Component Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">Component Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        required
                    ></textarea>
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">Type</label>
                    <input
                        type="text"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">Category</label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">Repo URL</label>
                    <input
                        type="url"
                        value={repoUrl}
                        onChange={(e) => setRepoUrl(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">Download URL</label>
                    <input
                        type="url"
                        value={dlUrl}
                        onChange={(e) => setDlUrl(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">Banner URL</label>
                    <input
                        type="url"
                        value={bannerUrl}
                        onChange={(e) => setBannerUrl(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">Author</label>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200"
                >
                    Add Component
                </button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default AddComponent;