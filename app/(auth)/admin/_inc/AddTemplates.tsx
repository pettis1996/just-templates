import React from "react";

const AddTemplates = () => {
    return (
        <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">Add New Template</h2>
            <form className="space-y-6">
                <div>
                    <label className="block text-gray-700 mb-2">Template Title</label>
                    <input
                        type="text"
                        placeholder="Enter template title"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">Template Description</label>
                    <textarea
                        placeholder="Enter template description"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    ></textarea>
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">Upload Image</label>
                    <input type="file" className="w-full p-3 border border-gray-300 rounded-lg" />
                </div>
                <button
                    type="submit"
                    className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200"
                >
                    Add Template
                </button>
            </form>
        </div>
    );
};

export default AddTemplates;