"use client";

import * as z from "zod";
import axios from "axios";
import { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { color } from "framer-motion";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  mobile: z.string().min(1, {
    message: "Mobile is required",
  }),
});

const CreatePage = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/admin/bde/create", values);
      router.push(`/admin/bde`);
      toast.success("BDE Added");
    } catch (error) {
      let err = error as AxiosError;
      toast.error(err?.response?.data as string);
    }
  };

  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div>
        <h1 className="text-2xl">Add Admin</h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Admin Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="John'"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="919999999999"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-x-2">
              <Link href="/admin/admin_users">
                <Button type="button" variant="ghost">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreatePage;
