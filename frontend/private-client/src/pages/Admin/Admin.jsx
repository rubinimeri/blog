import Header from "@/components/Header.jsx";
import useUser from "@/hooks/useUser.js";

function Admin() {
  const { loading, error, user } = useUser();

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error!</div>;

  return (
    <>
      <Header user={user} />
    </>
  );
}

export default Admin;
