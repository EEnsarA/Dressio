'use client';
import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../services/api.js';
import ProductCard from '../components/ProductCard';
import ProductCardSkeleton from '../components/ProductCardSkeleton.jsx';

export default function AllProductsPage() {
    const [products, setProducts] = useState([]);
    const [filteredCategory, setFilteredCategory] = useState(null);
    const [sortOption, setSortOption] = useState("");
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const data = await getAllProducts();
            setProducts(data);
            const uniqueCategories = [...new Set(data.map((p) => p.category))];
            setCategories(uniqueCategories);
            setLoading(false);
        }
        fetchData();
    }, []);

    const sortOptions = [
        { value: "En düşük fiyat", label: "En düşük fiyat" },
        { value: "En yüksek fiyat", label: "En yüksek fiyat" },
        { value: "Trendler", label: "Trendler" },
        { value: "Yeni eklenenler", label: "Yeni eklenenler" },
    ];

    const sortedProducts = [...products]
        .filter((p) => !filteredCategory || p.category === filteredCategory)
        .sort((a, b) => {
            if (sortOption === "En düşük fiyat") return a.price - b.price;
            if (sortOption === "En yüksek fiyat") return b.price - a.price;
            return 0;
        });

    return (
        <div className="grid grid-cols-12 gap-6 p-4">

            <div className="col-span-12 md:col-span-3">
                <h2 className="text-xl font-bold mb-3">Kategoriler</h2>
                <ul className="space-y-2 mb-8">
                    <li
                        className={`cursor-pointer ${!filteredCategory ? "font-bold text-cyan-700" : ""}`}
                        onClick={() => setFilteredCategory(null)}
                    >
                        Tüm Ürünler
                    </li>
                    {categories.map((cat) => (
                        <li
                            key={cat}
                            className={`cursor-pointer ${filteredCategory === cat ? "font-bold text-cyan-700" : ""}`}
                            onClick={() => setFilteredCategory(cat)}
                        >
                            {cat}
                        </li>
                    ))}
                </ul>

                <h2 className="text-lg font-semibold mb-3">Sıralama</h2>
                <ul className="space-y-2">
                    {sortOptions.map((opt) => (
                        <li
                            key={opt.value}
                            className={`cursor-pointer ${sortOption === opt.value ? "font-bold text-cyan-700" : ""}`}
                            onClick={() => setSortOption(opt.value)}
                        >
                            {opt.label}
                        </li>
                    ))}
                </ul>
            </div>


            <div className="col-span-12 md:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading
                    ? [...Array(9)].map((_, i) => <ProductCardSkeleton key={i} />)
                    : sortedProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
            </div>
        </div>
    );
}
