import SignUp from "@/pages/Auth/SignUp.jsx";
import Login from "@/pages/Auth/Login.jsx";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.jsx";
import { ModeToggle } from "@/components/mode-toggle.jsx";

function AuthPage() {
  return (
    <main className="h-screen flex justify-center items-center">
      <Tabs defaultValue="signUp" className="w-[400px]">
        <ModeToggle />
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
  );
}

export default AuthPage;
