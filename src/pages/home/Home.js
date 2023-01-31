import React from 'react'

import Product from '../../components/product/Product';
import  { useEffect } from "react";

const Home = () => {

  const url = window.location.href;
  //alert(url);

  useEffect(() => {
    const scrollToProducts = () => {
      if (url.includes("#products")) {
        window.scrollTo({
          top: 700,
          behavior: "smooth",
        });
        return;
      }
    };
  scrollToProducts();
}, [url]);

  return (
    <div>
      
    <Product/>
    </div>
  );
};
export default Home;