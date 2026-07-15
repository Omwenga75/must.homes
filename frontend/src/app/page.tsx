import Link from "next/link";
import { ArrowRight, Home as HomeIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 dark:bg-black font-sans">
      <div className="flex flex-col items-center gap-8 text-center px-4">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-600 to-emerald-500 flex items-center justify-center shadow-2xl">
          <HomeIcon className="w-10 h-10 text-white" />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            Welcome to MUST HOMES
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
            Find the perfect student accommodation near campus with ease.
          </p>
        </div>

        <Link 
          href="/login" 
          className="group inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/25"
        >
          Sign In
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
