import {useState} from "react";
import "./App.css";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartContextProvider from "./store/CartProvider";

function App() {
  const [isCartShowing, setIsCartShowing] = useState(false);
  // const [meals, setMeals] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [isError, setIsError] = useState(false);

  // const fetchMeals = useCallback(async () => {
  //   setIsLoading(true);
  //   setIsError(null);
  //   try {
  //     const response = await fetch(
  //       "https://food-ordering-app-915b6-default-rtdb.firebaseio.com/meals.json"
  //     );
  //     if (!response.ok) {
  //       throw new Error("Something went wrong!");
  //     }
  //     const data = await response.json();
  //     const loadedMeals = [];

  //     for (const key in data) {
  //       loadedMeals.push({
  //         id: key,
  //         name: data[key].name,
  //         description: data[key].description,
  //         price: data[key].price,
  //       });
  //     }
  //     setMeals(loadedMeals);
  //   } catch (error) {
  //     setIsError(error.message);
  //   }
  //   setIsLoading(false);
  // }, []);

  // useEffect(() => {
  //   fetchMeals();
  // }, [fetchMeals]);

  const showCartHandler = (e) => {
    console.log("button has been pressed.");
    setIsCartShowing(true);
  };

  const dismissCartHandler = (e) => {
    console.log("dissmiss.");
    setIsCartShowing(false);
  };

  return (
    <CartContextProvider>
      <div className="App">
        {isCartShowing && <Cart onDismiss={dismissCartHandler} />}

        <Header onShowCart={showCartHandler} />
        <main>
          <Meals />
          {/* {isLoading && <p>Loading...</p>}
          {isError && <p>An error occured.</p>} */}
        </main>
      </div>
    </CartContextProvider>
  );
}

export default App;
