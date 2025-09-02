import { Job } from "../models/job.js";

export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      position,
      companyId,
      experience,
    } = req.body;
    const userId = req.id;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !position ||
      !companyId ||
      !experience
    ) {
      return res.status(404).json({
        message: "Something Goes Wrong While Posting Jobs",
        success: false,
      });
    }
 
   
    //generating Job Posting informations by admin

    const job = await Job.create({
      title,
      description,
      //Requirements is in the form of strings and we need to convert this to an array by spliting commas
      requirements: requirements.split(","),
      //converting salary to number
      salary: Number(salary),
      location,
      jobType,
      position,
      experienceLevel: experience,
      company: companyId,
      created_by: userId,
    });
  console.log("Job Creation" , job);
    return res.status(201).json({
      message: "New Jobs Listed Successfully",
      job,
      success: true,
    });
  } catch (error) {
    console.log("Error while Posting Jobs");
    return res.status(404).json({
      Error: "Error While Posting Jobs",
      success: false,
    });
  }
};

//Getting All Jobs for Students
export const getJobs = async (req, res) => {
  try {
    // This code builds a MongoDB query to search for a keyword (case-insensitive) in either the title or description fields. If no keyword is provided, it defaults to an empty string.
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    //this is used to get all the data from the company.model.js which contains
    //the info about company by using ref which were used in job.model file
    //at company schema
    //populate() =>
    //it helps use to populate or take reference
    //from another collection to access specific sechema
    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({
        createdAt: -1,
      });

    if (!jobs) {
      return res.status(404).json({
        message: "Somthing Went Wrong while Displaying All The jobs",
        success: true,
      });
    }
    return res.status(200).json({
      message: "Jobs Displayed Successfully",
      jobs,
      success: true,
    });
  } catch (error) {
    console.log("Error While Displaying the Listed Jobs");
    return res.status(404).json({
      message: "Error While Displaying Listed Jobs",
      success: true,
    });
  }
};

// Displaying the jobs based on the jobId for the User

export const getJobId = async (req, res) => {
  try {
    const JobId = req.params.id;

    console.log("Job Id => " , JobId);
    
    const job = await Job.findById(JobId);

    if (!job) {
      return res.status(404).json({
        message: "Something Goes Wrong while getting jobs by Id OR 404 ",
        success: true,
      });
    }

    console.log("Job By id => " , job);
    
    return res.status(200).json({
      message: "Jobs are Displayed by Id Successfully",
      job,
      success: true,
    });
  } catch (error) {
    console.log("Error while getting jobs by Id");

    return res.status(404).json({
      message: "Error while getting jobs by Id",
      success: true,
    });
  }
};

//keep the trak of Jobs which is created by current loggedIn admin

export const getAdminJobs = async (req, res) => {
  try {
    const AdminId = req.id;
    const jobs = await Job.find({ created_by : AdminId }).populate({
      path: "company",
      createdAt : -1
    })

    console.log("Admin ID:", req.id);


    if (!jobs) {
      return res.status(404).json({
        message: "SomeThing Went wrong while creating jobs by Admin",
        success: false,
      });
    }

    console.log("Admin Jobs =>" , jobs);
    
    return res.status(200).json({
        message: "Jobs are Created Successfully By Admin",
      "JOBS" : jobs,
      success: true,
    });
  } catch (error) {
    console.log("Error while creating jobs by Admin");

    return res.status(404).json({
      message: "Error while creating jobs by Admin",
      success: false,
    });
  }
};
