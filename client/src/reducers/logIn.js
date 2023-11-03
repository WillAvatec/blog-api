function reducer(state, action) {
  switch (action.type) {
    case "username": {
      return {
        ...state,
        username: action.val,
      };
    }
    case "password": {
      return {
        ...state,
        password: action.val,
      };
    }
  }
}

export default reducer;
