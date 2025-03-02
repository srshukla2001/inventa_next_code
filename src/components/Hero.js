'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const slides = [
  {
    title: 'Mechanical Services',
    description: 'Expert HVAC solutions, mechanical installations, and maintenance services for your facility.',
    image: 'https://img.freepik.com/free-photo/industrial-worker-working-production-line-factory_342744-177.jpg',
  },
  // Add other slides
];

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-neutral-900 pt-20">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{ delay: 5000 }}
        navigation
        pagination={{ clickable: true }}
        className="h-[90vh]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover absolute inset-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent" />
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-20">
                <div className="text-white max-w-2xl mb-8">
                  <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    {slide.title}
                  </h2>
                  <p className="text-lg text-gray-200">
                    {slide.description}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}