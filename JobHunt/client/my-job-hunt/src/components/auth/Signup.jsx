import React, { useState } from "react";
import Navbar from "../shared/navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import store from "../../redux/store";
import { setLoading } from "../../redux/authSlice";
import { Loader2 } from "lucide-react";
const Signup = () => {
  //adding dispatch and useSelector for loading
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);

  const navigate = useNavigate();
  //getting initial data from the user
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const changeFileHandler = (e) => {
    setInput({
      ...input,
      file: e.target.files?.[0] || null,
    });

    // setInput({ ...input, file: e.target.files?.[0] });
  };

  //API CALL
  const submithandler = async (e) => {
    e.preventDefault();
    console.log(input);

    // Fetchig Form data
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("role", input.role);
    formData.append("password", input.password);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
     
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message );
      }
    } catch (error) {
      console.log("Error=>", error);

      toast.error(res.data.message || "Something went wrong!");
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
    <div className="bg-[#F8F9FD] min-h-screen">
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submithandler}
          className="w-1/2 bg-white shadow-lg border border-gray-200 rounded-xl p-6 my-10"
        >
          <h1 className="font-bold text-2xl mb-5 text-[#1F2937]">Sign Up</h1>
          <div className="my-3">
            <Label className="my-2 text-gray-600">Full Name</Label>
            <Input
              type="text"
              placeholder="vijaysinh"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              className="focus:border-[#6C63FF] focus:ring-[#6C63FF]"
            />
          </div>
          <div className="my-3">
            <Label className="my-2 text-gray-600">Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="vijaysinh123@gmail.com"
              className="focus:border-[#6C63FF] focus:ring-[#6C63FF]"
            />
          </div>
          <div className="my-3">
            <Label className="my-2 text-gray-600">Phone Number</Label>
            <Input
              type="number"
              placeholder="1234567891"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              className="focus:border-[#6C63FF] focus:ring-[#6C63FF]"
            />
          </div>
          <div className="my-3">
            <Label className="my-2 text-gray-600">Password</Label>
            <Input
              type="password"
              placeholder="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              className="focus:border-[#6C63FF] focus:ring-[#6C63FF]"
            />
          </div>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4 my-3">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer accent-[#6C63FF]"
                  value="student"
                />
                <Label>Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer accent-[#6C63FF]"
                  value="recruiter"
                />
                <Label>Recruiter</Label>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <Input
                accept="image/*"
                type="file"
                name="file"
                onChange={changeFileHandler}
                className="cursor-pointer mx-2"
              />
            </div>
          </div>
          {loading ? (
            <Button  className="w-full my-4 bg-[#6C63FF] hover:bg-[#5A54E0] text-white font-semibold py-2 rounded-lg transition-all duration-300">
              <Loader2 className="mr-2 h-4 w-4 animate-spin text-white drop-shadow-[0_0_6px_#ffffff80]"/>
              Wait Please
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full my-4 bg-[#6C63FF] hover:bg-[#5A54E0] text-white font-semibold py-2 rounded-lg transition-all duration-300"
            >
              Sign Up
            </Button>
          )}

          <span className="text-gray-600">
            Do you have an account?
            <Link to="/login" className="text-[#FF6B6B] hover:underline ml-1">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
