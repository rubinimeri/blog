import Header from "@/components/Header";
import SignUp from "@/pages/Auth/SignUp.jsx";
import Login from "@/pages/Auth/Login.jsx";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.jsx";
import { useContext } from "react";
import { UserContext } from "@/UserProvider.jsx";

function AuthPage() {
  const { loading, user } = useContext(UserContext);

  if (loading) return <div>Loading...</div>;
  if (user) return <div>Unauthorized!</div>;
  return (
    <>
      <Header />
      <main className="min-h-[85vh] flex justify-center items-center">
        <Tabs defaultValue="signUp" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signUp">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Login />
          </TabsContent>
          <TabsContent value="signUp">
            <SignUp />
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}

export default AuthPage;
