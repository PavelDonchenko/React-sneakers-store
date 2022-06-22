import React from "react";
import AppContext from "../../context";
import styles from '../Drawer/Drawer.module.scss';

const Info = ({image, title, description}) => {
    const {setCartOpened} = React.useContext(AppContext)

   
  return (
    <div className={styles.cartEmpty}>
      <img src={image} alt="empty cart" />
      <h3>{title}</h3>
      <p>{description}</p>
      <button onClick={() => setCartOpened(false)} className={styles.greenBtn}>
        Go back <img src="img/arrow.svg" alt="arrow" />
      </button>
    </div>
  );
};

export default Info;
