import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import AppProvider from "@/components/app-provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
export const metadata: Metadata = {
  title: {
    default: "Airbnbvietnam",
    template: "%s - Airbnbvietnam",
  },
  description: "Welcome to our Website, this website was built using Next.js.",
  keywords: "website, airbnb, nextjs, seo, hotel, motel, accommodation, home",
  authors: [{ name: "Phan Sy" }, { name: "Huy" }],
  openGraph: {
    title: "Airbnbvietnam",
    description:
      "Welcome to our Website, this website was built using Next.js.",
    url: "https://airbnbvietnam.vercel.app/",
    images: [
      {
        url: "/assets/airbnb.png",
        width: 800,
        height: 600,
        alt: "Airbnbvietnam Logo",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <AppProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </AppProvider>
      </body>
    </html>
  );
}
