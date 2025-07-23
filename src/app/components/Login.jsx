"use client";
import { Dialog, Transition, Label, Field } from "@headlessui/react";
import Image from "next/image";
import { Fragment, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { login, registerUser } from "../services/api";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { IoIosClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { loginUser, setToken } from "../store/authSlice";


const schema = z.object({
    username: z.string().min(3, "Kullanıcı adı en az 3 karakter olmalı"),
    password: z.string().min(4, "Şifre en az 4 karakter olmalı"),
});

const registerSchema = schema.extend({
    email: z.email("Geçerli bir e-posta adresi giriniz"),
})


export default function Login() {
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState(null);
    const [mode, setMode] = useState("login");

    const router = useRouter();

    const dispatch = useDispatch();


    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(mode === "login" ? schema : registerSchema),
    });

    const onSubmit = async (data) => {
        try {
            if (mode == "login") {
                console.log(data);
                const { token } = await login(data);
                console.log(token)
                dispatch(setToken(token));
                dispatch(loginUser(data));
            }
            else {
                await registerUser(data);
            }
            setError(null);
            setIsOpen(false);
            router.push("/");
            router.refresh();
            reset();

        } catch (err) {
            setError("Kullanıcı adı veya şifre hatalı")
        }
    }


    return (
        <>
            <button onClick={() => setIsOpen(true)} className='cursor-pointer' ><FaUserCircle size={20} /></button>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div className="fixed inset-0 bg-black/30" />
                    </Transition.Child>

                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <Dialog.Panel className="bg-[#eeede5] rounded-lg p-6  w-[400px] h-auto min-h-[500px] max-w-sm shadow-lg">
                            <div className="flex justify-end ml-9 mb-4">
                                <button onClick={() => setIsOpen(false)}>
                                    <IoIosClose size={28} className="text-black hover:text-gray-600 cursor-pointer" />
                                </button>
                            </div>
                            <div className=' w-full h-7 relative p-4 mb-5'>
                                <Image
                                    src="/appLogo.png"
                                    alt="Logo"
                                    fill
                                    objectFit='cover'
                                />
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Field className="mt-10">
                                    <Label className="text-black font-mono">Kullanıcı Adı</Label>
                                    <input
                                        {...register("username")}
                                        type="text"
                                        placeholder="Kullanıcı Adı"
                                        className="mt-3 w-full border p-2 rounded"
                                    />
                                    {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                                </Field>
                                {mode == "register" &&
                                    <Field className="mt-2">
                                        <Label className="text-black font-mono">Email</Label>
                                        <input
                                            {...register("email")}
                                            type="email"
                                            placeholder="E-mail"
                                            className="mt-3 w-full border p-2 rounded"
                                        />

                                        {errors.email &&
                                            <p className="text-red-500 text-sm">{errors.email.message}</p>
                                        }
                                    </Field>
                                }
                                <Field className="mt-2">
                                    <Label className=" text-black font-mono">Şifre</Label>
                                    <input
                                        {...register("password")}
                                        type="password"
                                        placeholder="Şifre"
                                        className="mt-3 w-full border p-2 rounded"
                                    />
                                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                                </Field>
                                <button type="submit" className="w-full bg-[#d8d6c8] font-mono text-black mt-4 p-2 rounded font-bold cursor-pointer hover:bg-[#b9b7ab]">
                                    {mode == "login" ? "Oturum Aç" : "Kayıt Ol"}
                                </button>
                                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                            </form>
                            {mode == "login" ?
                                <button className=" mt-4 font-mono font-bold cursor-pointer text-black hover:text-gray-700" onClick={() => { setMode("register"), setError(null), reset() }} >Henüz Üye Olmadın mı ? Kaydol</button>
                                :
                                <button className=" mt-4 font-mono font-bold cursor-pointer text-black hover:text-gray-700" onClick={() => { setMode("login"), setError(null), reset() }} >Zaten Üye misin ? Giriş Yap</button>
                            }
                        </Dialog.Panel>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}