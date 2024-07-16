"use client";
import Link from 'next/link';
import React, { useContext, useEffect, useRef }from 'react';
import FunFact from './FunFact';

import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Button } from "../ui/button";

const categories = [
  { name: 'Biology', description: 'Description of your second work' },
  { name: 'History', description: 'Description of your second work' },
  { name: 'Culture', description: 'Description of your second work' },
  { name: 'Travel', description: 'Description of your second work' },
  { name: 'Art', description: 'Description of your second work' },
  { name: 'Science', description: 'Description of your second work' },
  { name: 'Geography', description: 'Description of your second work' },
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
          <div className="mb-8"><FunFact /></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Link key={index} href={`/quiz/${category.name}/random`}>
                <div className="bg-white p-6 rounded-lg shadow-md cursor-pointer">
                  <img src={`/${category.name}.jpg`} alt={category.name} className="w-full h-32 object-cover rounded-lg mb-4" />
                  <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
                  <p>{category.description}</p>
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