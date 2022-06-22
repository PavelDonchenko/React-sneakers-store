import React from 'react'
import Card from '../components/Card'
import styles from '../components/Drawer/Drawer.module.scss'
import { Link } from 'react-router-dom'
import AppContext from '../context'

function Favorites ({ onAddToFavorit, onAddtoCart}) {
  const {favorit} = React.useContext(AppContext)
    return (
        <div className="content p-40">
           <div className='mb-30 d-flex align-center justify-between'>
          <h1 className='d-flex flex-wrap'>My favorites</h1>
        </div>
        {favorit.length > 0 ? (
          <div className="d-flex flex-wrap">
          {favorit.map((el, i) => (
              <Card
                key={i}
                {...el}
                favorited = {true}
                onFavorit={(obj) => onAddToFavorit(obj)}
                onPlus={(obj) => onAddtoCart(obj)}
              />
            ))}
        </div>
        ) : (
          <div className={styles.favotiteEmpty}>
                        <img src="img/favorite-smile.svg" alt="no favorite" />
                        <h3>Favorites are empty :( </h3>
                        <p>You have not added anything to the favorites.</p>
                        <Link to = '/'><button  className={styles.greenBtn}>Go back <img src="img/arrow.svg" alt="arrow" /></button></Link>
                    </div>
        )}
        


      </div>
    )
}


export default Favorites;