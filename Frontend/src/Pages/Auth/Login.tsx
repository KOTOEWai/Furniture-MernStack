
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

import { loginFormSchema } from '@/lib/validation-schemas'
import { Link } from 'react-router-dom'
import { useLoginUserMutation } from '@/api/UserApi';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAppDispatch } from '@/hooks/redux';
import { setUser } from '@/store/slices/userSlice';
const formSchema = loginFormSchema

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loginUser] = useLoginUserMutation();
  const [message, setMessage] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const data = await loginUser({
        email: values.email,
        password: values.password
      }).unwrap();

      const { accessToken, ...user } = data.result;
      dispatch(setUser({ user, accessToken }));
      localStorage.setItem('wasLoggedIn', 'true');
      toast.success('Login successful!');
      navigate('/');
    } catch (error: any) {
      if (error.data?.errors && Array.isArray(error.data.errors)) {
        error.data.errors.forEach((err: any) => {
          form.setError(err.field as any, {
            type: 'manual',
            message: err.message
          });
        });
        setMessage("Please correct the errors highlighed below.");
      } else {
        const Err = error.data?.message || 'Failed to submit the form. Please try again.';
        setMessage(Err);
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-screen px-4">
      <Card className="max-w-sm mx-auto">
        <CardHeader>
          {message && (
            <div className="p-3 mb-2 text-sm text-white bg-red-500 rounded-md animate-in fade-in zoom-in duration-300">
              {message}
            </div>
          )}
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email and password to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-4">
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
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Link
                          to="#"
                          className="inline-block ml-auto text-sm underline"
                        >
                          Forgot your password?
                        </Link>
                      </div>
                      <FormControl>
                        <PasswordInput
                          id="password"
                          placeholder="******"
                          autoComplete="current-password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Login
                </Button>
                <Button variant="outline" className="w-full">
                  Login with Google
                </Button>
              </div>
            </form>
          </Form>
          <div className="mt-4 text-sm text-center">
            Don&apos;t have an account?{' '}
            <Link to="/Register" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
