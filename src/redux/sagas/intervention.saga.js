import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

//Used to toggle in_intervention
function* interventionToggle(action) {
  try {
    // const userInfo = action.payload;
    yield axios.put("/api/intervention/interventionToggle", action.payload);
    // yield put({
    //   type: "FETCH_STUDENT_SEPARATE",
    //   payload: userInfo,
    // });
  } catch (err) {
    console.log("Error with interventionToggle", err);
  }
}

function* userListSaga() {
  yield takeLatest("INTERVENTION_TOGGLE", interventionToggle);
}

export default userListSaga;
