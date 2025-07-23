'use client';
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, decreaseItem } from "../store/cartSlice";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";

export default function CartPage() {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    const total = cartItems.reduce((acc, item) => acc + item.product.price * item.count, 0);

    return (
        <div className="flex flex-col lg:flex-row p-10 gap-6">
            {/* Ürün Listesi (8 kolon) */}
            <div className="lg:w-2/3 w-full space-y-6">
                <h1 className="text-3xl font-bold mb-4 font-mono">Sepetim</h1>

                {cartItems.length === 0 ? (
                    <p className="text-gray-600 text-lg font-mono font-semibold">Sepetiniz boş.</p>
                ) : (
                    cartItems.map(({ product, count }) => (
                        <div key={product.id} className="flex border p-4 rounded-md shadow-sm justify-between items-center bg-white">
                            <Link href={`/product/${product.id}`}>
                                <div className="flex items-center gap-4">
                                    <img src={product.image} className="w-24 h-24 object-contain" alt={product.title} />
                                    <div className="space-y-1">
                                        <h2 className="text-lg font-semibold line-clamp-1">{product.title}</h2>
                                        <p className="text-gray-600 text-sm">Adet: {count}</p>
                                        <p className="text-xl font-bold text-cyan-700">${product.price.toFixed(2)}</p>
                                    </div>
                                </div>
                            </Link>

                            <div className="flex gap-2 items-center">
                                <button
                                    onClick={() => dispatch(decreaseItem(product.id))}
                                    className="bg-[#d8d6c8] hover:bg-[#aeac98] px-3 py-1 rounded text-sm cursor-pointer"
                                >
                                    -
                                </button>
                                <button
                                    onClick={() => dispatch(removeFromCart(product.id))}
                                    className="bg-red-700 hover:bg-red-600 text-white px-3 py-1 rounded text-sm cursor-pointer"
                                >
                                    Kaldır
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Özet ve Tutar (4 kolon) */}
            <div className="lg:w-1/3 w-full bg-[#f8f8f8] p-6 rounded-md shadow-md h-fit">
                <h2 className="text-2xl font-bold mb-4 border-b pb-2 font-mono">Sipariş Özeti</h2>

                <div className="space-y-2">
                    {cartItems.map(({ product, count }) => (
                        <div key={product.id} className="flex justify-between text-sm text-gray-700">
                            <span className="line-clamp-1">{product.title}</span>
                            <span>{count} adet</span>
                        </div>
                    ))}
                </div>

                <div className="border-t mt-4 pt-4">
                    <p className="text-lg font-bold flex justify-between">
                        <span>Toplam:</span>
                        <span className="text-cyan-700">${total.toFixed(2)}</span>
                    </p>
                </div>

                <button className="mt-6 w-full bg-cyan-700 hover:bg-cyan-800 text-white font-bold py-2 px-4 rounded transition cursor-pointer">
                    Satın Al
                </button>
            </div>
        </div>
    );
}
