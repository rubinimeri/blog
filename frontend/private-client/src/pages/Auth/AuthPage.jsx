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
    <>
      <header className="flex items-center justify-center gap-2 p-4">
        <img
          src="/logo-dark.png"
          alt="logo"
          className="hidden dark:block"
          width={300}
        />
        <img
          src="/logo-light.png"
          alt="logo"
          className="block dark:hidden"
          width={300}
        />
        <ModeToggle />
      </header>
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
