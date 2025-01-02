import RoomDetails from "@/app/(public)/room-detail/[query]/RoomDetails";
import React, { Suspense } from "react";
import type { Metadata, ResolvingMetadata } from "next";
import http from "@/lib/http";
import Loading from "@/app/(public)/room-detail/[query]/loading";
import { resolve } from "path";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// Generate dynamic metadata for the page
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params; // Resolve params if it's a Promise
  const searchParamsResolved = await searchParams; // Resolve searchParams if it's a Promise

  const roomId = searchParamsResolved.name as string; // Extract `name` from searchParams

  // Fetch room details
  let room;
  try {
    room = await http.get(`/api/phong-thue/${roomId}`);
  } catch (err) {
    room = {
      content: {
        tenPhong: "Không tìm thấy phòng",
        moTa: "không tìm thấy mô tả phòng",
        hinhAnh: "/default-room.jpg",
      },
    };
  }

  return {
    title: `${room.content.tenPhong} - Airbnbvietnam`,
    description: room.content.moTa,
    openGraph: {
      title: `${room.content.tenPhong} - Airbnbvietnam`,
      description: room.content.moTa,
      url: `https://airbnbvietnam/room-detail/id?name=${roomId}`,
      images: [
        {
          url: room.content.hinhAnh,
          width: 700,
          height: 600,
          alt: `${room.content.tenPhong} image`,
        },
      ],
    },
  };
}

// Room Details Page Component
export default async function Page({ params, searchParams }: Props) {
  const resolvedParams = await params; // Resolve params if it's a Promise
  const resolvedSearchParams = await searchParams; // Resolve searchParams if it's a Promise
  const { id } = resolvedParams;
  const name = resolvedSearchParams.name as string;
  const dataDetailName = await http
    .get(`/api/phong-thue/${name}`)
    .then((res) => {
      return res.content;
    })
    .catch((err) => console.log(err));

  return (
    <div className="w-full lg:px-20 py-5 flex justify-center z-50">
      <div className="w-full">
        {/* Pass query to RoomDetails */}
        <Suspense fallback={<Loading />}>
          <RoomDetails query={name} dataDetailName={dataDetailName} />
        </Suspense>
      </div>
    </div>
  );
}
