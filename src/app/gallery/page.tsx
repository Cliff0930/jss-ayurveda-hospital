import type { Metadata } from 'next';

import { GalleryGrid } from '@/components/gallery/GalleryGrid';
import { CtaBand } from '@/components/shared/CtaBand';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { media } from '@/lib/media';
import { getGallery } from '@/lib/wp/queries';

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Life at JSS Ayurveda Hospital, Mysuru — our campus and infrastructure, herbal garden, NABH accreditation, free medical camps and events.',
};

export default async function GalleryPage() {
  const groups = await getGallery();
  const total = groups.reduce((sum, group) => sum + group.images.length, 0);

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Life at JSS Ayurveda Hospital"
        crumbs={[{ label: 'Gallery' }]}
        image={media.campusWide}
        intro={`Our campus, gardens, events and community outreach — ${total} photographs from the hospital.`}
      />

      <Section tone="cream">
        <div className="container-page">
          <GalleryGrid groups={groups} />
        </div>
      </Section>

      <CtaBand
        title="Come and see it for yourself"
        intro="Visitors are welcome on our campus. Call ahead and we will arrange a walk-through of the therapy wing, the herbal garden and the wards."
        primary={{ label: 'Plan a visit', href: '/contact' }}
        secondary={{ label: 'Facilities & rooms', href: '/facilities' }}
      />
    </>
  );
}
