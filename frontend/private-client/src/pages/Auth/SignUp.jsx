import { signUpSchema } from "@/utils/zodSchemas.js";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input.jsx";
import { Button } from "@/components/ui/button.jsx";
import {
  Form,
  FormControl,
  FormDescription,
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
import { useNavigate } from "react-router-dom";
import { signUp } from "@/api/auth.js";

function SignUp() {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values) {
    try {
      const jwt = await signUp(values);
      localStorage.setItem("token", jwt.token);
      navigate("/admin/1");
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>Create an account here.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username *</FormLabel>
                    <FormControl>
                      <Input placeholder="johndoe" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
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
                      <Input
                        type="password"
                        placeholder="Must contain atleast 5 characters"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password *</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="..." {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button className="w-full" type="submit">
                Sign Up
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </>
  );
}

export default SignUp;
