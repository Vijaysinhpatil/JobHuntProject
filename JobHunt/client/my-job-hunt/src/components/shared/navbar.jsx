import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { LogOut, User2, Briefcase } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import store from "../../redux/store";
import { toast } from "sonner";
import axios from "axios";
import {USER_API_END_POINT} from '../../utils/constant'
import { setUser } from "../../redux/authSlice";

const Navbar = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.append(link);
  }, []);

  const { user } = useSelector((store) => store.auth)
  const navigate = useNavigate()
  //logout handling
  const logoutHandler = async() => {
      
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout` , {
       withCredentials : true
      })

      if(res.data.message)
      {
          dispatch(setUser(null))
          navigate('/')
          toast.success(res.data.message)
      }
    } catch (error) {
      console.log("LogOut Error => " , error );
      
      toast.error("Logout Error")
    }
  } 
  return (
    <div
      className="bg-white shadow-md sticky top-0 z-50"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        {/* Logo */}
        <div>
          <h1 className="text-2xl font-bold tracking-wide">
            Job<span className="text-[#F83002]">Hunt</span>
          </h1>
        </div>

        {/* Trending Tags instead of Search Bar */}
        <div className="hidden md:flex items-center gap-3">
          <span className="px-3 py-1 text-sm bg-gray-100 rounded-full cursor-pointer hover:bg-[#F83002] hover:text-white transition">
            Remote Jobs
          </span>
          <span className="px-3 py-1 text-sm bg-gray-100 rounded-full cursor-pointer hover:bg-[#F83002] hover:text-white transition">
            Fresher
          </span>
          <span className="px-3 py-1 text-sm bg-gray-100 rounded-full cursor-pointer hover:bg-[#F83002] hover:text-white transition">
            Tech Jobs
          </span>
          <span className="px-3 py-1 text-sm bg-gray-100 rounded-full cursor-pointer hover:bg-[#F83002] hover:text-white transition">
            Design
          </span>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-10">
          <ul className="flex font-medium items-center gap-6">
            <li>
              <Link to="/" className="hover:text-[#F83002] transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/jobs" className="hover:text-[#F83002] transition">
                Jobs
              </Link>
            </li>
            <li className="relative group cursor-pointer">
              <Link to="/browse" className="hover:text-[#F83002] transition">Browse</Link>
            </li>
          </ul>

          {/* Recruiter button */}
          <Link to="/post-job">
            <Button className="bg-[#6A38C2] hover:bg-[#5b38a6]">
              <Briefcase className="w-4 h-4 mr-2" /> Post a Job
            </Button>
          </Link>

          {/* Conditional Rendering for Auth */}
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline" className="cursor-pointer">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#F83002] cursor-pointer hover:bg-[#d92800]">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user.profile.profilePhoto} />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-72 p-4">
                <div className="flex items-center gap-3 border-b pb-3 mb-3">
                  <Avatar>
                    <AvatarImage src={user.profile.profilePhoto}  />
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{user?.fullname}</h4>
                    <p className="text-xs text-gray-500">{user?.profile?.bio}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 text-gray-600">
                  <div className="flex items-center gap-2 cursor-pointer hover:text-[#6A38C2]">
                    <User2 />
                    <Link to="/profile">
                         <Button variant="link" className="p-0">
                            View Profile
                          </Button>
                    </Link>
                  </div>
                  <div className="flex items-center gap-2 cursor-pointer hover:text-[#F83002]">
                    <LogOut />
                    <Button variant="link" className="p-0" onClick={logoutHandler}>
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
