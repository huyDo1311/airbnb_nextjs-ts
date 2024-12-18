import Footer from "@/app/(public)/Footer";
import MainHeader from "@/app/(public)/header/MainHeader";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex  flex-col relative w-full">
      <MainHeader />
      <main className="p-6 mt-44 xl:mt-28 w-full">{children}</main>
      <Footer />
    </div>
  );
}
