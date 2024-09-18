import Image from "next/image";
import React from "react";
import { Images } from "@/utils/images";
import { useRouter } from "next/router";
import { Input } from "../ui/input";

const HomepageBanner = () => {
  const router = useRouter();

  return (
    <div className="relative">
      <Image
        src={Images.homepageBanner}
        alt="background"
        className="object-cover"
      />
    </div>
  );
};

export default HomepageBanner;
