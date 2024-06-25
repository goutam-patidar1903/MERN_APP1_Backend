const Workout=require('../models/WorkoutModel')
const mongoose=require('mongoose')

//get all workouts
const getWorkouts = async (req,res)=>{
    const workouts = await Workout.find({}).sort({createdAt:-1})
    res.status(200).json(workouts)
}

//get a single workout
const getWorkout = async (req,res)=>{
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'ID is not in valid format'})
    }

    const workout=await Workout.findById(id);

    if(!workout) return res.status(400).json({error:`Workout not exists for ID : ${id}`})

    res.status(200).json(workout)
}

//post a new workout
const createWorkout = async (req,res)=>{
    const {title , load , reps} = req.body;

    //Incase fields are empty
    let emptyFields=[]

    if(!title) emptyFields.push('title');
    if(!load) emptyFields.push('load');
    if(!reps) emptyFields.push('reps');

    if (emptyFields.length > 0) return res.status(400).json({error:'Please fill in all fields', emptyFields})

        //add to DB
    try
    {
        const workout=await Workout.create({title,load,reps});
        res.status(200).json(workout);
    }catch(err)
    {
        res.status(404).json({error: err.message});
    }
}

//delete a single workout
const deleteWorkout = async (req,res)=>{
    const {id}=req.params
    console.log("$$$$$$$$$");
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'ID is not in a valid format'})
    }

    const workout=await Workout.findOneAndDelete({_id:id});

    if(!workout) return res.status(400).json({error:`Workout not exists for ID : ${id}`})

    res.status(200).json(workout);
}

//update a single workout
const updateWorkout = async (req,res)=>{
    const {id}=req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'ID is not in a valid format'})
    }

    const workout=await Workout.findOneAndUpdate({_id:id},{...req.body});

    if(!workout) return res.status(400).json({error:`Workout not exists for ID : ${id}`})

    res.status(200).json(workout);
}


module.exports={
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}