import React from 'react'
import Card from "../components/Card";
import Slider from "../components/HeaderSlider";

function Home({
  searchValue,
  setSearchValue,
  onSearch,
  onAddToFavorit,
  items,
  onAddtoCart,
  cartItems,
  isLoading
}) {

  
    const renderItems = () => {
        const filtredItems = items.filter((item) =>
        item.title.toLowerCase().includes(searchValue.toLowerCase())
      );
        return (isLoading ? [...Array(8)] : filtredItems).map((el, i) => (
              <Card
                key={i}
                {...el}
                onFavorit={(obj) => onAddToFavorit(obj)}
                onPlus={(obj) => onAddtoCart(obj)}
                loading = {isLoading}
              />
            ))
    }
  return (
    
    <>
     <Slider />
      <div className="content p-40">
       
        <div className="mb-30 d-flex align-center justify-between">
          <h1 className='d-flex flex-wrap"'>
            {searchValue ? `search..."${searchValue}"` : "All sneakers"}
          </h1>
          <div className="search-block d-flex align-center">
            <img width={20} height={20} src="img/search.svg" alt="Search" />
            {searchValue && (
              <img
                onClick={() => setSearchValue("")}
                className="clear-search"
                src="img/btn-remove.svg"
                alt="remove"
              />
            )}
            <input
              onChange={onSearch}
              value={searchValue}
              placeholder="...Search"
            />
          </div>
        </div>
  
        <div className="d-flex flex-wrap">
         {renderItems()}
        </div>
      </div>
    </>
  );
}

export default Home;
