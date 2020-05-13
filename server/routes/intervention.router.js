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
module.exports = router;
