const userList = (state = [], action) => {
  switch (action.type) {
    case "SET_USER_LIST":
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.userList
export default userList;
