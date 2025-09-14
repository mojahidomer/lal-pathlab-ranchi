'use client';

import { useState } from 'react';
import Head from 'next/head'; // SEO meta tags
import Header from '@/components/Header';
import Carousel from '@/components/Carousel';
import BookingPanel from '@/components/BookingPanel';
import ServiceCards from '@/components/ServiceCards';
import PopularTestsCarousel from '@/components/PopularTestsCarousel';
import Footer from '@/components/Footer';
import { ContactDialog } from '@/components/ContactDialog';

export default function HomePage() {
  const [isDialogOpen, setIsDialogOpen] = useState(true);

  return (
    <>
      {/* ✅ SEO META TAGS */}
      <Head>
        <title>Book Blood Tests Online Ranchi | Affordable Health Checkups Ranchi</title>
        <meta
          name="description"
          content="Dr Lal path labs Ranchi  blood tests online with quick home sample collection. Affordable, accurate, and trusted health checkup packages near you."
        />
        <meta
          name="keywords"
          content="dr lala path labs ranchi, blood test Ranchi, health checkup Ranchi, book lab test online Ranchi, pathology, diagnostic center"
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Dr Lalpathlabs Ranchi Book Blood Tests Online" />
        <meta
          property="og:description"
          content="Affordable blood tests and health checkups with home collection service."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.lalpathlabsranchi.com" />
        <meta property="og:image" content="https://yourdomain.com/preview.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      {/* ✅ Page Structure */}
      <div className="min-h-screen bg-gray-50">
        <Header />

        <main className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2">
              <section aria-label="Promotions">
                <h1 className="sr-only">Book Blood Tests Online</h1>
                <Carousel />
              </section>

              <ContactDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
              />

              <section aria-label="Services">
                <h2 className="text-2xl font-semibold mb-4">
                  Our Health Checkup Services
                </h2>
                <ServiceCards />
              </section>
            </div>

            {/* Booking */}
            <aside className="lg:col-span-1" aria-label="Booking Panel">
              <BookingPanel setIsDialogOpen={setIsDialogOpen} />
            </aside>
          </div>

          {/* Popular Tests */}
          <section
            aria-label="Popular Blood Tests"
            className="mt-12"
          >
            <h2 className="text-2xl font-semibold mb-4">
              Popular Tests
            </h2>
            <PopularTestsCarousel />
          </section>
        </main>

        <Footer />
      </div>

      {/* ✅ Structured Data (JSON-LD for Google Rich Results) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalBusiness",
            name: "Dr Lal PathLabs Ranchi",
            url: "https://www.lalpathlabsranchi.com/",
            logo: "https://yourdomain.com/logo.png",
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+91-8051064146",
              contactType: "customer service",
            },
            sameAs: ["https://facebook.com/yourlab", "https://instagram.com/yourlab"],
          }),
        }}
      />
    </>
  );
}
