import { useContext, useState } from "react";
import myContext from "../../context/MyContext";
import { useNavigate } from "react-router-dom";

// Search data
// const searchData = [
//   {
//     name: "Fashion",
//     image:
//       "https://m.media-amazon.com/images/I/71BZ58OS2oL._SY741_.jpg",
//   },
//   {
//     name: "Shirt",
//     image:
//         "https://m.media-amazon.com/images/I/61aMzeopdYL._SY741_.jpg"
//   },
//   {
//     name: "Jacket",
//     image:
//       "https://m.media-amazon.com/images/I/51XWUBbfe7L._AC_UL320_.jpg",
//   },
//   {
//     name: "Mobile",
//     image:
//       "https://m.media-amazon.com/images/I/81BGKLI+cWL._AC_UY218_.jpg",
//   },
//   {
//     name: "Laptop",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTi0XeQGMw8xQaUFlba0r9V8CpHBoqtCR27A&s",
//   },
//   {
//     name: "Home",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTi0XeQGMw8xQaUFlba0r9V8CpHBoqtCR27A&s",
//   },
//   {
//     name: "Book",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOWtnHg6Pm_1pjSCW6ZD3l5KNL3u5mxKOnVQ&s",
//   },
//   {
//     name: "Shoes",
//     image:
//       "https://m.media-amazon.com/images/I/31Fl0CepN+L._SY695_.jpg",
//   },
// ];

const SearchBar = () => {
  // Varieble for search list
  const [search, setSearch] = useState("");

  // Context
  const context = useContext(myContext);
  const {getAllProduct} = context;

  // filter search data
  const filterSearchData = getAllProduct.filter((obj) => obj.title.toLowerCase().includes(search)).slice(0, 8);

  const navigate = useNavigate();

  const truncateWords = (text, wordLimit) => {
  return text.split(" ").slice(0, wordLimit).join(" ");
};

  return (
    <div>
      <div className="input flex justify-center">
        <input
          type="text"
          placeholder="search here"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-gray-200 placeholder-gray-400 rounded-lg px-3 py-2 w-96 lg:w-80 md:w-90 outline-none text-black"
        />
      </div>
      {/* Search Drop down */}
      <div className="flex justify-center">
        {search && (
          <div className="block absolute bg-gray-200 w-70 md:w-80 lg:w-80 z-50 my-1 rounded-lg px-2 py-2">
            {
                filterSearchData.length > 0 ? 
                <>
                    {
                        filterSearchData.map((item, index) => {
                            return(
                                <div key={index} className="py-2 px-2 cursor-pointer" onClick={() => navigate(`/category/${item.category}`)}>
                                    <div className="flex items-center gap-2">
                                        <img className="w-10" src={item.productImageUrl} alt="" />
                                        {truncateWords(item.title, 4)}
                                    </div>
                                </div>
                            )
                        })
                    }
                </>
                :
                <>
                    <div className="flex justify-center ">
                        <img className="w-20" src="https://cdn-icons-png.flaticon.com/512/7486/7486747.png" alt="" />
                    </div>
                </>
            }
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
