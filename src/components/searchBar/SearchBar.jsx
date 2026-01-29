// import { useContext, useState } from "react";
// import myContext from "../../context/MyContext";
// import { useNavigate } from "react-router-dom";

import { useContext } from "react"
import { HiOutlineSearch } from "react-icons/hi"
import myContext from "../../context/MyContext"

// // Search data
// // const searchData = [
// //   {
// //     name: "Fashion",
// //     image:
// //       "https://m.media-amazon.com/images/I/71BZ58OS2oL._SY741_.jpg",
// //   },
// //   {
// //     name: "Shirt",
// //     image:
// //         "https://m.media-amazon.com/images/I/61aMzeopdYL._SY741_.jpg"
// //   },
// //   {
// //     name: "Jacket",
// //     image:
// //       "https://m.media-amazon.com/images/I/51XWUBbfe7L._AC_UL320_.jpg",
// //   },
// //   {
// //     name: "Mobile",
// //     image:
// //       "https://m.media-amazon.com/images/I/81BGKLI+cWL._AC_UY218_.jpg",
// //   },
// //   {
// //     name: "Laptop",
// //     image:
// //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTi0XeQGMw8xQaUFlba0r9V8CpHBoqtCR27A&s",
// //   },
// //   {
// //     name: "Home",
// //     image:
// //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTi0XeQGMw8xQaUFlba0r9V8CpHBoqtCR27A&s",
// //   },
// //   {
// //     name: "Book",
// //     image:
// //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOWtnHg6Pm_1pjSCW6ZD3l5KNL3u5mxKOnVQ&s",
// //   },
// //   {
// //     name: "Shoes",
// //     image:
// //       "https://m.media-amazon.com/images/I/31Fl0CepN+L._SY695_.jpg",
// //   },
// // ];

// const SearchBar = () => {
//   // Varieble for search list
//   const [search, setSearch] = useState("");

//   // Context
//   const context = useContext(myContext);
//   const {getAllProduct} = context;

//   // filter search data
//   const filterSearchData = getAllProduct.filter((obj) => obj.title.toLowerCase().includes(search)).slice(0, 8);

//   const navigate = useNavigate();

//   const truncateWords = (text, wordLimit) => {
//   return text.split(" ").slice(0, wordLimit).join(" ");
// };

//   return (
//     <div className="w-full relative">
//   {/* Search Input */}
//   <input
//     type="text"
//     placeholder="search here"
//     value={search}
//     onChange={(e) => setSearch(e.target.value)}
//     className="bg-gray-200 placeholder-gray-400 rounded-md px-3 py-2 
//                w-full lg:w-80 outline-none text-black"
//   />

//   {/* Search Dropdown */}
//   {search && (
//     <div className="absolute left-0 top-full w-full bg-gray-200 
//                     z-50 mt-1 rounded-lg px-2 py-2">
//       {filterSearchData.length > 0 ? (
//         filterSearchData.map((item, index) => (
//           <div
//             key={index}
//             className="py-2 px-2 cursor-pointer hover:bg-gray-300 rounded"
//             onClick={() => navigate(`/category/${item.category}`)}
//           >
//             <div className="flex items-center gap-2">
//               <img className="w-10" src={item.productImageUrl} alt="" />
//               {truncateWords(item.title, 4)}
//             </div>
//           </div>
//         ))
//       ) : (
//         <div className="flex justify-center">
//           <img
//             className="w-20"
//             src="https://cdn-icons-png.flaticon.com/512/7486/7486747.png"
//             alt=""
//           />
//         </div>
//       )}
//     </div>
//   )}
// </div>

//   );
// };

// export default SearchBar;


const SearchBar = () => {

  const context = useContext(myContext);
  const {filterPrice, setFilterPrice,filterType, setFilterType,searchKey, setSearchKey, getAllProduct } = context;


  return (
    <>
      {/* ===== Filter Section ===== */}
      <div className="mb-10 space-y-4">
      
        {/* 🔍 Search Bar (Full Width) */}
       <div className="bg-[#F8F8F8] flex flex-col gap-6 border border-gray-200 rounded-xl shadow-sm p-4">
      
        {/* Search */}
        {/* 🔍 Search Input */}
      <div className="relative w-full">
        {/* Icon */}
        <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400">
          <HiOutlineSearch size={18} />
        </span>
      
        <input
          type="text"
          placeholder="Search for products..."
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
          className="
            w-full rounded-lg border bg-white border-gray-300
            pl-9 sm:pl-11
            pr-3 sm:pr-4
            py-2 sm:py-2.5
            text-sm
            focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent
          "
        />
      </div>
      
      
        {/* Filters */}
        <div className="flex flex-wrap items-end gap-4">
      
          {/* Category */}
          <div className="w-full min-[400px]:flex-1 min-[640px]:flex-none min-[640px]:w-50">
            <label className="block text-xs font-semibold text-gray-500">
              Category
            </label>
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm bg-white ">
              {/* <option>All Categories</option> */}
              {getAllProduct?.filter(
  (item, index, self) =>
    index === self.findIndex(t => t.category === item.category)
).map((item, index) => {
                return <option key={index} value={item.category}>{item.category}</option>
              })}
            </select>
          </div>
      
          {/* Price */}
          <div className="w-full min-[400px]:flex-1 min-[640px]:flex-none min-[640px]:w-50">
            <label className="block text-xs font-semibold text-gray-500">
              Price Range
            </label>
            <select value={filterPrice} onChange={(e) => setFilterPrice(e.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm bg-white">
              <option value="">All Prices</option>
  <option value="0-500">Under ₹500</option>
  <option value="500-1000">₹500 – ₹1000</option>
  <option value="1000-5000">₹1000 – ₹5000</option>
  <option value="5000+">Above ₹5000</option>
            </select>
          </div>
      
          {/* Reset */}
          <div className="w-full min-[640px]:ml-auto min-[640px]:w-auto">
            <button className="w-full px-5 py-2.5 rounded-lg bg-pink-50 text-pink-600 text-sm font-semibold hover:bg-pink-100 transition">
              Reset Filters
            </button>
          </div>
      
        </div>
      </div>
      </div>
    </>
  )
}

export default SearchBar
