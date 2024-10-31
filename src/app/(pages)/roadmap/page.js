'use client';

import MainButton from '@/app/components/MainButton';
import Header from '@/app/layouts/Header';
import { Avatar, Button } from '@nextui-org/react';
import Image from 'next/image';
import { useState } from 'react';

const Roadmap = () => {
  const roadmapContent = [
    {
      badge: 'ROADMAP',
      title: 'Let’s do it step-by-step!',
      description:
        'Elevate your ranking incrementally. This concise guide outlines your path to exponential advancement. Proceed to the subsequent phase by selecting NEXT.',
      icon: 'rocketIcon.png'
    },
    {
      badge: 'STEP 1',
      title: 'Optimize Your Content for Maximum Views and Impressions',
      description: `Use Platform-Specific Trends and Hashtags: Identify and use the trending music, sounds, and hashtags that are popular on each platform. This increases the likelihood of your content appearing in the platform’s algorithm-driven feeds like TikTok’s For You Page, Instagram’s Explore, or YouTube Shorts.
Grab Attention in the First Few Seconds: The first 3-5 seconds of your video should be highly engaging to hook viewers. Whether it’s a visually striking scene or an intriguing question, capturing attention early boosts your chances of getting more views and impressions.`,
      icon: 'handIcon.png'
    },
    {
      badge: 'STEP 2',
      title: 'Engage with Your Audience to Boost Engagement',
      description: `Interact with Comments and Shares: Actively respond to comments and engage with viewers who share your videos. Engagement helps increase your video’s visibility across platforms.
Encourage Interaction: Use calls to action (CTAs) to encourage viewers to comment, like, or share your video. Phrases like “What do you think?” or “Tag a friend who needs to see this!” drive more interaction and engagement.`,
      icon: 'handIcon.png'
    },
    {
      badge: 'STEP 3',
      title: 'Post Consistently to Build Follower Growth',
      description: `Maintain a Consistent Posting Schedule: Regularly post new content at times when your audience is most active. Consistency across platforms is key to retaining and growing your follower base.
Create and Promote Series Content: Develop a recurring series that gives viewers a reason to follow your account across platforms. Promoting each episode or installment on all your social media channels can help drive consistent follower growth.`,
      icon: 'handIcon.png'
    },
    {
      badge: 'STEP 4',
      title: 'Focus on High-Quality Content to Increase Likes',
      description: `Ensure High Production Value: Regardless of the platform, your videos should be well-lit, have clear audio, and be well-edited. Quality content is more likely to attract likes.
Create Content with Value: Focus on creating videos that are either highly entertaining, educational, or informative. Content that provides clear value to viewers tends to receive more likes.`,
      icon: 'handIcon.png'
    },
    {
      badge: 'STEP 5',
      title: 'Encourage Saves and Shares to Expand Reach',
      description: `Craft Shareable Content: Create videos that viewers find relatable, inspirational, or funny—something they’ll want to share with others. Content that evokes strong emotions often gets shared more.
Add a Clear Call to Action (CTA): Prompt viewers to save or share your videos. Simple CTAs like “Save this for later” or “Share this with your friends” can significantly increase saves and shares across platforms.`,
      icon: 'handIcon.png'
    },
    {
      badge: 'STEP 6',
      title: 'Analyze and Adapt for Continuous Improvement',
      description: `Use Platform Analytics: Each platform offers analytics tools (like TikTok Analytics, Instagram Insights, YouTube Studio). Regularly check which videos are performing best in terms of likes, views, engagement, and shares. Use these insights to refine your content strategy.
Experiment with Different Content Formats: Test different types of content (tutorials, challenges, vlogs, etc.) to see what resonates with your audience. Adapt your strategy based on what works best across different platforms.`,
      icon: 'handIcon.png'
    }
  ];

  const [currentRoadmap, setCurrentRoadmap] = useState(0);

  const handleNextButton = () => {
    if (currentRoadmap < 5) {
      setCurrentRoadmap(currentRoadmap + 1);
    }
  };

  const handleBackButton = () => {
    if (currentRoadmap > 0) {
      setCurrentRoadmap(currentRoadmap - 1);
    }
  };

  return (
    <main className="w-full flex justify-center min-h-[100dvh]">
      {/* TITLE */}
      <title>Roadmap</title>

      {/* BACKGROUND */}
      <Image
        src="/svg/abstractBg2.svg"
        alt="background-abstract"
        width="0"
        height="0"
        className="absolute top-0 left-0 object-cover object-center w-[733px] h-[200px] xl:w-full xl:h-auto"
      />

      <section className="relative z-10 max-w-[1280px] w-full mx-[20px]">
        <Header />
        <div className="flex gap-3 mt-[50px] mb-[20px] flex-col-reverse xl:flex-row">
          <div className="flex flex-col p-4 gap-6 bg-[#0E0E0E] bg-opacity-90 card-shadow rounded-[28px] max-w-[432px] w-full">
            <div className="flex items-center gap-4 py-1">
              <Button className="rounded-[52px] flex items-center justify-center gap-2 py-3 px-5 h-fit min-w-0 bg-gradient-to-b from-[#30393F] to-[#1A1A1E] tiktok-shadow">
                <Image
                  src="/svg/instagramIcon.svg"
                  alt="tiktok-icon"
                  width="0"
                  height="0"
                  className="w-[32px] h-[32px]"
                />
                <p className="text-sm font-medium text-white">Instagram</p>
              </Button>
              <MainButton
                content={
                  <Image
                    src="/svg/tiktokIcon.svg"
                    alt="instagram-icon"
                    width="0"
                    height="0"
                    className="w-[32px] h-[32px] opacity-70"
                  />
                }
                className="min-w-0 h-fit p-3"
              />
              <MainButton
                content={
                  <Image
                    src="/svg/youtubeIcon.svg"
                    alt="youtube-icon"
                    width="0"
                    height="0"
                    className="w-[32px] h-[32px] opacity-70"
                  />
                }
                className="min-w-0 h-fit p-3"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex w-full items-center gap-3 pl-2 mb-1">
                <p className="text-xs font-montagu_slab opacity-80 whitespace-nowrap">
                  Your Profile
                </p>
                <div className="bg-gradient-to-r from-white to-transparent opacity-10 h-[1px] w-full"></div>
              </div>
              <div className="flex justify-between items-center px-[14px] py-3 border-[#222222] border-[1px] rounded-[32px]">
                <div className="flex items-center gap-[10px]">
                  <Avatar
                    src="/images/avatar.png"
                    className="w-[32px] h-[32px]"
                  />
                  <div className="flex flex-col gap-[2px]">
                    <p className="text-xs font-medium">Tommy Shelby</p>
                    <span className="text-[10px] font-medium opacity-50">
                      @tommyshelby
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end pr-2">
                  <span className="text-[8px] font-medium opacity-50 italic">
                    RANK
                  </span>
                  <p className="text-xs italic font-medium opacity-80">
                    #19,324
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-[6px]">
                <div className="border-[1px] border-[#222222] p-3 rounded-[52px] flex flex-col items-center justify-center gap-[2px]">
                  <span className="text-[10px] text-white opacity-60">
                    Followers
                  </span>
                  <p className="text-base font-medium font-montagu_slab">
                    4.4k
                  </p>
                </div>
                <div className="border-[1px] border-[#222222] p-3 rounded-[52px] flex flex-col items-center justify-center gap-[2px]">
                  <span className="text-[10px] text-white opacity-60">
                    Engagements
                  </span>
                  <p className="text-base font-medium font-montagu_slab">
                    7.1k <span className="text-[10px] font-normal">/month</span>
                  </p>
                </div>
                <div className="border-[1px] border-[#222222] p-3 rounded-[52px] flex flex-col items-center justify-center gap-[2px]">
                  <span className="text-[10px] text-white opacity-60">
                    Likes
                  </span>
                  <p className="text-base font-medium font-montagu_slab">
                    2.3k <span className="text-[10px] font-normal">/month</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between py-3 gap-4">
                <MainButton
                  content="My Profile"
                  className="font-medium w-full"
                ></MainButton>
                <MainButton
                  content="Suggest Posts"
                  className="font-medium w-full"
                ></MainButton>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex w-full items-center gap-3 pl-2 mb-1">
                <p className="text-xs font-montagu_slab opacity-80 whitespace-nowrap">
                  Top Competition
                </p>
                <div className="bg-gradient-to-r from-white to-transparent opacity-10 h-[1px] w-full"></div>
              </div>
              <div className="flex justify-between items-center px-[14px] py-3 border-[#222222] border-[1px] rounded-[32px]">
                <div className="flex items-center gap-[10px]">
                  <Avatar
                    src="/svg/carBabiesProfile.svg"
                    className="w-[32px] h-[32px]"
                  />
                  <div className="flex flex-col gap-[2px]">
                    <p className="text-xs font-medium">Car Babies</p>
                    <span className="text-[10px] font-medium opacity-50">
                      @carbabies
                    </span>
                  </div>
                </div>
                <Image
                  src="/svg/awardsIcon.svg"
                  alt="awards-icon"
                  width="0"
                  height="0"
                  className="w-[32px] h-[32px]"
                />
              </div>
              <div className="grid grid-cols-3 gap-[6px]">
                <div className="border-[1px] border-[#222222] p-3 rounded-[52px] flex flex-col items-center justify-center gap-[2px]">
                  <span className="text-[10px] text-white opacity-60">
                    Followers
                  </span>
                  <p className="text-base font-medium font-montagu_slab">
                    1.3m
                  </p>
                </div>
                <div className="border-[1px] border-[#222222] p-3 rounded-[52px] flex flex-col items-center justify-center gap-[2px]">
                  <span className="text-[10px] text-white opacity-60">
                    Engagements
                  </span>
                  <p className="text-base font-medium font-montagu_slab">
                    274k <span className="text-[10px] font-normal">/month</span>
                  </p>
                </div>
                <div className="border-[1px] border-[#222222] p-3 rounded-[52px] flex flex-col items-center justify-center gap-[2px]">
                  <span className="text-[10px] text-white opacity-60">
                    Likes
                  </span>
                  <p className="text-base font-medium font-montagu_slab">
                    160k <span className="text-[10px] font-normal">/month</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex w-full items-center gap-3 pl-2 mb-1">
                <p className="text-xs font-montagu_slab opacity-80 whitespace-nowrap">
                  Average of Top 10%
                </p>
                <div className="bg-gradient-to-r from-white to-transparent opacity-10 h-[1px] w-full"></div>
              </div>
              <div className="grid grid-cols-3 gap-[6px]">
                <div className="border-[1px] border-[#222222] p-3 rounded-[52px] flex flex-col items-center justify-center gap-[2px]">
                  <span className="text-[10px] text-white opacity-60">
                    Followers
                  </span>
                  <p className="text-base font-medium font-montagu_slab">
                    354k
                  </p>
                </div>
                <div className="border-[1px] border-[#222222] p-3 rounded-[52px] flex flex-col items-center justify-center gap-[2px]">
                  <span className="text-[10px] text-white opacity-60">
                    Engagements
                  </span>
                  <p className="text-base font-medium font-montagu_slab">
                    78k <span className="text-[10px] font-normal">/month</span>
                  </p>
                </div>
                <div className="border-[1px] border-[#222222] p-3 rounded-[52px] flex flex-col items-center justify-center gap-[2px]">
                  <span className="text-[10px] text-white opacity-60">
                    Likes
                  </span>
                  <p className="text-base font-medium font-montagu_slab">
                    54k <span className="text-[10px] font-normal">/month</span>
                  </p>
                </div>
              </div>
              <MainButton
                content="View Leaderboard"
                className="font-medium mt-1"
              />
            </div>
          </div>
          <div className="grow flex flex-col justify-between pt-[72px] pb-16 min-h-[80dvh] gap-24 xl:gap-0 xl:min-h-0 xl:h-auto">
            <div className="w-full flex flex-col items-center">
              <div className="bg-[#151515] px-4 py-[10px] rounded-[52px] mb-[14px]">
                <p className="text-sm font-montagu_slab">
                  {roadmapContent[currentRoadmap].badge}
                </p>
              </div>
              <div className="flex flex-col items-center w-full gap-[10px]">
                <h1 className="font-semibold text-[52px] text-center">
                  {roadmapContent[currentRoadmap].title}
                </h1>
                <p className="text-xs leading-[15px] text-center opacity-60 max-w-[460px]">
                  {roadmapContent[currentRoadmap].description}
                </p>
              </div>
              <div className="flex justify-center items-center gap-3 mt-[48px]">
                {currentRoadmap > 0 && (
                  <MainButton
                    content={
                      <Image
                        src="/svg/arrowIcon.svg"
                        alt="arrow"
                        width="0"
                        height="0"
                        className="w-auto h-auto"
                      ></Image>
                    }
                    className="min-w-0 w-[46px] h-[46px] p-0"
                    onClick={handleBackButton}
                  />
                )}
                <MainButton
                  content={
                    <>
                      <span className="font-medium text-sm">NEXT</span>
                      <Image
                        src="/svg/sparkleIcon.svg"
                        alt="sparkle"
                        width="0"
                        height="0"
                        className="w-auto h-auto ml-3 group-hover:brightness-0"
                      ></Image>
                    </>
                  }
                  type="gradient"
                  wrapperClassName="px-[46px]"
                  onClick={handleNextButton}
                />
              </div>
            </div>
            <div className="w-full relative h-[132px] flex justify-center">
              <Image
                src="/svg/waveLine.svg"
                alt="wave-line"
                width="0"
                height="0"
                className="absolute h-[66px] xl:h-[132px] z-10 w-auto top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 object-cover"
                unoptimized={true}
              />
              <Image
                src="/svg/stars.svg"
                alt="wave-line"
                width="0"
                height="0"
                className="absolute h-auto w-auto top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 object-cover"
                unoptimized={true}
              />
              <div className="relative z-10 rounded-full bg-[#111111] border-[1px] border-white border-opacity-40 flex justify-center items-center w-[96px] h-[96px] p-7 xl:p-0 xl:w-[132px] xl:h-[132px]">
                <Image
                  src={`/images/${roadmapContent[currentRoadmap].icon}`}
                  alt="rocket"
                  width="0"
                  height="0"
                  className="w-auto h-auto object-cover"
                  unoptimized={true}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Roadmap;
