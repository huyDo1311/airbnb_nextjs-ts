import ListRoom from "@/app/(public)/(ListRoom)/ListRoom";
import Loading from "@/app/(public)/(ListRoom)/loading";
import { Metadata } from "next";
import { Suspense } from "react";
export const metadata: Metadata = {
  title: {
    default: "Airbnbvietnam",
    template: "%s - Airbnbvietnam",
  },
  description:
    "Chào các bạn đến với website tụi mình, website này được xây dựng từ Nextjs framework",
  keywords: "website, airbnb, nextjs, seo, hotel, motel, accommodation, home",
  authors: [{ name: "Phan Sy" }, { name: "Huy" }],
  openGraph: {
    title: "Airbnbvietnam",
    description:
      "Chào các bạn đến với website tụi mình, website này được xây dựng từ Nextjs framework",
    url: "https://airbnbvietnam.vercel.app/",
    images: [
      {
        url: "/assets/airbnbmobile.png",
        width: 300,
        height: 300,
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
    </div>
  );
}
