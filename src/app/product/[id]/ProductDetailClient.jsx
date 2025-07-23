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
            <div className="flex flex-col md:grid md:grid-cols-2 gap-6 mt-20 p-5">
                {/* Görsel */}
                <div className="p-2 md:p-6">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-64 md:h-96 object-contain"
                    />
                </div>

                {/* Bilgiler */}
                <div className="flex flex-col justify-between gap-4 mt-4 md:mt-0">
                    <div>
                        <h1 className="text-xl md:text-4xl font-bold mb-2">{product.title}</h1>
                        <p className="text-lg md:text-3xl font-bold text-cyan-700 mb-4">{product.price}$</p>
                        <p className="text-sm md:text-base text-gray-600">{product.description}</p>
                    </div>

                    <div className="flex flex-col gap-4 mt-2 lg:mb-10">
                        <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-3">

                            <div>
                                <div className="block md:hidden">
                                    <Rating size="small" value={totalRating} readOnly />
                                </div>
                                <div className="hidden md:block">
                                    <Rating size="large" value={totalRating} readOnly />
                                </div>
                            </div>


                            <div className="flex items-center gap-2">
                                <p className="text-sm lg:text-lg font-semibold">Adet -  {count}</p>
                                <div className="flex flex-col ml-2">
                                    <FaCaretUp onClick={increaseCount} className="cursor-pointer text-base" />
                                    <FaCaretDown onClick={decreaseCount} className="cursor-pointer text-base" />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <ButtonH
                                className="rounded lg:w-120 h-10 bg-cyan-600 px-4 py-2 text-sm md:text-md font-mono font-semibold text-white hover:bg-cyan-700 w-full sm:w-auto"
                                onClick={addCart}
                            >
                                Sepete Ekle
                            </ButtonH>

                            <Button
                                variant="outlined"
                                color="error"
                                size="small"
                                onClick={addFav}
                                className="w-full sm:w-auto"
                            >
                                {fav ? <MdFavorite size={20} /> : <MdFavoriteBorder size={20} />}
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