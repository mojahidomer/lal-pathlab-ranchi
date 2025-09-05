'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, FileText, Info } from 'lucide-react';

interface TestPackage {
  id: string;
  name: string;
  fastingHours: number;
  sampleTime: string;
  reportTime: string;
  parameters: number;
  originalPrice: number;
  discountedPrice: number;
  discountPercent: number;
  description?: string;
  hasReadMore?: boolean;
}

export default function PopularTestsCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testPackages: TestPackage[] = [
    {
      id: '1',
      name: 'SWASTHFIT SUPER 1',
      fastingHours: 12,
      sampleTime: '11 AM',
      reportTime: 'Same day',
      parameters: 34,
      originalPrice: 2500,
      discountedPrice: 1050,
      discountPercent: 59
    },
    {
      id: '2',
      name: 'SWASTHFIT SUPER 2',
      fastingHours: 12,
      sampleTime: '11 AM',
      reportTime: 'Same day',
      parameters: 57,
      originalPrice: 3370,
      discountedPrice: 1350,
      discountPercent: 60
    },
    {
      id: '3',
      name: 'SWASTHFIT SUPER 4',
      fastingHours: 12,
      sampleTime: '11 AM',
      reportTime: 'Same day',
      parameters: 59,
      originalPrice: 6120,
      discountedPrice: 2350,
      discountPercent: 62,
      description: 'Wrap sample in aluminium foil to protect from ...',
      hasReadMore: true
    },
    {
      id: '4',
      name: 'SWASTHFIT SUPER 3',
      fastingHours: 12,
      sampleTime: '11 AM',
      reportTime: 'Same day',
      parameters: 45,
      originalPrice: 4500,
      discountedPrice: 1850,
      discountPercent: 58
    },
    {
      id: '5',
      name: 'SWASTHFIT PREMIUM',
      fastingHours: 12,
      sampleTime: '11 AM',
      reportTime: 'Same day',
      parameters: 72,
      originalPrice: 8500,
      discountedPrice: 3200,
      discountPercent: 62
    }
  ];

  // Auto-play carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testPackages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [testPackages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testPackages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testPackages.length) % testPackages.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Get visible cards (3 cards at a time)
  const getVisibleCards = () => {
    const cards = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentSlide + i) % testPackages.length;
      cards.push(testPackages[index]);
    }
    return cards;
  };

  return (
    <div className="w-full bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Popular Tests / Health Packages</h2>
          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm underline">
            View All
          </button>
        </div>

        {/* Carousel Container */}
        <div className="relative mb-8">
          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white hover:bg-gray-50 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-10"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white hover:bg-gray-50 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-10"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>

          {/* Carousel Track */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ 
                transform: `translateX(-${currentSlide * (100 / 3)}%)`,
                width: `${(testPackages.length * 100) / 3}%`
              }}
            >
              {testPackages.map((test, index) => (
                <div key={test.id} className="w-1/3 flex-shrink-0 px-3">
            <div key={test.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Yellow Header */}
              <div className="bg-yellow-400 px-4 py-3">
                <h3 className="font-semibold text-gray-800 text-sm">{test.name}</h3>
              </div>

              {/* Card Content */}
              <div className="p-4">
                {/* Test Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3 text-sm text-gray-700">
                    <div className="w-4 h-4 rounded-full border border-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Info className="w-2.5 h-2.5 text-blue-600" />
                    </div>
                    <span>{test.fastingHours} Hour Fasting Mandatory</span>
                    {test.description && (
                      <span className="text-gray-600">
                        {test.description}
                      </span>
                    )}
                  </div>

                  {test.hasReadMore && (
                    <div className="ml-7">
                      <button className="text-blue-600 hover:text-blue-700 text-sm">
                        Read more
                      </button>
                    </div>
                  )}

                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span>Sample Daily by {test.sampleTime}; Report {test.reportTime}</span>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <FileText className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span>{test.parameters} parameter(s) covered</span>
                  </div>
                </div>

                {/* Pricing Section */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 line-through text-sm">₹{test.originalPrice}</span>
                    <span className="text-2xl font-bold text-blue-600">₹{test.discountedPrice}.00</span>
                  </div>
                  
                  {/* Discount Badge */}
                  <div className="relative">
                    <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-3 py-1.5 rounded-full text-sm font-bold">
                      {test.discountPercent}%
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded text-[10px] font-medium">
                      OFF
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition-colors duration-200 flex items-center gap-2 text-sm">
                    Book Now
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                    Know More
                  </button>
                </div>
              </div>
            </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2">
          {testPackages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentSlide 
                  ? 'bg-blue-600' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}