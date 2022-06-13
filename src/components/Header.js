function Header(){
    return (
        <header className="d-flex justify-between align-center p-40">
        <div className="d-flex align-center">
          <img width='40px' height='40px' src="img/logo.png" alt="logo" />
          <div className='headerInfo'>
            <h3>REACT SNEAKERS</h3>
            <p className="opacity-5">Магазин лучших кроссовок</p>
          </div>
        </div>
        <ul className="d-flex">
          <li className='mr-30'>
            <img width={18} height={18} src="img/cart.svg" alt="" />
            <span>500грн</span>
          </li>
          <li>
            <img width={18} height={18} src="img/user.svg" alt="" />
          </li>
        </ul>
      </header>
    )
}
export default Header;