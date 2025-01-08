"use client";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function LoadingSkeleton() {
  let renderSkeleton = () => {
    let array = new Array(12).fill(null);
    return array.map((_, index) => {
      return (
        <div key={index} className="flex flex-col space-y-3">
          <Skeleton className="h-[250px] xlCustom:w-[500px]sm:w-[350px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-[300px]" />
            <Skeleton className="h-6 w-[250px]" />
          </div>
        </div>
      );
    });
  };

  return (
    <div className="grid  xlCustom:grid-cols-6 grid-cols-1 sm:grid-cols-4 sm:gap-5">
      {renderSkeleton()}
    </div>
  );
}
