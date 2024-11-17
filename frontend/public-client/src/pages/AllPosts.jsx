import Header from "@/components/Header.jsx";
import Footer from "@/components/Footer.jsx";
import PostList from "@/components/PostList.jsx";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input.jsx";
import { Button } from "@/components/ui/button.jsx";
import usePosts from "@/hooks/usePosts.js";
import { useState } from "react";
import { useParams } from "react-router-dom";

function Pages() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

function Sort({ setSortValue, setOrder }) {
  return (
    <div className="flex items-center gap-2 my-auto">
      <Select onValueChange={(value) => setSortValue(value)}>
        <SelectTrigger className="w-[150px] max-md:w-[100px]">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="name">Name</SelectItem>
          <SelectItem value="dateAdded">Date Added</SelectItem>
          <SelectItem value="comments">Comments</SelectItem>
        </SelectContent>
      </Select>
      <Select onValueChange={(value) => setOrder(value)}>
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
  const { pageNumber } = useParams();
  const [sortValue, setSortValue] = useState("");
  const [order, setOrder] = useState("");
  const [search, setSearch] = useState("");
  const { error, loading, posts } = usePosts(
    pageNumber,
    sortValue,
    order,
    search,
  );

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error!</div>;

  return (
    <>
      <Header />
      <main className="min-h-screen p-6 max-w-[1200px] mx-auto">
        <div className="flex flex-wrap justify-between items-center py-6 gap-6">
          <h1 className="text-3xl font-serif font-bold">All Posts</h1>
          <div className="flex items-center gap-2">
            <Sort setSortValue={setSortValue} setOrder={setOrder} />
            <Input
              onChange={(e) => setSearch(e.target.value)}
              type="search"
              placeholder="Search"
              className="max-w-xs"
            />
            <Button size="sm" className="bg-blue-500 hover:bg-blue-900">
              Search
            </Button>
          </div>
        </div>
        <div className="flex flex-col justify-between min-h-screen">
          <PostList posts={posts} />
          <Pages />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default AllPosts;
