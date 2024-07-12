"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScreenWrapper } from '../ScreenWrapper';
import { Post } from './Post';

const DiscussionBoard = () => {
  const [posts, setPosts] = useState([]);
  const [comments,setComments]=useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
  const fetchPosts = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/getAllPosts`);
        setPosts(response.data);
        setComments(response.data.comments);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);
  //console.log("here is posts:"+posts);

  if (loading) {
    return <div>Loading...</div>;
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
                        <Button>
                            Create a Post
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
