import ListRoom from "@/app/(public)/(ListRoom)/ListRoom";
import Loading from "@/app/(public)/loading";
import { Suspense } from "react";
export const metadata = {
  title: "Airbnbvietnam",
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

export default function Home() {
  return (
    <div className="w-full space-y-4">
      <Suspense fallback={<Loading />}>
        <ListRoom />
      </Suspense>
      {/* <Destinations /> */}
    </div>
  );
}
