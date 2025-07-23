"use client";
import { FaGithub } from "react-icons/fa6";

export default function About() {
    return (
        <div className="max-w-3xl mx-auto p-8 mt-16 text-center">
            <h1 className="text-4xl font-bold mb-6">Hakkımızda</h1>
            <p className="text-lg text-gray-700 mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel
                facilisis mauris. Donec a ipsum et nunc efficitur malesuada. Etiam at
                sapien vel lorem tempor tincidunt. Aenean sagittis lacus sit amet elit
                iaculis, sed facilisis nibh congue. Fusce dignissim a magna eget
                fermentum.
            </p>
            <p className="text-lg text-gray-700 mb-12">
                Proin nec augue nec magna malesuada suscipit. Duis id orci sapien. Sed
                at ligula at nulla eleifend pulvinar non vel libero. Suspendisse
                pharetra metus sed suscipit pretium.
            </p>

            <div className="flex justify-center items-center gap-2">
                <a
                    href="https://github.com/EEnsarA"
                    target="_blank"
                    className="text-2xl"
                    rel="noopener noreferrer"
                >
                    <FaGithub />
                </a>
                <span className="font-mono">- EEnsarA</span>
            </div>
        </div>
    );
}