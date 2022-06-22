import styles from "./Drawer.module.scss";
import Info from "../Info";
import React from "react";
import AppContext from "../../context";
import axios from "axios";

const delay = (ms) => new Promise ((resolve) => setTimeout(resolve, ms))

function Drawer({ onRemove, onClickCloseCart, items = [] }) {
  const [isCompliteOrder, setIsCompliteOrder] = React.useState(false);
  const [orderId, setOrderId] = React.useState(null);

  const { cartItems, setCartItems } = React.useContext(AppContext);

  const orderSum = cartItems.reduce((sum, obj) => Number(obj.price) + sum, 0);

  const onClickOrder = async () => {
    try {
      const { data } = await axios.post(
        "https://62ab18c4a62365888bd4b186.mockapi.io/order",
        {items : cartItems}
      );
      
      setOrderId(data.id);
      setIsCompliteOrder(true);
      setCartItems([]);
      for (let i = 0; i < cartItems.length; i++) {
          const item = cartItems[i];
          await axios.delete(`https://62ab18c4a62365888bd4b186.mockapi.io/cart/${item.id}`)
          await delay(1000)
      }
    } catch (error) {
      alert("sorry, the order is not complite");
    }
  };
  return (
    <div className={styles.overlay}>
      <div className={styles.drawer}>
        <h2 className="mb-30 d-flex align-center justify-between ">
          Cart
          <img
            onClick={onClickCloseCart}
            className={styles.removebtn}
            src="img/btn-remove.svg"
            alt="remove"
          />
        </h2>
        {items.length > 0 ? (
          <>
            <div className={styles.items}>
              {items.map((obj, i) => (
                <div className={styles.cartitem} key={i}>
                  <img
                    className="mr-15"
                    width={70}
                    height={70}
                    src={obj.image}
                    alt="Sneakers"
                  />
                  <div className="mr-10">
                    <p className="mb-10">{obj.title}</p>
                    <b>{obj.price}$.</b>
                  </div>
                  <img
                    onClick={() => onRemove(obj.id)}
                    className={styles.removebtn}
                    src="img/btn-remove.svg"
                    alt="remove"
                  />
                </div>
              ))}
            </div>
            <div className={styles.cartTotalModels}>
              <ul className="mb-20">
                <li className="d-flex">
                  <span>Total: </span>
                  <div></div>
                  <b>{orderSum}$</b>
                </li>
                <li className="d-flex">
                  <span>Tax 5%: </span>
                  <div></div>
                  <b>{orderSum / 100 * 5}$</b>
                </li>
              </ul>
              <button onClick={onClickOrder} className={styles.greenBtn}>
                Checkout <img src="img/arrow.svg" alt="arrow" />
              </button>
            </div>
          </>
        ) : (
          <Info
            image={
              isCompliteOrder ? "img/Order-complite.svg" : "img/cart-empty.jpg"
            }
            title={isCompliteOrder ? "Order executed" : "Cart is empty"}
            description={
              isCompliteOrder
                ? `Your order ${orderId} will soon be handed over by courier delivery`
                : "Add at least one pair of sneakers to order."
            }
          />
        )}
      </div>
    </div>
  );
}

export default Drawer;
