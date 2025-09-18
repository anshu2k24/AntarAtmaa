"use client";

import { FaStar } from "react-icons/fa";

const reviews = [
  {
    name: "Amit Verma",
    role: "Mining Engineer",
    text: "RockSafe AI has transformed the way we predict rockfalls. The accuracy is impressive and it has made our sites much safer.",
    rating: 5,
  },
  {
    name: "Sophia Johnson",
    role: "Safety Officer",
    text: "The real-time alerts are a lifesaver! I can confidently say this system prevents accidents before they happen.",
    rating: 4,
  },
  {
    name: "Ravi Sharma",
    role: "Operations Manager",
    text: "Easy to integrate, reliable, and backed with solid AI. It’s now an essential part of our operations.",
    rating: 5,
  },
];

const Reviews = () => {
  return (
    <section id="reviews" className="bg-[#f9f5f0] text-gray-900 py-20 px-6">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12 text-gray-900">
          What Our <span className="text-[#4a5a3c]">Users Say</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-[#f3e8d0]/90 p-6 rounded-xl shadow-lg hover:scale-105 transform transition duration-300"
            >
              {/* Rating */}
              <div className="flex justify-center mb-4 text-[#c29f5b]">
                {Array(review.rating)
                  .fill(0)
                  .map((_, i) => (
                    <FaStar key={i} className="h-5 w-5" />
                  ))}
              </div>

              {/* Text */}
              <p className="text-[#4a3f2a] italic mb-4">"{review.text}"</p>

              {/* User Info */}
              <h3 className="text-lg font-semibold text-gray-900">
                {review.name}
              </h3>
              <p className="text-sm text-[#6b5c40]">{review.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
