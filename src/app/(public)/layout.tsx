import Link from "next/link";
import { Menu, Package2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import DarkModeToggle from "@/components/dark-mode-toggle";
import NavItems from "@/app/(public)/nav-items";
import Image from "next/image";
import QuickSearch from "@/app/(public)/QuickSearch";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex  flex-col relative">
      <header className="sticky top-0 flex justify-between items-center p-4   z-20 ">
        <Link href="/">
          <Image
            alt="logo"
            src="/assets/airbnb-desktop.png"
            width={100}
            height={100}
          />
        </Link>
        <div className="focus:bg-black">
          <QuickSearch />
        </div>
        {/* <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Package2 className="h-6 w-6" />
                <span className="sr-only">Big boy</span>
              </Link>
              <SheetTitle hidden className="sr-only">
                Navigation Menu
              </SheetTitle>
              <NavItems className="text-muted-foreground transition-colors hover:text-foreground" />
            </nav>
          </SheetContent>
        </Sheet> */}
        <div>
          <DarkModeToggle />
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {children}
      </main>
    </div>
  );
}
