import { useEffect, useState } from "react";

const usePosts = (pageNumber, sortValue, order, search) => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const queries = new URLSearchParams({
    page: pageNumber,
    sort: sortValue,
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
      .finally(() => setLoading(false));
  }, [queries]);

  return { loading, error, posts };
};

export default usePosts;
