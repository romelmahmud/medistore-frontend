"use client";
import { useRouter } from "next/navigation";

import { getUser } from "@/actions/user.actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useUser } from "@/context/user.context";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {
  const { setUser } = useUser();
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },

    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Logging in...");
      try {
        const { data, error } = await authClient.signIn.email(value);

        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        } else {
          const loggedInUser = await getUser();
          setUser(loggedInUser);
          toast.success("Logged in successfully", { id: toastId });
          // Redirect based on role
          if (loggedInUser.role === "ADMIN") router.replace("/admin/dashboard");
          else if (loggedInUser.role === "SELLER")
            router.replace("/seller/dashboard");
          else router.replace("/");
        }
      } catch (error) {
        toast.error("Failed to log in", { id: toastId });
      }
    },
    validators: {
      onSubmit: formSchema,
    },
  });
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Log in to your account</CardTitle>
        <CardDescription>
          Enter your credentials below to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="register-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="email"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      id={field.name}
                      name={field.name}
                      type="email"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="password"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      id={field.name}
                      name={field.name}
                      type="password"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-5 justify-end">
        <form.Subscribe
          selector={(state) => ({
            isSubmitting: state.isSubmitting,
            canSubmit: state.canSubmit,
          })}
        >
          {({ isSubmitting, canSubmit }) => (
            <Button
              form="register-form"
              type="submit"
              disabled={isSubmitting || !canSubmit}
              className="
        w-full
        disabled:bg-muted
        disabled:text-muted-foreground
        disabled:cursor-not-allowed
        disabled:opacity-70
      "
            >
              {isSubmitting ? "Logging in..." : "Log In"}
            </Button>
          )}
        </form.Subscribe>
        <FieldDescription className="text-center">
          Don&apos;t have an account? <Link href="/register">Sign up</Link>
        </FieldDescription>
      </CardFooter>
    </Card>
  );
}
