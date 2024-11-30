import Header from "@/components/Header.jsx";
import Footer from "@/components/Footer.jsx";
import Comment from "@/pages/PostPage/Comment.jsx";
import AddComment from "@/pages/PostPage/AddComment.jsx";
import SortComments from "./SortComments.jsx";
import usePost from "@/hooks/usePost.js";
import convertTimestamp from "@/utils/convertTimestamp.js";
import { useParams } from "react-router-dom";
import styleHtmlContent from "@/utils/styleHtmlContent.js";
import { Loader2 } from "lucide-react";
import {
  createComment,
  getComments,
  likeUnlikeComment,
} from "@/api/comments.js";

function PostPage() {
  const { postId } = useParams();
  const { error, loading, post, setPost } = usePost(postId);

  async function handleAddComment(username, content) {
    try {
      const data = await createComment(postId, username, content);
      setPost({ ...post, comments: [...post.comments, data] });
    } catch (error) {
      console.log(error);
    }
  }

  async function handleLikeUnlikeComment(commentId, liked = "true") {
    try {
      const commentIndex = post.comments.findIndex(
        (comment) => comment.id === commentId,
      );
      const commentsDuplicate = [...post.comments];
      commentsDuplicate[commentIndex] = {
        ...commentsDuplicate[commentIndex],
        likes:
          liked === "true"
            ? commentsDuplicate[commentIndex].likes + 1
            : commentsDuplicate[commentIndex].likes - 1,
      };
      setPost({ ...post, comments: commentsDuplicate });
      await likeUnlikeComment(postId, commentId, liked);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSortComments(sortValue = "asc") {
    try {
      const data = await getComments(postId, sortValue);
      setPost({ ...post, comments: data });
    } catch (error) {
      console.log(error);
    }
  }

  if (loading)
    return (
      <div>
        <div className="min-h-[90vh] flex justify-center items-center">
          <Loader2 className="animate-spin" width={50} height={50} />
        </div>
      </div>
    );

  if (error) return <div>Error!</div>;

  const postHtml = styleHtmlContent(post.content);

  return (
    <>
      <Header />
      <main className="mx-auto max-w-[768px] p-6 max-md:px-0 flex flex-col gap-6 md:text-left lg:py-[30px]">
        <div>
          <h2 className="author text-center tracking-wider">
            {post.author.username} - {convertTimestamp(post.updatedAt)}
          </h2>
          <h1 className="font-serif font-black text-center tracking-wider text-4xl max-sm:text-[34px] p-2">
            {post.title}
          </h1>
        </div>

        <div className="flex items-center justify-center overflow-hidden max-h-[400px]">
          <img src={post.imageUrl} alt="hero image" />
        </div>

        <div
          className="blog-content flex flex-col gap-4 max-md:px-6"
          dangerouslySetInnerHTML={{ __html: postHtml }}
        />
      </main>
      <section className="flex flex-col gap-4 max-w-[800px] mx-auto px-10 py-4 bg-gray-100 rounded-xl">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-xl">Comments</h2>
          <div className="flex items-center gap-2">
            <SortComments handleSortComments={handleSortComments} />
            <AddComment handleAddComment={handleAddComment} />
          </div>
        </div>
        {post.comments.map((comment) => (
          <Comment
            key={comment.id}
            {...comment}
            handleLikeUnlikeComment={handleLikeUnlikeComment}
          />
        ))}
      </section>
      <Footer />
    </>
  );
}

export default PostPage;
