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

function PostsTable({ author, posts }) {
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
            <TableCell className="text-right">
              <Switch />
            </TableCell>
            <TableCell className="text-right">
              <Link to={`/admin/${post.id}`}>Edit</Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={6}>Total Posts</TableCell>
          <TableCell className="text-right">{posts.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

export default PostsTable;
