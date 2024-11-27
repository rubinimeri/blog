import * as z from "zod";
import CommentList from "@/pages/Admin/CommentList.jsx";
import ThumbnailPreview from "@/pages/Admin/ThumbnailPreview.jsx";
import TinyEditor from "@/pages/Admin/TinyEditor.jsx";
import sanitizeField from "@/utils/sanitize.js";
import fileToBase64 from "@/utils/fileToBase64.js";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast.js";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input.jsx";
import { Checkbox } from "@/components/ui/checkbox.jsx";
import { Button } from "@/components/ui/button.jsx";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.jsx";
import PropTypes from "prop-types";

const formSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .transform(sanitizeField),
  content: z
    .string()
    .min(2, "Content must be at least 10 characters")
    .transform(sanitizeField),
  file: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, {
      message: "At least one file is required",
    })
    .refine(
      (files) =>
        Array.from(files).every((file) => file.size <= 5 * 1024 * 1024),
      { message: "Each file must not exceed 5MB" },
    )
    .optional(),
  isPublished: z.boolean().optional(),
});

const decodeHTMLEntities = (html) => {
  const parser = new DOMParser();
  return parser.parseFromString(html, "text/html").body.textContent;
};

function EditPost({ post, setPosts, setActiveTab, setSelectedPost }) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [thumbnailUrl, setThumbnailUrl] = useState(post.imageUrl);

  useEffect(() => {
    const getComments = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/posts/${post.id}/comments?sortValue=asc`,
          {
            method: "GET",
            headers: {
              Authorization: `bearer ${token}`,
              "Content-type": "application/json",
            },
          },
        );

        const data = await response.json();
        setComments(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getComments();
  }, [post]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: post.title,
      content: decodeHTMLEntities(post.content),
      isPublished: post.isPublished,
    },
  });

  async function onSubmit(values) {
    try {
      setLoading(true);
      const { title, content, file, isPublished } = values;
      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("title", title);
      formData.append("content", content);
      formData.append("isPublished", isPublished ? "true" : "false");

      if (file) {
        formData.append("file", file[0]);
      }

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/posts/${post.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `bearer ${token}`,
          },
          body: formData,
        },
      );

      const data = await response.json();
      setPosts((posts) => [data, ...posts.filter((p) => p.id !== data.id)]);

      toast({
        title: "Successfully edited post!",
        description: `Title: ${post.title}`,
      });
    } catch (err) {
      console.error("Error editing post: ", err.message);
      toast({
        title: "Post edit failed!",
        description: err.message,
      });
    } finally {
      setLoading(false);
      setSelectedPost(null);
      setActiveTab("posts");
    }
  }

  async function handleDeleteComment(id) {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/posts/${post.id}/comments/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      setComments(comments.filter((comment) => comment.id !== data.id));

      toast({
        title: "Comment successfully deleted!",
        description: `Username: ${data.username}`,
      });
    } catch (err) {
      console.error("Error deleting post: ", err.message);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="..." type="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <TinyEditor value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={() => (
            <FormItem>
              <FormLabel>Thumbnail</FormLabel>
              <div className="flex items-center">
                <ThumbnailPreview imageUrl={thumbnailUrl} />
                <FormControl>
                  <Input
                    type="file"
                    onChange={async (e) => {
                      const files = e.target.files;
                      form.setValue("file", files);

                      const imageUrl = await fileToBase64(files[0]);
                      setThumbnailUrl(imageUrl);
                    }}
                  />
                </FormControl>
              </div>
              <FormDescription>Select an image to upload.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isPublished"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Publish post?</FormLabel>

                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        {comments && (
          <CommentList
            comments={comments}
            handleDeleteComment={handleDeleteComment}
          />
        )}
        <div className="flex items-center space-x-3">
          <Button type="submit" className="flex-1">
            {loading ? <Loader2 className="animate-spin" /> : "Submit"}
          </Button>
          <Button
            className="flex-1"
            variant="secondary"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab("posts");
              setSelectedPost(null);
            }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}

EditPost.propTypes = {
  post: PropTypes.object,
  setPosts: PropTypes.func,
  setActiveTab: PropTypes.func,
  setSelectedPost: PropTypes.func,
};

export default EditPost;
