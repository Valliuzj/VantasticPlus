import PostDetails from "@/components/discussion/PostDetails";

const PostPage = ({ params }) => {

  return <PostDetails postId={params.id} />;
};

export default PostPage;
