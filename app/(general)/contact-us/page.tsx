"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Toaster, toast } from "sonner";
import { useTheme } from "next-themes";
import { FaCheckCircle } from "react-icons/fa";

import { Axios } from "@/utils/AxiosConfig";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  email: z.string().email({
    message: "❗ Username must be at least 2 characters.",
  }),
  name: z.string().min(2, {
    message: "❗ Name must be at least 2 characters.",
  }),
  message: z.string().min(10, {
    message: "❗ Message must be at least 10 characters.",
  }),
});

const Contact = () => {
  const { resolvedTheme } = useTheme();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      message: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <>
      <title>Contact Us - Disaster Scans</title>
      <div className="container flex-grow flex items-center justify-center">
        {/* Toaster */}

        <Toaster
          closeButton
          richColors
          expand={false}
          theme={resolvedTheme === "dark" ? "dark" : "light"} // Dynamically set theme based on the current Tailwind theme
          visibleToasts={1}
        />

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
            Contact Form
          </h2>
          <span className="text-muted-foreground text-center">
            Enter your email and message and submit
          </span>

          {/* Form for contact us page */}

          <div className="lg:min-w-[420px] mt-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                {/* Email */}

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="ml-1">Email</FormLabel>
                      <FormControl>
                        <Input placeholder="example@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Name */}

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="ml-1">Name</FormLabel>
                      <FormControl>
                        <Input placeholder="eg. Jhon Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Message */}

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="ml-1">Message</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Type your message here..."
                        />
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
        </div>
      </div>
    </>
  );
};

export default Contact;
