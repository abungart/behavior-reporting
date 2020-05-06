import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// Used to get staff list
function* getStaffList() {
  try {
    const response = yield axios.get("/api/user/staffList");

    // now that the session has given us a user list

    yield put({ type: "SET_USER_LIST", payload: response.data });
  } catch (error) {
    console.log("Staff List get request failed", error);
  }
}

// Used to get students list
function* getStudentList(action) {
  try {
    const thisUser = action.payload;
    const queryText = `/api/user/studentList/${thisUser.id}`;
    const response = yield axios.get(queryText);

    // now that the session has given us a user list

    yield put({ type: "SET_USER_LIST", payload: response.data });
  } catch (error) {
    console.log("Student List get request failed", error);
  }
}

function* userListSaga() {
  yield takeLatest("GET_STAFF_LIST", getStaffList);
  yield takeLatest("GET_STUDENT_LIST", getStudentList);
}

export default userListSaga;
