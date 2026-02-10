import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-p-600">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Left: Logo + Divider + Copyright */}
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-white">
            Desi Mart
          </h2>

          <span className="hidden md:block h-5 w-px bg-g-300"></span>

          <p className="text-sm text-white">
            © 2024 All rights reserved
          </p>
        </div>

        {/* Right: Social Icons */}
        <div className="flex items-center gap-3">
          <button className="w-9 h-9 flex items-center justify-center rounded-full border border-white text-white hover:bg-blue-600 hover:text-white transition cursor-pointer">
            <FaFacebookF size={14} />
          </button>

          <button className="w-9 h-9 flex items-center justify-center rounded-full border border-white text-white hover:bg-p-500 hover:text-white transition cursor-pointer">
            <FaInstagram size={14} />
          </button>

          <button className="w-9 h-9 flex items-center justify-center rounded-full border border-white text-white hover:bg-sky-500 hover:text-white transition cursor-pointer">
            <FaTwitter size={14} />
          </button>

          <button className="w-9 h-9 flex items-center justify-center rounded-full border border-white text-white hover:bg-blue-700 hover:text-white transition cursor-pointer">
            <FaLinkedinIn size={14} />
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
