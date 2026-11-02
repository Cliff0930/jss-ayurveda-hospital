import { Suspense } from 'react';

import { Achievements } from '@/components/home/Achievements';
import { DoctorsPreview } from '@/components/home/DoctorsPreview';
import { Hero } from '@/components/home/Hero';
import { Philosophy } from '@/components/home/Philosophy';
import { Process } from '@/components/home/Process';
import { Programs } from '@/components/home/Programs';
import { Services } from '@/components/home/Services';
import { SpecialityShowcase } from '@/components/home/SpecialityShowcase';
import { Testimonials } from '@/components/home/Testimonials';
import { VideoStories } from '@/components/home/VideoStories';
import { LocationMap } from '@/components/home/LocationMap';
import { TrustBand } from '@/components/home/TrustBand';
import { WhyUs } from '@/components/home/WhyUs';
import { ConsultOptions } from '@/components/shared/ConsultOptions';
import { CtaBand } from '@/components/shared/CtaBand';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBand />
      <Philosophy />
      <Achievements />
      <Services />
      <SpecialityShowcase />

      {/* Streamed so a slow WordPress response never blocks the page shell. */}
      <Suspense fallback={<div className="h-64 bg-sand-50" />}>
        <DoctorsPreview />
      </Suspense>

      <WhyUs />
      <Testimonials />
      <VideoStories />
      <Programs />
      <ConsultOptions />
      <Process />
      <LocationMap />
      <CtaBand />
    </>
  );
}
