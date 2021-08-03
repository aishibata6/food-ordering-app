import {Fragment, useState} from "react";
import "./App.css";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";

function App() {
  const [isCartShowing, setIsCartShowing] = useState(false);

  const showCartHandler = (e) => {
    console.log("button has been pressed.");
    setIsCartShowing(true);
  };

  const dismissCartHandler = (e) => {
    console.log("dissmiss.");
    setIsCartShowing(false);
  };

  return (
    <Fragment>
      <div className="App">
        {isCartShowing && <Cart onDismiss={dismissCartHandler} />}

        <Header onShowCart={showCartHandler} />
        <main>
          <Meals />
        </main>
      </div>
    </Fragment>
  );
}

export default App;
