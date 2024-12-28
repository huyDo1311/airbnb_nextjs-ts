import RoomDestination from "@/app/(public)/room-destination/[query]/RoomDestination";
import { mapIframe } from "@/lib/utils2";
import { Metadata } from "next";
import React from "react";

type Props = {
  searchParams: Promise<{
    name: string;
    id: string;
  }>;
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { id, name } = await searchParams;
  let idNumber: number = parseInt(id);
  return {
    title: `${mapIframe[idNumber - 1].location} - Airbnbvietnam`,
    description: mapIframe[idNumber - 1].desc,
    openGraph: {
      title: `${mapIframe[idNumber - 1].location} - Airbnbvietnam`,
      description: mapIframe[idNumber - 1].desc,
      url: `https://airbnbvietnam/room-destination/location?name=${name}&id=${id}`,
      images: [
        {
          url: `/assets/Destinations/${name}.jpg`,
          width: 700,
          height: 600,
          alt: `${mapIframe[idNumber - 1].location} image`,
        },
      ],
    },
  };
}

export default async function page({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const { name, id } = resolvedSearchParams;

  return (
    <div>
      <RoomDestination idDestination={id} destination={name} />
    </div>
  );
}
