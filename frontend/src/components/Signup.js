"use client"
import axios from 'axios';
import React, { useState } from 'react';
import Image from "next/image"
import Link from "next/link"
import '../components/index.css'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const Signup = () => {
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
                <h1 className="text-3xl font-bold">Signup</h1>
                <Link href="/" className="underline">
                  Back to home
                </Link>
                <p className="text-balance text-muted-foreground">
                  Enter your email to create your account
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
                  />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" required className="inputField"/>
                </div>
                <Button type="submit" className="w-full">
                  Signup
                </Button>
                <Button variant="outline" className="w-full">
                  Signup with Google
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="underline text-rose-500">
                  Login
                </Link>
              </div>
            </div>
          </div>
          
        </div>
    )
}

export default Signup;