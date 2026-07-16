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
  User,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import api from "@/lib/api";

const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_\-+=[\]{}|;:'",.<>?/\\`~])[A-Za-z\d@$!%*?&^#()_\-+=[\]{}|;:'",.<>?/\\`~]{8,}$/,
        "Password must contain uppercase, lowercase, number, and special character"
      ),
  });

const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be exactly 6 digits"),
});

type RegisterForm = z.infer<typeof registerSchema>;
type OtpForm = z.infer<typeof otpSchema>;

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
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<"register" | "verify">("register");
  const [userId, setUserId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const {
    register: registerOtp,
    handleSubmit: handleOtpSubmit,
    formState: { errors: otpErrors },
  } = useForm<OtpForm>({
    resolver: zodResolver(otpSchema),
  });

  const onRegister = async (data: RegisterForm) => {
    setIsLoading(true);
    try {
      const res = await api.post("/auth/register", {
        firstName: "Student",
        lastName: "User",
        email: data.email,
        password: data.password,
        confirmPassword: data.password,
      });

      setUserId(res.data.userId);
      toast.success(res.data.message || "Account created! Please verify your email.");
      setStep("verify");
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string | string[] } } };
      const msg = error?.response?.data?.message;
      toast.error(Array.isArray(msg) ? msg[0] : msg || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const onVerify = async (data: OtpForm) => {
    if (!userId) return;
    setIsLoading(true);
    try {
      const res = await api.post("/auth/verify-email", {
        userId,
        otp: data.otp,
      });
      toast.success(res.data.message || "Email verified successfully!");
      router.push("/login");
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      const msg = error?.response?.data?.message || "Invalid OTP.";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  if (step === "verify") {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <motion.div variants={itemVariants} className="space-y-1 text-center">
          <div className="mx-auto w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 className="w-6 h-6 text-[#01452c]" />
          </div>
          <h1 className="text-2xl font-bold text-[#01452c]">Verify Email</h1>
          <p className="text-sm text-[#2a6650]/70 mt-2">
            Please enter the 6-digit verification code sent to your email. (Check server logs if testing locally)
          </p>
        </motion.div>

        <motion.form variants={itemVariants} onSubmit={handleOtpSubmit(onVerify)} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="otp" className="text-sm font-medium text-[#01452c]">
              Verification Code
            </Label>
            <Input
              id="otp"
              type="text"
              placeholder="123456"
              maxLength={6}
              {...registerOtp("otp")}
              className={cn(
                "h-12 bg-[#f0fbf5] border-emerald-100 rounded-xl text-center tracking-widest text-lg transition-all focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500",
                otpErrors.otp && "border-red-400 focus:ring-red-400/30 focus:border-red-400"
              )}
            />
            <AnimatePresence>
              {otpErrors.otp && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="text-xs text-red-500"
                >
                  {otpErrors.otp.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 mt-2 bg-[#01452c] hover:bg-[#023120] text-white font-bold rounded-xl shadow-md shadow-emerald-900/20 transition-all duration-200 text-base"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Verifying...
              </span>
            ) : (
              "Verify Email"
            )}
          </Button>
        </motion.form>
      </motion.div>
    );
  }

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
      <motion.form variants={itemVariants} onSubmit={handleSubmit(onRegister)} className="space-y-4">
        
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

