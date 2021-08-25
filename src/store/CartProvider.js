import React, {useReducer} from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

// reducer takes in the current state, and I will write the action code.
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    // concat() returns brand new array
    // calculate the total in the cart. this happens every time.
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    // finds the index of matching id of the menu item (the one in the cart vs. the one I am adding)
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    // set to the matching item, otherwise it will be null
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    // 1. find the cart item
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    // set to the matching item, otherwise it will be null
    const existingItem = state.items[existingCartItemIndex];
    // 2. get the updated total amount
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      // eliminate the item with matching id (keep all items except that item)
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {...existingItem, amount: existingItem.amount - 1};
      updatedItems = [...state.items];
      // override the item with the updated number
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  // clear cart items when Confirm button is pressed
  if (action.type === "CLEAR") {
    return defaultCartState;
  }

  return defaultCartState;
};

const CartContextProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({
      type: "ADD",
      item: item,
    });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({
      type: "REMOVE",
      id: id,
    });
  };

  const clearCartHandler = () => {
    dispatchCartAction({type: "CLEAR"});
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
