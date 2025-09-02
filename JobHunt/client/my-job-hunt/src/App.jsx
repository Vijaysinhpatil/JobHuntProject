import React, { useEffect } from "react";
import "./App.css";
// import Navbar from "./components/shared/navbar";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import  Home  from "./components/Home";
import Job from "./components/job";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import Jobdetails from "./components/JobsParts/Jobdetails";
function App() {

    useEffect(() => {
    const link = document.createElement('link')
    link.href =
      "https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
    document.head.append(link)
  }, [])


  //creating route using function
  const appRouter = createBrowserRouter([
    {
      path : "/",
      element : <Home/>
    },
    {
      path : "/login",
      element : <Login/>
    },
    {
      path : "/signup",
      element : <Signup/>
    },
    {
      path : '/jobs',
      element : <Job/>
    },
    {
      path : "/decription/:id",
      element : <Jobdetails/>
    },
    {
      path : '/browse',
      element : <Browse/>
    },
    {
      path : '/profile',
      element : <Profile/>
    }
  ])
  return (
    //Old Way to create a route
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Navbar />} />
    //     <Route path="/Login" element={<Navbar />} />
    //     <Route path="/Signup" element={<Navbar />} />
    //   </Routes>
    // </BrowserRouter>

    <div  style={{ fontFamily: "'Poppins', sans-serif" }}>
      <RouterProvider router={appRouter}/>
    </div>
  );
}

export default App;
