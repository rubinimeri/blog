import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function useUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/users/user`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }

        const data = await response.json();
        console.log(data);
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
        setError(error);
        navigate("/"); // Navigate if fetching the user fails
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  return { error, loading, user };
}

export default useUser;
