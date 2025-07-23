"use client"
import { useSelector } from "react-redux"
import ProductCard from "../components/ProductCard";

export default function FavPage() {
    const favItems = useSelector((state) => state.fav.favItems);
    console.log(favItems);
    return (
        <>
            <h2 className="text-2xl font-bold mb-4  mt-4 font-mono">Favorilerim</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-2">
                {favItems?.map((fav) => (
                    <ProductCard key={fav.product.id} product={fav.product} />
                ))}

            </div>
        </>
    )
}