import roomApiRequest from "@/apiRequests/room";
import ListRoom from "@/app/(public)/(ListRoom)/ListRoom";
import ListRoomCsr from "@/app/(public)/(ListRoom)/ListRoomCsr";
import Loading from "@/app/(public)/(ListRoom)/loading";
import { ListRoomProps } from "@/lib/helper.type";
import http from "@/lib/http";
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

export default async function Home() {
  const data: ListRoomProps =
    await roomApiRequest.NextClientToServerGetListRoom();
  const data2: any = await http.get(
    "/api/vi-tri/phan-trang-tim-kiem?pageIndex=1&pageSize=8"
  );
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return (
    <div className="w-full space-y-4">
      <Suspense fallback={<Loading />}>
        <ListRoomCsr data={data} data2={data2} />
      </Suspense>
    </div>
  );
}
