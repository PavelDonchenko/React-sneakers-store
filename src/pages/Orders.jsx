import React from 'react'
import Card from '../components/Card'
import styles from '../components/Drawer/Drawer.module.scss'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Orders ({ onAddToFavorit, onAddtoCart}) {
  const [isOrders, setIsOrders] = React.useState([])

  React.useEffect(() => {
   (async() => {
    const { data } = await axios.get(
      "https://62ab18c4a62365888bd4b186.mockapi.io/order"
    );
    setIsOrders(data.map((el) => el.items).flat())
   })()
  }, [])
    return (
        <div className="content p-40">
           <div className='mb-30 d-flex align-center justify-between'>
          <h1 className='d-flex flex-wrap'>My orders</h1>
        </div>
        {isOrders.length > 0 ? (
          <div className="d-flex flex-wrap">
          {isOrders.map((el, i) => (
              <Card
                key={i}
                {...el}
              />
            ))}
        </div>
        ) : (
          <div className={styles.favotiteEmpty}>
                        <img src="img/favorite-smile.svg" alt="no favorite" />
                        <h3>You don't have oreders :( </h3>
                        <p>Add atleast one order.</p>
                        <Link to = '/'><button  className={styles.greenBtn}>Go back<img src="img/arrow.svg" alt="arrow" /></button></Link>
                    </div>
        )}
        


      </div>
    )
}


export default Orders;