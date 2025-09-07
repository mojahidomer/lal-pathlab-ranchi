'use client';

import { Provider } from "react-redux";
import { store } from "../store/store";
import { useState } from 'react';
import Header from '@/components/Header';
import Carousel from '@/components/Carousel';
import BookingPanel from '@/components/BookingPanel';
import ServiceCards from '@/components/ServiceCards';
import PopularTestsCarousel from '@/components/PopularTestsCarousel';
import Footer from '@/components/Footer';
import { ContactDialog } from '@/ContactDialog';

export default function HomePage() {
  const [isDialogOpen, setIsDialogOpen] = useState(true);
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content area */}
          <div className="lg:col-span-2">
            {/* Carousel section */}
            <Carousel />


            {/* Service cards */}
            <ServiceCards />
          </div>

          {/* Booking panel */}
          <div className="lg:col-span-1">
            <BookingPanel setIsDialogOpen={setIsDialogOpen} />
           
          </div>
        </div>
        

        {/* Popular Tests Carousel - Full Width */}
        <PopularTestsCarousel  />

     
      </main>

      <Footer />
      <ContactDialog isOpen={isDialogOpen}
              onClose={() => setIsDialogOpen(false)} />
    </div>
  );
}