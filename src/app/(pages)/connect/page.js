"use client"

import MainButton from "../../components/MainButton";
import Header from "../../layouts/Header";
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { FaCircleCheck } from "react-icons/fa6"
import { IoIosArrowForward } from "react-icons/io"

const Connect = () => {
    const [dataConnect, setDataConnect] = useState({
        tiktok: false,
        instagram: false,
        youtube: false,
    })

    const [isConnect, setisConnect] = useState(Object.values(dataConnect).some((value) => value === true))

    useEffect(() => {
        setisConnect(Object.values(dataConnect).some((value) => value === true))
    }, [dataConnect])

    const router = useRouter()

    const handleNavigation = (route) => {
        router.push(route)
    }

    return (
        <main className="w-full flex justify-center min-h-[100dvh]">
            {/* TITLE */}
            <title>Connect</title>

            {/* BACKGROUND */}
            <Image
                src="/svg/abstractBg1.svg"
                alt="backgroud-abstract"
                priority
                width="0"
                height="0"
                className="w-auto h-auto absolute top-0 left-0 z-10"
            ></Image>

            {/* CONTENT */}
            <section className="max-w-[1280px] w-full mx-[20px]">
                <Header />
                <div className="w-full flex flex-col justify-center items-center h-[85dvh]">
                    <div className="flex flex-col justify-center items-center text-center gap-1 mb-[46px] xl:mb-[54px]">
                        <h1 className="font-montagu_slab font-medium uppercase text-[24px] xl:text-[28px]">Connect your profile</h1>
                        <p className="font-medium opacity-60 max-w-[356px] text-[10px] xl:text-xs">
                            We will fetch Followings, Impressions/engagement, and likes from your profile to curate a roadmap for your growth.
                        </p>
                    </div>
                    <div className="flex flex-wrap w-full justify-center gap-[16px] mb-[72px] xl:gap-[40px] xl:mb-[120px]">
                        <div
                            className="cursor-pointer rounded-[24px] flex flex-col justify-between bg-gradient-to-b from-[#30393F] to-[#1A1A1E] px-[24px] pt-[24px] pb-[20px] shadow-lg shadow-[#000000] w-[150px] h-[150px] xl:w-[175px] xl:h-[175px]"
                            onClick={() => setDataConnect({ ...dataConnect, tiktok: true })}
                        >
                            <div className="flex w-full justify-between items-center">
                                <Image
                                    src="/svg/tiktokIcon.svg"
                                    alt="tiktok-icon"
                                    width="0"
                                    height="0"
                                    className="w-[32px] h-[32px] xl:w-[40px] xl:h-[40px] long-shadow"
                                />
                                <AnimatePresence>
                                    {dataConnect.tiktok && (
                                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                                            <FaCircleCheck className="text-[22px]" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex gap-1 items-center">
                                    <p className="text-base font-semibold">Tiktok</p>
                                    {!dataConnect.tiktok && <IoIosArrowForward className="text-[16px]" />}
                                </div>
                                <span className="text-[10px] xl:text-xs text-[#FBFBFB]">
                                    {!dataConnect.tiktok ? "Click to Connect" : "@username"}
                                </span>
                            </div>
                        </div>
                        <div
                            className="cursor-pointer rounded-[24px] flex flex-col justify-between instagram-card-gradient px-[24px] pt-[24px] pb-[20px] shadow-lg shadow-[#000000] w-[150px] h-[150px] xl:w-[175px] xl:h-[175px]"
                            onClick={() => setDataConnect({ ...dataConnect, instagram: true })}
                        >
                            <div className="flex w-full justify-between items-center">
                                <Image
                                    src="/svg/instagramIcon.svg"
                                    alt="instagram-icon"
                                    width="0"
                                    height="0"
                                    className="w-[32px] h-[32px] xl:w-[40px] xl:h-[40px] long-shadow"
                                />
                                <AnimatePresence>
                                    {dataConnect.instagram && (
                                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                                            <FaCircleCheck className="text-[22px]" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex gap-1 items-center">
                                    <p className="text-base font-semibold">Instagram</p>
                                    {!dataConnect.instagram && <IoIosArrowForward className="text-[16px]" />}
                                </div>
                                <span className="text-[10px] xl:text-xs text-[#FBFBFB]">
                                    {!dataConnect.instagram ? "Click to Connect" : "@username"}
                                </span>
                            </div>
                        </div>
                        <div
                            className="cursor-pointer rounded-[24px] flex flex-col justify-between bg-gradient-to-b from-[#F03B3E] to-[#CF0000] px-[24px] pt-[24px] pb-[20px] shadow-lg shadow-[#000000] w-[150px] h-[150px] xl:w-[175px] xl:h-[175px]"
                            onClick={() => setDataConnect({ ...dataConnect, youtube: true })}
                        >
                            <div className="flex w-full justify-between items-center">
                                <Image
                                    src="/svg/youtubeIcon.svg"
                                    alt="youtube-icon"
                                    width="0"
                                    height="0"
                                    className="w-[32px] h-[32px] xl:w-[40px] xl:h-[40px] long-shadow"
                                />
                                <AnimatePresence>
                                    {dataConnect.youtube && (
                                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                                            <FaCircleCheck className="text-[22px]" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex gap-1 items-center">
                                    <p className="text-base font-semibold">Youtube</p>
                                    {!dataConnect.youtube && <IoIosArrowForward className="text-[16px]" />}
                                </div>
                                <span className="text-[10px] xl:text-xs text-[#FBFBFB]">
                                    {!dataConnect.youtube ? "Click to Connect" : "Youtube Name"}
                                </span>
                            </div>
                        </div>
                    </div>
                    {isConnect ? (
                        <MainButton type="gradient" className="w-[172px]" content="NEXT" onClick={() => handleNavigation('/summary')} />
                    ) : (
                        <MainButton type="normal" className="w-[172px]" content="Skip" onClick={() => handleNavigation('/summary')} />
                    )}
                </div>
            </section>
        </main>
    )
}

export default Connect
