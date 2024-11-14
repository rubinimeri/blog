import Header from "@/components/Header.jsx";
import Footer from "@/components/Footer.jsx";
import PostList from "@/components/PostList.jsx";
import posts from "@/utils/exampleData.js";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input.jsx";

function Sort() {
  return (
    <div className="flex items-center gap-2">
      <Select>
        <SelectTrigger className="w-[150px] max-md:w-[100px]">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="name">Name</SelectItem>
          <SelectItem value="dateAdded">Date Added</SelectItem>
          <SelectItem value="comments">Comments</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-[150px] max-md:w-[100px]">
          <SelectValue placeholder="Order" />
        </SelectTrigger>
        <SelectContent className="max-md:text-left">
          <SelectItem value="ascending">Ascending</SelectItem>
          <SelectItem value="descending">Descending</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

function AllPosts() {
  return (
    <>
      <Header />
      <main className="p-6 max-w-[1200px] mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="font-serif font-bold">All Posts</h1>
          <Input type="search" placeholder="Search" className="max-w-xs" />
          <Sort />
        </div>
        <PostList posts={posts} />
      </main>
      <Footer />
    </>
  );
}

export default AllPosts;
