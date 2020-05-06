const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const encryptLib = require("../modules/encryption");
const pool = require("../modules/pool");
const userStrategy = require("../strategies/user.strategy");

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get("/", rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post("/register/staff", (req, res, next) => {
  const user = req.body;
  const password = encryptLib.encryptPassword(req.body.password);
  console.log(user);

  const staffQueryText =
    'INSERT INTO "staff" (name, email_address, position, username) VALUES ($1, $2, $3, $4)';
  const queryText =
    'INSERT INTO "user" (username, password, role) VALUES ($1, $2, $3)';
  pool
    .query(staffQueryText, [
      user.name,
      user.email_address,
      user.position,
      user.username,
    ])
    .then(() => pool.query(queryText, [user.username, password, user.role]))
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500));
});

router.post("/register/students", (req, res, next) => {
  const user = req.body;
  const password = encryptLib.encryptPassword(req.body.password);
  console.log(user);

  const studentQueryText =
    'INSERT INTO "student" (name, nickname, home_phone, cell_phone, work_phone, email_address, username, teacher_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
  const userQueryText =
    'INSERT INTO "user" (username, password, role) VALUES ($1, $2, $3)';
  pool
    .query(studentQueryText, [
      user.name,
      user.nickname,
      user.home_phone,
      user.cell_phone,
      user.work_phone,
      user.email_address,
      user.username,
      user.teacher_id,
    ])
    .then(() => pool.query(userQueryText, [user.username, password, user.role]))
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500));
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post("/login", userStrategy.authenticate("local"), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post("/logout", (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
