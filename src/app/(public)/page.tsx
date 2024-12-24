import ListRoom from "@/app/(public)/(ListRoom)/ListRoom";
import Loading from "@/app/(public)/loading";
import { Suspense } from "react";
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
