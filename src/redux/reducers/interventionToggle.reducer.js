const interventionToggle = (state = {}, action) => {
  switch (action.type) {
    case "SET_INTERVENTION_TOGGLE":
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.userList
export default interventionToggle;
