"use client"
import axios from 'axios';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image"
import Link from "next/link"
import '../components/index.css'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const Signup = () => {
  const [formData, setFormData] = useState({username: '', email: '', password: '' })
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    const { id, value } = e.target;
    console.log(`Field changed: ${id}, Value: ${value}`);
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/register`, {
      displayName: formData.username,
      email: formData.email,
      password: formData.password,
    });

      // Handle successful registration
      if (response.status === 201) {
        // Redirect to the homepage
        router.push('/');
      }
    } catch (error) {
      console.error("Error registering new user:", error);
      setError(error.response?.data?.error || "An error occurred. Please try again.");
    }
  };

    return (
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] bg-violet-50">
          <div className="hidden bg-muted lg:block">
            <Image
              src="/banner.png"
              alt="Image"
              width="1920"
              height="1080"
              className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
          <div className="flex items-center justify-center py-12">
            <div className="mx-auto grid w-[350px] gap-6">
              <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-bold">Create Account</h1>
                
                <p className="text-balance text-muted-foreground">
                  Enter your email to sign up
                </p>
              </div>
              <div className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="username">User Name</Label>
                    <Input
                      id="username"
                      type="username"
                      placeholder="name"
                      required
                      className="inputField"
                      value={formData.username}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      className="inputField"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid gap-2">
                      <Label htmlFor="password">Password</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      required 
                      className="inputField"
                      value={formData.password}
                      onChange={handleChange}/>
                  </div>
                  <Button type="submit" className="w-full" onClick={handleSubmit}>
                    Signup
                  </Button>
                  {error && <p className="text-red-500">{error}</p>}
                </div>
                <div className="mt-4 text-center text-sm">
                  Already have an account?{" "}
                  <Link href="/login" className="underline text-rose-500">
                    Login
                  </Link>
                  {" "}or <Link href="/" className="underline text-rose-500">
                  Back to home
                </Link>
                </div>
            </div>
          </div>
          
        </div>
    )
}

export default Signup;