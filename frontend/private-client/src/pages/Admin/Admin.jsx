import Header from "@/components/Header.jsx";
import { useContext } from "react";
import { UserContext } from "@/UserProvider.jsx";

function Admin() {
  const { loading, user } = useContext(UserContext);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Header user={user} />
    </>
  );
}

export default Admin;
