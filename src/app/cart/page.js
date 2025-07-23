'use client';
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, decreaseItem } from "../store/cartSlice";
import { useEffect, useState } from "react";

import Link from "next/link";

export default function CartPage() {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const [mounted, setMounted] = useState(false);

    const total = cartItems.reduce((acc, item) => acc + item.product.price * item.count, 0);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="flex flex-col lg:flex-row p-10 gap-6">

            <div className="lg:w-2/3 w-full space-y-6">
                <h1 className="text-3xl font-bold mb-4 font-mono">Sepetim</h1>

                {cartItems.length === 0 ? (
                    <p className="text-gray-600 text-md sm:text-lg font-mono font-semibold text-center">Sepetiniz boş.</p>
                ) : (
                    cartItems.map(({ product, count }) => (
                        <div key={product.id} className="flex flex-col sm:flex-row border p-4 rounded-md shadow-sm bg-white gap-4 sm:gap-0 sm:justify-between sm:items-center">
                            <Link href={`/product/${product.id}`} className="flex gap-4">
                                <img src={product.image} className="w-20 h-20 sm:w-24 sm:h-24 object-contain" alt={product.title} />
                                <div className="space-y-1 w-full">
                                    <h2 className="text-lg sm:text-base font-semibold line-clamp-1 sm:line-clamp-none">{product.title}</h2>
                                    <p className="text-sm text-gray-600">Adet: {count}</p>
                                    <p className="text-lg sm:text-xl font-bold text-cyan-700">${product.price.toFixed(2)}</p>
                                </div>
                            </Link>

                            <div className="flex gap-2  lg:w-100 sm:w-full justify-end items-end sm:self-center">
                                <button
                                    onClick={() => dispatch(decreaseItem(product.id))}
                                    className="bg-[#d8d6c8] hover:bg-[#aeac98] px-2 py-1 rounded text-xs sm:text-sm sm:w-20 lg:w-20"
                                >
                                    -
                                </button>
                                <button
                                    onClick={() => dispatch(removeFromCart(product.id))}
                                    className="bg-red-700 hover:bg-red-600 text-white px-3 py-1 rounded text-xs sm:text-sm lg:w-40"
                                >
                                    Kaldır
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>


            <div className="lg:w-1/3 w-full bg-[#f8f8f8] p-4 sm:p-6 rounded-md shadow-md h-fit">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 border-b pb-2 font-mono">Sipariş Özeti</h2>

                <div className="space-y-2 text-sm sm:text-base">
                    {cartItems.map(({ product, count }) => (
                        <div key={product.id} className="flex justify-between text-gray-700">
                            <span className="line-clamp-1">{product.title}</span>
                            <span>{count} adet</span>
                        </div>
                    ))}
                </div>

                <div className="border-t mt-4 pt-4">
                    <p className="text-base sm:text-lg font-bold flex justify-between">
                        <span>Toplam:</span>
                        <span className="text-cyan-700">${total.toFixed(2)}</span>
                    </p>
                </div>

                <button className="mt-6 w-full bg-cyan-700 hover:bg-cyan-800 text-white font-bold py-2 px-4 rounded text-sm sm:text-base transition cursor-pointer">
                    Satın Al
                </button>
            </div>
        </div>
    );
}