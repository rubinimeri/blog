import Header from "@/components/Header.jsx";
import { useContext, useState } from "react";
import { UserContext } from "@/UserProvider.jsx";
import {
  Tabs,
  TabsList,
  TabsContent,
  TabsTrigger,
} from "@/components/ui/tabs.jsx";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card.jsx";
import PostsTable from "@/pages/Admin/PostsTable.jsx";
import CreatePostForm from "@/pages/Admin/CreatePostForm.jsx";
import EditPost from "@/pages/Admin/EditPost.jsx";
import { Loader2 } from "lucide-react";

function Admin() {
  const { loading, user, setUser } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState("posts");
  const [selectedPost, setSelectedPost] = useState(null);

  if (loading)
    return (
      <div>
        <Header />
        <div className="min-h-[85vh] flex justify-center items-center">
          <Loader2 className="animate-spin" width={50} height={50} />
        </div>
      </div>
    );
  if (!user)
    return (
      <div>
        Unauthorized! <a href="/">Login or Sign Up</a>
      </div>
    );

  return (
    <>
      <Header user={user} />
      <main className="p-4">
        <Tabs
          onValueChange={setActiveTab}
          value={activeTab}
          className={`${activeTab === "posts" ? "max-w-[1200px]" : "max-w-[800px]"} mx-auto mt-8 shadow-lg dark:shadow-slate-800`}
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
          <TabsContent value="posts">
            <Card>
              <CardHeader>
                <CardTitle>Posts</CardTitle>
                <CardDescription>
                  All your published & un-published posts here.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PostsTable
                  switchTab={setActiveTab}
                  setSelectedPost={setSelectedPost}
                  posts={user.posts}
                  author={user.username}
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="create">
            <Card>
              <CardHeader>
                <CardTitle>Create Post</CardTitle>
                <CardDescription>Create a new post here.</CardDescription>
              </CardHeader>
              <CardContent>
                <CreatePostForm
                  username={user.username}
                  switchTab={() => setActiveTab("posts")}
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="edit">
            <Card>
              <CardHeader>
                <CardTitle>Edit Post</CardTitle>
                <CardDescription>Edit a post here.</CardDescription>
              </CardHeader>
              <CardContent>
                {selectedPost && (
                  <EditPost
                    post={selectedPost}
                    setActiveTab={setActiveTab}
                    setSelectedPost={setSelectedPost}
                    setUser={setUser}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}

export default Admin;
