// components/PostDetails.js
"use client";
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from "@/context/AuthContext";

//ui+css
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScreenWrapper } from '../ScreenWrapper';
import { Button } from '../ui/button';
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress"


const PostDetails = ({ postId }) => {
  //post，comments， newComments(for adding)
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  //progress  bar
  const [progress, setProgress] = useState(0); 
  const [loading, setLoading] = useState(true);
  const { user, token} = useContext(AuthContext);

//show the data
  useEffect(() => {
    console.log("Router is ready:",  postId);
    const fetchPost = async () => {
      if (!postId) {
        console.error("No postId provided");
        setLoading(false);
        return;
      }

      try {
        setProgress(25);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/getSinglePost/${postId}`);
        setPost(response.data.post);
        setComments(response.data.comments);
        setProgress(75); 
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
        setProgress(100); 
      }
    };

    fetchPost();
  }, [postId]);
  console.log("Post:", post);
  console.log("Comments:",comments);
  console.log("User:", user);

  //handle adding comment
  const handleSubmit = async(e) =>{
      e.preventDefault();
      setLoading(true);
      setProgress(0);

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
       setComments([...comments, response.data.comment]);
       setNewComment('');
       setProgress(75);
       console.log(response.data.comment);
      setNewComment(''); 
      } catch (error) {
        console.error('Error adding comment:', error);
      }finally{
        setLoading(false);
        setProgress(100);
      }
    }

    //handle delete comment
    const handleDelete=async(commentID)=>{
      setLoading(true);
      try{
        await axios.delete(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/deleteComment`,
          {
            data: { postID: postId, commentID: commentID },  // Include the data here
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }
        );
        setComments(comments.filter(comment => comment.id !== commentID));
      }catch (error) {
        console.error('Error deleting comment:', error);
      } finally {
        setLoading(false);
      }
    };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-1/2">
          <Progress value={progress} color="primary" />
        </div>
      </div>
    );
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
            <AvatarImage src={post.author?.photoURL || "https://github.com/shadcn.png"} />
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
                  <AvatarImage src={comment.author?.photoURL || "https://github.com/shadcn.png"} />
                  <AvatarFallback>{comment.author?.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-lg font-semibold">{comment.author?.name}</h4>
                </div>
              </div>
              <p>{comment.comment}</p>
              {comment.author.email === user.userEmail && (
              <Button
                className="ml-auto bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => handleDelete(comment.id)}
              >
                Delete
              </Button>
            )}
            </div>
         
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
      <form onSubmit={handleSubmit}>
              <Input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="border p-2 w-full rounded bg-white mt-5"
              />
              <Button type="submit" className="bg-rose-400 hover:bg-rose-600 text-white px-4 py-2 rounded mt-2">Submit</Button>
        </form>
      </ScreenWrapper>
    </section>
    </div>
  );
};

export default PostDetails;
