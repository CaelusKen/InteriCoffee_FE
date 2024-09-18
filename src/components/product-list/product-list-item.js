import React from "react";
import Image from "next/image";
import { products } from "@/utils/product-card-dummy";
import ProductFilterSection from "./product-filter-section";
import { ProductCard } from "@/components/product-card/product-card";

const ProductListItem = () => {
  
  return (
    <div className="flex flex-row gap-24">
      <ProductFilterSection />
      <div className="flex flex-wrap justify-between w-[1000px] mx-auto py-8 gap-y-8">
      {products.map((product, index) => (
          <div key={index} className="w-[30%]">
            <ProductCard
              imageUrl={product.imageUrl}
              name={product.name}
              price={product.price}
              salePrice={product.salePrice}
              merchant={product.merchant}
              tags={product.tags}
              isSale={product.isSale}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListItem;
