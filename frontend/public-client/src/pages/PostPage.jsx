import Header from "@/components/Header.jsx";
import Footer from "@/components/Footer.jsx";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea.jsx";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.jsx";
import { useState } from "react";
import usePost from "@/hooks/usePost.js";
import { useParams } from "react-router-dom";
import convertTimestamp from "@/utils/convertTimestamp.js";

function Sort() {
  return (
    <Select>
      <SelectTrigger className="w-[150px] max-md:w-[100px]">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="oldest">Oldest</SelectItem>
        <SelectItem value="newest">Newest</SelectItem>
        <SelectItem value="likes">Likes</SelectItem>
      </SelectContent>
    </Select>
  );
}

export function AddComment() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>+ Comment</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a Comment</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" className="col-span-3" placeholder="John Doe" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            <Label htmlFor="comment" className="text-right">
              Comment
            </Label>
            <Textarea className="w-full col-span-3" placeholder="..." />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function Comment({ name, comment, createdAt }) {
  const [likeCount, setLikeCount] = useState(12);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
      setIsLiked(false);
    } else {
      setLikeCount(likeCount + 1);
      setIsLiked(true);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <Avatar className="w-8 h-8">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h3 className="font-[500]">Rubin Imeri</h3>
        <p className="text-sm text-gray-500">8 minutes ago</p>
      </div>
      <div className="ml-11 flex flex-col gap-3">
        <p>
          Hope you guys like this post! For a beginner like me I think it's
          decent
        </p>
        <div className="flex items-center gap-1">
          {isLiked ? (
            <img
              className={`cursor-pointer`}
              src="/heart-full.png"
              alt="like icon"
              width={16}
              onClick={handleLike}
            />
          ) : (
            <img
              className={`cursor-pointer ${isLiked && "hidden"}`}
              src="/heart.png"
              alt="like icon"
              width={16}
              onClick={handleLike}
            />
          )}
          <p className="text-xs">{likeCount}</p>
        </div>
      </div>
    </div>
  );
}

function PostPage() {
  const { postId } = useParams();
  const { error, loading, post } = usePost(postId);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error!</div>;

  const { username } = post.author;

  return (
    <>
      <Header />
      <main className="mx-auto max-w-[768px] p-6 max-md:px-0 flex flex-col gap-6 md:text-left lg:py-[30px]">
        <div>
          <h2 className="author text-center tracking-wider">
            {username} - {convertTimestamp(post.updatedAt)}
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
            <Sort />
            <AddComment />
          </div>
        </div>
        <Comment />
        <Comment />
        <Comment />
        <Comment />
      </section>
      <Footer />
    </>
  );
}

export default PostPage;
