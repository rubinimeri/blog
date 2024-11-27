import * as z from "zod";
import Comment from "@/pages/Admin/Comment.jsx";
import sanitizeField from "@/utils/sanitize.js";
import TinyEditor from "@/pages/Admin/TinyEditor.jsx";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/posts/${post.id}/messages?sortValue=asc`,
          {
            method: "GET",
            headers: {
              Authorization: `bearer ${token}`,
              "Content-type": "application/json",
            },
          },
        );

        const data = await response.json();
        setMessages(data);
      } catch (err) {
        console.log(err);
        toast({
          title: "Error fetching comments!",
          description: err.message,
        });
      } finally {
        setLoading(false);
      }
    };
    getMessages();
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
        `${import.meta.env.VITE_BASE_URL}/posts/${post.id}/messages/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      setMessages(messages.filter((message) => message.id !== data.id));

      toast({
        title: "Message successfully deleted!",
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
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thumbnail</FormLabel>
              <div className="flex items-center">
                <AlertDialog>
                  <AlertDialogTrigger>
                    <div className="flex aspect-video h-9">
                      <img
                        src={post.imageUrl}
                        alt="image"
                        width={50}
                        className="rounded-sm"
                      />
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <div className="flex">
                      <img src={post.imageUrl} alt="file preview" />
                    </div>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Close</AlertDialogCancel>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <FormControl>
                  <Input
                    type="file"
                    onChange={(e) => form.setValue("file", e.target.files)}
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
        {messages && (
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Comments</AccordionTrigger>
              <AccordionContent>
                {messages.map((message) => (
                  <Comment
                    key={message.id}
                    {...message}
                    handleDelete={handleDeleteComment}
                  />
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
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

export default EditPost;
