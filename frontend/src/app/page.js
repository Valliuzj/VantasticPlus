"use client";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ScreenWrapper } from "@/components/ScreenWrapper";

export default function Home() {
  return (
    <div className="bg-violet-50">
      <section>
        <ScreenWrapper className='pb-24 pt-10 lg:grid lg:grid-cols-3 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52'>
          {/* Left part */}
          <div className='col-span-2 px-6 lg:px-0 lg:pt-4'>
            <div className='relative mx-auto text-center lg:text-left flex flex-col items-center lg:items-start'>
              <div className='absolute w-28 left-0 -top-5 hidden lg:block'>
                <div className='absolute inset-x-0 bottom-0 bg-gradient-to-t via-violet-50/50 from-violet-50 h-28'>
                  <img src='/logo1.png' className='w-full' />
                </div>
              </div>
              <h1 className='relative w-fit tracking-tight text-balance mt-16 font-bold !leading-tight text-gray-900 text-5xl md:text-6xl lg:text-7xl'>
                Study anything about{' '}
                <span className='bg-rose-500 px-2 mx-2 text-white'>Vancouver</span>{' '}
                with quiz
              </h1>
            </div>
            <div className="pl-5 mt-10">
              <Link href="/quiznow">
                <Button>Quiz Now!</Button>
              </Link>
            </div>
          </div>
          {/* Right part */}
          <div className='col-span-full lg:col-span-1 w-full flex justify-center px-8 sm:px-16 md:px-0 mt-32 lg:mx-0 lg:mt-20 h-fit'></div>
        </ScreenWrapper>
      </section>
    </div>
  );
}