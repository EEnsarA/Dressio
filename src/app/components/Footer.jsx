import React from 'react'
import { FaGithub } from "react-icons/fa6";

function Footer() {
    return (
        <div className="bg-[#1d1d1d]  text-white text-center flex flex-col justify-center items-center p-4 mt-8 h-40">
            <div>
                <span className='font-semibold font-mono'>© 2025 Dressio - Tüm Hakları Saklıdır</span>
            </div>
            <div className="flex items-center  justify-center gap-2 mt-5">
                <a href="https://github.com/EEnsarA" target='_blank' className="text-2xl" rel="noopener noreferrer">
                    <FaGithub />
                </a>

                <span className='font-mono'>- EEnsarA</span>
            </div>
        </div>
    )
}

export default Footer
