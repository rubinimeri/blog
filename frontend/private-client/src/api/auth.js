async function login({ email, password }) {
  const response = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error("Username or password is incorrect");
  }

  const jwt = await response.json();
  return jwt.token;
}

async function signUp({ username, email, password, confirmPassword }) {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/auth/sign-up`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
        confirmPassword,
      }),
    },
  );
  const jwt = await response.json();
  return jwt.token;
}

export { login, signUp };
