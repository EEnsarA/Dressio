import React from 'react'
import Link from 'next/link'

function ProductCard({ product, large = false }) {
    return (
        <Link href={`/product/${product.id}`}>
            <div className={`group border border-[#d8d6c8] rounded-lg p-5 shadow hover:shadow-xl hover:border-[#b3af9b] transition overflow-hidden cursor-pointer flex flex-col justify-center ${large ? 'h-[745px]' : 'h-90'}`}>
                <div className={`overflow-hidden ${large ? "h-96" : "h-48"} flex items-center justify-center`}>
                    <img
                        src={product.image}
                        alt={product.title}
                        className="object-contain h-full group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
                <h2 className="font-semibold font-mono text-lg mt-8 line-clamp-2">{product.title}</h2>
                <p className=" text-2xl font-bold text-gray-700 mb-4 mt-3">${product.price}</p>
            </div>
        </Link>
    )
}

export default ProductCard