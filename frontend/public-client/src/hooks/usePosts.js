import { useEffect, useState } from "react";
import { getPosts } from "@/api/posts.js";

const usePosts = (sortValue = "createdAt", order = "asc", search = "") => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setPosts(await getPosts(sortValue, order, search));
      } catch (error) {
        console.log(error);
        setError("Error getting posts!");
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, [sortValue, order, search]);

  return { loading, error, posts };
};

export default usePosts;
