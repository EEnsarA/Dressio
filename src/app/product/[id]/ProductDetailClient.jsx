'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from "@/app/store/cartSlice";
import { Button as ButtonH } from '@headlessui/react'
import Button from '@mui/material/Button';
import { Fragment } from "react";
import { Transition } from "@headlessui/react";
import { FaCirclePlus } from "react-icons/fa6";
import { FaCircleMinus } from "react-icons/fa6";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import Rating from '@mui/material/Rating';
import { FaCaretUp } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa6";
import { addFavorites, removeFavorites } from '@/app/store/favSlice';


function ProductDetailClient({ product }) {

    const dispatch = useDispatch();
    const router = useRouter();
    const [count, setCount] = useState(1);
    const [fav, setFav] = useState(false);
    const [totalRating, setTotalRating] = useState(5);

    const favItems = useSelector((state) => state.fav.favItems);
    useEffect(() => {
        const isInFav = favItems.some((item) => item.product.id === product.id);
        setFav(isInFav);
    }, [favItems, product.id])

    const fakeReviews = [
        {
            name: "Ahmet Y.",
            rating: 4,
            comment: "Ürün beklediğimden daha kaliteli, kargo da hızlıydı."
        },
        {
            name: "Zeynep K.",
            rating: 5,
            comment: "Harika bir ürün, çok memnun kaldım! Tavsiye ederim."
        },
        {
            name: "Mehmet T.",
            rating: 3,
            comment: "Fena değil ama fiyatına göre daha iyi olabilirdi."
        }
    ];

    useEffect(() => {
        const sum = fakeReviews.reduce((acc, review) => acc + review.rating, 0);
        setTotalRating(sum / fakeReviews.length);
        // setTotalRating(fakeReviews.map((r) => {
        //     var sumR = 0;
        //     sumR += r.rating;
        //     setTotalRating(sumR / fakeReviews.length);
        // }))
    }, [])

    const addCart = () => {
        dispatch(addToCart({ product, count }));
        router.push("/cart");
    }

    const addFav = () => {
        if (fav == false) {
            dispatch(addFavorites({ product }));
            setFav(true);
        }
        else {
            dispatch(removeFavorites(product.id))
            setFav(false);

        }
    }
    const increaseCount = () => {
        setCount(count + 1);
    }
    const decreaseCount = () => {
        if (count > 1)
            setCount(count - 1);
    }


    return (
        <>
            <div className="grid grid-cols-2 gap-4 mt-20 p-5">
                <div className="p-6 max-w-2xl mx-auto ">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-96 object-contain mb-6"
                    />
                </div>
                <div>

                    <h1 className="text-4xl font-bold mb-2">{product.title}</h1>
                    <p className="text-3xl font-bold text-cyan-700 mb-4 mt-4">{product.price}$</p>
                    <p className="text-gray-600">{product.description}</p>
                    <div className="mt-6 flex items-center gap-3 flex-col">
                        <div className='flex flex-row w-full justify-between mt-5'>
                            <Rating size='large' value={totalRating} defaultValue={5} readOnly />
                            <div className='flex flex-row w-full justify-end items-center'>
                                <p className='text-2x1 font-semibold'>Adet - {count}</p>
                                <div className='ml-6'>
                                    <FaCaretUp onClick={increaseCount} className='cursor-pointer' />
                                    <FaCaretDown onClick={decreaseCount} className='cursor-pointer' />
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-row w-full justify-between mt-5'>
                            <ButtonH className="rounded w-120 h-10 bg-cyan-600 px-4 py-2 text-md font-mono font-semibold text-white data-active:bg-cyan-700 data-hover:bg-cyan-700 cursor-pointer" onClick={addCart}>Sepete Ekle</ButtonH>
                            <Button variant="outlined" color='error' size="medium" onClick={addFav}>
                                {fav ?
                                    <MdFavorite size={24} />

                                    : <MdFavoriteBorder size={24} />
                                }
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full mx-auto mt-20">
                <h2 className="text-2xl font-bold mb-4 font-mono">Yorumlar</h2>
                <div className="space-y-6">

                    {fakeReviews.map((review, index) => (
                        <div key={index} className="border border-gray-200 p-4 rounded-lg shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-semibold">{review.name}</span>
                                <Rating value={review.rating} readOnly />
                            </div>
                            <p className="text-gray-700">{review.comment}</p>
                        </div>
                    ))}

                </div>
            </div>
        </>
    )
}

export default ProductDetailClient