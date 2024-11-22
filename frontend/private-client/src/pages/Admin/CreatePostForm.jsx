import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Editor } from "@tinymce/tinymce-react";
import fileToBase64 from "@/utils/fileToBase64.js";
import { useContext, useState } from "react";
import { UserContext } from "@/UserProvider.jsx";
import { useToast } from "@/hooks/use-toast.js";

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  content: z.string().min(2, "Content must be at least 10 characters"),
  thumbnail: z.string(),
  isPublished: z.boolean().optional(),
});

function CreatePostForm({ username = "rubinimeri", switchTab }) {
  const { setUser } = useContext(UserContext);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      thumbnail: "",
      isPublished: false,
    },
  });

  async function onSubmit(values) {
    try {
      const { title, content, thumbnail, isPublished } = values;
      console.log(values);
      const token = localStorage.getItem("token");

      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/posts`, {
        method: "POST",
        headers: {
          Authorization: `bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          imageUrl: thumbnail,
          isPublished,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      const post = await response.json();
      setUser((user) => ({ ...user, posts: [post, ...user.posts] }));

      toast({
        title: "Successfully created post!",
        description: `Title: ${post.title}`,
      });
    } catch (error) {
      console.error("Form submission error", error);
      setError(error.message);
      toast({
        title: "Post creation failed!",
        description: error.message,
      });
    } finally {
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
                <Editor
                  apiKey="i5rsrjrwpbllzou5yuqw1rtujfjt38mah1rewmy9mqrrzq1b"
                  value={field.value}
                  onEditorChange={field.onChange}
                  init={{
                    plugins: [
                      "anchor",
                      "autolink",
                      "charmap",
                      "codesample",
                      "emoticons",
                      "image",
                      "link",
                      "lists",
                      "media",
                      "searchreplace",
                      "table",
                      "visualblocks",
                      "wordcount",
                      "checklist",
                      "mediaembed",
                      "casechange",
                      "export",
                      "formatpainter",
                      "pageembed",
                      "a11ychecker",
                      "tinymcespellchecker",
                      "permanentpen",
                      "powerpaste",
                      "advtable",
                      "advcode",
                      "editimage",
                      "advtemplate",
                      "ai",
                      "mentions",
                      "tinycomments",
                      "tableofcontents",
                      "footnotes",
                      "mergetags",
                      "autocorrect",
                      "typography",
                      "inlinecss",
                      "markdown",
                      "importword",
                      "exportword",
                      "exportpdf",
                    ],
                    toolbar:
                      "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                    tinycomments_mode: "embedded",
                    tinycomments_author: `${username}`,
                    mergetags_list: [
                      { value: "First.Name", title: "First Name" },
                      { value: "Email", title: "Email" },
                    ],
                    ai_request: (request, respondWith) =>
                      respondWith.string(() =>
                        Promise.reject("See docs to implement AI Assistant"),
                      ),
                    exportpdf_converter_options: {
                      format: "Letter",
                      margin_top: "1in",
                      margin_right: "1in",
                      margin_bottom: "1in",
                      margin_left: "1in",
                    },
                    exportword_converter_options: {
                      document: { size: "Letter" },
                    },
                    importword_converter_options: {
                      formatting: {
                        styles: "inline",
                        resets: "inline",
                        defaults: "inline",
                      },
                    },
                  }}
                  initialValue="Welcome to TinyMCE!"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="thumbnail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thumbnail</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  onChange={async (e) => {
                    const file = await fileToBase64(e.target.files?.[0]); // Get the selected file
                    field.onChange(file); // Manually update React Hook Form
                  }}
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
        <p> {error} </p>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default CreatePostForm;
