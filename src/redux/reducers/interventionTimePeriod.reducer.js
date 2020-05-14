const interventionTimePeriod = (state = [], action) => {
  switch (action.type) {
    case "SET_PERIOD_INTERVENTION":
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.userList
export default interventionTimePeriod;
