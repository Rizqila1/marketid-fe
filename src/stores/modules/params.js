// STATE
const initialState = {
  q: "",
  sort_by: "desc",
  page: 1,
  per_page: 15,
};

// REDUCER
const useReducerParams = (state = initialState, actions) => {
  switch (actions.type) {
    case "ACTION_SEARCH":
      return {
        ...state,
        q: actions.value,
      };

    case "ACTION_SORT_BY":
      return {
        ...state,
        sort_by: actions.value,
      };

    case "ACTION_PAGE":
      return {
        ...state,
        page: actions.value,
      };

    case "ACTION_PER_PAGE":
      return {
        ...state,
        per_page: actions.value,
      };

    default:
      return state;
  }
};

export default useReducerParams;
