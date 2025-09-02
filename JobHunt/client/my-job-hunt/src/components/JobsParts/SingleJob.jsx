import { Button } from '../ui/button'
import { Bookmark } from 'lucide-react'
import { Badge } from '../ui/badge'
import { Avatar } from '../ui/avatar'
import { AvatarImage } from '@radix-ui/react-avatar'
import { useNavigate } from 'react-router-dom'

const SingleJob = ({job}) => {
   const navigate = useNavigate()
  //  const JobId = "fjkhskdshfdkhdskjfhkf"
  const daysAgoFunction = (mongodbTime) => {

    const createAt = new Date(mongodbTime)
    const currentTime = new Date()
    const timeDifference = currentTime - createAt;
    return Math.floor(timeDifference / (24*60*60*1000))
  }
  return (
    <div
      className="
        w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl
        p-4 sm:p-6 
        rounded-2xl shadow-md border border-gray-100 
        bg-gradient-to-br from-white via-blue-50/30 to-blue-100/20 
        hover:shadow-xl transition-all duration-300 hover:-translate-y-1
      "
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Top Row */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs sm:text-sm text-gray-500">{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} Days Ago` }</p>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full border border-gray-300 hover:bg-blue-100"
        >
          <Bookmark className="text-blue-600 w-4 h-4 sm:w-5 sm:h-5" />
        </Button>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-3 mb-4">
        <Avatar className="w-10 h-10 sm:w-12 sm:h-12 border border-gray-200 shadow-sm">
          <AvatarImage src="https://avatars.githubusercontent.com/u/9919?v=4" />
        </Avatar>
        <div>
          <h1 className="font-semibold text-gray-800 text-sm sm:text-base">
              {job?.company?.CompanyName}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">Pune</p>
        </div>
      </div>

      {/* Job Title & Desc */}
      <div className="overflow-auto scrollbar-hide h-24 sm:h-32">
        <h1 className="font-bold text-base sm:text-lg text-blue-900 mb-2">
         {job?.title}
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
           {job?.description}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge
          className="text-blue-700 font-medium border border-blue-200 bg-blue-50 rounded-full px-2 sm:px-3 py-0.5 sm:py-1 shadow-sm text-xs sm:text-sm"
          variant="ghost"
        >
         {job?.position}Positions
        </Badge>
        <Badge
          className="text-green-700 font-medium border border-green-200 bg-green-50 rounded-full px-2 sm:px-3 py-0.5 sm:py-1 shadow-sm text-xs sm:text-sm"
          variant="ghost"
        >
        {job?.jobType}
        </Badge>
        <Badge
          className="text-purple-700 font-medium border border-purple-200 bg-purple-50 rounded-full px-2 sm:px-3 py-0.5 sm:py-1 shadow-sm text-xs sm:text-sm"
          variant="ghost"
        >
          {job?.salary}Lpa
        </Badge>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-3">
        <Button onClick = {() => navigate(`/decription/${job._id}`)} className="w-full sm:flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md transition cursor-pointer text-sm sm:text-base">
          Details
        </Button>
        <Button className="w-full sm:flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full shadow-sm transition cursor-pointer text-sm sm:text-base">
          Save For Later
        </Button>
      </div>
    </div>
  )
}

export default SingleJob
