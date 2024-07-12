// components/PostDetails.js
"use client";
import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScreenWrapper } from '../ScreenWrapper';
import { AuthContext } from "@/context/AuthContext";
import { Button } from '../ui/button';

const PostDetails = ({ postId }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const { user, token  } = useContext(AuthContext);


  useEffect(() => {
    console.log("Router is ready:",  postId);

    const fetchPost = async () => {
      if (!postId) {
        console.error("No postId provided");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/getSinglePost/${postId}`);
        setPost(response.data.post);
        setComments(response.data.comments);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);
  console.log(post);

    const handleSubmit = async(e) =>{
      e.preventDefault();
      setLoading(true);

      if (!newComment.trim()) return;
      try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/addComment`,
             {
              postID: postId,
              comment: newComment,
              author:user
            },
          {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        }
        );
        const newCommentData = {
          id: response.data.commentID,
          comment: newComment,
          author: user,
          date: new Date().toISOString() // 或者其他合适的日期格式
        };
       // setComments([...comments, response.data]);
        setNewComment(''); 
      } catch (error) {
        console.error('Error adding comment:', error);
      }finally{
        setLoading(false);
      }

    }


  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="bg-violet-50">
    <section>
    <ScreenWrapper className='pb-24 pt-10 sm:pb-32 lg:pt-24 xl:pt-32 lg:pb-40'>
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
                </div>
              </div>
              <p>{comment.comment}</p>
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
      <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="border p-2 w-full rounded"
              />
              <Button type="submit" className="bg-rose-500 text-white px-4 py-2 rounded mt-2">Submit</Button>
        </form>
      </ScreenWrapper>
    </section>
    </div>
  );
};

export default PostDetails;
