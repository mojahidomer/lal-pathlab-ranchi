'use client';

import { useState, useEffect } from 'react';
import { Search, Upload, Download, MapPin } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';

export default function BookingPanel() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1); // for keyboard navigation
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Mock test data
  const mockTests = [
    'BIOTINIDASE ACTIVITY, QUANTITATIVE, BLOOD',
    'HISTOPATHOLOGY, BIOPSY - SECOND OPINION',
    'BIOFIRE GI (GASTROINTESTINAL PANEL), STOOL',
    'C1 ESTERASE INHIBITOR FUNCTIONAL, SERUM',
    'ALCOHOL BIOMARKERS: ETHYL GLUCURONIDE (ETG) & ETHYL SULPHATE (ETS), URINE',
  ];

  const filteredTests = mockTests.filter(test =>
    test.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowDropdown(value.length > 0);
    setHighlightIndex(-1);
  };

  const handleTestSelect = (test: string) => {
    setSearchTerm(test);
    setShowDropdown(false);
    setHighlightIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown || filteredTests.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightIndex(prev =>
        prev < filteredTests.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightIndex(prev =>
        prev > 0 ? prev - 1 : filteredTests.length - 1
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightIndex >= 0 && highlightIndex < filteredTests.length) {
        handleTestSelect(filteredTests[highlightIndex]);
      }
    } else if (e.key === 'Escape') {
      setShowDropdown(false);
    }
  };

  // Reset highlight if list changes
  useEffect(() => {
    setHighlightIndex(-1);
  }, [debouncedSearchTerm]);

  return (
    <div className="bg-gray-100 rounded-lg p-6">
      <h2 className="text-xl font-bold text-blue-600 mb-6 text-center">BOOK A TEST ONLINE</h2>
      
      {/* Search section */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={() => searchTerm.length > 0 && setShowDropdown(true)}
            onKeyDown={handleKeyDown}
            placeholder="Search Test and Packages"
            className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-yellow-400 hover:bg-yellow-500 p-2 rounded-md transition-colors duration-200"
          >
            <Search className="w-5 h-5 text-gray-700" />
          </button>
          
          {/* Search dropdown */}
          {showDropdown && searchTerm.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
              <div className="bg-gray-50 px-4 py-2 border-b flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">TESTS</span>
              </div>
              {filteredTests.length > 0 ? (
                filteredTests.map((test, index) => (
                  <div
                    key={index}
                    onClick={() => handleTestSelect(test)}
                    className={`px-4 py-3 cursor-pointer border-b last:border-b-0 text-sm ${
                      index === highlightIndex ? 'bg-blue-100 text-blue-800' : 'text-gray-800 hover:bg-blue-50'
                    }`}
                  >
                    {test}
                  </div>
                ))
              ) : (
                <div className="px-4 py-3 text-sm text-gray-500">No tests found</div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* OR divider */}
      <div className="flex items-center mb-6">
        <div className="flex-1 border-t border-gray-400"></div>
        <span className="px-4 text-gray-600 bg-gray-100 font-medium">OR</span>
        <div className="flex-1 border-t border-gray-400"></div>
      </div>

      {/* Popular tests button */}
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-4 rounded-md font-medium mb-6 transition-colors duration-200 flex items-center justify-between">
        <span>Choose Popular Tests / Packages</span>
        <div className="bg-yellow-400 rounded-full p-1">
          <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      </button>
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-4 rounded-md font-medium mb-6 transition-colors duration-200 flex items-center justify-between">
        <span>Book an Immediate appointment </span>
        <div className="bg-yellow-400 rounded-full p-1">
          <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      </button>

      {/* Action buttons grid */}
      {/* <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-4 text-center cursor-pointer transition-colors duration-200">
          <div className="bg-white rounded-lg p-3 mb-3 mx-auto w-fit">
            <Download className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-sm font-medium">Download Report</div>
        </div>
        
        <div className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-4 text-center cursor-pointer transition-colors duration-200">
          <div className="bg-white rounded-lg p-3 mb-3 mx-auto w-fit">
            <Upload className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-sm font-medium">Upload Prescription</div>
        </div>
        
        <div className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-4 text-center cursor-pointer transition-colors duration-200">
          <div className="bg-white rounded-lg p-3 mb-3 mx-auto w-fit">
            <MapPin className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-sm font-medium">Find Nearest Centre</div>
        </div>
      </div> */}
    </div>
  );
}
