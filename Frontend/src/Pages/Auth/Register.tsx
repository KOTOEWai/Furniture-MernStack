
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { useCreateUserMutation } from '@/api/UserApi';
import { registerFormSchema } from '@/lib/validation-schemas'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/hooks/redux';
import { setUser } from '@/store/slices/userSlice'
import { useState } from 'react';
const formSchema = registerFormSchema

export default function Register() {
  const navigate = useNavigate();
  const [createUser] = useCreateUserMutation();
  const [message, setMessage] = useState("");
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const data = await createUser({
        username: values.username,
        email: values.email,
        password: values.password
      }).unwrap();
      console.log(data);

      const { accessToken, ...user } = data.result;
      dispatch(setUser({ user, accessToken }));
      localStorage.setItem('wasLoggedIn', 'true');
      toast.success("Registration successful!");
      navigate('/');
    } catch (error: any) {
      if (error.data?.errors && Array.isArray(error.data.errors)) {
        // Validation errors (Zod issues)
        error.data.errors.forEach((err: any) => {
          // err.field reflects the key name (username, email, etc.)
          form.setError(err.field as any, {
            type: 'manual',
            message: err.message
          });
        });
        setMessage("Please correct the errors highlighed below.");
      } else {
        // General errors (e.g. "User already exists")
        const Err = error.data?.message || 'Failed to submit the form. Please try again.';
        setMessage(Err);
      }
    }
  }

  return (
    <div className="flex items-center justify-center w-full h-full min-h-screen px-4">
      <Card className="max-w-sm mx-auto">
        <CardHeader>
          {message && (
            <div className="p-3 mb-2 text-sm text-white duration-300 bg-red-500 rounded-md animate-in fade-in zoom-in">
              {message}
            </div>
          )}
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>
            Create a new account by filling out the form below.
          </CardDescription>
        </CardHeader>
        <CardContent>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-4">
                {/* Name Field */}
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="username">Full Name</FormLabel>
                      <FormControl>
                        <Input id="username" placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          placeholder="johndoe@mail.com"
                          type="email"
                          autoComplete="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />



                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <FormControl>
                        <PasswordInput
                          id="password"
                          placeholder="******"
                          autoComplete="new-password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Confirm Password Field */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="confirmPassword">
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <PasswordInput
                          id="confirmPassword"
                          placeholder="******"
                          autoComplete="new-password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Register
                </Button>
              </div>
            </form>
          </Form>
          <div className="mt-4 text-sm text-center">
            Already have an account?{' '}
            <Link to="/Login" className="underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
