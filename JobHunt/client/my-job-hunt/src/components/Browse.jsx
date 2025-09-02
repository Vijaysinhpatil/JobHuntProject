import React  from "react";
import Navbar from '../components/shared/navbar'
import SingleJob from "./JobsParts/SingleJob";
const Browse = () => {
    const randomJobSearchLength = [1,2,3,4,5,6]
    return(
        <div
        style={{fontFamily: "'Poppins', sans-serif"}}
        >
              <Navbar/>
              <div className="max-w-7xl mx-auto my-10">
                  <h1 className="font-bold">Search Result = ({randomJobSearchLength.length})</h1>
                   <div className="grid grid-cols-3 gap-4 mt-5">
                     {
                     randomJobSearchLength.map((items , index) => (
                        <SingleJob/>
                     ))
                    }
                   </div>
              </div>
        </div>
       
    )
}
export default Browse;