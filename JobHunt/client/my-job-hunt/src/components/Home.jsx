import React from 'react'
import Navbar from './shared/navbar';
import HeroSection from '../components/HomeParts/HeroSection'
import CategoryCarousel from './HomeParts/CategoryCarousel';
import LatestJobs from './HomeParts/LatestJobs'
import Footer from './shared/Footer';
import useGetAllJobs from '../Hooks/useGetAllJobs';
function Home() {
  useGetAllJobs()
  return (
    <>
      <Navbar/>
      <HeroSection/>
      <CategoryCarousel/>
      <LatestJobs/>
      <Footer/>
    </>
  )
}

export default Home;
