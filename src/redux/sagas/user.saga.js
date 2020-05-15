import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get("api/user", config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: "SET_USER", payload: response.data });
  } catch (error) {
    console.log("User get request failed", error);
  }
}

// Used to get individual staff
function* fetchStaff(action) {
  try {
    const thisUser = action.payload;
    const pageText = `/api/user/staff/${thisUser.username}`;
    const response = yield axios.get(pageText);
    console.log("in saga", response.data[0]);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: "SET_USER_INFO", payload: response.data[0] });
  } catch (error) {
    console.log("Staff User get request failed", error);
  }
}

// Used to get individual students
function* fetchStudent(action) {
  try {
    const thisUser = action.payload;
    const pageText = `/api/user/student/${thisUser.username}`;
    const response = yield axios.get(pageText);
    console.log("in saga", response.data[0]);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: "SET_USER_INFO", payload: response.data[0] });
  } catch (error) {
    console.log("Student User get request failed", error);
  }
}

// Used to get the student's information for the Behavior form
// This is separate from fetchStudent because it sets the student info away from the
// staff info which is still held in the user reducer
function* fetchStudentInfo(action) {
  try {
    const thisUser = action.payload;
    const pageText = `/api/user/studentInfo/${thisUser.username}`;
    const response = yield axios.get(pageText);

    yield put({ type: "SET_STUDENT_INFO", payload: response.data[0] });
  } catch (error) {
    console.log("Student Info GET request failed", error);
  }
}

function* fetchStaffInfo(action) {
  try {
    const thisUser = action.payload;
    const pageText = `/api/user/staffInfo/${thisUser.username}`;
    const response = yield axios.get(pageText);

    yield put({ type: "SET_STAFF_INFO", payload: response.data[0] });
  } catch (error) {
    console.log("Staff Info GET request failed", error);
  }
}

//Used to update staff
function* updateStaff(action) {
  try {
    yield axios.put("/api/user/editStaff", action.payload);
    yield put({ type: "FETCH_STAFF", payload: action.payload });
  } catch (err) {
    console.log("Error with editStaff", err);
  }
}

//Used to update students
function* updateStudent(action) {
  try {
    yield axios.put("/api/user/editStudent", action.payload);
    yield put({ type: "FETCH_STUDENT", payload: action.payload });
  } catch (err) {
    console.log("Error with editStudent", err);
  }
}

function* userSaga() {
  yield takeLatest("FETCH_USER", fetchUser);
  yield takeLatest("FETCH_STAFF", fetchStaff);
  yield takeLatest("FETCH_STUDENT", fetchStudent);
  yield takeLatest("UPDATE_STAFF", updateStaff);
  yield takeLatest("UPDATE_STUDENT", updateStudent);
  yield takeLatest("FETCH_STUDENT_SEPARATE", fetchStudentInfo);
  yield takeLatest("FETCH_STAFF_SEPARATE", fetchStaffInfo);
}

export default userSaga;
