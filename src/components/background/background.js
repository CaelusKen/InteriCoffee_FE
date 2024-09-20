import Image from "next/image";
import React from "react";
import { Images } from "@/utils/images";
import { useRouter } from "next/router";
import { Input } from "../ui/input";

const Background = () => {
  const router = useRouter();

  return (
    <div className="relative">
      {router.pathname === "/products" ? (
        <>
          <Image
            src={Images.backgroundImage}
            alt="background"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gray-700 opacity-60 rounded-md"></div>
          <div className="absolute inset-0 flex flex-col items-start justify-center px-10">
            <h1 className="font-outfit text-white text-3xl font-bold">
              PRODUCTS
            </h1>
            <div className="relative w-1/3 mt-2">
              <Input
                placeholder="Search here..."
                className="w-full pr-10 border-2 border-white rounded-md bg-transparent"
              />
              <Image
                src={Images.searchIcon}
                alt="search-icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none"
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <Image
            src={Images.backgroundImage}
            alt="background"
            className="object-cover"
          />
          <div className="absolute inset-0 opacity-60 rounded-md"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center px-10">
            <h2 className="text-white text-4xl font-outfit font-bold pb-2">
              What do you need today?
            </h2>
            <div className="text-white text-xl font-outfit pb-6">
              Furniture, Templates, or even any merchants you need, they are
              right here!
            </div>

            <div className="relative w-1/3 mt-2">
              <Input
                placeholder="Search here..."
                className="w-full pr-10 border-2 border-white rounded-md"
              />
              <Image
                src={Images.searchIcon}
                alt="search-icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Background;
