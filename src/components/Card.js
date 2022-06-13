function Card(){
    return (
        <div className="card">
        <div className="favorit"><img src="img/heard-unliked.svg" alt="unliked" /></div>
        <img width={132} height={122} src="img/sneakers/1.jpg" alt="foto sneakers" />
        <p>Мужские Кроссовки Nike Blazer Mid Suede</p>
        <div className="d-flex justify-between align-center">
          <div className="d-flex flex-column">
            <span>цена:</span>
            <b>3500 грн</b>
          </div>
          <button className='button'>
            <img width={11} height={11} src="img/plus.svg" alt="plis" />
          </button>
        </div>
      </div>
    )
}
export default Card;