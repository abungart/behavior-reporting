const currentUserDataReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_USER_INFO":
      return action.payload;
    case "UNSET_USER_INFO":
      return {};
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.currentUserData
export default currentUserDataReducer;
