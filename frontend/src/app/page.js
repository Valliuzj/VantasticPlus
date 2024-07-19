"use client";
import Link from 'next/link';
import { useState,useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ScreenWrapper } from "@/components/ScreenWrapper";

export default function Home() {
    const [offset, setOffset] = useState(0);
  
    useEffect(() => {
      const handleScroll = () => setOffset(window.scrollY);
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

  return (
    <div className="bg-violet-50" style={{
      backgroundImage: `url('/background.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: `center ${offset * 0.5}px`,
      height: '100vh',
      width: '100%',
      }}>
      <section>
        <ScreenWrapper className='pb-24 pt-10  sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52'>
          <div className=' px-6 lg:px-0 lg:pt-4'>
            <div className='relative mx-auto text-center flex flex-col items-center'>
              <div className='absolute w-28 left-0 -top-5 hidden lg:block'>
                <div className='absolute inset-x-0 bottom-0 bg-gradient-to-t via-violet-50/50 from-violet-50 h-28'>
                  <img src='/logo1.png' className='w-full' />
                </div>
              </div>
              <h1 className='relative w-fit tracking-tight text-balance mt-16 font-bold !leading-tight text-white text-5xl md:text-6xl lg:text-7xl'>
                Study anything about{' '}
                <span className='bg-rose-500 px-2 mx-2 text-white'>Vancouver</span>{' '}
                with quiz
              </h1>

              <div className=" relative flex text-center mx-auto pl-5 mt-10">
              <Link href="/quiznow">
                <Button className=
                  "h-[70px] text-3xl rounded-2xl">
                    Quiz Now!
                  </Button>
              </Link>
            </div>
            </div>
        
          </div>
        </ScreenWrapper>
      </section>
    </div>
  );
}