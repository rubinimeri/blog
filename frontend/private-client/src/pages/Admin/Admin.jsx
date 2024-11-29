import Header from "@/components/Header.jsx";
import PostsTableTab from "@/pages/Admin/PostsTable/PostsTableTab.jsx";
import PostsTable from "@/pages/Admin/PostsTable/PostsTable.jsx";
import EditPostTab from "@/pages/Admin/EditPost/EditPostTab.jsx";
import CreatePostTab from "@/pages/Admin/CreatePost/CreatePostTab.jsx";
import CreatePostForm from "@/pages/Admin/CreatePost/CreatePostForm.jsx";
import EditPost from "@/pages/Admin/EditPost/EditPost.jsx";
import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import usePosts from "@/hooks/usePosts.js";
import { Loader2 } from "lucide-react";

import { UserContext } from "@/UserProvider.jsx";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs.jsx";

function Admin() {
  const navigate = useNavigate();
  const { page } = useParams();
  const [sortValue, setSortValue] = useState("createdAt");
  const [order, setOrder] = useState("asc");
  const [search, setSearch] = useState("");
  const { postsLoading, posts, setPosts } = usePosts(sortValue, order, search);
  const { loading, user, setUser } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState("posts");
  const [selectedPost, setSelectedPost] = useState(null);

  if (loading || postsLoading)
    return (
      <div>
        <Header />
        <div className="min-h-[85vh] flex justify-center items-center">
          <Loader2 className="animate-spin" width={50} height={50} />
        </div>
      </div>
    );

  if (!user) return navigate("/");

  const pageSize = 6;
  const currentPage = Math.max(1, Number(page));
  const skip = (page - 1) * pageSize;
  const totalPages = Math.ceil(posts.length / pageSize);

  const metadata = {
    currentPage,
    totalPages,
  };

  const paginatedPosts = posts.slice(skip, skip + pageSize);
  return (
    <>
      <Header user={user} />
      <main className="p-4">
        <Tabs
          onValueChange={setActiveTab}
          value={activeTab}
          className={`${activeTab === "posts" ? "max-w-[1200px]" : "max-w-[800px]"} mx-auto mt-8 shadow-lg transition-all duration-500 ease`}
        >
          <TabsList className="w-full flex">
            <TabsTrigger className="flex-1" value="posts">
              Posts
            </TabsTrigger>
            <TabsTrigger className="flex-1" value="create">
              Create Post
            </TabsTrigger>
            <TabsTrigger
              disabled={!selectedPost}
              className="flex-1"
              value="edit"
            >
              Edit Post
            </TabsTrigger>
          </TabsList>
          <PostsTableTab
            setSortValue={setSortValue}
            setOrder={setOrder}
            setSearch={setSearch}
            metadata={metadata}
          >
            <PostsTable
              switchTab={setActiveTab}
              setSelectedPost={setSelectedPost}
              posts={paginatedPosts}
              setPosts={setPosts}
              author={user.username}
            />
          </PostsTableTab>
          <CreatePostTab>
            <CreatePostForm
              setPosts={setPosts}
              switchTab={() => setActiveTab("posts")}
            />
          </CreatePostTab>
          <EditPostTab selectedPost={setSelectedPost}>
            {selectedPost && (
              <EditPost
                post={selectedPost}
                setPosts={setPosts}
                setActiveTab={setActiveTab}
                setSelectedPost={setSelectedPost}
                setUser={setUser}
              />
            )}
          </EditPostTab>
        </Tabs>
      </main>
    </>
  );
}

export default Admin;
