import Header from "@/components/Header.jsx";
import Footer from "@/components/Footer.jsx";
import Comment from "@/pages/PostPage/Comment.jsx";
import AddComment from "@/pages/PostPage/AddComment.jsx";
import usePost from "@/hooks/usePost.js";
import convertTimestamp from "@/utils/convertTimestamp.js";
import { useState } from "react";
import { useParams } from "react-router-dom";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.jsx";

function Sort({ handleSortComments }) {
  return (
    <Select onValueChange={handleSortComments}>
      <SelectTrigger className="w-[150px] max-md:w-[100px]">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="asc">Oldest</SelectItem>
        <SelectItem value="desc">Newest</SelectItem>
        <SelectItem value="likes">Likes</SelectItem>
      </SelectContent>
    </Select>
  );
}

function PostPage() {
  const { postId } = useParams();
  const { error, loading, post, setPost } = usePost(postId);

  function handleAddComment(username, content) {
    console.log(username, content);
    fetch(`${import.meta.env.VITE_BASE_URL}/posts/${postId}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        content,
        avatarUrl: "https://github.com/shadcn.png",
      }),
    })
      .then((res) => res.json())
      .then((data) => setPost({ ...post, messages: [...post.messages, data] }));
  }

  function handleLikeUnlikeComment(messageId, operation = "like") {
    fetch(
      `${import.meta.env.VITE_BASE_URL}/posts/${postId}/messages/${operation}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messageId,
        }),
      },
    )
      .then((res) => res.json())
      .then((data) => {
        const commentIndex = post.messages.findIndex(
          (message) => message.id === messageId,
        );
        const messagesDuplicate = [...post.messages];
        messagesDuplicate[commentIndex] = data;
        setPost({ ...post, messages: messagesDuplicate });
      });
  }

  function handleSortComments(sortValue = "asc") {
    const queryParams = new URLSearchParams({ sortValue }).toString();
    fetch(
      `${import.meta.env.VITE_BASE_URL}/posts/${postId}/messages?${queryParams}`,
      {
        method: "GET",
      },
    )
      .then((res) => res.json())
      .then((data) => setPost({ ...post, messages: data }));
  }

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error!</div>;

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

        <div className="flex flex-col gap-4 max-md:px-6">
          <h2 className="font-bold text-xl">Lorem Ipsum Dolor Sit Amet</h2>
          <p className="text-gray-600">{post.content}</p>

          <h2 className="font-bold text-xl">Lorem Ipsum Dolor Sit Amet</h2>
          <p className="text-gray-600">{post.content}</p>

          <h2 className="font-bold text-xl">Lorem Ipsum Dolor Sit Amet</h2>
          <p className="text-gray-600">{post.content}</p>

          <h2 className="font-bold text-xl">Lorem Ipsum Dolor Sit Amet</h2>
          <p className="text-gray-600">{post.content}</p>
        </div>
      </main>
      <section className="flex flex-col gap-4 max-w-[800px] mx-auto px-10 py-4 bg-gray-100 rounded-xl">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-xl">Comments</h2>
          <div className="flex items-center gap-2">
            <Sort handleSortComments={handleSortComments} />
            <AddComment handleAddComment={handleAddComment} />
          </div>
        </div>
        {post.messages.map((comment) => (
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
