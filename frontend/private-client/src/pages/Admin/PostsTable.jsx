import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import convertTimestamp from "@/utils/convertTimestamp.js";
import { Link } from "react-router-dom";
import { Switch } from "@/components/ui/switch.jsx";
import { SquarePen, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import { useContext } from "react";
import { UserContext } from "@/UserProvider.jsx";

function PostsTable({ author, posts, setSelectedPost, switchTab }) {
  const { setUser } = useContext(UserContext);

  async function handleDelete(e) {
    try {
      const { id } = e.target;
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/posts/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete post");
      }

      setUser((user) => ({
        ...user,
        posts: posts.filter((post) => post.id !== id),
      }));
    } catch (error) {
      console.error("Error deleting post", error);
    }
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Image</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Author</TableHead>
          <TableHead>Created</TableHead>
          <TableHead>Updated</TableHead>
          <TableHead>Published</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          <TableRow key={post.id}>
            <TableCell>
              <img
                className="rounded-sm"
                src={post.imageUrl}
                alt="image"
                width={30}
              />
            </TableCell>
            <TableCell>{post.title}</TableCell>
            <TableCell className="font-semibold">{author}</TableCell>
            <TableCell>{convertTimestamp(post.createdAt)}</TableCell>
            <TableCell>{convertTimestamp(post.updatedAt)}</TableCell>
            <TableCell className="">
              <Switch checked={post.isPublished} />
            </TableCell>
            <TableCell className="text-right">
              <Button
                variant="link"
                onClick={() => {
                  setSelectedPost(post);
                  switchTab("edit");
                }}
              >
                Edit
                <SquarePen width={14} />
              </Button>
            </TableCell>
            <TableCell className="text-right">
              <Button
                className="align-middle rounded-md h-min px-1 py-1"
                variant={"destructive"}
                id={post.id}
                onClick={handleDelete}
              >
                <Trash2 />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={7}>Total Posts</TableCell>
          <TableCell className="text-right">{posts.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

export default PostsTable;
