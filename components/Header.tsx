'use client';
import Image from "next/image";
import { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ChevronDown, 
  ShoppingCart, 
  Menu, 
  X,
  User
} from 'lucide-react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      {/* Top header with contact info */}
      <div className="bg-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-2 text-sm">
            {/* <div className="text-orange-500 font-bold text-lg">Dr Lal PathLabs Ranchi</div> */}
            <div className="flex items-center">
            <Image
              src="/lal2.png" // place your logo in the public/ folder
              alt="Dr Lal PathLabs Logo"
              width={150}     // adjust width as per your design
              height={40}
              priority
            />
          </div>
            <div className="hidden md:flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-yellow-400" />
                <span>+91-11-4567-8900</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-yellow-400" />
                <span>support@drlalpathlabs.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
             className="md:hidden p-2 rounded-md hover:bg-blue-700 text-white"
            >
             {isMobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
            </button>

            {/* Logo - visible on mobile */}
            <div className="md:hidden text-orange-500 font-bold text-xl">
              Dr Lal PathLabs
            </div>

            {/* Navigation items - left aligned */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600 font-semibold text-xs">BOOK A TEST</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-semibold text-xs">DOCTORS</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-semibold text-xs">BUSINESS PARTNERSHIP</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-semibold text-xs">ABOUT US</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-semibold text-xs">CAREER</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-semibold text-xs">INVESTORS</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-semibold text-xs">BLOGS</a>
            </nav>

            {/* Right side controls */}
            <div className="flex items-center gap-4">
              {/* Location selector */}
              <button className="hidden md:flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-md transition-colors duration-200">
                <MapPin className="w-4 h-4" />
                <span>Ranchi</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {/* User account */}
              <button className="hidden md:flex items-center gap-2 text-gray-700 hover:text-blue-600">
                <User className="w-4 h-4" />
                <span>Welcome Guest User</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {/* Shopping cart */}
              <button className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
                <ShoppingCart className="w-5 h-5" />
                <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
              </button>
            </div>
          </div>

          {/* Mobile navigation menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t bg-blue-800 py-4 shadow-lg">
              <nav className="flex flex-col space-y-4">
                <a href="#" className="text-white hover:text-yellow-400 hover:bg-blue-700 font-semibold text-sm px-4 py-3 rounded-md transition-colors">BOOK A TEST</a>
                <a href="#" className="text-white hover:text-yellow-400 hover:bg-blue-700 font-semibold text-sm px-4 py-3 rounded-md transition-colors">DOCTORS</a>
                <a href="#" className="text-white hover:text-yellow-400 hover:bg-blue-700 font-semibold text-sm px-4 py-3 rounded-md transition-colors">BUSINESS PARTNERSHIP</a>
                <a href="#" className="text-white hover:text-yellow-400 hover:bg-blue-700 font-semibold text-sm px-4 py-3 rounded-md transition-colors">ABOUT US</a>
                <a href="#" className="text-white hover:text-yellow-400 hover:bg-blue-700 font-semibold text-sm px-4 py-3 rounded-md transition-colors">CAREER</a>
                <a href="#" className="text-white hover:text-yellow-400 hover:bg-blue-700 font-semibold text-sm px-4 py-3 rounded-md transition-colors">INVESTORS</a>
                <a href="#" className="text-white hover:text-yellow-400 hover:bg-blue-700 font-semibold text-sm px-4 py-3 rounded-md transition-colors">BLOGS</a>
                
                <div className="pt-4 border-t border-blue-600 mx-4">
                  <button className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-md w-full justify-center mb-4">
                    <MapPin className="w-4 h-4" />
                    <span>Ranchi</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  
                  <button className="flex items-center gap-2 text-white hover:text-yellow-400 hover:bg-blue-700 justify-center w-full px-4 py-2 rounded-md transition-colors">
                    <User className="w-4 h-4" />
                    <span>Welcome Guest User</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}