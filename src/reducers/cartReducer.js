let intialState = [];

//if cart is available in local storage, get it.
if (typeof window !== "undefined") {
  if (localStorage.getItem("cart")) {
    intialState = JSON.parse(localStorage.getItem("cart"));
  } else {
    intialState = [];
  }
}

export const cartReducer = (state = intialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return action.payload;
    default:
      return state;
  }
};
