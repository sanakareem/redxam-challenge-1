'use client';

import Header from "../../layouts/Header"; 
import InputText from "../../components/InputText"; 
import MainButton from "../../components/MainButton"; 
import { Avatar } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Summary = () => {
  const router = useRouter();

  const handleNavigation = route => {
    router.push(route);
  };

  return (
    <main className="w-full flex justify-center min-h-[100dvh]">
      {/* TITLE */}
      <title>Summary</title>

      {/* BACKGROUND */}
      <Image
        src="/svg/abstractBg2.svg"
        alt="background-abstract"
        width="0"
        height="0"
        className="absolute top-0 left-0 object-cover object-center w-[733px] h-[200px] xl:w-full xl:h-auto"
      />

      {/* CONTENT */}
      <section className="relative z-10 max-w-[1280px] w-full mx-[20px]">
        <Header />
        <div className="flex gap-3 mt-[50px] mb-[20px] flex-col-reverse xl:flex-row">
          <div className="w-full flex justify-center py-12 xl:hidden">
            <Image
              src="/svg/summaryPageShape.svg"
              alt="summary-page-shape"
              width="0"
              height="0"
              className="w-auto h-auto"
            />
          </div>
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
            {/* TIKTOK CARD */}
            <div className="flex flex-col bg-[#0E0E0E] bg-opacity-90 p-[10px] gap-[10px] rounded-[28px] card-shadow">
              <div className="flex justify-between items-center px-4 py-5">
                <div className="flex gap-[10px] items-center">
                  <Avatar
                    src="/images/avatar.png"
                    className="w-[48px] h-[48px]"
                  />
                  <div className="flex flex-col gap-1">
                    <p className="text-base font-medium">Tommy Shelby</p>
                    <span className="text-xs font-medium opacity-60">
                      @tommyshelby
                    </span>
                  </div>
                </div>
                <Image
                  src="/svg/tiktokIcon.svg"
                  alt="tiktok-icon"
                  width="0"
                  height="0"
                  className="w-[32px] h-[32px] xl:w-[40px] xl:h-[40px] long-shadow"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col items-center justify-center border-[1px] border-[#222222] rounded-[24px] gap-1 max-w-[172px] py-5 px-4 xl:p-6 xl:w-[172px]">
                  <span className="font-semibold text-xs opacity-40">
                    Followers
                  </span>
                  <p className="text-[22px] font-medium font-montagu_slab">
                    4.4 K
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center border-[1px] border-[#222222] rounded-[24px] gap-1 max-w-[172px] py-5 px-4 xl:p-6 xl:w-[172px]">
                  <span className="font-semibold text-xs opacity-40">
                    Engagements
                  </span>
                  <p className="text-[22px] font-medium font-montagu_slab">
                    7.1 K <span className="text-[10px]">/month</span>
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center border-[1px] border-[#222222] rounded-[24px] gap-1 max-w-[172px] py-5 px-4 xl:p-6 xl:w-[172px]">
                  <span className="font-semibold text-xs opacity-40">
                    Likes
                  </span>
                  <p className="text-[22px] font-medium font-montagu_slab">
                    2.3 K <span className="text-[10px]">/month</span>
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center border-[1px] border-[#222222] rounded-[24px] gap-1 max-w-[172px] bg-gradient-to-b from-[#30393F] to-[#1A1A1E] tiktok-shadow py-5 px-4 xl:p-6 xl:w-[172px]">
                  <span className="font-semibold text-xs opacity-40">
                    Growth Potential
                  </span>
                  <p className="text-[22px] font-medium font-montagu_slab">
                    120% <span className="text-[10px]">/month</span>
                  </p>
                </div>
              </div>
            </div>
            {/* INSTAGRAM CARD */}
            <div className="relative flex flex-col bg-[#0E0E0E] bg-opacity-90 p-[10px] gap-[10px] rounded-[28px] card-shadow overflow-hidden">
              <div className="instagram-card-gradient absolute w-[200px] h-[200px] rounded-full blur-[68px] bottom-[-46px] right-0 !opacity-25"></div>
              <div className="relative z-10 flex justify-between items-center px-4 py-5">
                <div className="flex gap-[10px] items-center">
                  <Avatar
                    src="/images/avatar.png"
                    className="w-[48px] h-[48px]"
                  />
                  <div className="flex flex-col gap-1">
                    <p className="text-base font-medium">Tommy Shelby</p>
                    <span className="text-xs font-medium opacity-60">
                      @tommyshelby
                    </span>
                  </div>
                </div>
                <Image
                  src="/svg/instagramIcon.svg"
                  alt="tiktok-icon"
                  width="0"
                  height="0"
                  className="w-[32px] h-[32px] xl:w-[40px] xl:h-[40px] long-shadow"
                />
              </div>
              <div className="relative z-10 grid grid-cols-2 gap-3">
                <div className="flex flex-col items-center justify-center border-[1px] border-[#222222] rounded-[24px] gap-1 max-w-[172px] py-5 px-4 xl:p-6 xl:w-[172px]">
                  <span className="font-semibold text-xs opacity-40">
                    Followers
                  </span>
                  <p className="text-[22px] font-medium font-montagu_slab">
                    13.4 K
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center border-[1px] border-[#222222] rounded-[24px] gap-1 max-w-[172px] py-5 px-4 xl:p-6 xl:w-[172px]">
                  <span className="font-semibold text-xs opacity-40">
                    Engagements
                  </span>
                  <p className="text-[22px] font-medium font-montagu_slab">
                    8.2 K <span className="text-[10px]">/month</span>
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center border-[1px] border-[#222222] rounded-[24px] gap-1 max-w-[172px] py-5 px-4 xl:p-6 xl:w-[172px]">
                  <span className="font-semibold text-xs opacity-40">
                    Likes
                  </span>
                  <p className="text-[22px] font-medium font-montagu_slab">
                    3.7 K <span className="text-[10px]">/month</span>
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center border-[1px] border-[#222222] rounded-[24px] gap-1 max-w-[172px] bg-gradient-to-b from-[#30393F] to-[#1A1A1E] instagram-card-gradient py-5 px-4 xl:p-6 xl:w-[172px]">
                  <span className="font-semibold text-xs opacity-40">
                    Growth Potential
                  </span>
                  <p className="text-[22px] font-medium font-montagu_slab">
                    64% <span className="text-[10px]">/month</span>
                  </p>
                </div>
              </div>
            </div>
            {/* YOUTUBE CARD */}
            <div className="relative flex flex-col bg-[#0E0E0E] bg-opacity-90 p-[10px] gap-[10px] rounded-[28px] card-shadow overflow-hidden">
              <div className="relative z-10 flex justify-between items-center p-4">
                <p className="opacity-60 italic text-base font-medium">
                  Youtube Is Connecting
                </p>
                <Image
                  src="/svg/youtubeIcon.svg"
                  alt="tiktok-icon"
                  width="0"
                  height="0"
                  className="w-[32px] h-[32px] xl:w-[40px] xl:h-[40px] long-shadow"
                />
              </div>
              <div className="relative z-10 pb-10">
                <div className="flex flex-col items-center justify-center">
                  <Image
                    src="/svg/disconnectVector.svg"
                    alt="disconnect-vector"
                    width="0"
                    height="0"
                    className="w-auto h-auto long-shadow"
                  />
                  <Link
                    href="#"
                    className="text-sm font-medium text-white underline mt-[18px]"
                  >
                    CONNECTING
                  </Link>
                </div>
              </div>
            </div>
            {/* SUMMARY CARD */}
            <div className="relative flex flex-col bg-[#0E0E0E] bg-opacity-90 px-[32px] py-[26px] rounded-[28px] card-shadow overflow-hidden">
              <Image
                src="/svg/summaryCardBg.svg"
                alt="background"
                width="0"
                height="0"
                className="w-full h-full absolute top-0 left-0 blur-[32px] opacity-20"
              />
              <div className="relative z-10 flex justify-between items-center">
                <p className="max-w-[200px] text-xl font-montagu_slab leading-[28px]">
                  Summary From All The Profiles
                </p>
                <Image
                  src="/svg/summarySparkle.svg"
                  alt="sparkle"
                  width="0"
                  height="0"
                  className="w-auto h-auto"
                />
              </div>
              <div className="w-full h-[1px] bg-gradient-to-r from-white to-transparent mt-[20px] mb-[24px] opacity-20"></div>
              <p className="max-w-[292px] text-sm leading-[26px] font-light opacity-70 mb-2">
                Could you please fill in the fields to help us provide more
                precise market analytics for your target market? Based on the
                data from your profiles, we have noticed that the top 10% of
                accounts similar to yours are currently performing{' '}
                <span className="font-bold">twice</span> as good.
              </p>
            </div>
            {/* QUOTE CARD */}
            <div className="relative col-span-2 bg-[#0E0E0E] bg-opacity-90 py-[16px] rounded-[28px] card-shadow justify-center hidden sm:flex">
              <Image
                src="/svg/quoteShape1.svg"
                alt="quote-shape"
                width="0"
                height="0"
                className="w-auto h-auto absolute top-1/2 -translate-y-1/2 left-[20px]"
              />
              <p className="italic text-xs text-white opacity-60 whitespace-nowrap">
                Filmtrends creates customized growth roadmaps for you after
                thoroughly analyzing your account and the market.
              </p>
              <Image
                src="/svg/quoteShape2.svg"
                alt="quote-shape"
                width="0"
                height="0"
                className="w-auto h-auto absolute top-1/2 -translate-y-1/2 right-[20px]"
              />
            </div>
          </div>
          <div className="flex justify-center xl:hidden pt-8 pb-1">
            <p className="font-montagu_slab text-lg text-white opacity-80">
              ANALYTICS
            </p>
          </div>
          {/* FORM CARD */}
          <div className="relative grow bg-[#0E0E0E] bg-opacity-90 rounded-[28px] card-shadow flex flex-col gap-3 overflow-hidden">
            <Image
              src="/svg/formBg.svg"
              alt="quote-shape"
              width="0"
              height="0"
              className="w-auto h-auto absolute top-0 right-0 opacity-20"
            />
            <div className="relative z-10 flex flex-col gap-1 px-[32px] py-[40px] xl:px-[62px] xl:py-[52px]">
              <Image
                src="/svg/formVector.svg"
                alt="quote-shape"
                width="0"
                height="0"
                className="w-auto h-auto absolute top-0 right-[32px]"
              />
              <span className="font-semibold text-white opacity-60 text-[10px] xl:text-xs">
                Tell Us More About Your
              </span>
              <p className="font-montagu_slab font-medium text-[24px] xl:text-[26px]">
                Business & Goals
              </p>
            </div>
            <div className="relative z-10 flex flex-col gap-6 px-3 xl:gap-8 xl:px-8">
              <InputText
                label="Your Full Name"
                type="text"
                labelClassName="opacity-40"
              />
              <InputText
                label="Business Category"
                type="text"
                labelClassName="opacity-40"
                helperText="Start typing to see relevant categories like: Education, Clothing, Financial, etc."
              />
              <InputText
                label="Business Niche"
                type="text"
                labelClassName="opacity-40"
                helperText="Example: Cooking, Singing, Anime, etc."
              />
              <InputText
                label="Business Goals"
                type="text"
                labelClassName="opacity-40"
                helperText="Example: “Go from 2k followers to 10k” or “increase impressions by 20%”"
                multiline={true}
                rows={4}
              />
            </div>
            <div className="relative z-10 flex gap-6 px-3 pt-6 pb-3 xl:px-8 xl:py-9">
              <MainButton
                content="SKIP"
                className="w-full"
                onClick={() => handleNavigation('/roadmap')}
              />
              <MainButton
                content="NEXT"
                className="w-full"
                type="gradient"
                onClick={() => handleNavigation('/roadmap')}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Summary;
