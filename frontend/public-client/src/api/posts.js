async function getPosts(sortValue = "createdAt", order = "asc", search = "") {
  const queries = new URLSearchParams({
    sortValue,
    order,
    search,
  }).toString();
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/posts?${queries}`,
    {
      method: "GET",
    },
  );
  return await response.json();
}

async function getPost(postId) {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/posts/${postId}`,
    {
      method: "GET",
    },
  );

  return await response.json();
}

export { getPosts, getPost };
