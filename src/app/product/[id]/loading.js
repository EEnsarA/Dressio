export default function Loading() {
    return (
        <div className="p-8">
            <div className="animate-pulse space-y-4">
                <div className="h-96 bg-gray-300 rounded-md"></div>
                <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
        </div>
    );
}
