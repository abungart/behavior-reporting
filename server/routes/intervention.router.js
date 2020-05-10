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
module.exports = router;