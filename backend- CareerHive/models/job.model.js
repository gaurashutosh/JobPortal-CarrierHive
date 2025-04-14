import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true
    },

    requirements:[{
        type:String,
        required:true
    }],

    salary:{
        type:Number,
        required:true
    },

    experienceLevel:{
        type: Number,
        required:true
    },

    location:{
        type:String,
        required:true
    },

    jobType:{
        type:String,
        required:true
    },

    vacancy:{
        type:Number,
        required:true
    },

    company:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'Comapny',
        required:true
    },

    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },

    applications:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Applications',
    }]
},
{timestamps:true});

export const Job = mongoose.Schema('Job',jobSchema);