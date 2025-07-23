
'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { FaShoppingCart } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import Badge from '@mui/material/Badge';
import Image from 'next/image';
import Login from './Login';
import { TbLogout } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, logoutUser, setToken } from '../store/authSlice';
import { clearFavorites } from '../store/favSlice';


function Navbar() {

    const dispatch = useDispatch();
    const { isLogged, user } = useSelector((store) => store.auth);

    const { items } = useSelector((state) => state.cart);
    const totalItems = items.reduce((acc, item) => acc + item.count, 0);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        const user = sessionStorage.getItem("user");
        if (token && user) {
            dispatch(setToken(token))
            dispatch(loginUser(user))
        }
        setIsClient(true);
    }, [])

    return (
        <nav className="bg-[#d8d6c8] p-4 text-black h-20 flex items-center justify-between px-10 shadow-md">
            <div className='min-w-64'>
                <Link href="/">
                    <div className=' w-[140px] h-6 relative'>
                        <Image
                            src="/appLogo.png"
                            alt="Logo"
                            fill
                            objectFit='cover'
                        />
                    </div>
                </Link>
            </div>
            <div className='flex items-center space-x-8 mr-6 w-full justify-between'>
                <div className='flex space-x-8'>
                    <Link className='font-geist text-[14px] font-semibold' href="/allProducts">Tüm Ürünler</Link>
                    <Link className='font-geist text-[14px] font-semibold' href="/allProducts">Markalar</Link>
                    <Link className='font-geist text-[14px] font-semibold' href="/allProducts">İndirimler</Link>
                    <Link className='font-geist text-[14px] font-semibold' href="/favorites">Favorilerim</Link>
                    <Link className='font-geist text-[14px] font-semibold' href="/about">Hakkımızda</Link>
                    <Link className='font-geist text-[14px] font-semibold' href="/contact">İletişim</Link>
                </div>
                <div className='space-x-8 flex flex-row mr-5 items-center'>
                    <div className='mt-0.5'>
                        <Badge
                            badgeContent={isClient ? totalItems : 0}
                            color='primary'
                        >
                            <Link href="/cart"><FaShoppingCart color='black' size={22} /></Link>
                        </Badge>
                    </div>
                    <Link href="/favorites">
                        <MdFavorite size={22} className='cursor-pointer' />
                    </Link>
                    {isLogged ?
                        <>
                            <button className='cursor-pointer' onClick={() => { dispatch(logoutUser()), dispatch(clearFavorites()) }}><TbLogout size={22} /></button>
                        </>
                        :

                        <Login />
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar   