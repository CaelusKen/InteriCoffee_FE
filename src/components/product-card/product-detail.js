import React from "react";

const ProductDetail = ({ id, name }) => {
  console.log("Product ID:", id, "Product Name:", name);
    
  return (
    <div className="container">
      <h1 className="font-outfit text-white text-4xl">Hello, Product ID: {id}</h1>
      <div className="text-white">Hello, Name: {name}</div>
    </div>
  );
};

export default ProductDetail;
