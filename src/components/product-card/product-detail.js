import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { Scrollbar } from "swiper/modules";
import { Images } from "@/utils/images";

const ProductDetail = ({ id, name, merchant, imageUrl }) => {
  const productImages = [
    Images.productCard,
    Images.productHomePage3,
    Images.productCard,
    Images.productHomePage2,
  ];

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleThumbnailClick = (index) => {
    setActiveImageIndex(index);
  };

  return (
    <div className="flex flex-row justify-between gap-6 px-10 container">
      {/* Thumbnail Column */}
      <div className="h-[25rem] w-1/12">
        <Swiper
          modules={[Scrollbar]}
          direction="vertical"
          spaceBetween={10}
          slidesPerView={3}
          scrollbar={{ draggable: true }}
          style={{ height: "100%" }}
          navigation={false}
        >
          {productImages.map((image, index) => (
            <SwiperSlide key={index}>
              <div
                style={{ position: "relative", width: "100%", height: "100%" }}
                onClick={() => handleThumbnailClick(index)}
                className="cursor-pointer"
              >
                <Image
                  src={image}
                  alt={`Product image ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  sizes="100vw"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Main Image Display */}
      <div className="w-6/12">
        <div className="relative h-[25rem] w-full">
          <Image
            src={productImages[activeImageIndex]}
            alt="Main product image"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      </div>
      <div className="w-5/12 ">
        <h1 className="text-white text-4xl font-outfit font-semibold">{name}</h1>
        <h2 className="text-white text-2xl font-outfit font-semibold">{merchant}</h2>
      </div>
    </div>
  );
};

export default ProductDetail;
