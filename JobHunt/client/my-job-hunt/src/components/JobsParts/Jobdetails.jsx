import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { JOB_API_END_POINT , APPLY_API_END_POINT} from "../../utils/constant";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from '@/redux/jobSlice'
import { toast } from "sonner";

const Jobdetails = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap";
    document.head.append(link);
  }, []);
  
  const {singlejob} = useSelector(store => store.job)
  const {user} = useSelector(store => store.auth)

  // Fix the initial check - handle both object and string cases
  const isInitial = singlejob?.applications?.some(application => {
    const applicantId = typeof application.applicant === 'object' 
      ? application.applicant._id 
      : application.applicant;
    return applicantId === user?._id;
  }) || false

  const [isApplied , setIsApplied] = useState(isInitial)

  //fetch an id from the DB
  const param = useParams();
  const JobId = param.id;
  const dispatch = useDispatch()

  const applyForJob = async() => {
    try {
       console.log("In try block");
       const res = await axios.get(`${APPLY_API_END_POINT}/apply/${JobId}` , {
        withCredentials : true
      })

      console.log("Response From Event Handler =>" , res.data);
      
     if(res.data.success)
     { 
         setIsApplied(true) //update the local state
         
         // Check what structure your API expects and match it
         const updateSingleJob = {
           ...singlejob, 
           applications: [
             ...singlejob.applications, 
             { applicant: user?._id } // or { applicant: { _id: user?._id } } depending on your API
           ]
         }
         dispatch(setSingleJob(updateSingleJob))
         toast.success(res.data.message)
     }
    } catch (error) {
      console.log("Error while applying jobs");
      toast.error(error.response.data.message)
    }
   }

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/getAlljobs/${JobId}`, {
          withCredentials: true,
        });
        
        if (res.data.success) {
          // ✅ CORRECT: Log the fresh data from API response
          console.log("Fresh API Applications:", res.data.job.applications);
          console.log("First applicant from API:", res.data.job.applications?.[0]?.applicant);
          console.log("User ID:", user?._id);
          
          dispatch(setSingleJob(res.data.job));
          
          // Fix the comparison here too
          const hasApplied = res.data.job.applications.some(application => {
            const applicantId = typeof application.applicant === 'object' 
              ? application.applicant._id 
              : application.applicant;
            console.log("Comparing:", applicantId, "===", user?._id, "Result:", applicantId === user?._id);
            return applicantId === user?._id;
          });
          
          console.log("Final hasApplied result:", hasApplied);
          setIsApplied(hasApplied);
          toast.success(res.data.message)
        }        
      } catch (error) {
        console.log("Error while getting single Job");
      }
    }; 
    fetchSingleJob()
    
  }, [JobId , dispatch, user?._id]);

  // Add this useEffect to debug when isApplied changes
  useEffect(() => {
    console.log("isApplied state changed to:", isApplied);
  }, [isApplied]);

  return (
    <div className="max-w-4xl mx-auto my-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
        {/* Job Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="font-bold text-2xl text-gray-800 mb-1">{singlejob?.title}</h1>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <Badge className="text-blue-600 font-medium bg-blue-50 rounded-full px-3 py-1 hover:bg-blue-100 transition-colors">
                {singlejob?.position} Positions
              </Badge>
              <Badge className="text-purple-600 font-medium bg-purple-50 rounded-full px-3 py-1 hover:bg-purple-100 transition-colors">
                {singlejob?.jobType}
              </Badge>
              <Badge className="text-green-600 font-medium bg-green-50 rounded-full px-3 py-1 hover:bg-green-100 transition-colors">
               {singlejob?.salary}LPA
              </Badge>
            </div>
          </div>
          <Button
            onClick={isApplied ? null : applyForJob }
            disabled={isApplied} 
            className={`rounded-lg px-6 py-2 text-sm font-medium transition-colors ${
              isApplied 
                ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer shadow-md'
            }`}
          >
            {isApplied ? "✓ Already Applied" : "Apply Now"}
          </Button>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-4"></div>

        {/* Job Details */}
        <div className="space-y-5">
          <h2 className="text-lg font-semibold text-gray-800 pb-2 border-b border-gray-200">
            Job Description
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-gray-700">Role</h3>
                <p className="text-gray-600">{singlejob?.title}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Location</h3>
                <p className="text-gray-600">{singlejob?.location}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Experience</h3>
                <p className="text-gray-600">{singlejob?.experienceLevel}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-gray-700">Salary</h3>
                <p className="text-gray-600">{singlejob?.salary}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Total Applicants</h3>
                <p className="text-gray-600">{singlejob?.applications.length}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Posted Date</h3>
                <p className="text-gray-600">{singlejob?.createdAt.split("T")[0]}</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-700 mb-1">Description</h3>
            <p className="text-gray-600 leading-relaxed">
              {singlejob?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobdetails;