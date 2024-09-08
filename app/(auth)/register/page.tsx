"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

const formSchema = z.object({
  userName: z.string().min(2, {
    message: "❗ Username must be at least 2 characters.",
  }),
  email: z.string().min(2, {
    message: "❗ Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "❗ Password must be at least 6 characters.",
  }),
});

const Register = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(data);
  };

  return (
    <>
      <title>Sign Up - Disaster Scans</title>
      <div className="w-full h-screen">
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
                  name="email"
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
