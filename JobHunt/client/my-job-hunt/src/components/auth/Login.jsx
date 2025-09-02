import React, { useState } from "react";
import Navbar from "../shared/navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_END_POINT } from "../../utils/constant";
import { setLoading, setUser } from "../../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";

const Login = () => {
  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    console.log(input);

    // Add validation before submitting
    if (!input.email || !input.password || !input.role) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      //loading start
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        navigate("/");
        // Fixed: Use the actual message from response
        dispatch(setUser(res.data.user))
        toast.success(res.data.message || "User logged in successfully");
      }
    } catch (error) {
      console.log("Error =>", error);
      // Better error handling
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="bg-[#F8F9FD] min-h-screen">
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={HandleSubmit}
          className="w-1/2 bg-white shadow-lg border border-gray-200 rounded-xl p-6 my-10"
        >
          <h1 className="font-bold text-2xl mb-5 text-[#1F2937]">Login</h1>
          <div className="my-3">
            <Label className="my-2 text-gray-600">Email</Label>
            <Input
              type="email" // Fixed: changed from "string" to "email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="vijaysinh123@gmail.com"
              className="focus:border-[#6C63FF] focus:ring-[#6C63FF]"
              required
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
              required
            />
          </div>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4 my-3">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  className="cursor-pointer accent-[#6C63FF]"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  value="student"
                  required
                />
                <Label>Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  className="cursor-pointer accent-[#6C63FF]"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  value="recruiter"
                  required
                />
                <Label>Recruiter</Label>
              </div>
            </div>
          </div>
          {/* conditionally rev=ndering for loading event */}
          {loading ? (
            <Button   className="w-full my-4 bg-[#6C63FF] hover:bg-[#5A54E0] text-white font-semibold py-2 rounded-lg transition-all duration-300">
              <Loader2 className="mr-2 h-4 w-4 animate-spin text-white drop-shadow-[0_0_6px_#ffffff80]" />
              Wait Please
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full my-4 bg-[#6C63FF] hover:bg-[#5A54E0] text-white font-semibold py-2 rounded-lg transition-all duration-300"
            >
              Login
            </Button>
          )}

          <span className="text-gray-600">
            Don't you have an account?
            <Link to="/signup" className="text-[#FF6B6B] hover:underline ml-1">
              SignUp
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
