import Header from "@/components/Header.jsx";
import Footer from "@/components/Footer.jsx";
import PostList from "@/components/PostList.jsx";
import Pages from "./Pages.jsx";
import Sort from "./Sort.jsx";
import usePosts from "@/hooks/usePosts.js";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Input } from "@/components/ui/input.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Loader2 } from "lucide-react";

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

  if (error)
    return (
      <main className="min-h-[80vh] grid place-items-center">
        <h1 className="text-center">{error}</h1>
      </main>
    );

  const pageSize = 6;
  const currentPage = Math.max(1, Number(pageNumber));
  const skip = (pageNumber - 1) * pageSize;
  const totalPages = Math.ceil(posts.length / pageSize);
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
          <Pages currentPage={currentPage} totalPages={totalPages} />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default AllPosts;
