import Header from "@/components/Header.jsx";
import Footer from "@/components/Footer.jsx";
import PostList from "@/components/PostList.jsx";

import {
  Pagination,
  PaginationContent,
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
import { Loader2 } from "lucide-react";

function Pages({ metadata }) {
  const { currentPage, totalPages } = metadata;

  const nextPageUrl =
    currentPage + 1 <= totalPages
      ? `/all-posts/${currentPage + 1}`
      : `/all-posts/${currentPage}#`;

  const prevPageUrl =
    currentPage - 1 > 0
      ? `/all-posts/${currentPage - 1}`
      : `/all-posts/${currentPage}#`;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious to={prevPageUrl} />
        </PaginationItem>
        {Array.apply(null, Array(totalPages)).map((val, index) => (
          <PaginationItem key={index}>
            {currentPage === index + 1 ? (
              <PaginationLink to={`/all-posts/${index + 1}`} isActive>
                {index + 1}
              </PaginationLink>
            ) : (
              <PaginationLink to={`/all-posts/${index + 1}`}>
                {index + 1}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext to={nextPageUrl} />
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
          <SelectItem value="title">Name</SelectItem>
          <SelectItem value="createdAt">Date Added</SelectItem>
          <SelectItem value="messages">Comments</SelectItem>
        </SelectContent>
      </Select>
      <Select onValueChange={(value) => setOrder(value)}>
        <SelectTrigger className="w-[150px] max-md:w-[100px]">
          <SelectValue placeholder="Order" />
        </SelectTrigger>
        <SelectContent className="max-md:text-left">
          <SelectItem value="asc">Ascending</SelectItem>
          <SelectItem value="desc">Descending</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

function AllPosts() {
  const { pageNumber } = useParams();
  const [sortValue, setSortValue] = useState("createdAt");
  const [order, setOrder] = useState("asc");
  const [search, setSearch] = useState("");
  const { error, loading, posts } = usePosts(sortValue, order, search);

  if (loading)
    return (
      <div>
        <div className="min-h-[90vh] flex justify-center items-center">
          <Loader2 className="animate-spin" width={50} height={50} />
        </div>
      </div>
    );

  if (error) return <div>Error!</div>;

  const pageSize = 6;
  const currentPage = Math.max(1, Number(pageNumber));
  const skip = (pageNumber - 1) * pageSize;
  const totalPages = Math.ceil(posts.length / pageSize);

  const metadata = {
    currentPage,
    totalPages,
  };

  const paginatedPosts = posts.slice(skip, skip + pageSize);

  return (
    <>
      <Header />
      <main className="min-h-screen p-6 max-w-[1200px] mx-auto">
        <div className="flex flex-wrap justify-between items-center py-6 gap-6">
          <h1 className="text-3xl font-serif font-bold">All Posts</h1>
          <div className="flex items-center gap-2">
            <Sort setSortValue={setSortValue} setOrder={setOrder} />
            <form className="flex items-center gap-2">
              <Input type="search" placeholder="Search" className="max-w-xs" />
              <Button
                type="submit"
                size="sm"
                className="bg-blue-500 hover:bg-blue-900"
                onClick={(e) => {
                  e.preventDefault();
                  setSearch(e.target.previousSibling.value);
                }}
              >
                Search
              </Button>
            </form>
          </div>
        </div>
        <div className="flex flex-col justify-between min-h-screen">
          <PostList posts={paginatedPosts} />
          <Pages metadata={metadata} />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default AllPosts;
