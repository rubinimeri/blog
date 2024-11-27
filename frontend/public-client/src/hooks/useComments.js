import { useEffect, useState } from "react";

const useComments = (postId) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/posts/${postId}/comments`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setComments(data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [postId]);

  return { loading, error, comments };
};

export default useComments;
