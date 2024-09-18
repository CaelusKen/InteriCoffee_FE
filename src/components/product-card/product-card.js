import Image from "next/image";
import React from "react";
import { products } from "@/utils/product-card-dummy";
import { Button } from "../ui/button";
import { calculatePercentSale } from "@/utils/price-percentage";
import { Badge } from "../ui/badge";

export const ProductCard = ({
  imageUrl,
  name,
  price,
  merchant,
  tags,
  isSale,
  salePrice,
}) => {
  return (
    <div className="flex flex-col rounded-lg overflow-hidden p-2">
      <div className="relative">
        <Image
          src={imageUrl}
          alt={name}
          width={380}
          height={380}
          className="py-4"
        />
        {isSale ? (
          <Badge className="absolute top-3 right-0 m-2 text-white font-outfit bg-[#CE0000]">
            -{calculatePercentSale(price, salePrice)}%
          </Badge>
        ) : (
          <></>
        )}
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-row justify-between items-center">
          <p className="text-white text-3xl font-outfit font-bold">{name}</p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Badge
                key={index}
                className="bg-[#B88D6F] text-white font-outfit text-[0.5rem] px-2 py-0.5 h-4 rounded-none"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex flex-row justify-between items-center h-6">
          <p className="text-white text-lg font-outfit font-normal">
            {merchant}
          </p>
          <div className="flex flex-row gap-3 text-white text-lg font-outfit">
            {isSale ? (
              <>
                ${salePrice}
                <div className="line-through text-xs">${price}</div>
              </>
            ) : (
              <>
                ${salePrice}
                <Badge className="bg-[#EDA145] text-white font-outfit text-[0.5rem] px-2 py-0.5 h-4 rounded">
                  Recently Added
                </Badge>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductCardList = ({ isSale }) => {
  const filteredProducts = isSale
    ? products.filter((product) => product.isSale)
    : products.filter((product) => !product.isSale);
  return (
    <div className="container">
      {isSale ? (
        <div className="flex flex-col items-start">
          <h1 className="font-outfit font-black text-white text-4xl pt-[7.5rem] pb-5">
            SPECIAL SALES
          </h1>
          <p className="text-white font-outfit pb-2">
            Flash sales incoming, grab them before it expires!
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-start">
          <h1 className="font-outfit font-black text-white text-4xl pt-[7.5rem] pb-5">
            LATEST ENTRIES FROM MERCHANTS
          </h1>
          <p className="text-white font-outfit pb-2">
            Latest products from our merchants, go check them out!
          </p>
        </div>
      )}
      <div className="flex flex-wrap justify-evenly">
        {filteredProducts.slice(0, 3).map((product, index) => (
          <ProductCard
            key={index}
            imageUrl={product.imageUrl}
            name={product.name}
            price={product.price}
            salePrice={product.salePrice}
            merchant={product.merchant}
            tags={product.tags}
            isSale={product.isSale}
          />
        ))}
      </div>
      <div className="flex justify-center py-6">
        <Button className="bg-[#B88D6F] text-white font-outfit px-10 py-2 rounded-none">
          VIEW ALL PRODUCTS
        </Button>
      </div>
    </div>
  );
};

export default ProductCardList;
