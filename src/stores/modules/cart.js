// STATE
const initialState = {
  carts: [],
};

// REDUCER
const useReducerCarts = (state = initialState, actions) => {
  switch (actions.type) {
    case "SET_CARTS":
      return {
        carts: actions.value,
      };

    default:
      return state;
  }
};

export default useReducerCarts;
