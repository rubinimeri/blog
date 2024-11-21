import Header from "@/components/Header.jsx";
import { useContext } from "react";
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

function Admin() {
  const { loading, user } = useContext(UserContext);

  if (loading) return <div>Loading...</div>;
  if (!user)
    return (
      <div>
        Unauthorized! <a href="/">Login or Sign Up</a>
      </div>
    );

  return (
    <>
      <Header user={user} />
      <Tabs
        defaultValue="posts"
        className="max-w-[900px] mx-auto mt-8 shadow-xl dark:shadow-gray-800"
      >
        <TabsList className="w-full flex">
          <TabsTrigger className="flex-1" value="posts">
            Posts
          </TabsTrigger>
          <TabsTrigger className="flex-1" value="create">
            Create Post
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
              <PostsTable posts={user.posts} author={user.username} />
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
              <CreatePostForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}

export default Admin;
