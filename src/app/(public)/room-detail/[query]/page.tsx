import RoomDetails from "@/app/(public)/room-detail/[query]/RoomDetails";
import React from "react";
import type { Metadata, ResolvingMetadata } from "next";
import http from "@/lib/http";

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
    console.error("Error fetching room details:", err);
    room = {
      content: {
        tenPhong: "Room Not Found",
        moTa: "We could not retrieve the room details.",
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

  return (
    <div className="w-full lg:px-20 py-5 flex justify-center z-50">
      <div className="w-full">
        {/* Pass query to RoomDetails */}
        <RoomDetails query={name} />
      </div>
    </div>
  );
}
