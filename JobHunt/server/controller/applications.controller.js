import { Application } from "../models/application.js";
import { Job } from "../models/job.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const JobId = req.params.id;

    if (!JobId) {
      return res.status(404).json({
        message: "No One Applied yet",
        success: false,
      });
    }
    //check if user has already applied or not
    const existingApplication = await Application.findOne({
      job: JobId,
      applicant: userId,
    });
    if (existingApplication) {
      return res.status(400).json({
        message: "You Have Already Applied for the Job",
        success: true,
      });
    }
    //check if the job is exist or not
    const job = await Job.findById(JobId);
    if (!job) {
      return res.status(404).json({
        message: "Job Not Found",
        success: false,
      });
    }

    //create New Application
    const newApplication = await Application.create({
      job: JobId,
      applicant: userId,
    });
    job.applications.push(newApplication._id);
    await job.save();
    return res.status(200).json({
      message: "Successfully Applied For the Job",
    });
  } catch (error) {
    console.log("Error in applyJob function");
    return res.status(404).json({
      message: "Error in ApplyJob function",
    });
  }
};

//get the applied details of applied job by user
export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });

    if (!application) {
      return res.status(404).json({
        message: "No Application Found",
        success: false,
      });
    }
    return res.status(200).json({
      application,
      message: "Applied Jobs Are",
      success: true,
    });
  } catch (error) {
    console.log("Error at getAppliedJobs", error);

    return res.status(404).json({
      message: "Error At getAppliedJobs",
      success: false,
    });
  }
};

//admin check howMany users is applied to hosted jobs

export const getApplicant = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });

    if (!job) {
      return res.status(404).json({
        message: "Job Not Found",
        success: false,
      });
    }
    return res.status(200).json({
      success: "Hosted Jobs Are",
      job,
    });
  } catch (error) {
    console.log("Error at getApplications", error);

    return res.status(404).json({
      message: "Error At getApplications",
    });
  }
};

//update status from the application model
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    if (!status) {
      return res.status(404).json({
        message: "Status Not Found",
        success: false,
      });
    }

    //find applications by its id
    const application = await Application.findById({ _id: applicationId });
    if (!application) {
      return res.status(404).json({
        message: "Application Not Found",
        success: false,
      });
    }

    //update the Status
    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      success: "Status Updated SuccessFully",
    });
  } catch (error) {
    console.log("Error at updateStatus", error);

    return res.status(404).json({
      message: "Error At updateStatus",
    });
  }
};
