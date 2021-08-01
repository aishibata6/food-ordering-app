import classes from "./Cart.module.css";
import Card from "../UI/Card";

const Cart = (props) => {
  return (
    <Card>
      <div>
        <ul>
          <li>
            <div>
              <h2>Sushi</h2>
              <div>
                <span>$22.99</span>
                <span>x 3</span>
              </div>
            </div>
            <div>
              <button>-</button>
              <button>+</button>
            </div>
          </li>
        </ul>
        <div>
          <span>Total Amount</span>
          <span>$68.97</span>
        </div>
        <div>
          <button>Close</button>
          <button>Order</button>
        </div>
      </div>
    </Card>
  );
};

export default Cart;
