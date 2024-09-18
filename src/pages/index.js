import React from "react";
import FurnitureCardList from "@/components/furniture-item/furniture-card";
import ProductCardList from "@/components/product-card/product-card";
import Image from "next/image";
import { Images } from "@/utils/images";
import { Button } from "@/components/ui/button";
import Background from "@/components/background/background";
import HomepageBanner from "@/components/background/banner";
import MerchantCardList from "@/components/merchants/merchant-list";

const Homepage = () => {
  return (
    <>
      <Background />
      <FurnitureCardList />
      <HomepageBanner />
      <ProductCardList />
      <HomepageBanner />
      <ProductCardList isSale={true}/>
      <HomepageBanner />
      <MerchantCardList />
    </>
  );
};

export default Homepage;
