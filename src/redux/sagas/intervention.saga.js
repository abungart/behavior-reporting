import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

//Used to toggle in_intervention
function* interventionToggle(action) {
  try {
    yield axios.put("/api/intervention/interventionToggle", action.payload);
    // yield put({
    //   type: "FETCH_STUDENT_SEPARATE",
    //   payload: userInfo,
    // });
  } catch (err) {
    console.log("Error with interventionToggle", err);
  }
}

// Intervention Inputs
function* startDailyIntervention(action) {
  try {
    yield axios.post("api/intervention/startDaily", action.payload);
  } catch (err) {
    console.log("Error with StartDailyIntervention", err);
  }
}

function* startHourlyIntervention(action) {
  try {
    yield axios.put("/api/intervention/hourlyUpdate", action.payload);
  } catch (err) {
    console.log("Error with startHourlyIntervention", err);
  }
}

// GET REQUESTS FOR INTERVENTIONS
// GET single day intervention for student
function* getDailyIntervention(action) {
  try {
    const response = yield axios.get(
      "/api/intervention/studentDaily",
      action.payload
    );
    yield put({ type: "SET_STUDENT_DAY_INTERVENTION", payload: response.data });
  } catch (err) {
    console.log("Error with getDailyIntervention", err);
  }
}

function* userListSaga() {
  yield takeLatest("INTERVENTION_TOGGLE", interventionToggle);
  yield takeLatest("START_DAILY_INTERVENTION", startDailyIntervention);
  yield takeLatest("SUBMIT_HOURLY_INTERVENTION", startHourlyIntervention);
  yield takeLatest("DAILY_INTERVENTION", getDailyIntervention);
}

export default userListSaga;
