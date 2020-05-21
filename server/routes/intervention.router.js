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
  const queryText = `UPDATE "student" SET "in_intervention" = $1 WHERE "username" = $2;`;
  const queryValues = [userToggle.toggle, userToggle.user];

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

router.get("/interventionToggle", (req, res) => {
  const queryText = `SELECT * FROM "intervention_toggle" WHERE "student_id" = $1;`;
  pool
    .query(queryText, [req.params.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("Error completing GET interventionToggle", err);
      res.sendStatus(500);
    });
});

// Start Daily Intervention For Class
router.post("/start", (req, res) => {
  const userInfo = req.body;
  const queryText = `INSERT INTO "intervention_toggle"
    ("student_id", "point_goal") VALUES ($1, $2);`;
  const queryValues = [userInfo.id, userInfo.points];

  pool
    .query(queryText, queryValues)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log("Error in POST start", err);
      res.sendStatus(500);
    });
});

// Hourly Update for Student's Intervention
router.post("/hourlyUpdate", (req, res) => {
  const update = req.body;

  let queryText = `INSERT INTO "intervention" ("points", "notes", "teacher_id", "student_id", "date", "hour") VALUES ($1, $2, $3, $4, $5, $6);`;

  const queryValues = [
    update.points,
    update.notes,
    update.teacher,
    update.student,
    update.date,
    update.hour,
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
  const searchInfo = req.query;
  const queryText = `SELECT * FROM "intervention" WHERE "student_id" = $1 AND "date" = $2;`;
  const queryValues = [searchInfo.name, searchInfo.date];
  pool
    .query(queryText, queryValues)
    .then((result) => {
      console.log("RESULT:", result);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("Error completing GET studentDaily", err);
      res.sendStatus(500);
    });
});

// GET individual student's scores in total
router.get("/studentInterventions/:id", (req, res) => {
  console.log("StudentPeriod", req.params.id);
  const queryText = `SELECT * FROM "intervention" WHERE "student_id" = $1;`;
  pool
    .query(queryText, [req.params.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("Error completing GET studentInterventions", err);
      res.sendStatus(500);
    });
});

// GET teacher's total scores
router.get("/teacherIntervention/:id", (req, res) => {
  const queryText = `SELECT * FROM "intervention" WHERE 
    "8_teacher" = $1 OR "9_teacher" = $1 OR "10_teacher" = $1 OR "11_teacher" = $1 OR "12_teacher" = $1 OR "1_teacher" = $1 OR "2_teacher" = $1 OR "3_teacher" = $1;`;
  pool
    .query(queryText, [req.params.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("Error completing GET teacherInterventions", err);
      res.sendStatus(500);
    });
});

// GET school total scores
router.get("/schoolInterventions", (req, res) => {
  const queryText = `SELECT * FROM "intervention";`;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("Error completing GET schoolInterventions", err);
      res.sendStatus(500);
    });
});

module.exports = router;
