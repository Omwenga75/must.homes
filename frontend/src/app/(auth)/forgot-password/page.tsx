"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";
import { toast } from "sonner";
import { Mail, Loader2, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

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

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordForm) => {
    setIsLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 1500));
      setIsSent(true);
      toast.success("Reset link sent to your email!");
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
      <motion.div variants={itemVariants} className="space-y-2 text-center">
        <h1 className="text-2xl font-bold text-[#01452c]">Reset Password</h1>
        <p className="text-sm text-[#2a6650]/70">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </motion.div>

      {/* Form */}
      {!isSent ? (
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

          {/* Submit */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 mt-2 bg-[#01452c] hover:bg-[#023120] text-white font-bold rounded-xl shadow-md shadow-emerald-900/20 transition-all duration-200 text-base"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Sending Link...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Send Reset Link
                <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </Button>
        </motion.form>
      ) : (
        <motion.div variants={itemVariants} className="text-center bg-[#f0fbf5] border border-emerald-200 rounded-xl p-6">
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-6 h-6 text-emerald-600" />
          </div>
          <h3 className="font-bold text-[#01452c] mb-2">Check your email</h3>
          <p className="text-sm text-[#2a6650]/70 mb-4">
            We've sent a password reset link to your email address. Please check your inbox.
          </p>
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsSent(false)}
            className="w-full h-10 border-emerald-200 text-[#01452c] hover:bg-emerald-50"
          >
            Try another email
          </Button>
        </motion.div>
      )}

      {/* Back to Login Link */}
      <motion.div variants={itemVariants} className="pt-2">
        <Link
          href="/login"
          className="flex items-center justify-center gap-2 w-full h-12 border-2 border-[#01452c]/10 text-[#01452c] hover:bg-[#f0fbf5] hover:border-[#01452c]/30 font-bold rounded-xl transition-all duration-200 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Login
        </Link>
      </motion.div>
    </motion.div>
  );
}
