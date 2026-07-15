"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Home,
  Loader2,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

type LoginForm = z.infer<typeof loginSchema>;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { rememberMe: false },
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((res) => setTimeout(res, 1500));

      // TODO: Replace with actual API call
      // const response = await fetch('/api/auth/login', { method: 'POST', body: JSON.stringify(data) });
      // if (!response.ok) throw new Error('Invalid credentials');

      toast.success("Welcome back! Redirecting...");
      router.push("/houses");
    } catch {
      toast.error("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Logo */}
      <motion.div variants={itemVariants} className="flex flex-col items-center gap-3">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#10B981] flex items-center justify-center shadow-lg shadow-blue-500/25">
          <Home className="w-7 h-7 text-white" />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#0F172A] dark:text-white">
            Welcome Back
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Sign in to your MUST HOMES account
          </p>
        </div>
      </motion.div>

      {/* Glass card */}
      <motion.div
        variants={itemVariants}
        className="bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-white/60 dark:border-white/10 rounded-3xl p-8 shadow-xl shadow-slate-200/50 dark:shadow-black/20"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Email Address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                id="email"
                type="email"
                placeholder="student@must.ac.ke"
                autoComplete="email"
                {...register("email")}
                className={cn(
                  "pl-10 h-12 bg-slate-50/80 dark:bg-white/5 border-slate-200 dark:border-white/10 rounded-xl text-sm transition-all duration-200 focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB]",
                  errors.email && "border-red-400 focus:ring-red-400/30 focus:border-red-400"
                )}
              />
            </div>
            <AnimatePresence>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-xs text-red-500 flex items-center gap-1"
                >
                  <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                  {errors.email.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Password
              </Label>
              <Link
                href="/forgot-password"
                className="text-xs text-[#2563EB] hover:text-blue-700 font-medium transition-colors"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                autoComplete="current-password"
                {...register("password")}
                className={cn(
                  "pl-10 pr-12 h-12 bg-slate-50/80 dark:bg-white/5 border-slate-200 dark:border-white/10 rounded-xl text-sm transition-all duration-200 focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB]",
                  errors.password && "border-red-400 focus:ring-red-400/30 focus:border-red-400"
                )}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            <AnimatePresence>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-xs text-red-500 flex items-center gap-1"
                >
                  <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                  {errors.password.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Remember Me */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center">
              <input
                id="rememberMe"
                type="checkbox"
                {...register("rememberMe")}
                className="w-4 h-4 rounded border-slate-300 text-[#2563EB] focus:ring-[#2563EB] cursor-pointer accent-[#2563EB]"
              />
            </div>
            <Label
              htmlFor="rememberMe"
              className="text-sm text-slate-600 dark:text-slate-400 cursor-pointer select-none"
            >
              Keep me signed in for 30 days
            </Label>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-gradient-to-r from-[#2563EB] to-blue-600 hover:from-blue-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-200 disabled:opacity-70"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Signing in...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Sign In
                <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200 dark:border-white/10" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-white dark:bg-[#0F172A] px-3 text-slate-400 rounded-full">
              or
            </span>
          </div>
        </div>

        {/* Register link */}
        <p className="text-center text-sm text-slate-600 dark:text-slate-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-[#2563EB] hover:text-blue-700 font-semibold transition-colors"
          >
            Create account
          </Link>
        </p>
      </motion.div>

      {/* Bottom note */}
      <motion.p
        variants={itemVariants}
        className="text-center text-xs text-slate-400 dark:text-slate-500"
      >
        By signing in, you agree to our{" "}
        <Link href="/terms" className="underline hover:text-slate-600 transition-colors">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="underline hover:text-slate-600 transition-colors">
          Privacy Policy
        </Link>
      </motion.p>
    </motion.div>
  );
}
