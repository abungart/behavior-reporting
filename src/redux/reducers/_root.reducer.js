import { combineReducers } from "redux";
import errors from "./errors.reducer";
import loginMode from "./loginMode.reducer";
import user from "./user.reducer";
import currentUserData from "./currentUserData.reducer";
import userList from "./userList.reducer";
import studentInfo from "./studentInfo.reducer";
import intervention from "./intervention.reducer";
import interventionTimePeriod from "./interventionTimePeriod.reducer";
import interventionToggle from "./interventionToggle.reducer";

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  currentUserData, // stores the data for the current user
  userList, // stores list of users for current view
  studentInfo, // stores student info separate from the staff info for the IndividualBehavior page
  intervention, // stores intervention data for reporting
  interventionTimePeriod, // stored intervention data from weeks, months, or in total
  interventionToggle, // stores information about individual student's intervention goals
});

export default rootReducer;
