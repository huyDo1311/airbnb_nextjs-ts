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
  title: "Aribnb Nextjs Project",
  description: "Personal project by Huy & Sy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Airbnbvietnam</title>
        <meta name="author" content="Phan Sy and Huy" />
        <meta
          name="description"
          content="Welcome to our Website, this website was build by nextjs ."
        />
        <meta
          name="keywords"
          content="website, airbnb, nextjs, seo, hotel, motel, accommodation, home"
        />
        {/* meta */}
        <meta property="og:title" content="Airbnbvietnam" />
        <meta
          property="og:description"
          content="Welcome to our Website, this website was build by nextjs "
        />
        <meta property="og:image" content="/assets/airbnb.png" />
        <meta property="og:url" content="https://airbnbvietnam.vercel.app/" />
        <meta property="og:type" content="website" />
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
