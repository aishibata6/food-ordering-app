import MealsSummary from "./MealsSummary";
import AvailableMeals from "./AvailableMeals";
import {Fragment} from "react";

const Meals = (props) => {
  return (
    <Fragment>
      <MealsSummary />
      <AvailableMeals meals={props.meals} />
    </Fragment>
  );
};

export default Meals;
