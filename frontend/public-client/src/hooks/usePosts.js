import { useEffect, useState } from "react";

const usePosts = () => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/posts`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  return { loading, error, posts };
};

export default usePosts;
