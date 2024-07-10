"use client"
import axios from "axios"
import { useEffect, useState, useContext  } from "react";
import { useRouter } from 'next/navigation';
import { AuthContext } from "@/context/AuthContext";
import { toast } from 'react-toastify';
//ui+CSS
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Input } from "@/components/ui/input"
  import { Textarea } from "@/components/ui/textarea"
  import { Button } from "../ui/button";

export const CreatePost =()=>{
    const [formData, setFormData] = useState({ title: '', content: '' })
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [wordCount, setWordCount] = useState(0);
    const router = useRouter();
    const { user, token  } = useContext(AuthContext);

    const handleChange = (e)=>{
        const{id,value}=e.target;
        setFormData((prev)=>({
            ...prev,
            [id]:value
        }))
    }
    useEffect(() => {
        const words = formData.content.trim().split(/\s+/);
        setWordCount(words.length);
        }, [formData.content]);

    const handleSubmit = async(e)=>{
        e.preventDefault();
        setLoading(true);
        try{ console.log(user);
            if (!token) {
                throw new Error('No token found');
            }
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/addPost`,
                {
                    title:formData.title,
                    content:formData.content,
                    author:user
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 201) {
                toast(response.data.message, {
                    position: "top-center"
                  });
            }
            console.log("Post added successfully:", response.data);
            setFormData({ title: '', content: '' });
            setTimeout(() => router.push('/discuss'), 1000);
        }catch(error){
            console.error("Error updating posts:", error);
            setError('Failed to create post. Please try again.');
        }finally{
            setLoading(false);
        }
    };
    return(
        <div className="flex min-h-screen w-full flex-col">
        <main className="flex flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
          <div className="max-w-3xl mx-auto w-full">
            <h1 className="text-3xl font-semibold mb-10">Create New Post</h1>
              <Card x-chunk="dashboard-04-chunk-1">
                <CardHeader>
                  <CardTitle>Post Title</CardTitle>
                </CardHeader>
                <CardContent>
                    <Input 
                    id="title"
                    placeholder="Enter your post title" 
                    required
                    value={formData.title}
                    onChange={handleChange}/>
                </CardContent>
                <CardHeader>
                  <CardTitle>Content</CardTitle>
                </CardHeader>
                <CardContent>
                    <Textarea 
                   id="content"
                   placeholder="Enter post content (20-300 words)" 
                   required
                   row={10}
                   value={formData.content}
                   onChange={handleChange} />
                    <p className={
                        `text-sm mt-1 ${wordCount < 20 || wordCount > 300 ? 'text-red-500' : 'text-gray-500'}`}>
                        {wordCount} words (20-300 words required)
                    </p>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                {error && <p className="text-red-500 mb-4">{error}</p>}
                  <Button 
                    onClick={handleSubmit}
                    disabled={wordCount < 20 || wordCount > 300||!formData.title.trim()}>
                        Submit
                    </Button>
                </CardFooter>
              </Card>
            </div>
          
        </main>
      </div>

    )
}