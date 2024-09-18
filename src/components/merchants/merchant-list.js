// import Image from "next/image";
// import React from "react";
// import { merchants } from "@/utils/merchant-list-dummy";

// const MerchantCard = ({ merchant, merchantImage, colSpan, description }) => {
//   const colSpanClass = `col-span-${colSpan}`;
//   return (
//     <div className={`${colSpanClass} relative`}>
//       <Image
//         src={merchantImage}
//         alt={merchant}
//         className="object-cover w-full h-[30rem]"
//       />
//       <div className="absolute inset-0 flex flex-col justify-end p-4 bg-black bg-opacity-50">
//         <h2 className="text-white text-2xl font-bold">{merchant}</h2>
//         {description && (
//           <p className="text-white text-sm">{description}</p>
//         )}
//       </div>
//     </div>
//   );
// };

// const MerchantCardList = () => {
//   const colSpans = [2, 1, 1, 2, 1, 1, 1, 2];
//   return (
//     <div className="container">
//       <div className="flex flex-col items-start">
//         <h1 className="font-outfit font-black text-white text-4xl pt-[7.5rem] pb-5">
//           MERCHANTS
//         </h1>
//         <p className="text-white font-outfit pb-2">
//           Check out these fantastic merchants and their products
//         </p>
//       </div>
//       <div className="grid grid-cols-4 grid-rows-3 gap-4">
//         {merchants.slice(0, 8).map((merchant, index) => (
//           <MerchantCard
//             key={index}
//             merchantImage={merchant.merchantImage}
//             merchant={merchant.merchant}
//             description={merchant.description}
//             colSpan={colSpans[index]}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MerchantCardList;

import Image from "next/image";
import React from "react";
import { merchants } from "@/utils/merchant-list-dummy";
import { Button } from "../ui/button";

const MerchantCard = ({ merchant, merchantImage, colSpan, rowSpan, description }) => {
  const colSpanClass = `col-span-${colSpan}`;
  const rowSpanClass = rowSpan ? `row-span-${rowSpan}` : '';
  return (
    <div className={`${colSpanClass} ${rowSpanClass} relative`}>
      <Image
        src={merchantImage}
        alt={merchant}
        className="object-cover w-full h-full"
      />
      <div className="absolute inset-0 flex flex-col justify-end p-4 bg-black bg-opacity-50">
        <h2 className="text-white text-2xl font-bold">{merchant}</h2>
        {description && <p className="text-white text-sm">{description}</p>}
      </div>
    </div>
  );
};

const MerchantCardList = () => {
  const colSpans = [1, 1, 2, 2, 2]; // Column spans
  const rowSpans = [2, 1, 1, 1, 1, 1, 1, 1]; // Row spans (first item takes 2 rows)
  
  return (
    <div className="container">
      <div className="flex flex-col items-start">
        <h1 className="font-outfit font-black text-white text-4xl pt-[7.5rem] pb-5">
          MERCHANTS
        </h1>
        <p className="text-white font-outfit pb-2">
          Check out these fantastic merchants and their products
        </p>
      </div>
      <div className="grid grid-cols-4 grid-rows-2 gap-4 pt-8 pb-16">
        {merchants.slice(0, 5).map((merchant, index) => (
          <MerchantCard
            key={index}
            merchantImage={merchant.merchantImage}
            merchant={merchant.merchant}
            description={merchant.description}
            colSpan={colSpans[index]}
            rowSpan={rowSpans[index]}
          />
        ))}
      </div>
      <div className="flex justify-center py-6">
        <Button className="bg-[#B88D6F] text-white font-outfit px-10 py-2 rounded-none">
          VIEW ALL MERCHANTS
        </Button>
      </div>
    </div>
  );
};

export default MerchantCardList;
