function Drawer() {
    return (
        <div style={{ display: 'none' }} className="overlay">
            <div className="drawer">
                <h2 className="mb-30 d-flex align-center justify-between ">Корзина<img className="removebtn" src="img/btn-remove.svg" alt="remove" /></h2>
                <div className="items">
                    <div className="cartitem d-flex align-center mb-20">
                        <img className="mr-15" width={70} height={70} src="img/sneakers/1.jpg" alt="Sneakers" />
                        <div className="mr-10">
                            <p className="mb-10">Мужские Кроссовки Nike Air Max 270</p>
                            <b>1000грн.</b>
                        </div>
                        <img className="removebtn" src="img/btn-remove.svg" alt="remove" />
                    </div>
                    <div className="cartitem d-flex align-center mb-20">
                        <img className="mr-15" width={70} height={70} src="img/sneakers/1.jpg" alt="Sneakers" />
                        <div className="mr-10">
                            <p className="mb-10">Мужские Кроссовки Nike Air Max 270</p>
                            <b>1000грн.</b>
                        </div>
                        <img className="removebtn" src="img/btn-remove.svg" alt="remove" />
                    </div>
                </div>
                <div className="cartTotalModels">
                    <ul className="mb-20">
                        <li className="d-flex">
                            <span>Итого: </span>
                            <div></div>
                            <b>5000грн.</b>
                        </li>
                        <li className="d-flex">
                            <span>Налог 5%: </span>
                            <div></div>
                            <b>100грн.</b>
                        </li>
                    </ul>
                    <button className="greenBtn">Оформить заказ <img src="img/arrow.svg" alt="arrow" /></button>
                </div>
            </div>
        </div>
    )
}

export default Drawer