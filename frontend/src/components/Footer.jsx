import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[image:var(--gradient-custom)] text-white py-8 z-40 relative">
      <div className="container mx-auto px-6 lg:px-14 flex flex-col lg:flex-row lg:justify-between items-center gap-6 lg:gap-4">
        {/* Branding + Social Icons */}
        <div className="text-center lg:text-left">
          <h2 className="text-3xl font-bold mb-2">BitLytics</h2>
          <p>Simplifying URL shortening for efficient sharing</p>

          {/* Social Icons */}
          <div className="flex justify-center lg:justify-start space-x-6 mt-4">
            <a href="https://github.com/AlinRenit" className="hover:text-gray-200">
              <FaGithub size={24} />
            </a>
            <a href="https://www.linkedin.com/in/alinrenit" className="hover:text-gray-200">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>

        {/* Center Text */}
        <div className="text-center">
          <p>&copy; 2025 BitLytics. All rights reserved.</p>
          <p className="text-white/60 text-xs mt-2">Made with ❤️ by Alin Renit</p>
          <p className="text-white/40 text-xs">Empowering 1,000+ Users Worldwide</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
