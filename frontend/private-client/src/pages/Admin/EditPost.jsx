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
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input.jsx";
import { Editor } from "@tinymce/tinymce-react";
import fileToBase64 from "@/utils/fileToBase64.js";
import { Checkbox } from "@/components/ui/checkbox.jsx";
import { Button } from "@/components/ui/button.jsx";
import * as z from "zod";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/UserProvider.jsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Comment from "@/pages/Admin/Comment.jsx";
import { useToast } from "@/hooks/use-toast.js";

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  content: z.string().min(2, "Content must be at least 10 characters"),
  thumbnail: z.string(),
  isPublished: z.boolean().optional(),
});

function EditPost({ post, setActiveTab, setSelectedPost }) {
  const { setUser } = useContext(UserContext);
  const { toast } = useToast();
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const getMessages = async () => {
      try {
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
      }
    };
    getMessages();
  }, [post]);

  console.log(messages);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: post.title,
      content: post.content,
      thumbnail: post.imageUrl,
      isPublished: post.isPublished,
    },
  });

  async function onSubmit(values) {
    try {
      const { title, content, thumbnail, isPublished } = values;
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/posts/${post.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            content,
            imageUrl: thumbnail,
            isPublished: isPublished ? "true" : "false",
          }),
        },
      );

      const data = await response.json();
      setUser((user) => ({
        ...user,
        posts: [data, ...user.posts.filter((p) => p.id !== post.id)],
      }));

      toast({
        title: "Successfully edited post!",
        description: `Title: ${post.title}`,
      });
    } catch (err) {
      console.error("Error editing post: ", err.message);
      setError("Error editing post!");
      toast({
        title: "Post edit failed!",
        description: err.message,
      });
    } finally {
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
                    tinycomments_author: `${post.author}`,
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
                  initialValue={field.value}
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
              <div className="flex items-center">
                <AlertDialog>
                  <AlertDialogTrigger>
                    <div className="flex aspect-video h-9">
                      <img
                        src={field.value}
                        alt="thumbnail"
                        width={50}
                        className="rounded-sm"
                      />
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <div className="flex">
                      <img src={field.value} alt="thumbnail preview" />
                    </div>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Close</AlertDialogCancel>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <FormControl>
                  <Input
                    type="file"
                    onChange={async (e) => {
                      const file = await fileToBase64(e.target.files?.[0]); // Get the selected file
                      field.onChange(file); // Manually update React Hook Form
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
        {error && (
          <p className="font-bold text-xs text-destructive"> {error} </p>
        )}
        <div className="flex items-center space-x-3">
          <Button className="flex-1" type="submit">
            Submit
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
