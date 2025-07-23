'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { FaShoppingCart } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { HiMenu, HiX } from "react-icons/hi";
import Badge from '@mui/material/Badge';
import Image from 'next/image';
import Login from './Login';
import { TbLogout } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, logoutUser, setToken } from '../store/authSlice';
import { clearFavorites } from '../store/favSlice';

function Navbar() {
    const dispatch = useDispatch();
    const { isLogged } = useSelector((store) => store.auth);
    const { items } = useSelector((state) => state.cart);
    const totalItems = items.reduce((acc, item) => acc + item.count, 0);
    const [isClient, setIsClient] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        const user = sessionStorage.getItem("user");
        if (token && user) {
            dispatch(setToken(token))
            dispatch(loginUser(user))
        }
        setIsClient(true);
    }, []);

    const navLinks = [
        { href: "/allProducts", label: "Tüm Ürünler" },
        { href: "/allProducts", label: "Markalar" },
        { href: "/allProducts", label: "İndirimler" },
        { href: "/favorites", label: "Favorilerim" },
        { href: "/about", label: "Hakkımızda" },
        { href: "/contact", label: "İletişim" },
    ];

    return (
        <nav className="bg-[#d8d6c8] p-4 text-black h-20 flex items-center justify-between px-6 shadow-md relative z-50">
            {/* Logo */}
            <div className='min-w-40'>
                <Link href="/">
                    <div className='w-[140px] h-6 relative'>
                        <Image
                            src="/appLogo.png"
                            alt="Logo"
                            fill
                            objectFit='cover'
                        />
                    </div>
                </Link>
            </div>

            <div className="block xl:hidden">
                <button onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <HiX size={26} /> : <HiMenu size={26} />}
                </button>
            </div>


            <div className={`
                ${menuOpen ? 'flex' : 'hidden'} 
                flex-col space-y-4 px-6 py-4 absolute top-20 left-0 w-full bg-[#d8d6c8]
                xl:space-y-0 xl:static xl:flex xl:flex-row xl:space-x-8 xl:py-0 xl:px-0
            `}>
                {navLinks.map(({ href, label }) => (
                    <Link
                        key={label}
                        href={href}
                        className='font-geist text-[14px] font-semibold'
                        onClick={() => setMenuOpen(false)}
                    >
                        {label}
                    </Link>
                ))}
            </div>


            <div className='space-x-5 flex flex-row items-center ml-4'>
                <Badge badgeContent={isClient ? totalItems : 0} color='primary'>
                    <Link href="/cart"><FaShoppingCart color='black' size={22} /></Link>
                </Badge>
                <Link href="/favorites"><MdFavorite size={22} /></Link>
                {isLogged ? (
                    <button onClick={() => { dispatch(logoutUser()); dispatch(clearFavorites()); }}>
                        <TbLogout size={22} />
                    </button>
                ) : (
                    <Login />
                )}
            </div>
        </nav>
    );
}

export default Navbar;
