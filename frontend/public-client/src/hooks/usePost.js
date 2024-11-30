import { useEffect, useState } from "react";
import { getPost } from "@/api/posts.js";

const usePost = (postId) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        setPost(await getPost(postId));
      } catch (error) {
        console.log(error);
        setError("Error fetching post!");
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [postId]);

  return { loading, error, post, setPost };
};

export default usePost;
