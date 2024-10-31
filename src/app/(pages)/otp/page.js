"use client"

import Image from "next/image"
import Header from "../../layouts/Header"
import InputText from "../../components/InputText"
import Link from "next/link"
import MainButton from "../../components/MainButton"
import { useRouter } from "next/navigation"

const OTP = () => {
    const router = useRouter()

    const handleNavigation = (route) => {
        router.push(route)
    }
    return (
        <main className="w-full flex justify-between min-h-[100dvh]">
            {/* TITLE */}
            <title>OTP</title>

            {/* BACKGROUND */}
            <Image src="/svg/abstractBg1.svg" alt="background-abstract" width="0" height="0" className="w-auto h-auto absolute top-0 left-0"></Image>

            {/* CONTENT */}
            <section className="w-1/2 h-screen p-[18px] hidden xl:block">
                <div className="relative w-full h-full overflow-hidden">
                    <Image
                        src="/svg/safeVector.svg"
                        alt="safe-vector"
                        width="0"
                        height="0"
                        className="w-auto h-auto absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10"
                    ></Image>
                    <Image src="/images/OTPImage.jpeg" alt="OTP-image" fill className="object-cover"></Image>
                </div>
            </section>
            <section className="relative z-10 h-[100dvh] flex flex-col justify-between w-full xl:w-1/2">
                <div className="pl-[20px] xl:pl-[80px]">
                    <Header />
                </div>
                <form className="max-w-[440px] flex flex-col justify-center px-[20px] xl:px-0 mx-auto w-full">
                    <div className="flex flex-col gap-1 w-full justify-center items-center mb-[32px]">
                        <h1 className="font-montagu_slab text-[28px] font-medium">STAY SAFE</h1>
                        <p className="text-xs font-medium opacity-60 text-center max-w-[336px]">
                            Enhance your account protection by adding an extra layer of security with two-factor authentication.
                        </p>
                    </div>
                    <div className="flex flex-col gap-6">
                        <InputText label="Phone Number" type="number" />
                        <div className="flex items-center justify-center gap-[10px]">
                            <MainButton type="normal" className="w-full" content="Skip" onClick={() => handleNavigation("/connect")} />
                            <MainButton type="gradient" className="w-full" content="Send OTP" onClick={() => handleNavigation("/connect")} />
                        </div>
                    </div>
                </form>
                <div className="h-fit flex items-center gap-[16px] justify-center text-[#98A3AA] py-[50px] mx-auto xl:w-full xl:max-w-[440px]">
                    <Link href="#" className="font-poppins text-xs">
                        Terms & Conditions
                    </Link>
                    <div className="bg-[#98A3AA] w-[2px] h-full"></div>
                    <Link href="#" className="font-poppins text-xs">
                        Privacy Policy
                    </Link>
                </div>
            </section>
        </main>
    )
}

export default OTP
