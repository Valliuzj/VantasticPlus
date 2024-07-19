"use client";
import Link from 'next/link';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import FunFact from './quiz/FunFact';
// ui
import { Button } from './ui/button';
import { CommandInput, Command } from './ui/command';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const {user,setUser}=useContext(AuthContext);
  console.log(user);
  const router = useRouter();

  useEffect(() => {
    if(!user){
      //window.location.reload();
      console.log("Navbar user state changed:", user);
    }
   }, [user]);
  
  const signUserOut = ()=>{
    sessionStorage.removeItem('token');
    setUser(null);
      // Redirect to the homepage
      router.push('/');
  }

  return (
    <nav className='sticky z-[100] h-24 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
      <div className='flex items-center justify-between border-transparent mx-auto px-4 py-6 sm:px-6 lg:px-8'>
        {/* left part */}
        <div className="h-10 w-fit flex items-center justify-between mx-4 sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
          <Link href="/" className='text-gray-900 border-b-2 border-transparent text-xl font-medium  hover:border-violet-500 '>
            Home
          </Link>

          <Link href="/quiz" className="text-gray-900 border-b-2 border-transparent text-xl font-medium  hover:border-violet-500">
            Quiz
          </Link>

          <Link href="/discuss" className="text-gray-900 border-b-2 border-transparent text-xl font-medium hover:border-violet-500">
            Learn& share
          </Link>
        </div>

        {/* fun fact + chatbot */}
        <div className="flex-grow flex items-center justify-between mx-4">   
          <div className='max-w-[800px] min-w-[650px] flex-1'>
            <FunFact/>
          </div>

          <div>
          <Link href="/chatbot">
            <Button size="lg" 
            className="text-xl shadow-md text-white  bg-blue-500
                  rounded-2xl border-2 border-dashed border-black px-6 py-3 
                  font-semibold uppercase transition-all duration-300 
                  hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_blue] 
                  hover:bg-orange-500
                  active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none">
              Chatbot
            </Button>
          </Link>
          </div>
        </div>

        {/* user bar */}
        <div className="h-15 w-fit flex items-center justify-between sm:flex sm:items-center">
          {user ? (
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>
                  <Avatar className="mx-2">
                    <AvatarImage src={user.photoURL || "https://github.com/shadcn.png"} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </MenubarTrigger>
                <MenubarContent className="z-[150]">
                  <MenubarItem>
                    <Link href="/setting">Account Settings</Link>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem onClick={signUserOut}>Log out</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          ) : (
            <>
              <Link href="/login">
                <Button className="mx-2 text-gray-900 bg-white hover:bg-gray-100 text-xl font-medium rounded border border-gray-300">
                  Log in
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="mx-2 text-gray-900 bg-yellow-400 hover:bg-yellow-500 text-xl font-medium rounded">
                  Sign up
                </Button>
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;