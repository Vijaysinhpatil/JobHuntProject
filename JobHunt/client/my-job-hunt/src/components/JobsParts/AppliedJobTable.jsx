import { Badge } from "../ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const AppliedJobTable = () => {
  // Example data for demo
  const JobArray = [
    { date: "17-08-2025", role: "Frontend Developer", company: "Deloitte", status: "Accepted" },
    { date: "12-08-2025", role: "Backend Developer", company: "Infosys", status: "Pending" },
    { date: "10-08-2025", role: "Fullstack Developer", company: "Google", status: "Rejected" },
    { date: "05-08-2025", role: "AI Engineer", company: "Microsoft", status: "Pending" },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "Accepted":
        return (
          <Badge className="bg-green-100 text-green-700 border border-green-300 px-3 py-1 rounded-full">
            {status}
          </Badge>
        );
      case "Pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-700 border border-yellow-300 px-3 py-1 rounded-full">
            {status}
          </Badge>
        );
      case "Rejected":
        return (
          <Badge className="bg-red-100 text-red-700 border border-red-300 px-3 py-1 rounded-full">
            {status}
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
      <Table>
        <TableCaption className="capitalize font-medium text-gray-600">
          List of Your Applied Jobs
        </TableCaption>

        {/* Table Header */}
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="font-semibold text-gray-700">Date</TableHead>
            <TableHead className="font-semibold text-gray-700">Job Role</TableHead>
            <TableHead className="font-semibold text-gray-700">Company</TableHead>
            <TableHead className="text-right font-semibold text-gray-700">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>

        {/* Table Body */}
        <TableBody>
          {JobArray.map((job, index) => (
            <TableRow
              key={index}
              className={`transition-all ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-blue-50`}
            >
              <TableCell className="text-gray-600">{job.date}</TableCell>
              <TableCell className="font-medium text-gray-800">{job.role}</TableCell>
              <TableCell className="text-gray-600">{job.company}</TableCell>
              <TableCell className="text-right">{getStatusBadge(job.status)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
