'use client';

import React from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import ProductCard from './ProductCard';

const animation = { duration: 12000, easing: (t) => t };

export default function ProductSlider({ products }) {
    const [sliderRef, instanceRef] = useKeenSlider(
        {
            loop: true,
            renderMode: 'performance',
            drag: false,
            slides: {
                perView: 4,
                spacing: 20,
            },
            breakpoints: {
                '(max-width: 1024px)': {
                    slides: { perView: 2, spacing: 16 },
                },
                '(max-width: 640px)': {
                    slides: { perView: 1, spacing: 12 },
                },
            },
            created(s) {
                s.moveToIdx(3, true, animation);
            },
            updated(s) {
                s.moveToIdx(s.track.details.abs + 5, true, animation);
            },
            animationEnded(s) {
                s.moveToIdx(s.track.details.abs + 5, true, animation);
            },
        }
    );

    return (
        <div className="overflow-hidden w-full max-w-[1800px] mx-auto px-4 ">
            <div ref={sliderRef} className="keen-slider">
                {products.map((product) => (
                    <div key={product.id} className="keen-slider__slide">
                        <div className="mx-2">
                            <ProductCard product={product} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

