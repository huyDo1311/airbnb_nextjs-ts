import Image from "next/image";
import Destinations from "@/app/(public)/Destinations";
import ListRoom from "@/app/(public)/(ListRoom)/ListRoom";
import CheckingToggleTheme from "@/app/(public)/checkingToggleTheme";
import Modal from "@/app/(public)/Modal";
export default function Home() {
  return (
    <div className="w-full space-y-4">
      <Destinations />
      <ListRoom />
      <Modal />
    </div>
  );
}
