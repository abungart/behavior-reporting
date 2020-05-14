const intervention = (state = [], action) => {
  switch (action.type) {
    case "SET_STUDENT_DAY_INTERVENTION":
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.userList
export default intervention;
