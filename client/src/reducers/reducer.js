function reducer(state, action) {
  switch (action.type) {
    case "update-username": {
      return {
        ...state,
        username: action.newValue,
      };
    }
    case "update-password": {
      return {
        ...state,
        password: action.newValue,
      };
    }
    case "update-confirm": {
      return {
        ...state,
        dbl_password: action.newValue,
      };
    }
  }
  throw new Error("Unknown action:" + action.type);
}

export default reducer;
