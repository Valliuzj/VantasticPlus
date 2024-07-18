"use client";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ScreenWrapper } from "@/components/ScreenWrapper";
import CarouselCard from '@/components/CarouselCard';

export default function Home() {
  return (
    <div className="bg-violet-50">
      <section>
        <ScreenWrapper className='pb-24 pt-10 lg:grid lg:grid-cols-4 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52'>
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
            <div className=" relative mx-auto lg:text-left pl-5 mt-10">
              <Link href="/quiznow">
                <Button className=
                  "h-[100px] text-3xl shadow-md text-white  bg-blue-500
                  rounded-2xl border-2 border-dashed border-black px-6 py-3 
                  font-semibold uppercase transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] 
                  hover:bg-violet-500
                  active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none">
                    Quiz Now!
                  </Button>
              </Link>
            </div>
          </div>
          {/* Right part */}
          <div className='col-span-full lg:col-span-2 w-full flex justify-center px-8 sm:px-16 md:px-0 lg:mx-0 lg:mt-20 h-fit'>
             <CarouselCard/>
          </div>
        </ScreenWrapper>

      </section>
    </div>
  );
}