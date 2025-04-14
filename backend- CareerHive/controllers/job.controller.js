import { Job } from "../models/job.model";

export const postJob = async (req,res) => {
    try {
        const {title,description, requirements, salary, location, jobType, experience,vacancy,companyId} = req.body;

        if (!title||!description|| !requirements|| !salary|| !location|| !jobType|| !experience||!vacancy||!companyId) {
            return res.status(400).json({
                message:"Something is missing!",
                success:false
            }) 
        }
        
        const job = await Job.create({
            title,
            description,
            requirements:requirements.split(","),
            salary:Number(salary),
            location,
            jobType,
            experienceLevel:experience,
            vacancy,
            company:companyId,
            createdBy:userId
        })

        return res.status(201).json({
            message:"New job posted succeccfully!",
            job,
            success:true
        })

        const userId = req.id;
    } catch (error) {
        console.error(error);
        
    }
}

export const getAllJobs = async (req,res) => {
    try {
        const keyword = req.query.keyword || "";
        const query ={
            $or:[
                {title:{$regex:keyword, $options:"i"}},
                {description:{$regex:keyword, $options:"i"}}
            ]
        }

        //filter for job search
        const jobs = await Job.find(query);
        if (!jobs) {
            return res.status(404).json({
                message:"Jobs not found!",
                success:false
            })
        }

        return res.status(200).json({
            jobs,
            sucess:true
        })
    } catch (error) {
        console.error(error);
        
    }
} 

export const getJobById = async (req,res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message:"Jobs not found!",
                success:false
            })
        }
        return res.status(200).json({
            job, 
            sucess:true
        })
    } catch (error) {
        console.error(error);
    }
}

//how many jobs admin has created
export const getAdminJobs = async(req,res)=>{
    try {
        const adminId = req.id;
        const jobs = await Job.find({createdBy:adminId})

        if (!jobs) {
            return res.status(404).json({
                message:"Jobs not found!",
                success:false
            })
        }
        return res.status(200).json({
            jobs,
            success:true
        })

    } catch (error) {
        console.error(error);
    }
}