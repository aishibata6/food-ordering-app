import {Fragment} from "react";
import "./App.css";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";

function App() {
  return (
    <Fragment className="App">
      <Header />
      <main>
        <Meals />
      </main>
    </Fragment>
  );
}

export default App;
