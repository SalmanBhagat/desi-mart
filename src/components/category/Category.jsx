import { useNavigate } from "react-router-dom";

// Category
const categories = [
  {
    name: "fashion",
    img: "https://cdn-icons-png.flaticon.com/256/4359/4359963.png",
  },
  {
    name: "shirt",
    img: "https://cdn-icons-png.flaticon.com/256/11833/11833323.png",
  },
  {
    name: "jacket",
    img: "https://cdn-icons-png.flaticon.com/512/8174/8174424.png",
  },
  {
    name: "mobile",
    img: "https://cdn-icons-png.flaticon.com/512/7648/7648246.png",
  },
  {
    name: "laptop",
    img: "https://cdn-icons-png.flaticon.com/512/12142/12142416.png",
  },
  {
    name: "shoes",
    img: "https://cdn-icons-png.flaticon.com/512/10686/10686553.png",
  },
  {
    name: "home",
    img: "https://cdn-icons-png.flaticon.com/256/12114/12114279.png",
  },
  {
    name: "book",
    img: "https://cdn-icons-png.flaticon.com/256/11946/11946316.png",
  },
];

const Category = () => {
  const navigate = useNavigate();
  
  return (
    <div className="">
      <div className="flex flex-col mt-5">
        <div className="flex overflow-x-scroll lg:justify-center hide-scroll-bar">
          <div className="flex">
            {/* Category */}
            {categories.map((item, index) => {
              return (
                <div key={index} className="px-4 sm:px-7 lg:px-10">
                  {/* img */}
                  <div
                    onClick={() => navigate(`/category/${item.name}`)}
                    className="w-10 h-10 sm:w-16 sm:h-16 lg:w-24 lg:h-24 max-w-xs rounded-full bg-p-500 transition-all hover:bg-p-400 cursor-pointer mb-1"
                  >
                    <div className="flex justify-center mb-12">
                      {/* image tag */}
                      <img src={item.img} alt="img" />
                    </div>
                  </div>
                  {/* Name text */}
                  <h1 className="text-sm lg:text-lg text-center font-medium title-font first-letter:uppercase">
                    {item.name}
                  </h1>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
