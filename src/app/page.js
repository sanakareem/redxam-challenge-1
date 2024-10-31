'use client';

import Image from 'next/image';
import Header from './layouts/Header';
import InputText from './components/InputText';
import Link from 'next/link';
import MainButton from './components/MainButton';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNavigation = route => {
    router.push(route);
  };

  return (
    <main className="w-full flex justify-between min-h-[100dvh]">
      {/* TITLE */}
      <title>Login</title>

      {/* BACKGROUND */}
      <Image
        src="/svg/abstractBg1.svg"
        alt="abstract-background"
        width="0"
        height="0"
        className="w-auto h-auto absolute top-0 left-0"
      ></Image>

      {/* CONTENT */}
      <section className="relative z-10 h-[100dvh] flex flex-col justify-between w-full xl:w-1/2">
        <div className="pl-[20px] xl:pl-[80px]">
          <Header />
        </div>
        <form className="w-full max-w-[400px] flex flex-col gap-6 justify-center px-[20px] mx-auto xl:px-0">
          <div className="flex flex-col justify-center gap-4">
            <InputText
              label="Email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <InputText
              label="Password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <MainButton
            type="gradient"
            className="w-full"
            onClick={() => handleNavigation('/otp')}
            content={
              <>
                <span>GET STARTED</span>
                <Image
                  src="/svg/sparkleIcon.svg"
                  alt="sparkle"
                  width="0"
                  height="0"
                  className="w-auto h-auto ml-3 group-hover:brightness-0"
                ></Image>
              </>
            }
          />
          <div className="w-full flex gap-2 items-center justify-center opacity-60">
            <div className="w-full h-[1px] bg-gradient-to-l from-white to-transparent"></div>
            <span className="font-montagu_slab whitespace-nowrap text-xs">
              or continue with
            </span>
            <div className="w-full h-[1px] bg-gradient-to-r from-white to-transparent"></div>
          </div>
          <div className="flex item-center gap-3">
            <MainButton
              type="normal"
              className="w-full"
              content={
                <>
                  <Image
                    src="/svg/googleIcon.svg"
                    alt="google-icon"
                    width="0"
                    height="0"
                    className="w-[24px] h-[24px] mr-1"
                  ></Image>
                  <span>Google</span>
                </>
              }
            />
            <MainButton
              type="normal"
              className="w-full"
              content={
                <>
                  <Image
                    src="/svg/facebookIcon.svg"
                    alt="facebook-icon"
                    width="0"
                    height="0"
                    className="w-[24px] h-[24px] mr-1"
                  ></Image>
                  <span>Facebook</span>
                </>
              }
            />
          </div>
          <div className="w-full mt-[28px] text-xs flex items-center justify-center gap-1">
            <span className="opacity-60">Don't have an account?</span>
            <Link href="#" className="text-white underline">
              Signup
            </Link>
          </div>
        </form>
        <div className="h-fit flex items-center gap-[16px] justify-center text-[#98A3AA] py-[50px] px-[20px] mx-auto xl:px-0 xl:w-full xl:max-w-[400px]">
          <Link href="#" className="font-poppins text-xs">
            Terms & Conditions
          </Link>
          <div className="bg-[#98A3AA] w-[2px] h-full"></div>
          <Link href="#" className="font-poppins text-xs">
            Privacy Policy
          </Link>
        </div>
      </section>
      <section className="w-1/2 h-screen p-[18px] hidden xl:block">
        <div className="relative w-full h-full overflow-hidden">
          <Image
            src="/images/loginImage.png"
            alt="login-image"
            fill
            className="object-cover"
          ></Image>
        </div>
      </section>
    </main>
  );
};

export default Login;
