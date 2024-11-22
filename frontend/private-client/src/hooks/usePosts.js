import { useEffect, useState } from "react";

const usePosts = (
  pageNumber = 1,
  sortValue = "createdAt",
  order = "asc",
  search = "",
) => {
  const [posts, setPosts] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  const queries = new URLSearchParams({
    page: pageNumber,
    sort: sortValue,
    order,
    search,
  }).toString();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/posts/all?${queries}`, {
      method: "GET",
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const { posts, metadata } = data;
        setPosts(posts);
        setMetadata(metadata);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [queries]);

  return { loading, error, posts, setPosts, metadata };
};

export default usePosts;
