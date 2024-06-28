// components/Navbar.js
"use client";
import Link from 'next/link';
import axios from 'axios';
import { useState, useEffect } from 'react';
//ui
import { Button } from './ui/button';
import { CommandInput,Command } from './ui/command';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const token = sessionStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/me`, 
            {
              headers: {
                Authorization: `Bearer ${token}`, 
              }
            }
          );
          setUser(response.data.userData);
          console.log(response.data.userData)
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUser();
  }, []);

  const signUserOut = ()=>{
    sessionStorage.removeItem('token');
    setUser(null);
  }

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className='sticky z-[100] h-24 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
    <div className='flex items-center justify-between border-transparent mx-auto px-4 py-6 sm:px-6 lg:px-8'>
      {/*left part */}
            <div className="h-10 w-fit flex items-center justify-between mx-4 sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/" className='text-gray-900 border-b-2 border-transparent text-xl font-medium  hover:border-violet-500 '>
                  Home
              </Link>

              <Link href="/quiz" className="text-gray-900 border-b-2 border-transparent text-xl font-medium  hover:border-violet-500">
                  Quiz
              </Link>

              <Link href="/learn&share" className="text-gray-900 border-b-2 border-transparent text-xl font-medium hover:border-violet-500">
                  Learn & share
              </Link>
            </div>
      {/*search bar */}
            <div className="flex-grow flex items-center justify-between mx-4">
              <Command className="rounded-lg border shadow-md mx-2">
                <CommandInput
                placeholder="Type a command or search..." />
              </Command>

              <Button size="lg" className="text-gray-900 bg-blue-500 hover:bg-blue-600 text-white text-xl font-bold rounded mx-2">
              Chatbot
              </Button>
            </div>

      {/*user bar */}
          <div className="h-15 w-fit flex items-center justify-between sm:flex sm:items-center">
            {user?(
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger>
                    <Avatar className="mx-2">
                      <AvatarImage src={user.photoURL || "https://github.com/shadcn.png"}/>
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </MenubarTrigger>
                  <MenubarContent  className="z-[150]">
                    <MenubarItem>
                      <Link href="/setting">Account Settings</Link>
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem onClick={signUserOut}>Log out</MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            ):(
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
            )
              }
          </div>

        </div>
    </nav>
  );
};

export default Navbar;
