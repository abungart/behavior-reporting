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

function* getInterventionToggle(action) {
  try {
    const student = action.payload;
    const response = yield axios.get(
      `/api/intervention/interventionToggle/${student.id}`
    );
    yield put({ type: "SET_INTERVENTION_TOGGLE", payload: response.data });
  } catch (err) {
    console.log("Error with getInterventionToggle", err);
  }
}

// Intervention Inputs
function* startIntervention(action) {
  try {
    yield axios.post("api/intervention/start", action.payload);
  } catch (err) {
    console.log("Error with StartIntervention", err);
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
    const thisStudent = action.payload;
    const response = yield axios.get(
      `/api/intervention/studentDaily?name=${thisStudent.student}&date=${thisStudent.date}`
    );
    console.log("RESPONSE", response.data);
    yield put({ type: "SET_STUDENT_DAY_INTERVENTION", payload: response.data });
  } catch (err) {
    console.log("Error with getDailyIntervention", err);
  }
}

// GET all of one student's interventions
function* getStudentInterventions(action) {
  try {
    const thisStudent = action.payload;
    const response = yield axios.get(
      `/api/intervention/studentInterventions/${thisStudent.student}`
    );
    yield put({ type: "SET_PERIOD_INTERVENTION", payload: response.data });
  } catch (err) {
    console.log("Error with getStudentInterventions", err);
  }
}

// GET all of one teacher's interventions
function* getTeacherInterventions(action) {
  try {
    const teacher = action.payload;
    const response = yield axios.get(
      `/api/intervention/teacherInterventions/${teacher.id}`
    );
    yield put({ type: "SET_PERIOD_INTERVENTION", payload: response.data });
  } catch (err) {
    console.log("Error with getTeacherInterventions", err);
  }
}

// GET all of school interventions
function* getSchoolInterventions(action) {
  try {
    const response = yield axios.get("/api/intervention/schoolInterventions");
    yield put({ type: "SET_PERIOD_INTERVENTION", payload: response.data });
  } catch (err) {
    console.log("Error with getSchoolInterventions", err);
  }
}

function* userListSaga() {
  yield takeLatest("INTERVENTION_TOGGLE", interventionToggle);
  yield takeLatest("GET_INTERVENTION_TOGGLE", getInterventionToggle);
  yield takeLatest("START_INTERVENTION", startIntervention);
  yield takeLatest("SUBMIT_HOURLY_INTERVENTION", startHourlyIntervention);
  yield takeLatest("DAILY_INTERVENTION", getDailyIntervention);
  yield takeLatest("STUDENT_PERIOD_INTERVENTION", getStudentInterventions);
  yield takeLatest("TEACHER_INTERVENTION", getTeacherInterventions);
  yield takeLatest("SCHOOL_INTERVENTION", getSchoolInterventions);
}

export default userListSaga;
