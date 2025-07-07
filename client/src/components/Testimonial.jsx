import { assets } from "../assets/assets";
import Title from "./Title";

/**
 * Testimonial section displaying customer reviews
 */
const Testimonial = () => {
  const testimonials = [
    {
      name: "Emma Rodriguez",
      location: "Barcelona, Spain",
      image: assets.testimonial_image_1,
      testimonial:
        "I've rented cars from various companies, but the experience with CarRental was exceptional.",
    },
    {
      name: "John Smith",
      location: "New York, USA",
      image: assets.testimonial_image_2,
      testimonial:
        "Tried multiple car rental services before, but none matched the smooth process and quality that CarRental offered. Highly recommended!",
    },
    {
      name: "Emily Davis",
      location: "Toronto, Canada",
      image: assets.testimonial_image_1,
      testimonial:
        "CarRental made the whole process so easy and stress-free. The vehicle was spotless and the customer service was outstanding!",
    },
  ];

  return (
    <div className="py-28 px-6 md:px-16 lg:px-24 xl:px-24">
      {/* Section Title */}
      <Title
        title="What Our Customers Say"
        subTitle="Discover Why Discerning Travelers Choose CarRental For Their Luxury Rides Around The World."
      />

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18">
        {testimonials.map((testimonial, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-xl shadow-lg hover:-translate-y-1 transition-all duration-500"
          >
            {/* User Info */}
            <div className="flex items-center gap-3">
              <img
                className="w-12 h-12 rounded-full"
                src={testimonial.image}
                alt={`Profile of ${testimonial.name}`}
              />
              <div>
                <p className="text-xl">{testimonial.name}</p>
                <p className="text-gray-500">{testimonial.location}</p>
              </div>
            </div>

            {/* Static 5-Star Rating */}
            <div className="flex items-center gap-1 mt-4">
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <img src={assets.star_icon} alt="Star Icon" key={index} />
                ))}
            </div>

            {/* Review Text */}
            <p className="text-gray-500 max-w-90 mt-4 font-light">
              "{testimonial.testimonial}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
