"use client"; 
import Link from 'next/link';
import React from 'react';

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
  return (
    <div className="bg-violet-50 min-h-screen">
      <section className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Category</h1>
        <p className="text-xl mb-8">Fun Fact: A piece of fun fact appears here.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Link key={index} href={`/quiz/${category.name.toLowerCase()}/q12345`}>
              <div className="bg-white p-6 rounded-lg shadow-md cursor-pointer">
                <img src={`/${category.name.toLowerCase()}.jpg`} alt={category.name} className="w-full h-32 object-cover rounded-lg mb-4" />
                <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
                <p>{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Category;