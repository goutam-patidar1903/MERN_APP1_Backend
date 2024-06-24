const express=require('express')
const { getWorkouts, getWorkout, createWorkout, deleteWorkout, updateWorkout} = require('../controllers/WorkoutController')

const router=express.Router()

//GET all workouts
router.get('/',getWorkouts)

//GET a single workouts
router.get('/:id',getWorkout)

//POST workout
router.post('/',createWorkout)

//DELETE a single workout 
router.delete('/:id',deleteWorkout)

//UPDATE a single workout
router.patch('/:id',updateWorkout)

module.exports = router;