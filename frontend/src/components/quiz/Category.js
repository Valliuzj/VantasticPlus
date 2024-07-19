"use client";
import Link from 'next/link';
import React, { useContext, useEffect, useRef }from 'react';
import FunFact from './FunFact';

import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Button } from "../ui/button";

const categories = [
  { name: 'Biology'},
  { name: 'History'},
  { name: 'Culture' },
  { name: 'Travel' },
  { name: 'Art' },
  { name: 'Science'},
  { name: 'Geography' },
];

const Category = () => {
//set up auth to protect pages
const{user, token}=useContext(AuthContext);
const router = useRouter();
const alertShown = useRef(false);
useEffect(() => {
  if (!user && !alertShown.current) {
    alertShown.current = true;
    alert("Please log in/sign up!");
    router.push('/');
  }
}, [user, router]);

  return (
    <div>
      <div className="flex justify-center font-extrabold text-3xl my-10">
        Category
      </div>
      <div className="bg-violet-50 min-h-screen">
        <section className="container mx-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Link key={index} href={`/quiz/${category.name}`}>
                <div className="bg-white p-6 rounded-lg shadow-md cursor-pointer 
                    transition-all duration-300 
                    hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] 
                    active:translate-x-[0px] active:translate-y-[0px] active:rounded-lg active:shadow-none
                    border-2 border-dashed border-black "
                >
                  <img src={`/${category.name}.jpg`} alt={category.name} className="w-full h-32 object-cover rounded-lg mb-4" />
                  <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Category;