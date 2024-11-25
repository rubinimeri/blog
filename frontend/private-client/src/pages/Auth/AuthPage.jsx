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
import { Loader2 } from "lucide-react";

function AuthPage() {
  const { loading, user } = useContext(UserContext);

  if (loading)
    return (
      <div>
        <Header />
        <div className="min-h-[85vh] flex justify-center items-center">
          <Loader2 className="animate-spin" width={50} height={50} />
        </div>
      </div>
    );
  if (user) return window.location.assign("/admin/1");
  return (
    <>
      <Header />
      <main className="min-h-[85vh] flex justify-center items-center">
        <Tabs defaultValue="login" className="w-[400px]">
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
