"use client";
import Link from "next/link";
import React, { useState,useContext,useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from "@/context/AuthContext";

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

  const { user, setUser, token} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [photoLoading, setPhotoLoading] = useState(false); 
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const router = useRouter(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true); 
    if (newPassword !== confirmPassword) {
      setMessage('New passwords do not match.');
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/changePassword`, 
        {
          oldPassword,
          newPassword,
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 201) {
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        toast.success('Password Update successful!');
        console.log('Password update successful, will navigate to home in 2 seconds.');
        setTimeout(() => {
          sessionStorage.removeItem('token');
          setUser(null);
          router.push('/');
        }, 1000);
      }
    } catch (error) {
      console.error("Error changing password:", error);
      setError(error.response?.data?.error || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleChangePhoto = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    if (!selectedFile) {
      setMessage('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      setPhotoLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/changePhoto`, formData, {
          headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.status === 200) {
        toast.success('Photo Update successful!');
        console.log('Photo update successful, will navigate to home in 2 seconds.');
        setTimeout(() => {
          console.log('Navigating to home now...');
          window.location.href = '/'; 
        }, 1000);
      }
    } catch (error) {
      console.error("Error changing photo:", error);
      setError(error.response?.data?.error || "An error occurred. Please try again.");
    } finally {
      setPhotoLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Account Settings</h1>
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
                  <Input disabled placeholder={user?.userEmail || 'No user email'} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
              </CardHeader>
              <CardContent className='space-y-3'>
                  <Input type="password" placeholder="Old Password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                  {message && <div className="text-red-600">{message}</div>}
                  {error && <div className="alert alert-danger">{error}</div>}
                  <Input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                  <Input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button onClick={handleSubmit} disabled={loading}>{loading ? 'Updating...' : 'Change Password'}</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Photo</CardTitle>
                <CardDescription>Upload your photo (less than 1MB, formats: .jpg, .jpeg, .png)</CardDescription>
              </CardHeader>
              <CardContent>  
                  <Input type="file" accept=".jpg, .jpeg, .png" onChange={handleFileChange} />
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button onClick={handleChangePhoto} disabled={photoLoading}>{photoLoading ? 'Uploading...' : 'Upload Photo'}</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};