import { Facebook, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-white to-gray-100 border-t border-gray-200 mt-16"
     style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-[#6A38C2]">JobPortal</h2>
          <p className="mt-3 text-gray-600 text-sm leading-relaxed">
            Your trusted platform to find your dream job and grow your career.
            Connect with top recruiters and land the perfect opportunity.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li className="hover:text-[#6A38C2] cursor-pointer">Home</li>
            <li className="hover:text-[#6A38C2] cursor-pointer">Browse Jobs</li>
            <li className="hover:text-[#6A38C2] cursor-pointer">Post a Job</li>
            <li className="hover:text-[#6A38C2] cursor-pointer">Contact Us</li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li className="hover:text-[#6A38C2] cursor-pointer">Blog</li>
            <li className="hover:text-[#6A38C2] cursor-pointer">FAQs</li>
            <li className="hover:text-[#6A38C2] cursor-pointer">Terms & Conditions</li>
            <li className="hover:text-[#6A38C2] cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Stay Updated</h3>
          <p className="text-gray-600 text-sm mb-3">
            Subscribe to our newsletter and never miss a job update.
          </p>
          <div className="flex items-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:border-[#6A38C2] w-full"
            />
            <button className="bg-[#6A38C2] text-white px-4 py-2 rounded-r-lg hover:bg-[#542b9e]">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-gray-200 text-gray-700 text-sm py-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} JobPortal. All rights reserved.</p>
          <div className="flex gap-4 mt-2 sm:mt-0">
            <a href="https://www.linkedin.com/in/vijaysinh-patil-4a8a81278/" className="hover:text-[#6A38C2]"><Linkedin/></a>
            <a href="#" className="hover:text-[#6A38C2]"><Twitter/></a>
            <a href="#" className="hover:text-[#6A38C2]"><Facebook/></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
