import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import { FaShoppingCart, FaTimes, FaUserCircle } from "react-icons/fa";
import { auth } from "../../firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  REMOVE_ACTIVE_USER,
  SET_ACTIVE_USER,
} from "../../redux/slice/authSlice";
import { useEffect } from "react";
import { AdminOnlyLink } from "../adminOnlyRoute/AdminOnlyRoute";
import {
  CALCULATE_TOTAL_QUANTITY,
  selectCartTotalQuantity,
} from "../../redux/slice/cartSlice";


const logo = (
  <div className={styles.logo}>
    <Link to="/">
      <h2>
        e<span>Shop</span>.
      </h2>
    </Link>
  </div>
);

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const Header = () => {
 // const [showMenu, setShowMenu] = useState(false);
  const [displayName, setdisplayName] = useState("");
  const [scrollPage, setScrollPage] = useState(false);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
 

  useEffect(() => {
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fixNavbar = () => {
    if (window.scrollY > 50) {
      setScrollPage(true);
    } else {
      setScrollPage(false);
    }
  };
  window.addEventListener("scroll", fixNavbar);


    // Monitor currently sign in user
    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // console.log(user);
          if (user.displayName == null) {
            const u1 = user.email.slice(0, -10);
            const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
            setdisplayName(uName);
          } else {
            setdisplayName(user.displayName);
          }
  
          dispatch(
            SET_ACTIVE_USER({
              email: user.email,
              userName: user.displayName ? user.displayName : displayName,
              userID: user.uid,
            })
          );
        } else {
          setdisplayName("");
          dispatch(REMOVE_ACTIVE_USER());
        }
      });
    }, [dispatch, displayName]);



  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logout successfully.");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };


  const cart = (
    <span className={styles.cart}>
      <Link to="/cart">
        Cart
        <FaShoppingCart size={20} />
        <p>{cartTotalQuantity}</p>
      </Link>
    </span>
  );

  return (
   
      <header  className={scrollPage ? `${styles.fixed}` : null}>
        <div className={styles.header}>
          {logo}

          <nav>
            <ul >
              <li className={styles["logo-mobile"]}>
                {logo}
                <FaTimes size={22} color="#fff"  />
              </li>

              <li>
            <AdminOnlyLink>
            <Link to="/admin/home">
                <button className="--btn--btn-primary">Admin</button>
                </Link>
                </AdminOnlyLink>
              </li>
            
              <li>
                <NavLink to="/" className={activeLink}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={activeLink}>
                  Contact Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/cancellationrefund" className={activeLink}>
                Cancellation & refund
                </NavLink>
              </li>
              <li>
                <NavLink to="/termsofservice" className={activeLink}>
                Terms of service
                </NavLink>
              </li>
              <li>
                <NavLink to="/privacypolicy" className={activeLink}>
                Privacy Policy
                </NavLink>
              </li>
            </ul>
          <div className={styles["header-right"]}>

          <span className={styles.links}>
          
          <NavLink to ="/login" className={activeLink} >Login</NavLink>
          <a href="#home" style={{ color: "#ff7722" }}>

          <FaUserCircle size={16} />
          Hi, {displayName}
          </a>
          <NavLink to ="/register" className={activeLink}>Register</NavLink>
          <NavLink to ="/order-history" className={activeLink}>My Orders</NavLink>
          <NavLink to ="/" onClick={logoutUser}>Logout</NavLink>

          </span>
          {cart}
   
          </div>

           </nav>
            
        </div>
      </header>

  );
};

export default Header;