import Navbar from "@/components/layout/Navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#e8f7f2] font-sans flex flex-col">
      <Navbar />
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
