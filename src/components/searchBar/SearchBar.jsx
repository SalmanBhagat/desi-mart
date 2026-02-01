import { useContext } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import myContext from "../../context/myContext";

const SearchBar = () => {
  const context = useContext(myContext);
  const {
    filterPrice,
    setFilterPrice,
    filterType,
    setFilterType,
    searchKey,
    setSearchKey,
    getAllProduct,
  } = context;

  return (
    <>
      {/* ===== Filter Section ===== */}
<div className="mb-8 sm:mb-10">
  <div className="bg-[#F8F8F8] flex flex-col gap-4 sm:gap-6 border border-gray-200 rounded-xl shadow-sm p-4 sm:p-5">

    {/* 🔍 Search */}
    <div className="relative w-full">
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
          py-1.5 sm:py-2.5
          text-sm
          focus:outline-none focus:ring-2 focus:ring-pink-300
        "
      />
    </div>

    {/* Filters */}
    <div className="flex flex-wrap items-end gap-3 sm:gap-4">

      {/* Category */}
      <div className="w-full min-[400px]:flex-1 min-[640px]:flex-none min-[640px]:w-50">
        <label className="block text-[11px] sm:text-xs font-semibold text-gray-500 mb-0.5 sm:mb-1">
          Category
        </label>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-1.5 sm:py-2 text-sm bg-white"
        >
          <option value="">All Categories</option>
          {getAllProduct
            ?.filter(
              (item, index, self) =>
                index === self.findIndex((t) => t.category === item.category)
            )
            .map((item, index) => (
              <option key={index} value={item.category}>
                {item.category}
              </option>
            ))}
        </select>
      </div>

      {/* Price */}
      <div className="w-full min-[400px]:flex-1 min-[640px]:flex-none min-[640px]:w-50">
        <label className="block text-[11px] sm:text-xs font-semibold text-gray-500 mb-0.5 sm:mb-1">
          Price Range
        </label>
        <select
          value={filterPrice}
          onChange={(e) => setFilterPrice(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-1.5 sm:py-2 text-sm bg-white"
        >
          <option value="">All Prices</option>
          <option value="0-500">Under ₹500</option>
          <option value="500-1000">₹500 – ₹1000</option>
          <option value="1000-5000">₹1000 – ₹5000</option>
          <option value="5000+">Above ₹5000</option>
        </select>
      </div>

      {/* Reset */}
      <div className="w-full min-[640px]:ml-auto min-[640px]:w-auto">
        <button
          onClick={() => {
            setFilterType("");
            setFilterPrice("");
            setSearchKey("");
          }}
          className="
            w-full rounded-lg
            px-4 py-1.5 sm:px-5 sm:py-2.5
            bg-pink-50 text-pink-600
            text-sm font-semibold
            hover:bg-pink-100 transition
          "
        >
          Reset Filters
        </button>
      </div>

    </div>
  </div>
</div>

    </>
  );
};

export default SearchBar;
