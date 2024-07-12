// components/PostDetails.js
"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const PostDetails = () => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();


  useEffect(() => {
    console.log("Router is ready:", router.isReady);
    if (!router.isReady) return;

    const { id } = router.query;
    console.log("Router query id:", id);
    if (!id) return;

    const fetchPost = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/getSinglePost/${id}`);
        setPost(response.data.post);
        setComments(response.data.comments);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [[router.isReady, router.query]]);
  console.log(post);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div>
      <div className="flex justify-center font-extrabold text-3xl my-10">
        {post.title}
      </div>
      <div className="bg-white p-4 rounded shadow-lg">
        <div className="flex items-center mb-4">
          <Avatar className="mr-4">
            <AvatarImage src={post.author.photoURL || "https://github.com/shadcn.png"} />
            <AvatarFallback>{post.author.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-bold">{post.author.name}</h2>
            <p className="text-gray-600">{new Date(post.date.seconds * 1000).toLocaleDateString()}</p>
          </div>
        </div>
        <p className="mb-4">{post.content}</p>
        <h3 className="text-2xl font-semibold mb-4">Comments</h3>
        {comments.length > 0 ? (
          comments.map(comment => (
            <div key={comment.id} className="mb-4">
              <div className="flex items-center mb-2">
                <Avatar className="mr-2">
                  <AvatarImage src={comment.author.photoURL || "https://github.com/shadcn.png"} />
                  <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-lg font-semibold">{comment.author.name}</h4>
                  <p className="text-sm text-gray-600">{new Date(comment.date.seconds * 1000).toLocaleDateString()}</p>
                </div>
              </div>
              <p>{comment.content}</p>
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default PostDetails;
