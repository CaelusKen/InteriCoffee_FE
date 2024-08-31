import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Images } from "@/utils/images";
import Image from "next/image";
import { Slider } from "@/components/ui/slider";

const ProductFilterSection = () => {
  return (
    <>
      <Accordion type="single" collapsible className="w-1/5">
        <div className="font-outfit text-white font-bold text-3xl pt-8">
          CATEGORY
        </div>
        <Image
          src={Images.filterBarIcon}
          alt="filter-bar-icon"
          className="pt-3 pb-5"
        />
        <AccordionItem value="item-1">
          <AccordionTrigger>Furniture</AccordionTrigger>
          <AccordionContent>Chair</AccordionContent>
          <AccordionContent>Table</AccordionContent>
          <AccordionContent>Shelves</AccordionContent>
          <AccordionContent>Lights</AccordionContent>
          <AccordionContent>Wallpaper</AccordionContent>
          <AccordionContent>Decorators</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>All Products</AccordionTrigger>
          <AccordionContent>
            Yes. It comes with default styles that matches the other
            components&apos; aesthetic.
          </AccordionContent>
        </AccordionItem>
        <div className="font-outfit text-white font-bold text-3xl pt-8">
          SHOP BY
        </div>
        <Image
          src={Images.filterBarIcon}
          alt="filter-bar-icon"
          className="pt-3 pb-5"
        />
        <AccordionItem value="item-4">
          <AccordionTrigger>Material</AccordionTrigger>
          <AccordionContent>Chair</AccordionContent>
          <AccordionContent>Table</AccordionContent>
          <AccordionContent>Shelves</AccordionContent>
          <AccordionContent>Lights</AccordionContent>
          <AccordionContent>Wallpaper</AccordionContent>
          <AccordionContent>Decorators</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>Styles</AccordionTrigger>
          <AccordionContent>
            Yes. It comes with default styles that matches the other
            components&apos; aesthetic.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-6">
          <AccordionTrigger>Price</AccordionTrigger>
          <AccordionContent>
            <Slider />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default ProductFilterSection;
