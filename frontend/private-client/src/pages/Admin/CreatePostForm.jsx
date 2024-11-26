import TinyEditor from "@/pages/Admin/TinyEditor.jsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast.js";
import { Loader2 } from "lucide-react";
import * as z from "zod";
import sanitizeField from "@/utils/sanitize.js";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

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
    ),
  isPublished: z.boolean().optional(),
});

function CreatePostForm({ setPosts, switchTab }) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      isPublished: false,
    },
  });

  async function onSubmit(values) {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("title", values.title);
      formData.append("content", values.content);
      formData.append("file", values.file[0]);
      formData.append("isPublished", values.isPublished ? "true" : "false");

      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/posts`, {
        method: "POST",
        headers: {
          Authorization: `bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      const post = await response.json();
      console.log(post);
      setPosts((posts) => [post, ...posts]);

      toast({
        title: "Successfully created post!",
        description: `Title: ${post.title}`,
      });
    } catch (error) {
      console.error("Form submission error", error);
      toast({
        title: "Post creation failed!",
        description: error.message,
      });
    } finally {
      setLoading(false);
      switchTab();
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
              <FormControl>
                <Input
                  type="file"
                  onChange={(e) => form.setValue("file", e.target.files)}
                />
              </FormControl>
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
        <Button type="submit">
          {loading ? <Loader2 className="animate-spin" /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
}

export default CreatePostForm;
