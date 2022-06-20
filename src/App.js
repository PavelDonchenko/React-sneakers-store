import React from "react";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import AppContext from "./context";



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
      setIsLoading(true);

      const favoriteResponse = await axios.get(
        "https://62ab18c4a62365888bd4b186.mockapi.io/favorites"
      );

      const itemsResponce = await axios.get(
        "https://62ab18c4a62365888bd4b186.mockapi.io/items"
      );

      const cartResponse = await axios.get(
        "https://62ab18c4a62365888bd4b186.mockapi.io/cart"
      );

      setIsLoading(false);

      setCartItems(cartResponse.data);
      setFavorit(favoriteResponse.data);
      setItems(itemsResponce.data);
    }
    fetchData();
  }, []);

  const onAddtoCart = (obj) => {
    if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
      axios.delete(
        `https://62ab18c4a62365888bd4b186.mockapi.io/cart/${obj.id}`
      );
      setCartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(obj.id))
      );
    } else {
      console.log(obj);
      setCartItems((prev) => [...prev, obj]);
      axios.post("https://62ab18c4a62365888bd4b186.mockapi.io/cart", obj);
    }
  };

  const onRemovefromCart = (id) => {
    axios.delete(`https://62ab18c4a62365888bd4b186.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
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
    return cartItems.some((obj) => Number(obj.id) === Number(id))
  }

  return (
    <AppContext.Provider value={{ items, cartItems, favorit, isItemAdded }}>
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
            element={<Favorites onAddToFavorit={onAddToFavorit} onAddtoCart={onAddtoCart} />}
          />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
