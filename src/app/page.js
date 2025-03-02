'use client';
import Image from "next/image";
import logo from '../../assets/inventa_logo.png'
import { useEffect } from "react";

export default function Home() {
  useEffect(()=>{
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    let isMenuOpen = false;
  
    mobileMenuButton.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            mobileMenu.classList.remove('hidden', 'animate__fadeOut');
            mobileMenu.classList.add('animate__animated', 'animate__fadeIn');
        } else {
            mobileMenu.classList.remove('animate__fadeIn');
            mobileMenu.classList.add('animate__fadeOut');
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
            }, 500);
        }
    });
  
    // Close mobile menu when clicking on links
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            isMenuOpen = false;
            mobileMenu.classList.remove('animate__fadeIn');
            mobileMenu.classList.add('animate__fadeOut');
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
            }, 500);
        });
    });
    document.addEventListener('DOMContentLoaded', function() {
      const track = document.querySelector('.slider-track');
      const slides = document.querySelectorAll('.slide');
      const dots = document.querySelectorAll('.slider-dot');
      const prevButton = document.getElementById('prevSlide');
      const nextButton = document.getElementById('nextSlide');
      let currentIndex = 0;
      let autoplayInterval;

      function updateSlider() {
          track.style.transform = `translateX(-${currentIndex * 100}%)`;
          // Update dots
          dots.forEach((dot, index) => {
              dot.classList.toggle('bg-white', index === currentIndex);
              dot.classList.toggle('bg-white/50', index !== currentIndex);
          });
      }

      function nextSlide() {
          currentIndex = (currentIndex + 1) % slides.length;
          updateSlider();
      }

      function prevSlide() {
          currentIndex = (currentIndex - 1 + slides.length) % slides.length;
          updateSlider();
      }

      // Event listeners
      prevButton.addEventListener('click', () => {
          prevSlide();
          resetAutoplay();
      });

      nextButton.addEventListener('click', () => {
          nextSlide();
          resetAutoplay();
      });

      dots.forEach((dot, index) => {
          dot.addEventListener('click', () => {
              currentIndex = index;
              updateSlider();
              resetAutoplay();
          });
      });

      // Autoplay
      function startAutoplay() {
          autoplayInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
      }

      function resetAutoplay() {
          clearInterval(autoplayInterval);
          startAutoplay();
      }

      // Initialize slider
      updateSlider();
      startAutoplay();

      // Optional: Pause autoplay on hover
      track.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
      track.addEventListener('mouseleave', startAutoplay);
  });
  document.addEventListener('DOMContentLoaded', () => {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            const tempImage = new Image();
            tempImage.onload = () => {
              img.src = img.dataset.src;
              img.classList.remove('opacity-0');
              img.classList.add('opacity-100');
            };
            tempImage.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });

    const loadImage = (img) => {
      if ('loading' in HTMLImageElement.prototype) {
        img.loading = 'lazy';
      }
      
      img.classList.add('transition-opacity', 'duration-300', 'opacity-0');
      
      img.onerror = () => {
        const width = img.getAttribute('width') || img.clientWidth || 300;
        const height = img.getAttribute('height') || img.clientHeight || 200;
        img.src = `https://placehold.co/${width}x${height}/DEDEDE/555555?text=Image+Unavailable`;
        img.alt = 'Image unavailable';
        img.classList.remove('opacity-0');
        img.classList.add('opacity-100', 'error-image');
      };

      if (img.dataset.src) {
        imageObserver.observe(img);
      } else {
        img.classList.remove('opacity-0');
        img.classList.add('opacity-100');
      }
    };

    document.querySelectorAll('img[data-src], img:not([data-src])').forEach(loadImage);

    // Watch for dynamically added images
    new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) {
            if (node.tagName === 'IMG') {
              loadImage(node);
            }
            node.querySelectorAll('img').forEach(loadImage);
          }
        });
      });
    }).observe(document.body, {
      childList: true,
      subtree: true
    });
  });

  // Performance monitoring
  if ('performance' in window && 'PerformanceObserver' in window) {
    // Create performance observer
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.entryType === 'largest-contentful-paint') {
          // console.log(`LCP: ${entry.startTime}ms`);
        }
        if (entry.entryType === 'first-input') {
          // console.log(`FID: ${entry.processingStart - entry.startTime}ms`);
        }
        if (entry.entryType === 'layout-shift') {
          // console.log(`CLS: ${entry.value}`);
        }
      });
    });

    // Observe performance metrics
    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });

    // Log basic performance metrics
    window.addEventListener('load', () => {
      const timing = performance.getEntriesByType('navigation')[0];
      console.log({
        'DNS Lookup': timing.domainLookupEnd - timing.domainLookupStart,
        'TCP Connection': timing.connectEnd - timing.connectStart,
        'DOM Content Loaded': timing.domContentLoadedEventEnd - timing.navigationStart,
        'Page Load': timing.loadEventEnd - timing.navigationStart
      });
    });
  }

  // Handle offline/online status
  window.addEventListener('online', () => {
    document.body.classList.remove('offline');
    console.log('Connection restored');
  });
  
  window.addEventListener('offline', () => {
    document.body.classList.add('offline');
    console.log('Connection lost');
  });
  })
 
  return (
    <>
    {/* Skip to main content link for accessibility */}
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:p-4 focus:bg-white focus:text-black"
    >
      Skip to main content
    </a>
    {/* Header */}
    <header className="relative z-50 bg-white dark:bg-gray-900">
      {/* Header content goes here */}
    </header>
    {/* Main content area */}
    <main id="main-content" className="flex-1 relative ">
      {/* Content will be injected here */}
    </main>
    {/* {bodyScripts} */}
    <element
      id="cc714017-fedd-471a-b709-e5667a309608"
      data-section-id="cc714017-fedd-471a-b709-e5667a309608"
    >
      <htmlcode>
        <div id="root">
          <nav
            id="navbar"
            className="fixed w-full z-50 bg-[#DDF3FF] text-[#3F75B9]"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-25">
                {/* Logo */}
                <div className="flex-shrink-0">
                  <span className="text-2xl font-bold"><Image src={logo} height={80} width={80} alt="inventa"/></span>
                </div>
                {/* Desktop Menu */}
                <div className="hidden md:block">
                  <div className="ml-10 flex items-center space-x-8">
                    <a
                      href="#hero"
                      className="hover:text-blue-400 transition-colors"
                    >
                      Home
                    </a>
                    <a
                      href="#services"
                      className="hover:text-blue-400 transition-colors"
                    >
                      Services
                    </a>
                    <a
                      href="#about"
                      className="hover:text-blue-400 transition-colors"
                    >
                      About
                    </a>
                    <a
                      href="#projects"
                      className="hover:text-blue-400 transition-colors"
                    >
                      Projects
                    </a>
                    <a
                      href="#testimonials"
                      className="hover:text-blue-400 transition-colors"
                    >
                      Testimonials
                    </a>
                    <a
                      href="#contact"
                      className="hover:text-blue-400 transition-colors"
                    >
                      Contact
                    </a>
                  </div>
                </div>
                {/* Mobile menu button */}
                <div className="md:hidden">
                  <button
                    id="mobile-menu-button"
                    className="inline-flex items-center justify-center p-2 rounded-md hover:text-blue-400 focus:outline-none"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              {/* Mobile Menu */}
              <div
                id="mobile-menu"
                className="hidden md:hidden animate__animated"
              >
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  <a
                    href="#hero"
                    className="block py-2 hover:text-blue-400 transition-colors"
                  >
                    Home
                  </a>
                  <a
                    href="#services"
                    className="block py-2 hover:text-blue-400 transition-colors"
                  >
                    Services
                  </a>
                  <a
                    href="#about"
                    className="block py-2 hover:text-blue-400 transition-colors"
                  >
                    About
                  </a>
                  <a
                    href="#projects"
                    className="block py-2 hover:text-blue-400 transition-colors"
                  >
                    Projects
                  </a>
                  <a
                    href="#testimonials"
                    className="block py-2 hover:text-blue-400 transition-colors"
                  >
                    Testimonials
                  </a>
                  <a
                    href="#contact"
                    className="block py-2 hover:text-blue-400 transition-colors"
                  >
                    Contact
                  </a>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </htmlcode>
    </element>
    <element
      id="81134488-89c8-4b65-b7fd-9885711e3c7e"
      data-section-id="81134488-89c8-4b65-b7fd-9885711e3c7e"
    >
      <htmlcode>
        <div id="root">
          <section
            id="hero"
            className="relative min-h-screen bg-neutral-900 pt-20"
          >
            {/* Hero Slider */}
            <div className="hero-slider relative h-[90vh] overflow-hidden">
              {/* Slider Track */}
              <div className="slider-track flex h-[90vh] transition-transform duration-700">
                {/* Slide 1 - Mechanical */}
                <div className="slide relative w-full flex-shrink-0">
                  <div className="absolute inset-0">
                    <img
                      src="https://img.freepik.com/free-photo/industrial-worker-working-production-line-factory_342744-177.jpg"
                      alt="Mechanical Services"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent" />
                  </div>
                  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-20">
                    <div className="text-white max-w-2xl mb-8">
                      <h2 className="text-4xl md:text-5xl font-bold mb-4 animate__animated animate__fadeInUp">
                        Mechanical Services
                      </h2>
                      <p className="text-lg text-gray-200 animate__animated animate__fadeInUp animate__delay-1s">
                        Expert HVAC solutions, mechanical installations, and
                        maintenance services for your facility.
                      </p>
                    </div>
                  </div>
                </div>
                {/* Slide 2 - Electrical */}
                <div className="slide relative w-full flex-shrink-0">
                  <div className="absolute inset-0">
                    <img
                      src="https://electrician-minneapolis.com/wp-content/uploads/2022/08/e8MEyTIYNqRf29u26iRu6cl9f2bDkLRRJLGYbvbF-7.jpg"
                      alt="Electrical Services"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent" />
                  </div>
                  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-20">
                    <div className="text-white max-w-2xl mb-8">
                      <h2 className="text-4xl md:text-5xl font-bold mb-4 animate__animated animate__fadeInUp">
                        Electrical Services
                      </h2>
                      <p className="text-lg text-gray-200 animate__animated animate__fadeInUp animate__delay-1s">
                        Comprehensive electrical solutions from installation to
                        maintenance and repairs.
                      </p>
                    </div>
                  </div>
                </div>
                {/* Slide 3 - Plumbing */}
                <div className="slide relative w-full flex-shrink-0">
                  <div className="absolute inset-0">
                    <img
                      src="https://metropha.com/wp-content/uploads/2018/09/Metro-Plumbing-_-6-Characteristics-That-An-Emergency-Plumber-In-Chattanooga-TN-Must-Have.jpg"
                      alt="Plumbing Services"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent" />
                  </div>
                  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-20">
                    <div className="text-white max-w-2xl mb-8">
                      <h2 className="text-4xl md:text-5xl font-bold mb-4 animate__animated animate__fadeInUp">
                        Plumbing Services
                      </h2>
                      <p className="text-lg text-gray-200 animate__animated animate__fadeInUp animate__delay-1s">
                        Professional plumbing solutions for residential and
                        commercial properties.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Slider Controls */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
                <button
                  className="w-3 h-3 rounded-full bg-white/50 slider-dot"
                  data-index={0}
                />
                <button
                  className="w-3 h-3 rounded-full bg-white/50 slider-dot"
                  data-index={1}
                />
                <button
                  className="w-3 h-3 rounded-full bg-white/50 slider-dot"
                  data-index={2}
                />
              </div>
              {/* Navigation Arrows */}
              <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 transition-colors p-2 rounded-full text-white"
                id="prevSlide"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 transition-colors p-2 rounded-full text-white"
                id="nextSlide"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </section>
          <section id="services" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16 animate__animated animate__fadeIn">
                <h2 className="text-4xl font-bold text-neutral-900 mb-4">
                  Our Services
                </h2>
                <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                  Comprehensive technical solutions delivered with expertise and
                  precision
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Service 1 */}
                <div className="bg-neutral-50 p-6 rounded-lg hover:shadow-xl transition-shadow duration-300 animate__animated animate__fadeInUp">
                  <div className="text-blue-600 mb-4">
                    <svg
                      className="w-12 h-12"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                    Carpentry &amp; Wood Flooring
                  </h3>
                  <p className="text-neutral-600">
                    Expert woodworking solutions including flooring installation,
                    repairs, and custom carpentry work.
                  </p>
                </div>
                {/* Service 2 */}
                <div
                  className="bg-neutral-50 p-6 rounded-lg hover:shadow-xl transition-shadow duration-300 animate__animated animate__fadeInUp"
                  style={{ animationDelay: "0.2s" }}
                >
                  <div className="text-blue-600 mb-4">
                    <svg
                      className="w-12 h-12"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                    Electrical Services
                  </h3>
                  <p className="text-neutral-600">
                    Complete electrical solutions including installations,
                    repairs, and maintenance services.
                  </p>
                </div>
                {/* Service 3 */}
                <div
                  className="bg-neutral-50 p-6 rounded-lg hover:shadow-xl transition-shadow duration-300 animate__animated animate__fadeInUp"
                  style={{ animationDelay: "0.4s" }}
                >
                  <div className="text-blue-600 mb-4">
                    <svg
                      className="w-12 h-12"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                    Air-Conditioning &amp; Ventilation
                  </h3>
                  <p className="text-neutral-600">
                    Professional HVAC services including installation,
                    maintenance, and air filtration systems.
                  </p>
                </div>
                {/* Service 4 */}
                <div
                  className="bg-neutral-50 p-6 rounded-lg hover:shadow-xl transition-shadow duration-300 animate__animated animate__fadeInUp"
                  style={{ animationDelay: "0.6s" }}
                >
                  <div className="text-blue-600 mb-4">
                    <svg
                      className="w-12 h-12"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                    Painting Services
                  </h3>
                  <p className="text-neutral-600">
                    Professional painting solutions for interior and exterior
                    surfaces.
                  </p>
                </div>
                {/* Service 5 */}
                <div
                  className="bg-neutral-50 p-6 rounded-lg hover:shadow-xl transition-shadow duration-300 animate__animated animate__fadeInUp"
                  style={{ animationDelay: "0.8s" }}
                >
                  <div className="text-blue-600 mb-4">
                    <svg
                      className="w-12 h-12"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                    False Ceiling &amp; Partitions
                  </h3>
                  <p className="text-neutral-600">
                    Expert installation of false ceilings and light partitions for
                    space optimization.
                  </p>
                </div>
                {/* Service 6 */}
                <div
                  className="bg-neutral-50 p-6 rounded-lg hover:shadow-xl transition-shadow duration-300 animate__animated animate__fadeInUp"
                  style={{ animationDelay: "1s" }}
                >
                  <div className="text-blue-600 mb-4">
                    <svg
                      className="w-12 h-12"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                    Tiling &amp; Wallpaper
                  </h3>
                  <p className="text-neutral-600">
                    Professional installation of tiles and wallpaper for beautiful
                    finish.
                  </p>
                </div>
              </div>
              <div className="text-center mt-12">
                <a
                  href="#contact"
                  className="inline-block px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300 animate__animated animate__fadeInUp"
                  style={{ animationDelay: "1.2s" }}
                >
                  Request a Service
                </a>
              </div>
            </div>
          </section>
          <section id="about" className="py-20 bg-neutral-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="animate__animated animate__fadeInLeft">
                  <h2 className="text-4xl font-bold mb-6">
                    About Inventa Digital
                  </h2>
                  <p className="text-gray-300 mb-8">
                    Since our establishment, Inventa Digital Technical Services
                    has been at the forefront of providing comprehensive technical
                    solutions across Dubai. We combine expertise, innovation, and
                    reliability to deliver exceptional service quality.
                  </p>
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
                      <p className="text-gray-300">
                        To deliver excellence in technical services while
                        exceeding client expectations.
                      </p>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
                      <p className="text-gray-300">
                        To be the leading technical service provider in the UAE.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <svg
                        className="w-6 h-6 text-blue-500 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>Professional &amp; Certified Team</span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="w-6 h-6 text-blue-500 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>10+ Years of Experience</span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="w-6 h-6 text-blue-500 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>100% Customer Satisfaction</span>
                    </div>
                  </div>
                </div>
                <div className="lg:pl-12 animate__animated animate__fadeInRight">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-neutral-800 p-6 rounded-lg">
                      <div className="text-3xl font-bold text-blue-500 mb-2">
                        500+
                      </div>
                      <div className="text-lg">Projects Completed</div>
                    </div>
                    <div className="bg-neutral-800 p-6 rounded-lg">
                      <div className="text-3xl font-bold text-blue-500 mb-2">
                        50+
                      </div>
                      <div className="text-lg">Team Members</div>
                    </div>
                    <div className="bg-neutral-800 p-6 rounded-lg">
                      <div className="text-3xl font-bold text-blue-500 mb-2">
                        98%
                      </div>
                      <div className="text-lg">Client Satisfaction</div>
                    </div>
                    <div className="bg-neutral-800 p-6 rounded-lg">
                      <div className="text-3xl font-bold text-blue-500 mb-2">
                        24/7
                      </div>
                      <div className="text-lg">Support Available</div>
                    </div>
                  </div>
                  <div className="mt-8 text-center">
                    <a
                      href="#contact"
                      className="inline-block px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300"
                    >
                      Get in Touch
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section id="projects" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16 animate__animated animate__fadeIn">
                <h2 className="text-4xl font-bold text-neutral-900 mb-4">
                  Our Projects
                </h2>
                <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                  Explore our portfolio of successful projects and transformations
                </p>
              </div>
              {/* Project Filter */}
              <div className="flex flex-wrap justify-center gap-4 mb-12 animate__animated animate__fadeInUp">
                <button className="filter-btn active px-6 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                  All
                </button>
                <button className="filter-btn px-6 py-2 rounded-full bg-neutral-200 hover:bg-blue-600 hover:text-white transition-colors">
                  Carpentry
                </button>
                <button className="filter-btn px-6 py-2 rounded-full bg-neutral-200 hover:bg-blue-600 hover:text-white transition-colors">
                  Electrical
                </button>
                <button className="filter-btn px-6 py-2 rounded-full bg-neutral-200 hover:bg-blue-600 hover:text-white transition-colors">
                  HVAC
                </button>
              </div>
              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Project Cards */}
                <div className="group relative overflow-hidden rounded-lg shadow-lg animate__animated animate__fadeInUp">
                  <div className="aspect-w-16 aspect-h-12 bg-neutral-200">
                    <div className="h-64 bg-neutral-300" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-semibold mb-2">
                      Luxury Villa Renovation
                    </h3>
                    <p className="text-sm">
                      Complete interior renovation including carpentry,
                      electrical, and HVAC systems
                    </p>
                  </div>
                </div>
                <div
                  className="group relative overflow-hidden rounded-lg shadow-lg animate__animated animate__fadeInUp"
                  style={{ animationDelay: "0.2s" }}
                >
                  <div className="aspect-w-16 aspect-h-12 bg-neutral-200">
                    <div className="h-64 bg-neutral-300" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-semibold mb-2">
                      Commercial Office Space
                    </h3>
                    <p className="text-sm">
                      Modern office fit-out with false ceiling and electrical
                      installations
                    </p>
                  </div>
                </div>
                <div
                  className="group relative overflow-hidden rounded-lg shadow-lg animate__animated animate__fadeInUp"
                  style={{ animationDelay: "0.4s" }}
                >
                  <div className="aspect-w-16 aspect-h-12 bg-neutral-200">
                    <div className="h-64 bg-neutral-300" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-semibold mb-2">
                      Hotel Refurbishment
                    </h3>
                    <p className="text-sm">
                      Complete renovation including tiling, wallpaper, and
                      plumbing systems
                    </p>
                  </div>
                </div>
              </div>
              {/* Load More Button */}
              <div
                className="text-center mt-12 animate__animated animate__fadeInUp"
                style={{ animationDelay: "0.6s" }}
              >
                <button className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300">
                  Load More Projects
                </button>
              </div>
            </div>
          </section>
          <section id="testimonials" className="py-20 bg-neutral-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16 animate__animated animate__fadeIn">
                <h2 className="text-4xl font-bold text-white mb-4">
                  Client Testimonials
                </h2>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                  What our satisfied clients say about our services
                </p>
              </div>
              <div className="testimonial-slider relative">
                <div className="overflow-hidden">
                  <div className="testimonial-track flex transition-transform duration-500">
                    {/* Testimonial 1 */}
                    <div className="testimonial-slide w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4">
                      <div className="bg-neutral-800 p-8 rounded-lg h-full">
                        <div className="flex items-center mb-6">
                          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-xl text-white font-bold">
                              A
                            </span>
                          </div>
                          <div className="ml-4">
                            <h4 className="text-white font-semibold">
                              Ahmed Rahman
                            </h4>
                            <p className="text-gray-400">Villa Owner</p>
                          </div>
                        </div>
                        <p className="text-gray-300 mb-6">
                          "Exceptional service from start to finish. The team's
                          attention to detail in our villa renovation was
                          remarkable. Highly recommended for any technical service
                          needs."
                        </p>
                        <div className="flex text-yellow-400">
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    {/* Testimonial 2 */}
                    <div className="testimonial-slide w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4">
                      <div className="bg-neutral-800 p-8 rounded-lg h-full">
                        <div className="flex items-center mb-6">
                          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-xl text-white font-bold">
                              S
                            </span>
                          </div>
                          <div className="ml-4">
                            <h4 className="text-white font-semibold">
                              Sarah Mohammad
                            </h4>
                            <p className="text-gray-400">Office Manager</p>
                          </div>
                        </div>
                        <p className="text-gray-300 mb-6">
                          "The team's expertise in HVAC systems is unmatched. They
                          completed our office maintenance efficiently and
                          professionally."
                        </p>
                        <div className="flex text-yellow-400">
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    {/* Testimonial 3 */}
                    <div className="testimonial-slide w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4">
                      <div className="bg-neutral-800 p-8 rounded-lg h-full">
                        <div className="flex items-center mb-6">
                          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-xl text-white font-bold">
                              K
                            </span>
                          </div>
                          <div className="ml-4">
                            <h4 className="text-white font-semibold">
                              Khalid Al Mansouri
                            </h4>
                            <p className="text-gray-400">Property Developer</p>
                          </div>
                        </div>
                        <p className="text-gray-300 mb-6">
                          "Outstanding workmanship on our commercial project. The
                          false ceiling and electrical work were completed to
                          perfection."
                        </p>
                        <div className="flex text-yellow-400">
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Navigation Arrows */}
                <button
                  className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-blue-600 p-2 rounded-full text-white hover:bg-blue-700 focus:outline-none"
                  id="prev-testimonial"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-blue-600 p-2 rounded-full text-white hover:bg-blue-700 focus:outline-none"
                  id="next-testimonial"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </section>
          <section id="contact" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16 animate__animated animate__fadeIn">
                <h2 className="text-4xl font-bold text-neutral-900 mb-4">
                  Contact Us
                </h2>
                <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                  Get in touch with us for all your technical service needs
                </p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Form */}
                <div className="bg-neutral-50 p-8 rounded-lg shadow-lg animate__animated animate__fadeInLeft">
                  <form id="contactForm" className="space-y-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-neutral-700 mb-1"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required=""
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-neutral-700 mb-1"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required=""
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-neutral-700 mb-1"
                      >
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required=""
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="service"
                        className="block text-sm font-medium text-neutral-700 mb-1"
                      >
                        Service Required
                      </label>
                      <select
                        id="service"
                        name="service"
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select a service</option>
                        <option value="carpentry">
                          Carpentry &amp; Wood Flooring
                        </option>
                        <option value="electrical">Electrical Services</option>
                        <option value="hvac">
                          Air-Conditioning &amp; Ventilation
                        </option>
                        <option value="painting">Painting Services</option>
                        <option value="plumbing">Sanitary &amp; Plumbing</option>
                        <option value="ceiling">
                          False Ceiling &amp; Partitions
                        </option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-neutral-700 mb-1"
                      >
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        required=""
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        defaultValue={""}
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
                {/* Contact Information */}
                <div className="space-y-8 animate__animated animate__fadeInRight">
                  <div className="bg-neutral-50 p-8 rounded-lg shadow-lg mb-8">
                    <h3 className="text-2xl font-semibold text-neutral-900 mb-6">
                      Contact Information
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <svg
                          className="w-6 h-6 text-blue-600 mt-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <div className="ml-4">
                          <h4 className="text-lg font-semibold text-neutral-900">
                            Address
                          </h4>
                          <p className="text-neutral-600">
                            Dubai, United Arab Emirates
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <svg
                          className="w-6 h-6 text-blue-600 mt-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        <div className="ml-4">
                          <h4 className="text-lg font-semibold text-neutral-900">
                            Phone
                          </h4>
                          <p className="text-neutral-600">+971 XXXXXXXXX</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <svg
                          className="w-6 h-6 text-blue-600 mt-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        <div className="ml-4">
                          <h4 className="text-lg font-semibold text-neutral-900">
                            Email
                          </h4>
                          <p className="text-neutral-600">
                            info@inventadigital.com
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Google Maps */}
                  <div className="h-[300px] bg-neutral-200 rounded-lg">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3609.680775642485!2d55.2707!3d25.2048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDEyJzE3LjMiTiA1NcKwMTYnMTQuNSJF!5e0!3m2!1sen!2sae!4v1635789012345!5m2!1sen!2sae"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      className="rounded-lg"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section
            id="cta"
            className="py-20 bg-neutral-900 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-blue-600 opacity-10 transform -skew-y-6" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
              <div className="text-center max-w-3xl mx-auto animate__animated animate__fadeIn">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Ready to Transform Your Space?
                </h2>
                <p className="text-lg text-gray-300 mb-8">
                  Let us help you bring your vision to life with our professional
                  technical services. Contact us today for a free consultation!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <a
                    href="tel:+971XXXXXXXXX"
                    className="px-8 py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center w-full sm:w-auto animate__animated animate__fadeInLeft"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    Call Now
                  </a>
                  <a
                    href="#contact"
                    className="px-8 py-4 bg-white text-neutral-900 rounded-full hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center w-full sm:w-auto animate__animated animate__fadeInRight"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20"
                      />
                    </svg>
                    Get Quote
                  </a>
                </div>
                <div className="mt-10 text-gray-300 animate__animated animate__fadeInUp animate__delay-1s">
                  <p className="text-sm">Available 24/7 for Emergency Services</p>
                  <div className="flex justify-center items-center gap-6 mt-4">
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 text-blue-400 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>Quick Response</span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 text-blue-400 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>Expert Team</span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 text-blue-400 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>Best Price</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <footer id="footer" className="bg-neutral-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Main Footer */}
              <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Company Info */}
                <div className="animate__animated animate__fadeIn">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Inventa Digital
                  </h3>
                  <p className="mb-6">
                    Your trusted partner for comprehensive technical services in
                    Dubai, UAE.
                  </p>
                  <div className="flex space-x-4">
                    <a
                      href="#"
                      className="text-gray-300 hover:text-blue-400 transition-colors"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-blue-400 transition-colors"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-blue-400 transition-colors"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-blue-400 transition-colors"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.897 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.897-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                      </svg>
                    </a>
                  </div>
                </div>
                {/* Quick Links */}
                <div
                  className="animate__animated animate__fadeIn"
                  style={{ animationDelay: "0.2s" }}
                >
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Quick Links
                  </h3>
                  <ul className="space-y-3">
                    <li>
                      <a
                        href="#hero"
                        className="hover:text-blue-400 transition-colors"
                      >
                        Home
                      </a>
                    </li>
                    <li>
                      <a
                        href="#about"
                        className="hover:text-blue-400 transition-colors"
                      >
                        About Us
                      </a>
                    </li>
                    <li>
                      <a
                        href="#services"
                        className="hover:text-blue-400 transition-colors"
                      >
                        Services
                      </a>
                    </li>
                    <li>
                      <a
                        href="#projects"
                        className="hover:text-blue-400 transition-colors"
                      >
                        Projects
                      </a>
                    </li>
                    <li>
                      <a
                        href="#contact"
                        className="hover:text-blue-400 transition-colors"
                      >
                        Contact
                      </a>
                    </li>
                  </ul>
                </div>
                {/* Services */}
                <div
                  className="animate__animated animate__fadeIn"
                  style={{ animationDelay: "0.4s" }}
                >
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Our Services
                  </h3>
                  <ul className="space-y-3">
                    <li>Carpentry &amp; Flooring</li>
                    <li>Electrical Services</li>
                    <li>HVAC Systems</li>
                    <li>Painting Services</li>
                    <li>Plumbing Solutions</li>
                  </ul>
                </div>
                {/* Contact Info */}
                <div
                  className="animate__animated animate__fadeIn"
                  style={{ animationDelay: "0.6s" }}
                >
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Contact Info
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-3 text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      Dubai, UAE
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-3 text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      +971 XXXXXXXXX
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-3 text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      info@inventadigital.com
                    </li>
                  </ul>
                </div>
              </div>
              {/* Bottom Footer */}
              <div className="py-6 border-t border-neutral-800 text-center">
                <p className="text-sm">
                  © 2024 Inventa Digital Technical Services. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </htmlcode>
    </element>
    <element
      id="527c3603-8d71-4ec9-b619-d613b19ba37a"
      data-section-id="527c3603-8d71-4ec9-b619-d613b19ba37a"
    >
      <htmlcode>
        <div id="root">
          <footer id="footer" className="bg-neutral-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Main Footer */}
              <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Company Info */}
                <div className="animate__animated animate__fadeIn">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Inventa Digital
                  </h3>
                  <p className="mb-6">
                    Your trusted partner for comprehensive technical services in
                    Dubai, UAE.
                  </p>
                  <div className="flex space-x-4">
                    <a
                      href="#"
                      className="text-gray-300 hover:text-blue-400 transition-colors"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-blue-400 transition-colors"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-blue-400 transition-colors"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-blue-400 transition-colors"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.897 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.897-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                      </svg>
                    </a>
                  </div>
                </div>
                {/* Quick Links */}
                <div
                  className="animate__animated animate__fadeIn"
                  style={{ animationDelay: "0.2s" }}
                >
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Quick Links
                  </h3>
                  <ul className="space-y-3">
                    <li>
                      <a
                        href="#hero"
                        className="hover:text-blue-400 transition-colors"
                      >
                        Home
                      </a>
                    </li>
                    <li>
                      <a
                        href="#about"
                        className="hover:text-blue-400 transition-colors"
                      >
                        About Us
                      </a>
                    </li>
                    <li>
                      <a
                        href="#services"
                        className="hover:text-blue-400 transition-colors"
                      >
                        Services
                      </a>
                    </li>
                    <li>
                      <a
                        href="#projects"
                        className="hover:text-blue-400 transition-colors"
                      >
                        Projects
                      </a>
                    </li>
                    <li>
                      <a
                        href="#contact"
                        className="hover:text-blue-400 transition-colors"
                      >
                        Contact
                      </a>
                    </li>
                  </ul>
                </div>
                {/* Services */}
                <div
                  className="animate__animated animate__fadeIn"
                  style={{ animationDelay: "0.4s" }}
                >
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Our Services
                  </h3>
                  <ul className="space-y-3">
                    <li>Carpentry &amp; Flooring</li>
                    <li>Electrical Services</li>
                    <li>HVAC Systems</li>
                    <li>Painting Services</li>
                    <li>Plumbing Solutions</li>
                  </ul>
                </div>
                {/* Contact Info */}
                <div
                  className="animate__animated animate__fadeIn"
                  style={{ animationDelay: "0.6s" }}
                >
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Contact Info
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-3 text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      Dubai, UAE
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-3 text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      +971 XXXXXXXXX
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-3 text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      info@inventadigital.com
                    </li>
                  </ul>
                </div>
              </div>
              {/* Bottom Footer */}
              <div className="py-6 border-t border-neutral-800 text-center">
                <p className="text-sm">
                  © 2024 Inventa Digital Technical Services. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </htmlcode>
    </element>
    <div id="page_complete"></div>
  </>
  
  );
}
