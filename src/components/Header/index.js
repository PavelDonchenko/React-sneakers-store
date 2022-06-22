import React from "react";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import AppContext from "../../context";
import Slider from "../HeaderSlider";


function Header(props) {
  const { cartItems } = React.useContext(AppContext);
  const orderSum = cartItems.reduce((sum, obj) => Number(obj.price) + sum, 0);
  return (
    <header >
      <div className="d-flex justify-between align-center p-40 mb-50">
        <Link to="/">
          <div className="d-flex align-center cu-p">
            <img src="img/logo.png" alt="logo" />
            <div className={styles.headerInfo}>
              <h3>REACT</h3>
              <p className="opacity-5">The best sneakers store</p>
            </div>
          </div>
        </Link>
        <ul className="d-flex">
          <li onClick={props.onClickCart} className="mr-50 cu-p d-flex">
            <img width={25} height={25} src="img/cart.svg" alt="cart" />
            <span>{orderSum }$</span>
          </li>
          <Link to="favorites">
            <li>
              <img
                className="cu-p mr-20"
                width={25}
                height={25}
                src="img/header-heard.svg"
                alt="favorite"
              />
            </li>
          </Link>
          <Link to = "orders">
            <li>
              <img
                className="cu-p"
                width={25}
                height={25}
                src="img/user.svg"
                alt="user"
              />
            </li>
          </Link>
        </ul>
      </div>
      <Slider />
    </header>
  );
}
export default Header;
