import React from "react";
import Image from "next/image";
import { products } from "@/utils/product-card-dummy";
import ProductFilterSection from "./product-filter-section";
import { ProductCard } from "@/components/product-card/product-card";
import HomepageBanner from "../background/banner";
import { Input } from "../ui/input";
import { Images } from "@/utils/images";
import { Button } from "../ui/button";
import { ProductSortSection } from "./product-sort-section";

const ProductListItem = () => {
  return (
    <div className="flex flex-row gap-32 px-8">
      <ProductFilterSection />
      <div className="flex flex-col w-full">
        <div className="relative w-full flex justify-end mb-10">
          <div className="relative w-[15rem]">
            <Input
              placeholder="Search here..."
              className="w-full h-8 pl-3 pr-10 border-2 border-white rounded-full"
            />
            <Image
              src={Images.searchIcon}
              alt="search-icon"
              className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2"
            />
          </div>
        </div>
        <HomepageBanner />
        <div className="flex flex-row justify-between items-center pt-10">
          <div className="flex flex-row gap-5">
            <Button className="font-outfit text-white bg-[#B88D6F]">On Sale</Button>
            <ProductSortSection />
          </div>
          <div className="font-outfit text-white">
            SHOW 1 - 17 OUT OF 100000 RESULTS | PAGE 1 OUT OF 30
          </div>
        </div>
        <div className="flex flex-wrap justify-items-start w-full py-8 gap-12">
          {products.map((product, index) => (
            <div key={index} className="w-[30%]">
              <ProductCard
                id={product.id} // Pass the product ID to the ProductCard component
                imageUrl={product.imageUrl}
                name={product.name}
                price={product.price}
                salePrice={product.salePrice}
                merchant={product.merchant}
                tags={product.tags}
                isSale={product.isSale}
                isProductListItem={true} // Indicate it's being used in the ProductListItem
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductListItem;
