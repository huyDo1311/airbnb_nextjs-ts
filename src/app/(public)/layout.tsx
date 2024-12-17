import Footer from "@/app/(public)/Footer";
import Header from "@/app/(public)/header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex  flex-col relative w-full">
      <Header />
      <main className="p-6 w-full">{children}</main>
      <Footer />
    </div>
  );
}
