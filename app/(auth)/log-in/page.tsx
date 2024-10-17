"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Axios } from "@/utils/AxiosConfig";
import { Toaster, toast } from "sonner";
import { useTheme } from "next-themes";
import Cookies from "js-cookie";
import { FaCheckCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const formSchema = z.object({
  email: z.string().min(2, {
    message: "❗ Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "❗ Password must be at least 6 characters.",
  }),
});

const formSchema2 = z.object({
  email: z.string().min(2, {
    message: "❗ Email must be at least 2 characters.",
  }),
});

const LogIn = () => {
  const { resolvedTheme } = useTheme();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const form2 = useForm<z.infer<typeof formSchema2>>({
    resolver: zodResolver(formSchema2),
    defaultValues: {
      email: "",
    },
  });

  // Login function

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // Display a loading toast
    const loadingToastId = toast.warning("Loading...", {
      icon: <div className="spinner" />, // Custom spinner or loading indicator
      duration: Infinity, // Keep it visible until dismissed
    });

    try {
      const req = await Axios.post("/user/sign-in", data);
      const res = (await req.data) as UserLoginResponse;

      if (req.status === 200) {
        toast.dismiss(loadingToastId); // Dismiss the loading toast

        Cookies.set("ds-user-token", res.authToken, { expires: 15 });

        toast.success("Success! Welcome back!", {
          icon: <FaCheckCircle size={15} />, // Custom spinner or loading indicator
        });

        // Redirect to /log-in after 2 seconds
        setTimeout(() => {
          router.replace("/home");
        }, 2000);

        return;
      }
    } catch (error: any) {
      console.log(error);

      toast.dismiss(loadingToastId); // Dismiss the loading toast

      return toast.error(error.response.data.message);
    }
  };

  // Forget Password

  const onPasswordForget = async (data: z.infer<typeof formSchema2>) => {
    // Display a loading toast
    const loadingToastId = toast.warning("Loading...", {
      icon: <div className="spinner" />, // Custom spinner or loading indicator
      duration: Infinity, // Keep it visible until dismissed
    });

    try {
      const req = await Axios.post("/user/forget-password", data);
      const res = (await req.data) as UserLoginResponse;

      if (req.status === 200) {
        toast.dismiss(loadingToastId); // Dismiss the loading toast

        toast.success("Email sent!", {
          icon: <FaCheckCircle size={15} />, // Custom spinner or loading indicator
        });
      }
    } catch (error: any) {
      console.log(error);

      toast.dismiss(loadingToastId); // Dismiss the loading toast

      return toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <title>Log In - Disaster Scans</title>
      <div className="w-full h-screen">
        <Toaster
          closeButton
          richColors
          expand={false}
          theme={resolvedTheme === "dark" ? "dark" : "light"} // Dynamically set theme based on the current Tailwind theme
          visibleToasts={1}
        />
        <div className="flex h-full w-full items-center justify-center flex-col px-6 py-12 shadow-md lg:px-12 shrink-0 lg:min-w-[540px]">
          <div className="flex flex-col items-center justify-center">
            <Image
              loading="lazy"
              src={"/logo.png"}
              width={150}
              height={100}
              alt="logo"
              className="w-28 object-contain"
            />
            <h2 className="mt-2 text-center text-lg lg:text-2xl font-bold text-foreground">
              Sign in to your account
            </h2>
            <span className="text-muted-foreground text-center">
              Enter your email or username below to log into your account.
            </span>
          </div>

          <div className="lg:min-w-[420px] mt-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="example@example.com" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Submit
                </Button>
              </form>
            </Form>

            {/* Divider */}

            <div className="border-[1px]  justify-center border-neutral-400 w-full my-3" />

            <p className="text-center text-neutral-400">
              Not a user?{" "}
              <Link href={"/register"} className="text-white">
                Register yourself now
              </Link>
            </p>

            <div className="items-center justify-center flex mt-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant={"outline"} className="">
                    I forgot my Password
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Password Recovery</DialogTitle>
                    <DialogDescription>
                      Insert your email and we will send you a link to reset
                      your password.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                      <Form {...form2}>
                        <form
                          onSubmit={form2.handleSubmit(onPasswordForget)}
                          className="space-y-5 flex flex-col"
                        >
                          <FormField
                            control={form2.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="example@example.com"
                                    {...field}
                                  />
                                </FormControl>

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button type="submit" className="self-end max-w-24">
                            Send e-mail
                          </Button>
                        </form>
                      </Form>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIn;
