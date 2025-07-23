import ProductCardSkeleton from "../components/ProductCardSkeleton";

export default function Loading() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
            {[...Array(8)].map((_, i) => (
                <ProductCardSkeleton key={i} />
            ))}
        </div>
    );
}
