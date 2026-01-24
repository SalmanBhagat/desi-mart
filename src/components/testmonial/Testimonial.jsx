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
    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* Section Title */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800">
          Testimonials
        </h2>
        <p className="text-gray-500 mt-2">
          Trusted by <span className="text-pink-600">customers</span> across India
        </p>
      </div>

      {/* Testimonials */}
      {/* Testimonials */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-10">
  {testimonials.map((item) => (
    <div key={item.id} className="text-center px-6">

      {/* Image */}
      <div className="flex justify-center mb-5">
        <img
          src={item.image}
          alt={item.name}
          className="w-20 h-20 rounded-full object-cover border border-gray-300"
        />
      </div>

      {/* Description (Fixed Height – Same Lines) */}
      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-4 min-h-24">
        “{item.desc}”
      </p>

      {/* Divider */}
      <div className="w-10 h-0.5 bg-pink-700 mx-auto mb-4"></div>

      {/* Name & Role */}
      <h4 className="text-base font-semibold text-gray-800">
        {item.name}
      </h4>
      <p className="text-sm text-gray-400">
        {item.role}
      </p>

    </div>
  ))}
</div>

    </div>
  );
};

export default Testimonial;
