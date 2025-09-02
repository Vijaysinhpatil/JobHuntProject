import React, { useState } from "react";
import Navbar from "../components/shared/navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact2, Mail, Pen } from "lucide-react";
import { Badge } from "../components/ui/badge";
import AppliedJobTable from "./JobsParts/AppliedJobTable";
import UpdateProfileDialogue from "./UpdateProfileDialogue";
import { useSelector } from "react-redux";
import { Label } from "./ui/label";
const Profile = () => {

  const {user} = useSelector(store => store.auth)

  const isResume = true;
  const Skills = user?.profile?.skills || []
  const [open , setOpen] = useState(false)
  console.log("User resume URL:", user?.profile?.resume);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Navbar />

      {/* Profile Card */}
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 shadow-md rounded-2xl my-8 p-8 transition-all hover:shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24 ring-2 ring-blue-200 shadow-md">
              <AvatarImage src={user?.profile?.profilePhoto}  />
            </Avatar>
            <div>
              <h1 className="font-extrabold text-2xl text-gray-800 tracking-tight">
                {user?.fullname}
              </h1>
              <p className="text-gray-600 text-sm mt-1 leading-relaxed max-w-md">
                {user?.profile?.bio}
              </p>
            </div>
          </div>
          <Button
            className="rounded-full shadow-sm hover:shadow-md transition-all"
            variant="outline"
            onClick = {() => setOpen(true)}
          >
            <Pen className="w-4 h-4" />
          </Button>
        </div>

        {/* Contact Info */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-3 text-gray-700">
            <Mail className="w-5 h-5 text-blue-500" />
            <span className="font-medium">{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <Contact2 className="w-5 h-5 text-green-500" />
            <span className="font-medium">{user?.phoneNumber}</span>
          </div>
        </div>

        {/* Skills & Resume */}
        <div className="mt-8 border-t pt-6">
          <h2 className="font-semibold text-lg text-gray-800 mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {Skills.length > 0 ? (
               Skills.map((item, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="px-3 py-1 rounded-full border-blue-200 text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors"
                >
                  {item}
                </Badge>
              ))
            ) : (
              <span className="text-gray-500">NA</span>
            )}
          </div>

          {/* Resume Section */}
          <div className="grid w-full max-w-sm items-center gap-1.5 mt-6">
              <Label className="text-md font-bold">Resume</Label>

            {isResume ? (
              <a
                 target="_blank" 
                 href={`${user?.profile?.resume}`} 
                className="inline-block text-blue-600 font-semibold hover:underline"
              >
              {user?.profile?.resumeOriginalName }
             
              </a>
            ) : (
              <span className="font-medium text-gray-500">NA</span>
            )}
          </div>
        </div>
      </div>

      {/* Applied Jobs Section */}
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 shadow-sm rounded-2xl my-6 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Applied Jobs</h2>
        <AppliedJobTable />
      </div>

       <UpdateProfileDialogue open = {open} setOpen = {setOpen}/>
    </div>
  );
};

export default Profile;
