import React, {Fragment} from "react";
import mealsImage from "../../assets/meals.jpeg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>QuickMeals</h1>
        <HeaderCartButton
          onCartButton={props.onShowCart}
          onDismiss={props.onDismiss}
        />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="QuickMeals food selections" />
      </div>
    </Fragment>
  );
};

export default Header;
