"use client"
import PostDetails from "@/components/discussion/PostDetails";
import { useRouter } from 'next/navigation';
const PostPage = () => {
  
  const router = useRouter();
  if (!router.isReady) {
    return <p>Loading...</p>; // Optionally, render a loading indicator
  }
  return <PostDetails postId={router.query.id}  />;
};

export default PostPage;
