import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import EditPost from "@/pages/Admin/EditPost/EditPost.jsx";
import { TabsContent } from "@/components/ui/tabs.jsx";

function EditPostTab({ selectedPost, children }) {
  return (
    <TabsContent value="edit">
      <Card>
        <CardHeader>
          <CardTitle>Edit Post</CardTitle>
          <CardDescription>Edit a post here.</CardDescription>
        </CardHeader>
        <CardContent>{selectedPost && children}</CardContent>
      </Card>
    </TabsContent>
  );
}

export default EditPostTab;
