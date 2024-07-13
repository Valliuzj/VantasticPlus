"use client";
import Link from "next/link";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';

// UI components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const Setting = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (newPassword !== confirmPassword) {
      setMessage('New passwords do not match.');
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/changePassword`, {
        oldPassword,
        newPassword,
      });

      // Handle successful password change
      if (response.status === 200) {
        sessionStorage.setItem('token', response.data.token);
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');

        // Show toast with success message
        toast('Password Update successful!', {
          position: "top-center",
        });

        // Redirect to the homepage
        router.push('/');
      }
    } catch (error) {
      console.error("Error changing password:", error);
      setError(error.response?.data?.error || "An error occurred. Please try again.");
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleChangePhoto = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      setMessage('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/changePhoto`, formData, {
          headers: {'Content-Type':'multipart/form-data'}
        });

      // Handle successful photo change
      if (response.status === 200) {
        setMessage('File uploaded successfully');
        // Show toast with success message
        toast('File Update successful!', {
          position: "top-center",
        });

        // Redirect to the homepage
        router.push('/');
      }
    } catch (error) {
      console.error("Error changing photo:", error);
      setError(error.response?.data?.error || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Account Setting</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav className="grid gap-4 text-sm text-muted-foreground">
            <Link href="#" className="font-semibold text-primary">General</Link>
          </nav>
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Email</CardTitle>
                <CardDescription>Email address is your unique id.</CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <Input placeholder="Store Name" />
                </form>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <Input type="password" placeholder="Old Password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                  <Input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                  <Input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                  <Button type="submit">Change Password</Button>
                </form>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button>Save</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Photo</CardTitle>
                <CardDescription>Upload your photo.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleChangePhoto}>
                  <Input type="file" accept=".jpg, .jpeg, .png" onChange={handleFileChange} />
                  <Button type="submit">{loading ? 'Uploading...' : 'Upload Photo'}</Button>
                </form>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button>Save</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};