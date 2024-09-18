import Image from "next/image";
import React from "react";
import { items } from "@/utils/furniture-card-dummy.js"; // Make sure items array has 6 items with imageUrl and name

const FurnitureCard = ({ imageUrl, name, description, colSpan }) => {
  const colSpanClass = `col-span-${colSpan}`; // Assign column span class based on colSpan value
  return (
    <div className={`${colSpanClass} relative`}>
      <Image
        src={imageUrl}
        alt={name}
        className="object-cover w-full h-[30rem]"
      />
      {/* Overlay text */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 bg-black bg-opacity-50">
        <h2 className="text-white text-2xl font-bold">{name}</h2>
        {description && (
          <p className="text-white text-sm">{description}</p>
        )}
      </div>
    </div>
  );
};

const FurnitureCardList = () => {
  // Column spans based on the provided image layout
  const colSpans = [2, 1, 1, 2];
  return (
    <div className="container">
      <div className="flex flex-col items-start">
        <h1 className="font-outfit font-black text-white text-4xl pt-[7.5rem] pb-5">
          CHOOSE YOUR CATEGORIES
        </h1>
        <p className="text-white font-outfit pb-2">
          Check out some of our merchants collections
        </p>
      </div>
      {/* Grid with 3 columns and 2 rows */}
      <div className="grid grid-cols-3 gap-4 pt-8 pb-16">
        {items.slice(0, 4).map((item, index) => (
          <FurnitureCard
            key={index}
            imageUrl={item.imageUrl}
            name={item.name}
            description={item.description} // Optional description for "CHAIR"
            colSpan={colSpans[index]} // Use custom colSpan for each item
          />
        ))}
      </div>
    </div>
  );
};

export default FurnitureCardList;
