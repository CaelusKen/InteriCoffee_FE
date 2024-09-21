import React from "react";
import { useRouter } from "next/router";
import ProductListItem from "@/components/product-list/product-list-item"; // Import your ProductListItem component
import ProductDetail from "@/components/product-card/product-detail"; // Import your ProductDetail component

const ProductsPage = () => {
  const router = useRouter();
  const { id, name, merchant } = router.query; 

  return (
    <div>
      {id ? (
        <ProductDetail id={id} name={name} merchant={merchant} /> // Pass the product ID to ProductDetail
      ) : (
        <ProductListItem /> // Render the ProductListItem component
      )}
    </div>
    // <div>
    //   <ProductDetail id={id} />
    // </div>
  );
};

export default ProductsPage;
