async function getComments(postId, sortValue = "asc") {
  const queryParams = new URLSearchParams({ sortValue }).toString();
  const response = fetch(
    `${import.meta.env.VITE_BASE_URL}/posts/${postId}/comments?${queryParams}`,
    {
      method: "GET",
    },
  );

  return (await response).json();
}

async function createComment(postId, username, content) {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/posts/${postId}/comments`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        content,
        avatarUrl: "https://github.com/shadcn.png",
      }),
    },
  );

  return await response.json();
}

async function likeUnlikeComment(postId, commentId, liked) {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/posts/${postId}/comments/${commentId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        liked,
      }),
    },
  );

  return await response.json();
}

export { getComments, createComment, likeUnlikeComment };
