'use client';

import { Facebook, Twitter, Linkedin, Youtube, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full">
      {/* Orange section with links */}
      <div className="bg-orange-400 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {/* PATIENTS */}
            <div>
              <h3 className="font-bold text-gray-800 mb-4 text-sm">PATIENTS</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li><a href="#" className="hover:text-gray-900">Book a Test</a></li>
                <li><a href="#" className="hover:text-gray-900">Nearest Center</a></li>
                <li><a href="#" className="hover:text-gray-900">Download Report</a></li>
                <li><a href="#" className="hover:text-gray-900">Download App</a></li>
                <li><a href="#" className="hover:text-gray-900">Promotions & Discounts</a></li>
                <li><a href="#" className="hover:text-gray-900">Special Programs</a></li>
              </ul>
            </div>

            {/* DOCTORS */}
            <div>
              <h3 className="font-bold text-gray-800 mb-4 text-sm">DOCTORS</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li><a href="#" className="hover:text-gray-900">Test Menu</a></li>
                <li><a href="#" className="hover:text-gray-900">Our Labs</a></li>
                <li><a href="#" className="hover:text-gray-900">Events</a></li>
                <li><a href="#" className="hover:text-gray-900">Quality</a></li>
                <li><a href="#" className="hover:text-gray-900">Resource Center</a></li>
                <li><a href="#" className="hover:text-gray-900">Our Departments</a></li>
                <li><a href="#" className="hover:text-gray-900">Test Clinical Forms</a></li>
              </ul>
            </div>

            {/* BUSINESS PARTNERSHIP */}
            <div>
              <h3 className="font-bold text-gray-800 mb-4 text-sm">BUSINESS PARTNERSHIP</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li><a href="#" className="hover:text-gray-900">Partner With Us</a></li>
                <li><a href="#" className="hover:text-gray-900">Become a Vendor</a></li>
                <li><a href="#" className="hover:text-gray-900">Corporate Tie-up</a></li>
                <li><a href="#" className="hover:text-gray-900">International Partnership</a></li>
                <li><a href="#" className="hover:text-gray-900">Corporate Covid Testing</a></li>
              </ul>
            </div>

            {/* ABOUT US */}
            <div>
              <h3 className="font-bold text-gray-800 mb-4 text-sm">ABOUT US</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li><a href="#" className="hover:text-gray-900">Our Journey</a></li>
                <li><a href="#" className="hover:text-gray-900">Vision, Mission & Values</a></li>
                <li><a href="#" className="hover:text-gray-900">Our Team</a></li>
                <li><a href="#" className="hover:text-gray-900">Our Network</a></li>
                <li><a href="#" className="hover:text-gray-900">Logistics Strength</a></li>
                <li><a href="#" className="hover:text-gray-900">CSR</a></li>
                <li><a href="#" className="hover:text-gray-900">Career</a></li>
              </ul>
            </div>

            {/* INVESTORS */}
            <div>
              <h3 className="font-bold text-gray-800 mb-4 text-sm">INVESTORS</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li><a href="#" className="hover:text-gray-900">Financials</a></li>
                <li><a href="#" className="hover:text-gray-900">Investors Information</a></li>
                <li><a href="#" className="hover:text-gray-900">Corporate Governance</a></li>
                <li><a href="#" className="hover:text-gray-900">Smart ODR</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Blue section with copyright and social media */}
      <div className="bg-blue-800 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* Copyright and links */}
            <div className="text-white text-sm">
              <div className="mb-2">
                <span>© 2025 Dr Lal PathLabs All Rights Reserved. </span>
                <a href="#" className="hover:underline">Blog</a>
                <span> | </span>
                <a href="#" className="hover:underline">CSR</a>
                <span> | </span>
                <a href="#" className="hover:underline">Terms of Use</a>
                <span> | </span>
                <a href="#" className="hover:underline">Privacy Policy</a>
                <span> | </span>
                <a href="#" className="hover:underline">Cookie Policy</a>
                <span> | </span>
                <a href="#" className="hover:underline">Sitemap</a>
                <span> ----V1.4.14</span>
              </div>
              <div className="text-xs text-blue-200">
                Only Pathology reports available online. For X-Ray, Ultrasound, ECG, TMT, Echo, PFT, Uroflowmetry reports please visit the concerned center where test has been conducted.
              </div>
            </div>

            {/* Social media */}
            <div className="flex items-center gap-4">
              <span className="text-white text-sm">Follow us on:</span>
              <div className="flex gap-2">
                <a href="#" className="bg-orange-400 hover:bg-orange-500 p-2 rounded-full transition-colors duration-200">
                  <Facebook className="w-4 h-4 text-white" />
                </a>
                <a href="#" className="bg-orange-400 hover:bg-orange-500 p-2 rounded-full transition-colors duration-200">
                  <Twitter className="w-4 h-4 text-white" />
                </a>
                <a href="#" className="bg-orange-400 hover:bg-orange-500 p-2 rounded-full transition-colors duration-200">
                  <Linkedin className="w-4 h-4 text-white" />
                </a>
                <a href="#" className="bg-orange-400 hover:bg-orange-500 p-2 rounded-full transition-colors duration-200">
                  <Youtube className="w-4 h-4 text-white" />
                </a>
                <a href="#" className="bg-orange-400 hover:bg-orange-500 p-2 rounded-full transition-colors duration-200">
                  <Instagram className="w-4 h-4 text-white" />
                </a>
              </div>
            </div>
          </div>

          {/* Help section */}
          <div className="mt-6 pt-4 border-t border-blue-700">
            <div className="flex items-center justify-center gap-2 text-white">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <span className="text-blue-800 text-xs font-bold">📞</span>
                </div>
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <span className="text-blue-800 text-xs font-bold">💬</span>
                </div>
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <span className="text-blue-800 text-xs font-bold">📧</span>
                </div>
              </div>
              <span className="text-sm">
                <strong>Need Help with Home Collection Booking ? Get a Call Back within 15 Minutes from our Health Advisor</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}