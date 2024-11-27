async function getComments(postId) {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/posts/${postId}/comments?sortValue=asc`,
    {
      method: "GET",
      headers: {
        Authorization: `bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json",
      },
    },
  );

  return await response.json();
}

async function deleteComment(postId, commentId) {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/posts/${postId}/comments/${commentId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `bearer ${localStorage.getItem("token")}`,
      },
    },
  );

  return await response.json();
}

export { getComments, deleteComment };
