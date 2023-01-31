import React from 'react'
import ProductFilter from "./productFilter/ProductFilter";
import ProductList from "./productList/ProductList";
import { FaCogs } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Product.module.scss";
import { useEffect, useState } from "react";
import spinnerImg from "../../assets/spinner.jpg";
import {
  GET_PRICE_RANGE,
  selectProducts,
  STORE_PRODUCTS,
} from "../../redux/slice/productSlice";
import useFetchCollection from "../../customHooks/useFetchCollection";

const Product = () => {
  const { data, isLoading } = useFetchCollection("products");
  //const [products, setProducts] = useState([]);
  //const [isLoading, setIsLoading] = useState(false);
  
    const [showFilter, setShowFilter] = useState(false);

    const products = useSelector(selectProducts);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(
        STORE_PRODUCTS({
          products: data,
        })
      );
  
      dispatch(
        GET_PRICE_RANGE({
          products: data,
        })
      );
    }, [dispatch, data]);

    const toggleFilter = () => {
      setShowFilter(!showFilter);
    };
  

    // useEffect(() => {
    //   getProducts()
    // }, []);
  
    // const getProducts = async (id, imageURL) => {
    //   setIsLoading(true)
    //   try {
    //     const productsRef=collection(db,"products");
    //     const q = query(productsRef, orderBy("createdAt", "desc"));
  
    //   onSnapshot(q, (snapshot) => {
    //   console.log(snapshot.docs);
  
    //   const allproducts=snapshot.docs.map((doc)=>({
    //     id:doc.id,
    //     ...doc.data()
  
    //   }) )
  
    //   console.log(allproducts);
    //   setProducts(allproducts);
    //   setIsLoading(false);
    //   });
    // }
    //    catch (error) {
    //     setIsLoading(false);
    //     toast.error(error.message);
    //   }
    // };

    console.log(products);

  return (
    <section>
      <div className={`container ${styles.product}`}>
      <aside
          className={
            showFilter ? `${styles.filter} ${styles.show}` : `${styles.filter}`
          }
        >
        {isLoading ? null : <ProductFilter />}
        </aside>

        <div className={styles.content}>

        {isLoading ? (
            <img
              src={spinnerImg}
              alt="Loading.."
              style={{ width: "50px" }}
              className="--center-all"
            />
          ) : (

            <ProductList product={products}/>

            )}
    <div className={styles.icon} onClick={toggleFilter}>
            <FaCogs size={20} color="orangered" />
            <p>
              <b>{showFilter ? "Hide Filter" : "Show Filter"}</b>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Product