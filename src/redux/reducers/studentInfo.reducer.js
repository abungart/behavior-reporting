const studentInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_STUDENT_INFO":
      return action.payload;
    case "SET_STAFF_INFO":
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default studentInfoReducer;
