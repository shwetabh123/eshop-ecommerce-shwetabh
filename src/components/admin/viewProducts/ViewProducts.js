import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { db, storage } from "../../../firebase/config";
import styles from "./ViewProducts.module.scss";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Loader from "../../loader/Loader";
import { deleteObject, ref } from "firebase/storage";
import Notiflix from "notiflix";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProducts,
  STORE_PRODUCTS,
} from "../../../redux/slice/productSlice";
import {
  FILTER_BY_SEARCH,
  selectFilteredProducts,
  //SORT_PRODUCTS,
} from "../../../redux/slice/filterSlice";
import Pagination from "../../pagination/Pagination";
//import useFetchCollection from "../../../customHooks/useFetchCollection";
import Search from "../../search/Search";


const ViewProducts =  () => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const filteredProducts = useSelector(selectFilteredProducts);

 // Pagination states
 const [currentPage, setCurrentPage] = useState(1);
 const [productsPerPage] = useState(5);
 // Get Current Products
 const indexOfLastProduct = currentPage * productsPerPage;
 const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
 const currentProducts = filteredProducts.slice(
   indexOfFirstProduct,
   indexOfLastProduct
 );

  // const { data, isLoading } = useFetchCollection
  // ("products");

  // const products = useSelector(selectProducts);

   const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(
  //     STORE_PRODUCTS({
  //       products: data,
  //     })
  //   );
  // }, [dispatch, data]);

  useEffect(() => {
    const getProducts = async (id, imageURL) => {
      setIsLoading(true)
      try {
        const productsRef=collection(db,"products");
        const q = query(productsRef, orderBy("createdAt", "desc"));
  
      onSnapshot(q, (snapshot) => {
      console.log(snapshot.docs);
  
      const allproducts=snapshot.docs.map((doc)=>({
        id:doc.id,
        ...doc.data()
  
      }) )
  
      console.log(allproducts);
      setProducts(allproducts);
      setIsLoading(false);
      dispatch(STORE_PRODUCTS({
  
        products:allproducts,
        
      })
      
      );
      });
    }
       catch (error) {
        setIsLoading(false);
        toast.error(error.message);
      }
    };
    getProducts()
  }, []);

  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ products, search }));
  }, [dispatch, products, search]);

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
  //   dispatch(STORE_PRODUCTS({

  //     products:allproducts,
      
  //   })
    
  //   );
  //   });
  // }
  //    catch (error) {
  //     setIsLoading(false);
  //     toast.error(error.message);
  //   }
  // };

  const confirmDelete = (id, imageURL) => {
    Notiflix.Confirm.show(
      "Delete Product!!!",
      "You are about to delete this product",
      "Delete",
      "Cancel",
      function okCb() {
        deleteProduct(id, imageURL);
      },
      function cancelCb() {
        console.log("Delete Canceled");
      },
      {
        width: "320px",
        borderRadius: "3px",
        titleColor: "orangered",
        okButtonBackground: "orangered",
        cssAnimationStyle: "zoom",
      }
    );
  };

  const deleteProduct = async (id, imageURL) => {
    try {
      await deleteDoc(doc(db, "products", id));

      const storageRef = ref(storage, imageURL);
      await deleteObject(storageRef);
      toast.success("Product deleted successfully.");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
   <>
      {isLoading && <Loader />}
 <div className={styles.table}>
 <h2>All Products</h2>

 <div className={styles.search}>
          <p>
            <b>{filteredProducts.length}</b> products found
          </p>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        {filteredProducts.length === 0 ? (
          <p>No product found.</p>
 ):(

  <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product, index) => {
                const { id, name, price, imageURL, category } = product;
                return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={imageURL}
                        alt={name}
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td>{name}</td>
                    <td>{category}</td>
                    <td>{`$${price}`}</td>
                    <td className={styles.icons}>
                      <Link to={`/admin/add-product/${id}`}>
                        <FaEdit size={20} color="green" />
                      </Link>
                      &nbsp;
                      <FaTrashAlt
                        size={18}
                        color="red"
                        onClick={() => confirmDelete(id, imageURL)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
 )
}
<Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          productsPerPage={productsPerPage}
          totalProducts={filteredProducts.length}
        />




 </div>
   </>
     
  );
};

export default ViewProducts;