import { Badge } from './ui/badge';

const LatestJobCard = ({job}) => {
    return (
        <div
            className="p-6 rounded-xl shadow-lg from-[#dfe9f3] via-[#f6f9fc] to-[#e2ebf0]
            cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
        >
            {/* Company Info */}
            <div className="mb-4">
                <h1 className="text-lg font-semibold text-gray-900">{job?.company?.CompanyName}</h1>
                <p className="text-gray-500 text-sm">India</p>
            </div>

            {/* Job Title */}
            <div className="mb-4">
                <h1 className="text-xl font-bold text-gray-800">{job.title}</h1>
                <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                   {job?.description}
                </p>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-3 mt-4">
                <Badge
                    className="text-blue-700 font-bold border border-blue-200 bg-blue-50 rounded-full px-3 py-1"
                    variant="ghost"
                >
                  {job?.position}Positions
                </Badge>
                <Badge
                    className="text-red-700 font-bold border border-red-200 bg-red-50 rounded-full px-3 py-1"
                    variant="ghost"
                >
                   {job?.jobType}
                </Badge>
                <Badge
                    className="text-pink-700 font-bold border border-pink-200 bg-pink-50 rounded-full px-3 py-1"
                    variant="ghost"
                >
                  {job?.salary}Lpa
                </Badge>
            </div>
        </div>
    );
};

export default LatestJobCard;
