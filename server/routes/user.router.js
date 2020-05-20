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

// GET individual staff data
router.get("/staff/:username", rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * FROM "staff"
  JOIN "user" ON "user".username = "staff".username
  WHERE "user".username = $1;`;
  pool
    .query(queryText, [req.params.username])
    .then((result) => {
      console.log(result.rows);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("Error completing GET staff query", err);
      res.sendStatus(500);
    });
});

// GET individual student data
router.get("/student/:username", rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * FROM "student"
  WHERE "student".username = $1;`;
  pool
    .query(queryText, [req.params.username])
    .then((result) => {
      console.log(result.rows);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("Error completing GET student query", err);
      res.sendStatus(500);
    });
});

// GET individual student data for Individual Behavior page
router.get("/studentInfo/:username", rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * FROM "student"
  WHERE "student".username = $1;`;
  pool
    .query(queryText, [req.params.username])
    .then((result) => {
      console.log(result.rows);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("Error completing GET student info query", err);
      res.sendStatus(500);
    });
});

// GET individual staff data
router.get("/staffInfo/:username", rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * FROM "staff"
  WHERE "staff".username = $1;`;
  pool
    .query(queryText, [req.params.username])
    .then((result) => {
      console.log(result.rows);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("Error completing GET staff info query", err);
      res.sendStatus(500);
    });
});

// GET staff list data
router.get("/staffList", rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT "staff".id, "staff".staff_name, "staff".position, "staff".username, "user".role FROM "staff" 
  JOIN "user" ON "staff".username = "user".username
  ORDER BY "staff".staff_name ASC;`;
  pool
    .query(queryText)
    .then((result) => {
      console.log(result.rows);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("Error completing GET staff list query", err);
      res.sendStatus(500);
    });
});

// GET student list data
router.get("/studentList/:id", rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT "student".id, "student".name, "student".username, "student".in_intervention FROM "student"
  JOIN "user" ON "student".teacher_id = "user".id
  WHERE "student".teacher_id = $1 ORDER BY "student".name ASC;`;
  pool
    .query(queryText, [req.params.id])
    .then((result) => {
      console.log(result.rows);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("Error completing GET student list query", err);
      res.sendStatus(500);
    });
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post("/register/staff", (req, res, next) => {
  const user = req.body;
  const password = encryptLib.encryptPassword(req.body.password);
  console.log(user);

  const staffQueryText =
    'INSERT INTO "staff" (staff_name, email_address, position, username) VALUES ($1, $2, $3, $4)';
  const queryText =
    'INSERT INTO "user" (username, password, role) VALUES ($1, $2, $3)';
  pool
    .query(staffQueryText, [
      user.staff_name,
      user.email_address,
      user.position,
      user.username,
    ])
    .then(() => pool.query(queryText, [user.username, password, user.role]))
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500));
});

router.post("/register/students", (req, res, next) => {
  const student = req.body;
  const studentPassword = encryptLib.encryptPassword(req.body.password);
  console.log("in post", student);

  const studentQueryText =
    'INSERT INTO "student" (name, nickname, home_phone, cell_phone, work_phone, email_address, username, teacher_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
  const userQueryText =
    'INSERT INTO "user" (username, password, role) VALUES ($1, $2, $3)';
  pool
    .query(studentQueryText, [
      student.name,
      student.nickname,
      student.home_phone,
      student.cell_phone,
      student.work_phone,
      student.email_address,
      student.username,
      student.teacher_id,
    ])
    .then(() =>
      pool.query(userQueryText, [
        student.username,
        studentPassword,
        student.role,
      ])
    )
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

// DELETE from Student List
router.delete("/delete/:username", (req, res) => {
  const queryText = `DELETE FROM "student" WHERE "username" = $1;`;
  pool
    .query(queryText, [req.params.username])
    .then(() => {
      const nextQuery = `DELETE FROM "user" WHERE "username" = $1`;
      pool.query(nextQuery, [req.params.username]);
    })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("Error in DELETE STUDENT query", err);
      res.sendStatus(500);
    });
});

// DELETE from Staff List
router.delete("/deleteStaff/:username", (req, res) => {
  const queryText = `DELETE FROM "staff" WHERE "username" = $1;`;
  pool
    .query(queryText, [req.params.username])
    .then(() => {
      const nextQuery = `DELETE FROM "user" WHERE "username" = $1`;
      pool.query(nextQuery, [req.params.username]);
    })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("Error in DELETE STAFF query", err);
      res.sendStatus(500);
    });
});

// EDIT staff
router.put("/editStaff", (req, res) => {
  const updatedStaff = req.body;
  const queryText = `UPDATE "staff" SET "staff_name" = $1, "email_address" = $2, "position" = $3 WHERE "username" = $4;`;
  const queryValues = [
    updatedStaff.staff_name,
    updatedStaff.email_address,
    updatedStaff.position,
    updatedStaff.username,
  ];

  pool
    .query(queryText, queryValues)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("Error in PUT staff query", err);
      res.sendStatus(500);
    });
});

// EDIT student
router.put("/editStudent", (req, res) => {
  const updatedStudent = req.body;
  const queryText = `UPDATE "student" SET "name" = $1, "nickname" = $2, "email_address" = $3, "home_phone" = $4, "cell_phone" = $5, "work_phone" = $6 WHERE "username" = $7;`;
  const queryValues = [
    updatedStudent.name,
    updatedStudent.nickname,
    updatedStudent.email_address,
    updatedStudent.home_phone,
    updatedStudent.cell_phone,
    updatedStudent.work_phone,
    updatedStudent.username,
  ];

  pool
    .query(queryText, queryValues)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("Error in PUT student query", err);
      res.sendStatus(500);
    });
});

module.exports = router;
