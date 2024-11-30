import { useEffect, useState } from "react";
import { getComments } from "@/api/comments.js";

const useComments = (postId) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchComments() {
      try {
        setComments(await getComments(postId));
      } catch (error) {
        console.log(error);
        setError("Error getting comments!");
      } finally {
        setLoading(false);
      }
    }
    fetchComments();
  }, [postId]);

  return { loading, error, comments };
};

export default useComments;
