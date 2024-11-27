import { loginSchema } from "@/utils/zodSchemas.js";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input.jsx";
import { Button } from "@/components/ui/button.jsx";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.jsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import { useState } from "react";
import { login } from "@/api/auth.js";

function Login() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    try {
      setLoading(true);
      const jwt = await login(values);
      localStorage.setItem("token", jwt);
      window.location.assign("/admin/1");
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleGuestLogin(e) {
    try {
      e.preventDefault();
      setLoading(true);
      const email = "guest@gmail.com";
      const password = "12345";

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        },
      );

      const jwt = await response.json();
      localStorage.setItem("token", jwt.token);
      window.location.assign("/admin/1");
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Login to existing account here.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 pb-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input placeholder="johndoe@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password *</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="..." {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                    {error && <p className="text-xs text-red-600">{error}</p>}
                  </FormItem>
                )}
              />
              <Button
                variant="link"
                className="pl-0 underline hover:no-underline mb-0 opacity-70"
                onClick={handleGuestLogin}
              >
                Login to guest account
              </Button>
            </CardContent>
            <CardFooter>
              <Button className="w-full" type="submit">
                {loading ? "Loading..." : "Login"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </>
  );
}

export default Login;
