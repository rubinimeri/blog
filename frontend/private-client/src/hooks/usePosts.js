import { useEffect, useState } from "react";

const usePosts = (sortValue = "createdAt", order = "asc", search = "") => {
  const [posts, setPosts] = useState(null);
  const [postsLoading, setPostsLoading] = useState(true);
  const [error, setError] = useState(null);

  const queries = new URLSearchParams({
    sortValue,
    order,
    search,
  }).toString();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/posts?${queries}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((error) => setError(error))
      .finally(() => setPostsLoading(false));
  }, [queries]);

  return { postsLoading, error, posts, setPosts };
};

export default usePosts;
