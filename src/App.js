import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Drawer from "./components/Drawer";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import AppContext from "./context";
import Orders from "./pages/Orders";

function App() {
  const [cartOpened, setCartOpened] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [favorit, setFavorit] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    //   fetch("https://62ab18c4a62365888bd4b186.mockapi.io/items").then(response => {
    //   return response.json()
    // }).then((json) => {
    //   setItems(json);
    // })
    async function fetchData() {
      try {
        const [favoriteResponse, itemsResponce, cartResponse] = await Promise.all(
          [axios.get("https://62ab18c4a62365888bd4b186.mockapi.io/favorites"),
          axios.get("https://62ab18c4a62365888bd4b186.mockapi.io/items"),
          axios.get("https://62ab18c4a62365888bd4b186.mockapi.io/cart")]
        );
        setIsLoading(true);

        setIsLoading(false);

        setCartItems(cartResponse.data);
        setFavorit(favoriteResponse.data);
        setItems(itemsResponce.data);
      } catch (error) {
        alert("Ошибка запроса");
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const onAddtoCart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id))
      if (findItem) {
        setCartItems((prev) =>
          prev.filter((item) => Number(item.parentId) !== Number(obj.id))
        );
        await axios.delete(
          `https://62ab18c4a62365888bd4b186.mockapi.io/cart/${findItem.id}`
        );

      } else {
        const { data } = await axios.post("https://62ab18c4a62365888bd4b186.mockapi.io/cart", obj);
        setCartItems((prev) => [...prev, data]);

      }
    } catch (error) {
      alert('ошибка при добавлениии в корзину')
      console.error(error)
    }
  };

  const onRemovefromCart = async (id) => {
    try {
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
      await axios.delete(`https://62ab18c4a62365888bd4b186.mockapi.io/cart/${id}`);
    } catch (error) {
      alert('ошибка пи удалении с корзины')
      console.error(error)
    }
  };

  const onSearch = (event) => {
    setSearchValue(event.target.value);
  };

  const onAddToFavorit = async (obj) => {
    try {
      if (favorit.find((favObj) => favObj.id === obj.id)) {
        axios.delete(
          `https://62ab18c4a62365888bd4b186.mockapi.io/favorites/${obj.id}`
        );
        setFavorit((prev) => prev.filter((item) => item.id !== obj.id));
      } else {
        const { data } = await axios.post(
          "https://62ab18c4a62365888bd4b186.mockapi.io/favorites",
          obj
        );
        setFavorit((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("error");
    }
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorit,
        isItemAdded,
        setCartOpened,
        setCartItems,
      }}
    >
      <div className="wrapper clear">
        {cartOpened && (
          <Drawer
            items={cartItems}
            onClickCloseCart={() => setCartOpened(false)}
            onRemove={onRemovefromCart}
          />
        )}
        <Header onClickCart={() => setCartOpened(true)} />

        <Routes>
          <Route
            path="/"
            element={
              <Home
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onSearch={onSearch}
                onAddToFavorit={onAddToFavorit}
                items={items}
                onAddtoCart={onAddtoCart}
                cartItems={cartItems}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path="favorites"
            element={
              <Favorites
                onAddToFavorit={onAddToFavorit}
                onAddtoCart={onAddtoCart}
              />
            }
          />
          <Route path="orders"
            element={
              <Orders
              />} />
        </Routes>
        <Footer/>
      </div>
    </AppContext.Provider>
  );
}

export default App;
