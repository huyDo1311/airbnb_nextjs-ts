import Footer from "@/app/(public)/Footer";
import MainHeader from "@/app/(public)/header/MainHeader";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <div className=" md:hidden block">
        <AppSidebar />
      </div>
      <div className="flex  flex-col relative w-full">
        <MainHeader />
        <main className="p-6 mt-20 md:mt-44 xl:mt-28 w-full">{children}</main>
        <Footer />
      </div>
    </SidebarProvider>
  );
}
