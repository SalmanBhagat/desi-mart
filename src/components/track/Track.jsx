import { BsTruck } from "react-icons/bs";
import { FiShoppingBag, FiTruck, FiRefreshCcw } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";

const Track = () => {
  const features = [
    {
      id: 1,
      icon: <HiOutlineShoppingBag size={30} className="text-pink-600"/>,
      title: "Premium T-Shirts",
      desc: "Our T-Shirts are 100% made of cotton.",
    },
    {
      id: 2,
      icon: <BsTruck size={30} className="text-pink-600"/>,
      title: "Fast Delivery",
      desc: "Quick and reliable delivery across India.",
    },
    {
      id: 3,
      icon: <FiRefreshCcw size={30} className="text-pink-600"/>,
      title: "Easy Returns",
      desc: "7 days easy return & exchange policy.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-7">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((item) => (
          <div
            key={item.id}
            className="bg-gray-100 border border-gray-200 rounded-xl px-6 py-10 text-center hover:shadow-md transition"
          >
            {/* Icon Top Center */}
            <div className="flex justify-center mb-4">
              {/* <div className="w-14 h-14 flex items-center justify-center rounded-full bg-red-50 text-red-600"> */}
                {item.icon}
              {/* </div> */}
            </div>

            {/* Title */}
            <h3 className="text-base font-semibold text-gray-800 mb-1">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-600 leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Track;
