import { useSelector } from "react-redux";
import FilterJobCards from "./JobsParts/FilterJobCards";
import SingleJob from "./JobsParts/SingleJob";
import Navbar from "./shared/navbar";

const job = () => {

  const {alljobs} = useSelector(store => store.job)
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5 ">
           <div className="flex">
                <div className="w-20%">
                      <FilterJobCards />
                </div>
                  {
                    alljobs.length <= 0 ? (<span>JobNot Found</span>) : 
                    (
                        <div className="flex-1 h-[88vh] pb-5">
                             <div className="grid grid-cols-3 gap-4 cursor-pointer ml-3 mt-2">
                                 {
                                   alljobs.map((job) => (
                                    <div key={job._id}>
                                        <SingleJob job={job}/>
                                    </div>
                                   ))
                                }
                             </div>
                        </div>
                    )
                }
           </div> 
      </div>
    </div>
  );
};
export default job;
