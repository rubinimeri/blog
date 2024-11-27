async function getPosts(query) {
  const queries = new URLSearchParams(query);

  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/posts/all?${queries}`,
    {
      method: "GET",
      headers: {
        Authorization: `bearer ${localStorage.getItem("token")}`,
      },
    },
  );

  return await response.json();
}

async function createPost({ title, content, file, isPublished }) {
  const formData = new FormData();

  formData.append("title", title);
  formData.append("content", content);
  formData.append("file", file[0]);
  formData.append("isPublished", isPublished ? "true" : "false");

  const response = await fetch(`${import.meta.env.VITE_BASE_URL}/posts`, {
    method: "POST",
    headers: {
      Authorization: `bearer ${localStorage.getItem("token")}`,
    },
    body: formData,
  });

  return await response.json();
}

async function editPost({ id, title, content, file, isPublished }) {
  const formData = new FormData();

  formData.append("title", title);
  formData.append("content", content);
  formData.append("isPublished", isPublished ? "true" : "false");

  if (file) {
    formData.append("file", file[0]);
  }

  const response = await fetch(`${import.meta.env.VITE_BASE_URL}/posts/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `bearer ${localStorage.getItem("token")}`,
    },
    body: formData,
  });

  return await response.json();
}

async function deletePost(postId) {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/posts/${postId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `bearer ${localStorage.getItem("token")}`,
      },
    },
  );

  return await response.json();
}

export { getPosts, createPost, editPost, deletePost };
