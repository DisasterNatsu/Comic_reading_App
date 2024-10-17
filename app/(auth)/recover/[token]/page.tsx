"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Toaster, toast } from "sonner";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Axios } from "@/utils/AxiosConfig";

const formSchema = z.object({
  password: z.string().min(5, {
    message: "Password must be over 5 characters.",
  }),
  confirmPassword: z.string().min(5, {
    message: "Password must be over 5 characters.",
  }),
});

const RecoverPage = ({ params }: { params: { token: string } }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const { resolvedTheme } = useTheme();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // Display a loading toast
    const loadingToastId = toast.warning("Loading...", {
      icon: <div className="spinner" />, // Custom spinner or loading indicator
      duration: Infinity, // Keep it visible until dismissed
    });

    if (data.password !== data.confirmPassword) {
      toast.dismiss(loadingToastId); // Dismiss the loading toast

      return toast.error("Passwords don't match!");
    }

    try {
      const token = params.token;

      const req = await Axios.post("/user/reset-password", { token, ...data });

      const res = await req.data;

      toast.dismiss(loadingToastId);

      toast.success(res.message);

      // Redirect to /log-in after 2 seconds
      setTimeout(() => {
        router.replace("/log-in");
      }, 2000);

      return;
    } catch (error: any) {
      console.log(error);

      toast.dismiss(loadingToastId); // Dismiss the loading toast

      return toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <title>Recover Account - Disaster Scans</title>
      <main className="w-full h-screen">
        <Toaster
          closeButton
          richColors
          expand={false}
          theme={resolvedTheme === "dark" ? "dark" : "light"} // Dynamically set theme based on the current Tailwind theme
          visibleToasts={1}
        />
        <div className="flex h-full w-full items-center justify-center flex-col px-6 py-12 shadow-md lg:px-12 shrink-0 lg:min-w-[540px]">
          <div className="flex flex-col items-center justify-center mb-8">
            <Image
              loading="lazy"
              src={"/logo.png"}
              width={150}
              height={100}
              alt="logo"
              className="w-28 object-contain"
            />
            <h2 className="mt-2 text-center text-lg lg:text-2xl font-bold text-foreground">
              Account Recovery
            </h2>
            <span className="text-muted-foreground text-center">
              Enter your new password
            </span>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5 w-96"
            >
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          className="pr-10" // Padding right to prevent text overlap
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                          onClick={() => setShowPassword((prev) => !prev)}
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showPassword ? (
                            <FaEye size={18} />
                          ) : (
                            <FaEyeSlash size={18} />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showConfirmPassword ? "text" : "password"}
                          className="pr-10" // Padding right to prevent text overlap
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                          onClick={() =>
                            setShowConfirmPassword((prev) => !prev)
                          }
                          aria-label={
                            showConfirmPassword
                              ? "Hide password"
                              : "Show password"
                          }
                        >
                          {showConfirmPassword ? (
                            <FaEye size={18} />
                          ) : (
                            <FaEyeSlash size={18} />
                          )}
                        </button>
                      </div>
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
        </div>
      </main>
    </>
  );
};

export default RecoverPage;
