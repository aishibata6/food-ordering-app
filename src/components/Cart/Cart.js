import React, {useState, useContext} from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import CheckOutForm from "./CheckOutForm";

const Cart = (props) => {
  const ctx = useContext(CartContext);
  const [orderPressed, setOrderPressed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
  const hasItems = ctx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    ctx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    ctx.addItem({
      ...item,
      amount: 1,
    });
  };

  const orderHandler = () => {
    setOrderPressed(true);
  };

  // send data to Firebase
  // send data to /orders node, which will be automatically created when sending data
  // submit userdata collected in CheckOutForm, and order info from cart context (ctx) to Firebase
  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://food-ordering-app-915b6-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: ctx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    ctx.clearCart();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {ctx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onDismiss}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const afterSubmitModalContent = (
    <React.Fragment>
      <p>Submitted order successfully.</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onDismiss}>
          Ok
        </button>
      </div>
    </React.Fragment>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {orderPressed && (
        <CheckOutForm
          onCancel={props.onDismiss}
          onConfirm={submitOrderHandler}
        />
      )}
      {!orderPressed && modalActions}
    </React.Fragment>
  );

  return (
    <Modal onDismiss={props.onDismiss}>
      {isSubmitting && <p>Submitting order...</p>}
      {!didSubmit ? cartModalContent : afterSubmitModalContent}
    </Modal>
  );
};

export default Cart;
