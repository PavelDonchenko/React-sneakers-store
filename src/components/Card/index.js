import React from "react";
import styles from "./Card.module.scss";
import ContentLoader from "react-content-loader";
import AppContext from '../../context'


function Card({
  onPlus,
  id,
  image,
  title,
  price,
  onFavorit,
  favorited = false,
  loading = false,
}) {
  const {isItemAdded} = React.useContext(AppContext)

  const [isFavorit, setisFavorit] = React.useState(favorited);

  const onClickPlus = () => {
    onPlus({ id, parentId: id, image, title, price });
  };
  const onClickFavorit = () => {
    onFavorit({ image, title, price, id, parentId: id });
    setisFavorit(!isFavorit);
  };

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={150}
          height={200}
          viewBox="0 0 150 200"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="1" y="105" rx="5" ry="5" width="150" height="15" />
          <rect x="20" y="219" rx="3" ry="3" width="380" height="6" />
          <rect x="1" y="1" rx="10" ry="10" width="150" height="90" />
          <rect x="1" y="135" rx="4" ry="4" width="150" height="15" />
          <rect x="1" y="171" rx="6" ry="6" width="80" height="24" />
          <rect x="112" y="165" rx="7" ry="7" width="36" height="33" />
        </ContentLoader>
      ) : (
        <>
          <div className={styles.favorit} onClick={onClickFavorit}>
           {onFavorit && (
              <img
              src={isFavorit ? "img/heard-liked.svg" : "img/heard-unliked.svg"}
              alt="unliked"
            />
           )}
          </div>
          <img width={132} height={122} src={image} alt="foto sneakers" />
          <p>{title}</p>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>price:</span>
              <b>{price} $</b>
            </div>
            {onPlus && (
              <img
              className={styles.plus}
              onClick={onClickPlus}
              src={isItemAdded(id) ? "img/btn-checked.svg" : "img/plus.svg"}
              alt="plus"
            />
            )}
          </div>
        </>
      )}
    </div>
  );
}
export default Card;
