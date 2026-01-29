import { useContext, useEffect, useState } from "react";
import myContext from "../../context/myContext";
import { SkeletonLoader } from "../loader/SkeletonLoader";
import { useNavigate } from "react-router-dom";
import Pagination from "../pagination/Pagination";

const UserDetail = () => {

  const navigate = useNavigate();

  const context = useContext(myContext);
  const { getAllUserFunction, getAllUser, userDelete, loading } = context;

  // Role → Style Map
  const roleStyles = {
    admin: "bg-blue-100 text-blue-700",
    user: "bg-gray-200 text-gray-700",
    manager: "bg-purple-100 text-purple-700",
    guest: "bg-green-100 text-green-700",
  };

  // Pagination Logic
const getPerPage = () => {
  if (window.innerWidth < 640) return 5;     // mobile
  if (window.innerWidth < 1024) return 8;    // tablet
  return 10;                                 // desktop
};

  const [perPage, setPerPage] = useState(getPerPage());

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(getAllUser.length / perPage);

  const paginatedUsers = getAllUser.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage,
  );

  useEffect(() => {
  const handleResize = () => {
    setPerPage(getPerPage());
    setCurrentPage(1); // important: reset page
  };

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);

  return (
    <div className="mt-6">
      {/* Main Card */}
      <div className="rounded-xl border border-pink-200 overflow-hidden bg-pink-50">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-pink-400">
          <h2 className="text-xl font-semibold text-white">User Details</h2>

          <button onClick={() => navigate("/signup")} className="bg-white text-pink-500 font-medium px-4 py-2 rounded-lg shadow hover:bg-pink-50 transition cursor-pointer">
            + Add User
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {!loading && getAllUser == 0 ? (
            <div className="flex items-center justify-center p-10">
              <div className="bg-pink-400 text-white rounded-2xl shadow-xl p-8  w-full text-center mx-4">
                {/* Icon */}
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                    className="h-7 w-7"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 20.25a7.5 7.5 0 0115 0"
                    />
                  </svg>
                </div>

                {/* Title */}
                <h2 className="text-lg font-semibold">No Users Found</h2>

                {/* Description */}
                <p className="mt-2 text-sm text-pink-100">
                  There are currently no users available. Once users register,
                  they will appear here.
                </p>

                {/* Action Buttons */}
                <div className="mt-6 flex justify-center gap-3">
                  <button onClick={() => getAllUserFunction()} className="rounded-lg bg-white px-5 py-2 text-sm font-medium text-pink-500 hover:bg-pink-50 transition cursor-pointer">
                    Refresh
                  </button>

                  <button onClick={() => navigate("/signup")} className="rounded-lg border border-white/70 px-5 py-2 text-sm font-medium text-white hover:bg-white hover:text-pink-500 transition cursor-pointer">
                    Invite User
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <table className="w-full text-sm text-left">
              <thead className="bg-pink-100 text-pink-700">
                <tr>
                  <th className="px-6 py-3 font-semibold">No</th>
                  <th className="px-6 py-3 font-semibold">User ID</th>
                  <th className="px-6 py-3 font-semibold">Name</th>
                  <th className="px-6 py-3 font-semibold">Email</th>
                  <th className="px-6 py-3 font-semibold">Role</th>
                  <th className="px-6 py-3 font-semibold">Date</th>
                  <th className="px-6 py-3 font-semibold text-center">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-pink-100">
                {loading
                  ? Array.from({ length: 2 }).map((_, i) => (
                      <SkeletonLoader key={i} type="user-table" />
                    ))
                  : paginatedUsers?.map((user, index) => {
                      const { id, name, email, role, date } = user;
                      return (
                        <tr
                          key={index}
                          className="hover:bg-pink-100/40 transition"
                        >
                          <td className="px-6 py-4">{(currentPage - 1) * perPage + index + 1}</td>
                          <td className="px-6 py-4 font-medium uppercase">
                            {id}
                          </td>
                          <td className="px-6 py-4">{name}</td>
                          <td className="px-6 py-4">{email}</td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-3 py-1 text-xs rounded-full font-medium capitalize
                          ${roleStyles[role] || "bg-gray-100 text-gray-700"}
                        `}
                            >
                              {role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{date}</td>
                          <td className="px-6 py-4 text-center">
                            <button
                              onClick={() => userDelete(id)}
                              className="px-3 py-1 text-xs rounded-md
             border border-pink-400 text-pink-500
             hover:bg-pink-400 hover:text-white
             transition cursor-pointer"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      );
                    })}
              </tbody>
            </table>
          )}
            {/* Pagination Bar */}
          <div className="border-t border-pink-100 bg-pink-50/40 px-4 py-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
