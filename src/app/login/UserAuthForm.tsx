"use client";

import { useRouter } from "next/navigation";
import * as React from "react";
import { IconSpinner } from "src/components/icons/spinner";
import { Button } from "src/components/ui/button";
import { Input } from "src/components/ui/input";
import { Label } from "src/components/ui/label";
import { usePostLogin } from "src/hooks/usePostLogin";
import { cn } from "src/utils/cn";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export function UserAuthForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { push } = useRouter();

  const {
    mutate,
    isPending: isLoading,
    isError,
    error,
  } = usePostLogin({
    onSuccess: () => {
      push("/dashboard");
    },
  });

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const result = formSchema.safeParse(Object.fromEntries(formData));
    if (!result.success) {
      console.error(result.error);
      throw new Error("Invalid form data");
    }
    mutate(result.data);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="****-****"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button type="submit" variant="secondary" disabled={isLoading}>
            {isLoading && <IconSpinner className="mr-2 h-4 w-4 animate-spin" />}
            Sign In
          </Button>
        </div>
      </form>

      {isError && (
        <div className="mt-2 text-sm text-red-500">
          {error.getErrorMessage()}
        </div>
      )}

      {/* <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <IconSpinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <IconGithub className="mr-2 h-4 w-4" />
        )}{" "}
        GitHub
      </Button> */}
    </div>
  );
}
