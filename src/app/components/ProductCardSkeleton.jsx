import React from 'react'

function ProductCardSkeleton() {
    return (
        <div className="animate-pulse border rounded-lg p-4 shadow-md flex flex-col gap-4">
            <div className="bg-gray-300 h-40 w-full rounded" />
            <div className="h-4 bg-gray-300 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-6 bg-gray-300 rounded w-full mt-2" />
        </div>
    )
}

export default ProductCardSkeleton