const Testimonial = () => {
  const testimonials = [
    {
      id: 1,
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      desc: "The product quality is amazing and delivery was super fast. The fabric feels premium and the fitting is perfect. I am very satisfied with my purchase and will surely recommend it to others.",
      name: "Rahul Sharma",
      role: "Verified Customer",
    },
    {
      id: 2,
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      desc: "Shopping experience was smooth and hassle-free. Customer support helped me with sizing and delivery updates. Overall, a trustworthy platform with great quality products.",
      name: "Anjali Verma",
      role: "Fashion Blogger",
    },
    {
      id: 3,
      image: "https://randomuser.me/api/portraits/men/76.jpg",
      desc: "I really liked the quality and pricing. The delivery was on time and packaging was neat. Definitely going to shop again and suggest it to friends and family.",
      name: "Amit Singh",
      role: "Entrepreneur",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-8 md:py-10">
  {/* Section Title */}
  <div className="text-center mb-8 md:mb-12">
    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-g-800">
      Testimonials
    </h2>
    <p className="text-xs sm:text-sm md:text-base text-g-500 mt-1 md:mt-2">
      Trusted by <span className="text-p-600 font-medium">customers</span> across India
    </p>
  </div>

  {/* Testimonials */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
    {testimonials.map((item) => (
      <div
        key={item.id}
        className="text-center px-4 sm:px-6"
      >
        {/* Image */}
        <div className="flex justify-center mb-4 sm:mb-5">
          <img
            src={item.image}
            alt={item.name}
            className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full object-cover border border-gray-300"
          />
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-g-600 leading-relaxed mb-3 sm:mb-4 line-clamp-4 min-h-20 sm:min-h-24">
          “{item.desc}”
        </p>

        {/* Divider */}
        <div className="w-8 sm:w-10 h-0.5 bg-p-600 mx-auto mb-3 sm:mb-4"></div>

        {/* Name & Role */}
        <h4 className="text-sm sm:text-base font-semibold text-g-800">
          {item.name}
        </h4>
        <p className="text-xs sm:text-sm text-g-400">
          {item.role}
        </p>
      </div>
    ))}
  </div>
</div>

  );
};

export default Testimonial;
