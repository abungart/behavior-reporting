const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const encryptLib = require("../modules/encryption");
const pool = require("../modules/pool");
const userStrategy = require("../strategies/user.strategy");

const router = express.Router();

// Toggles Intervention
router.put("/interventionToggle", (req, res) => {
  const userToggle = req.body;
  console.log("In PUT:", userToggle);
  const queryText = `UPDATE "student" SET "in_intervention" = $1, "point_goal" = $2 WHERE "username" = $3;`;
  const queryValues = [userToggle.toggle, userToggle.points, userToggle.user];

  pool
    .query(queryText, queryValues)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("Error completing TOGGLE query", err);
      res.sendStatus(500);
    });
});

// Start Daily Intervention For Class
router.post("/startDaily", (req, res) => {
  const userInfo = req.body;
  const queryText = `INSERT INTO "intervention"
    ("student_id", "daily_goal") VALUES ($1, $2);`;
  const queryValues = [userInfo.id, userInfo.point_goal];

  pool
    .query(queryText, queryValues)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log("Error in POST startDaily", err);
      res.sendStatus(500);
    });
});

// Hourly Update for Student's Intervention
router.put("/hourlyUpdate", (req, res) => {
  const update = req.body;
  let queryText = "";
  if (update.hour == "8") {
    queryText = `UPDATE "intervention" SET "8_points" = $1, "8_notes" = $2, "8_teacher" = $3 WHERE "student_id" = $4 AND "date" = $5;`;
  } else if (update.hour == "9") {
    queryText = `UPDATE "intervention" SET "9_points" = $1, "9_notes" = $2, "9_teacher" = $3 WHERE "student_id" = $4 AND "date" = $5;`;
  } else if (update.hour == "10") {
    queryText = `UPDATE "intervention" SET "10_points" = $1, "10_notes" = $2, "10_teacher" = $3 WHERE "student_id" = $4 AND "date" = $5;`;
  } else if (update.hour == "11") {
    queryText = `UPDATE "intervention" SET "11_points" = $1, "11_notes" = $2, "11_teacher" = $3 WHERE "student_id" = $4 AND "date" = $5;`;
  } else if (update.hour == "12") {
    queryText = `UPDATE "intervention" SET "12_points" = $1, "12_notes" = $2, "12_teacher" = $3 WHERE "student_id" = $4 AND "date" = $5;`;
  } else if (update.hour == "1") {
    queryText = `UPDATE "intervention" SET "1_points" = $1, "1_notes" = $2, "1_teacher" = $3 WHERE "student_id" = $4 AND "date" = $5;`;
  } else if (update.hour == "2") {
    queryText = `UPDATE "intervention" SET "2_points" = $1, "2_notes" = $2, "2_teacher" = $3 WHERE "student_id" = $4 AND "date" = $5;`;
  } else if (update.hour == "3") {
    queryText = `UPDATE "intervention" SET "3_points" = $1, "3_notes" = $2, "3_teacher" = $3 WHERE "student_id" = $4 AND "date" = $5;`;
  }

  const queryValues = [
    update.points,
    update.notes,
    update.teacher,
    update.student,
    update.date,
  ];
  pool
    .query(queryText, queryValues)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("Error completing PUT hourlyUpdate", err);
      res.sendStatus(500);
    });
});

//GET ROUTES
// GET individual student's scores for one day.
router.get("/studentDaily", (req, res) => {
  const searchInfo = req.body;
  const queryText = `SELECT * FROM "intervention" WHERE "student_id" = $1 AND "date" = $2;`;
  const queryValues = [searchInfo.student, searchInfo.date];
  pool
    .query(queryText, queryValues)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("Error completing GET studentDaily", err);
      res.sendStatus(500);
    });
});

module.exports = router;
