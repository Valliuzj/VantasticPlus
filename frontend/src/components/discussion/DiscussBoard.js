"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Post } from './Post';

//ui+css
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScreenWrapper } from '../ScreenWrapper';
import { Progress } from "@/components/ui/progress"

const DiscussionBoard = () => {
  const [posts, setPosts] = useState([]);
  const [comments,setComments]=useState([]);

  const [progress, setProgress] = useState(0); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchPosts = async () => {
      try {
        setProgress(25);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/getAllPosts`);
        setPosts(response.data);
        setComments(response.data.comments);
        console.log(response.data);
        setProgress(55);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
        setProgress(100);
      }
    };
    fetchPosts();
  }, []);
  //console.log("here is posts:"+posts);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-1/2">
          <Progress value={progress} color="primary" />
        </div>
      </div>
    );
  }

  return (
    <div>
        <div className="flex justify-center font-extrabold text-3xl my-10">
            DiscussBoard
        </div>
        <div className="bg-violet-50">
            <section>
                <ScreenWrapper className='pb-24 pt-10 sm:pb-32 lg:pt-24 xl:pt-32 lg:pb-40'>
                    <div className='mb-5'>
                      <Link href="/createpost">
                        <Button size="lg" className="text-gray-900 bg-rose-400 hover:bg-rose-600 text-white text-xl font-bold rounded mx-2">
                            Post your thought!
                        </Button>
                      </Link>
                    </div>
                    {posts?.map(post =>(
                        <Post key={post.id} post={post}/>
                        ))}
                </ScreenWrapper>
            </section>
        </div>
   </div>
  );
};

export default DiscussionBoard;
