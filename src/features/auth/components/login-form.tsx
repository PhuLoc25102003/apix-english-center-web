"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLogin } from "../hooks/use-login";
import { loginSchema } from "../schemas/login.schema";
import type { LoginCredentials } from "../types/auth.type";

export function LoginForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const login = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginCredentials) => login.mutate(values);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      {/* Email input field */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="email"
          className="text-xs font-semibold uppercase tracking-wider text-[#4B5563]"
        >
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
          <Input
            id="email"
            type="email"
            placeholder="name@apix.edu.vn"
            className="pl-9 h-10 bg-white/60 focus:bg-white placeholder:text-[#9CA3AF]"
            aria-invalid={errors.email ? "true" : "false"}
            disabled={login.isPending}
            {...register("email")}
          />
        </div>
        {errors.email && (
          <span className="text-xs font-medium text-[#C90012]">
            {errors.email.message}
          </span>
        )}
      </div>

      {/* Password input field */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="text-xs font-semibold uppercase tracking-wider text-[#4B5563]"
          >
            Password
          </label>
          <span className="text-xs font-semibold text-[#C90012] hover:underline cursor-pointer">
            Forgot password?
          </span>
        </div>
        <div className="relative">
          <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className="pl-9 pr-10 h-10 bg-white/60 focus:bg-white placeholder:text-[#9CA3AF]"
            aria-invalid={errors.password ? "true" : "false"}
            disabled={login.isPending}
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-[#9CA3AF] hover:text-[#4B5563] focus:outline-none"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        {errors.password && (
          <span className="text-xs font-medium text-[#C90012]">
            {errors.password.message}
          </span>
        )}
      </div>

      {/* Submit button */}
      <Button
        type="submit"
        disabled={login.isPending}
        className="mt-2 w-full h-10 font-semibold bg-[#FF161A] text-white hover:bg-[#C90012] shadow-md shadow-[#FF161A]/20 transition-all duration-150 inline-flex items-center justify-center gap-2 cursor-pointer disabled:bg-[#9CA3AF]"
      >
        {login.isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Signing In...
          </>
        ) : (
          "Sign In"
        )}
      </Button>
    </form>
  );
}
