"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Toaster, toast } from "sonner";
import { FaCheckCircle } from "react-icons/fa";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Axios } from "@/utils/AxiosConfig";

const formSchema = z
  .object({
    userName: z.string().min(2, {
      message: "❗ Username must be at least 2 characters.",
    }),
    email: z.string().min(2, {
      message: "❗ Username must be at least 2 characters.",
    }),
    password: z.string().min(6, {
      message: "❗ Password must be at least 6 characters.",
    }),
    confirmPassword: z.string().min(6, {
      message: "❗ Password must be at least 6 characters.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "❗ Passwords must match.",
    path: ["confirmPassword"], // Specify the path where the error should appear
  });

const Register = () => {
  const { resolvedTheme } = useTheme();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const loadingToastId = toast.warning("Loading...", {
      icon: <div className="spinner" />, // Custom spinner or loading indicator
      duration: Infinity, // Keep it visible until dismissed
    });

    try {
      const req = await Axios.post("/user/register", data);
      const res = await req.data;

      if (req.status === 201) {
        toast.dismiss(loadingToastId); // Dismiss the loading toast

        toast.success("Account Created!", {
          icon: <FaCheckCircle size={15} />, // Custom spinner or loading indicator
        });

        // Redirect to /log-in after 2 seconds
        setTimeout(() => {
          router.replace("/log-in");
        }, 2000);

        return;
      }
    } catch (error: any) {
      console.log(error);

      toast.dismiss(loadingToastId); // Dismiss the loading toast

      return toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <title>Sign Up - Disaster Scans</title>
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
              Sign up
            </h2>
            <span className="text-muted-foreground text-center">
              Enter your email or username below to create an account.
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
                  name="userName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Example_Username" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Sign up
                </Button>
              </form>
            </Form>

            {/* Divider */}

            <div className="border-[1px]  justify-center border-neutral-400 w-full my-3" />

            <p className="text-center text-neutral-400">
              Already a user?{" "}
              <Link href={"/log-in"} className="text-white">
                Sign in now
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
                      <Label htmlFor="email">E-mail address</Label>
                      <Input id="email" placeholder="example@example.com" />
                    </div>
                  </div>
                  <DialogFooter className="justify-end">
                    <DialogClose asChild>
                      <Button type="button">Send e-mail</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
