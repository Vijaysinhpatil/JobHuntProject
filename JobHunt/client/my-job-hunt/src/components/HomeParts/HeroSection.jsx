import { Search } from "lucide-react";
import { Button } from "../ui/button";

const HeroSection = () => {
    // Load Poppins font from Google Fonts
    return (
        <section
            className="text-center min-h-[100vh] flex flex-col items-center justify-center px-4 bg-gradient-to-br from-[#dfe9f3] via-[#f6f9fc] to-[#e2ebf0] animate-gradientSlow"
            style={{ fontFamily: "'Poppins', sans-serif" }}
        >
            <div className="flex flex-col gap-5 my-10 animate-fadeIn">
                {/* Badge */}
                <span className="mx-auto px-5 py-2 rounded-full bg-white/80 shadow-md text-[#F83002] font-semibold animate-bounce-slow tracking-wide text-sm sm:text-base">
                    🚀 India’s #1 Job Hunt Platform
                </span>

                {/* Heading */}
                <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-gray-900">
                    Find Your <span className="text-[#6A38C2]">Dream Job</span> <br />
                    & Build Your Career
                </h1>

                {/* Subtitle */}
                <p className="max-w-2xl mx-auto text-gray-600 text-sm sm:text-base leading-relaxed">
                    Connect with top recruiters and land the perfect opportunity.  
                    Search, apply, and take the next step toward your future with confidence.
                </p>

                {/* Search Bar */}
                <div className="flex w-full shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto bg-white/90 backdrop-blur-sm hover:scale-[1.02] transition-all duration-300">
                    <input
                        type="text"
                        placeholder="Search for jobs, companies..."
                        className="w-full outline-none border-none bg-transparent px-2 text-gray-700"
                    />
                    <Button className="rounded-r-full bg-[#6A38C2] hover:bg-[#5A2EB0] transition-all duration-300 flex items-center gap-1">
                        <Search className="h-5 w-5 text-white" />
                    </Button>
                </div>

                {/* Quick Stats */}
                <div className="mt-10 flex flex-wrap justify-center gap-6 text-gray-800">
                    <div className="bg-white/80 shadow-md rounded-lg px-6 py-4 w-40 hover:scale-105 transition-transform duration-300">
                        <h2 className="text-2xl font-bold text-[#6A38C2]">10K+</h2>
                        <p className="text-sm text-gray-600">Jobs Listed</p>
                    </div>
                    <div className="bg-white/80 shadow-md rounded-lg px-6 py-4 w-40 hover:scale-105 transition-transform duration-300">
                        <h2 className="text-2xl font-bold text-[#6A38C2]">5K+</h2>
                        <p className="text-sm text-gray-600">Recruiters</p>
                    </div>
                    <div className="bg-white/80 shadow-md rounded-lg px-6 py-4 w-40 hover:scale-105 transition-transform duration-300">
                        <h2 className="text-2xl font-bold text-[#6A38C2]">50K+</h2>
                        <p className="text-sm text-gray-600">Job Seekers</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
