"use client"
import axios from 'axios';
import Image from "next/image"
import Link from "next/link"

//state and components
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';

//ui+CSS
import '../components/index.css'
import 'react-toastify/dist/ReactToastify.css';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
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
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/login`, {
      email: formData.email,
      password: formData.password,
    });

      // Handle successful registration
      if (response.status === 201) {
         // Store token in cookies
         sessionStorage.setItem('token', response.data.token);

        //Show toast with success message
        toast.success('Login successful!', {
          position: "top-right"
        });

        // Redirect to the homepage
        router.push('/');
      }
    } catch (error) {
      console.error("Error login:", error);
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
                <h1 className="text-3xl font-bold">Login</h1>
              </div>
              <div className="grid gap-4">
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
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="/forgot-password"
                      className="ml-auto inline-block text-sm underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    required className="inputField"
                    value={formData.password}
                    onChange={handleChange}/>
                </div>
                <Button type="submit" className="w-full" onClick={handleSubmit}>
                  Login
                </Button>
                {error && <p className="text-red-500">{error}</p>}
              </div>
              <div className="mt-4 text-center text-sm">
                New to Vantastic Plus?{" "}
                <Link href="/signup" className="underline text-rose-500">
                  Register!
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

export default Login;