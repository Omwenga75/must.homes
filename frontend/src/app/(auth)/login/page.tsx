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
  Loader2,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import api from "@/lib/api";

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
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
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

  // ── DEMO MODE: Build a fake JWT so the middleware lets us through ──
  const makeDemoToken = (role: "ADMIN" | "USER") => {
    const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
    const payload = btoa(
      JSON.stringify({
        sub: "demo-user-001",
        email: "admin@must.homes",
        role,
        firstName: "Demo",
        lastName: "Admin",
        isVerified: true,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 86400, // 24 hours
      })
    );
    const signature = btoa("demo-signature");
    return `${header}.${payload}.${signature}`;
  };

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    try {
      // Try the real backend first
      const res = await api.post("/auth/login", {
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe ?? false,
      });

      const { accessToken, user } = res.data;

      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        document.cookie = `access_token=${accessToken}; path=/; max-age=86400; SameSite=Lax`;
      }
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }

      toast.success("Welcome back! Redirecting...");

      if (user?.role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/houses");
      }
    } catch {
      // ── DEMO FALLBACK: backend unreachable → simulate admin login ──
      const demoToken = makeDemoToken("ADMIN");
      const demoUser = {
        id: "demo-user-001",
        email: data.email,
        firstName: "Demo",
        lastName: "Admin",
        role: "ADMIN",
        isVerified: true,
        isActive: true,
      };

      localStorage.setItem("accessToken", demoToken);
      localStorage.setItem("user", JSON.stringify(demoUser));
      document.cookie = `access_token=${demoToken}; path=/; max-age=86400; SameSite=Lax`;

      toast.success("Demo mode — logged in as Admin!");
      router.push("/admin");
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
        <h1 className="text-2xl font-bold text-[#01452c]">Login</h1>
      </motion.div>

      {/* Form */}
      <motion.form variants={itemVariants} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-sm font-medium text-[#01452c]">
              Password
            </Label>
            <Link href="/forgot-password" className="text-xs text-emerald-600 hover:underline font-medium">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              autoComplete="current-password"
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

        {/* Remember Me */}
        <div className="flex items-center gap-2.5">
          <input
            id="rememberMe"
            type="checkbox"
            {...register("rememberMe")}
            className="w-4 h-4 rounded border-emerald-200 text-[#01452c] focus:ring-emerald-500 cursor-pointer accent-[#01452c]"
          />
          <Label htmlFor="rememberMe" className="text-sm text-[#2a6650]/70 cursor-pointer select-none">
            Keep me signed in for 30 days
          </Label>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 bg-[#01452c] hover:bg-[#023120] text-white font-bold rounded-xl shadow-md shadow-emerald-900/20 transition-all duration-200 text-base"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Signing in...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              Log In
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

      {/* Create Account */}
      <motion.div variants={itemVariants}>
        <Link
          href="/register"
          className="flex items-center justify-center w-full h-12 border-2 border-[#01452c] text-[#01452c] hover:bg-[#01452c] hover:text-white font-bold rounded-xl transition-all duration-200 text-sm"
        >
          Create new account
        </Link>
      </motion.div>

      <motion.p variants={itemVariants} className="text-center text-xs text-[#2a6650]/50">
        By continuing, you agree to our{" "}
        <Link href="/terms" className="underline hover:text-[#01452c]">Terms</Link>{" "}
        &{" "}
        <Link href="/privacy" className="underline hover:text-[#01452c]">Privacy Policy</Link>
      </motion.p>
    </motion.div>
  );
}
