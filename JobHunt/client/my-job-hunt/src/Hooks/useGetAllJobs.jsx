import axios from "axios";
import { useEffect } from "react";
import { JOB_API_END_POINT } from "../utils/constant";
import { useDispatch } from "react-redux";
import { setAlljobs } from "../redux/jobSlice";
const useGetAllJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/getAlljobs`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setAlljobs(res.data.jobs));
        }
      } catch (error) {
        console.log("Error In CustomHook");
      }
    };
    fetchAllJobs();
  }, []);
};

export default useGetAllJobs;
