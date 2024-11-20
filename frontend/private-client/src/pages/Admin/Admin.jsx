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

function Admin() {
  const {
    loading,
    user,
    user: { posts },
  } = useContext(UserContext);
  console.log(posts);

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
      <Tabs defaultValue="posts" className="max-w-[800px] mx-auto">
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
            <CardContent>Content</CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle>Create Post</CardTitle>
              <CardDescription>Create a new post here.</CardDescription>
            </CardHeader>
            <CardContent>Content</CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}

export default Admin;
