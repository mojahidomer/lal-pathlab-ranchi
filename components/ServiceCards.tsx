'use client';

import { FileText, Scan } from 'lucide-react';

export default function ServiceCards() {
  return (
    <div className="grid md:grid-cols-2 gap-6 mt-8">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg p-6 hover:shadow-lg transition-shadow duration-200">
        <div className="flex items-center gap-4">
          <FileText className="w-12 h-12 text-blue-200" />
          <div>
            <h3 className="text-xl font-bold mb-2">Browse Our Full Test Menu</h3>
            <p className="text-blue-100 mb-4">Explore our comprehensive range of diagnostic tests and health packages</p>
            <button className="bg-white text-blue-600 hover:bg-gray-50 px-4 py-2 rounded-md font-medium transition-colors duration-200">
              View Tests
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg p-6 hover:shadow-lg transition-shadow duration-200">
        <div className="flex items-center gap-4">
          <Scan className="w-12 h-12 text-orange-200" />
          <div>
            <h3 className="text-xl font-bold mb-2">Now Offering Radiology Tests</h3>
            <p className="text-orange-100 mb-4">Advanced imaging and radiology services at Dr Lal PathLabs</p>
            <button className="bg-white text-orange-600 hover:bg-gray-50 px-4 py-2 rounded-md font-medium transition-colors duration-200">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}