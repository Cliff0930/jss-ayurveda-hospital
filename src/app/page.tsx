import { Suspense } from 'react';

import { Achievements } from '@/components/home/Achievements';
import { DoctorsPreview } from '@/components/home/DoctorsPreview';
import { Effectiveness } from '@/components/home/Effectiveness';
import { Hero } from '@/components/home/Hero';
import { Philosophy } from '@/components/home/Philosophy';
import { Process } from '@/components/home/Process';
import { Programs } from '@/components/home/Programs';
import { Services } from '@/components/home/Services';
import { SpecialityShowcase } from '@/components/home/SpecialityShowcase';
import { Testimonials } from '@/components/home/Testimonials';
import { WhyUs } from '@/components/home/WhyUs';
import { CtaBand } from '@/components/shared/CtaBand';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Philosophy />
      <Achievements />
      <Services />
      <SpecialityShowcase />
      <Effectiveness />

      {/* Streamed so a slow WordPress response never blocks the page shell. */}
      <Suspense fallback={<div className="h-64 bg-sand-50" />}>
        <DoctorsPreview />
      </Suspense>

      <WhyUs />
      <Testimonials />
      <Programs />
      <Process />
      <CtaBand />
    </>
  );
}
