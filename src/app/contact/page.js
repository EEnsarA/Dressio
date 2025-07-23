"use client";
import { FaGithub } from "react-icons/fa6";


export default function Contact() {
    return (
        <div className="max-w-3xl mx-auto p-8 mt-16 text-center">
            <h1 className="text-4xl font-bold mb-6">İletişim</h1>
            <p className="text-lg text-gray-700 mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi gravida,
                velit in faucibus faucibus, neque nunc posuere mauris, nec commodo
                sapien eros nec ligula.
            </p>
            <p className="text-lg text-gray-700 mb-12">
                Bizimle iletişime geçmek için lütfen e-posta gönderin:{" "}
                <a href="mailto:info@example.com" className="text-cyan-700 underline">
                    info@example.com
                </a>
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