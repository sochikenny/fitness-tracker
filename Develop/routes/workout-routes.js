const router = require("express").Router();
const db = require("../models");

//get workouts
router.get("/api/workouts", (req, res) => {
    db.Workout.find({})
        .sort({ _id: -1 })
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});

//create workout
router.post("/api/workouts", ({body}, res) => {
    db.Workout.create(body)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});

//update workout
router.put("/api/workouts/:id", (req, res) => {
    db.Workout.updateOne(
        {
          _id: req.params.id,
        },
        {
          $inc: { totalDuration: req.body.duration },
          $push: { exercises: req.body },
        }
      )
        .then((dbWorkout) => {
          res.json(dbWorkout);
        })
        .catch(err => {
          res.json(err);
        });
});

router.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
      .then((dbWorkouts) => {
        res.json(dbWorkouts);
      })
      .catch((err) => {
        res.json(err);
      });
  });


module.exports = router;




