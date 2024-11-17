import { useEffect, useState } from "react";

const usePost = (postId) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/posts/${postId}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setPost(data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [postId]);

  return { loading, error, post };
};

export default usePost;
