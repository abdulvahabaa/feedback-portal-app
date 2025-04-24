import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import {
  MdOutlineLiveHelp,
  MdFeedback,
  MdReportProblem,
  MdBugReport,
} from "react-icons/md";

const Footer = () => {
  return (
    <div className="bg-gray-900 text-gray-300 pt-4">
      {/* Support Highlights */}
      <div className="bg-gray-800 py-6">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {/* Submit Feedback */}
          <div className="flex flex-col items-center space-y-2">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-700 text-white text-3xl">
              <MdFeedback />
            </div>
            <p className="text-white text-lg font-medium">Submit Feedback</p>
          </div>

          {/* Report a Bug */}
          <div className="flex flex-col items-center space-y-2">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-700 text-white text-3xl">
              <MdBugReport />
            </div>
            <p className="text-white text-lg font-medium">Report a Bug</p>
          </div>

          {/* Help & Support */}
          <div className="flex flex-col items-center space-y-2">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-700 text-white text-3xl">
              <MdOutlineLiveHelp />
            </div>
            <p className="text-white text-lg font-medium">Help & Support</p>
          </div>

          {/* Raise a Complaint */}
          <div className="flex flex-col items-center space-y-2">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-700 text-white text-3xl">
              <MdReportProblem />
            </div>
            <p className="text-white text-lg font-medium">Raise a Complaint</p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 border-b border-gray-700 pb-6">
          {/* About the Portal */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">About</h3>
            <p className="text-sm text-gray-400">
              This portal is dedicated to improving your experience. Share your
              feedback, report bugs, and help us enhance our platform.
            </p>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Submit Feedback
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Report a Bug
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Feature Request
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Options */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Contact Us
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  Support Team
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Live Chat
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Community Forum
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Terms of Use
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-blue-600 text-white text-xl hover:scale-110 transition-transform"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-black text-white text-xl hover:scale-110 transition-transform"
              >
                <FaXTwitter />
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-pink-600 text-white text-xl hover:scale-110 transition-transform"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-blue-700 text-white text-xl hover:scale-110 transition-transform"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-500 mt-6">
          © {new Date().getFullYear()} Feedback Portal. All Rights Reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
