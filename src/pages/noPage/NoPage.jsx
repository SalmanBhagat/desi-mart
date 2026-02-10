import { Link } from "react-router-dom";

const NotPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-200 px-4">
      <div className="bg-white max-w-lg w-full rounded-2xl shadow-2xl 
                      p-5 sm:p-8 text-center">
        
        {/* 404 Text */}
        <h1 className="text-6xl sm:text-8xl font-extrabold text-pink-400">
          404
        </h1>

        {/* Divider */}
        <div className="h-1 w-16 sm:w-20 bg-pink-400 mx-auto my-3 sm:my-4 rounded-full"></div>

        {/* Message */}
        <h2 className="text-lg sm:text-2xl font-semibold text-gray-800">
          Page Not Found
        </h2>

        <p className="text-gray-500 mt-2 sm:mt-3 text-sm sm:text-base">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* Buttons */}
        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Link
            to="/"
            className="px-5 py-2.5 rounded-lg bg-pink-400 text-white font-medium 
                       hover:bg-pink-500 transition"
          >
            Go to Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="px-5 py-2.5 rounded-lg border border-pink-400 
                       text-pink-400 font-medium hover:bg-pink-50 transition cursor-pointer"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotPage;
