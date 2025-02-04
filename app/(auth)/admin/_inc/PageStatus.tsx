export default function PageStatus() {
    return (
        <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">Page Status</h2>
            <p className="text-lg text-gray-700 mb-2">Your page is currently <span className="font-bold text-green-500">active</span>.</p>
            <p className="text-gray-500">No maintenance scheduled.</p>
        </div>
    );
};