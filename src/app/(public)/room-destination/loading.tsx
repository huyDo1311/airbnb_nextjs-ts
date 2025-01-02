import { LoaderCircle } from "lucide-react";
import React from "react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-96">
      <LoaderCircle className="w-20 h-20 animate-spin" />
    </div>
  );
}
