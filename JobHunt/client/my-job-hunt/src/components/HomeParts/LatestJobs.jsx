
import { useSelector } from "react-redux";
import LatestJobCard from "../LatestJobCard";

const LatestJobs = () => {
  // const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const {alljobs} = useSelector(store => store.job)

  console.log(alljobs);
  
  return (
    <div
      style={{ fontFamily: "'Poppins', sans-serif" }}
      className="max-w-6xl mx-auto my-20  from-[#8f969c] via-[#8e9499] to-[#5d6366]"
    >
      <h1 className="text-4xl font-bold">
        Latest & Top <span className="text-[#6A38C2]">Job Openings</span>
      </h1>
      {/* displaying multiple cards */}

      <div className="grid grid-cols-3 w-full gap-2 my-2">
        {alljobs.length <= 0 ? <span>Job Not Avalilable</span> : alljobs.slice(0 , 9).map((job) => (
          <LatestJobCard key={job._id} job={job}/>
        ))}
      </div>
    </div>
  );
};
export default LatestJobs;
