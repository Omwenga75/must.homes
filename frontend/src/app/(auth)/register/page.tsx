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
  User,
  Loader2,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(2, "Full name must be at least 2 characters"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterForm = z.infer<typeof registerSchema>;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    setIsLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 1500));
      toast.success("Account created successfully! Redirecting...");
      router.push("/login");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="space-y-1 text-center">
        <h1 className="text-2xl font-bold text-[#01452c]">Create Account</h1>
      </motion.div>

      {/* Form */}
      <motion.form variants={itemVariants} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Full Name */}
        <div className="space-y-1.5">
          <Label htmlFor="fullName" className="text-sm font-medium text-[#01452c]">
            Full Name
          </Label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
            <Input
              id="fullName"
              type="text"
              placeholder="John Doe"
              autoComplete="name"
              {...register("fullName")}
              className={cn(
                "pl-10 h-12 bg-[#f0fbf5] border-emerald-100 rounded-xl text-sm transition-all focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500",
                errors.fullName && "border-red-400 focus:ring-red-400/30 focus:border-red-400"
              )}
            />
          </div>
          <AnimatePresence>
            {errors.fullName && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="text-xs text-red-500"
              >
                {errors.fullName.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-sm font-medium text-[#01452c]">
            Email Address
          </Label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
            <Input
              id="email"
              type="email"
              placeholder="student@must.ac.ke"
              autoComplete="email"
              {...register("email")}
              className={cn(
                "pl-10 h-12 bg-[#f0fbf5] border-emerald-100 rounded-xl text-sm transition-all focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500",
                errors.email && "border-red-400 focus:ring-red-400/30 focus:border-red-400"
              )}
            />
          </div>
          <AnimatePresence>
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="text-xs text-red-500"
              >
                {errors.email.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <Label htmlFor="password" className="text-sm font-medium text-[#01452c]">
            Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              autoComplete="new-password"
              {...register("password")}
              className={cn(
                "pl-10 pr-12 h-12 bg-[#f0fbf5] border-emerald-100 rounded-xl text-sm transition-all focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500",
                errors.password && "border-red-400 focus:ring-red-400/30 focus:border-red-400"
              )}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-400 hover:text-emerald-600 transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <AnimatePresence>
            {errors.password && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="text-xs text-red-500"
              >
                {errors.password.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <Label htmlFor="confirmPassword" className="text-sm font-medium text-[#01452c]">
            Confirm Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              autoComplete="new-password"
              {...register("confirmPassword")}
              className={cn(
                "pl-10 pr-12 h-12 bg-[#f0fbf5] border-emerald-100 rounded-xl text-sm transition-all focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500",
                errors.confirmPassword && "border-red-400 focus:ring-red-400/30 focus:border-red-400"
              )}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-400 hover:text-emerald-600 transition-colors"
            >
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <AnimatePresence>
            {errors.confirmPassword && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="text-xs text-red-500"
              >
                {errors.confirmPassword.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 mt-2 bg-[#01452c] hover:bg-[#023120] text-white font-bold rounded-xl shadow-md shadow-emerald-900/20 transition-all duration-200 text-base"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Creating Account...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              Sign Up
              <ArrowRight className="w-4 h-4" />
            </span>
          )}
        </Button>
      </motion.form>

      {/* Divider */}
      <motion.div variants={itemVariants} className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-emerald-100" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-white px-3 text-[#2a6650]/50">or</span>
        </div>
      </motion.div>

      {/* Login Link */}
      <motion.div variants={itemVariants}>
        <Link
          href="/login"
          className="flex items-center justify-center w-full h-12 border-2 border-[#01452c] text-[#01452c] hover:bg-[#01452c] hover:text-white font-bold rounded-xl transition-all duration-200 text-sm"
        >
          Already have an account? Log in
        </Link>
      </motion.div>
      
      <motion.p variants={itemVariants} className="text-center text-xs text-[#2a6650]/50">
        By creating an account, you agree to our{" "}
        <Link href="/terms" className="underline hover:text-[#01452c]">Terms</Link>{" "}
        &{" "}
        <Link href="/privacy" className="underline hover:text-[#01452c]">Privacy Policy</Link>
      </motion.p>
    </motion.div>
  );
}
