import type { Metadata } from 'next';

import { GalleryGrid } from '@/components/gallery/GalleryGrid';
import { CtaBand } from '@/components/shared/CtaBand';
import { PageHero } from '@/components/ui/PageHero';
import { hiddenGalleryImages } from '@/content/misc';
import { Section } from '@/components/ui/Section';
import { photo } from '@/lib/media';
import { getGallery } from '@/lib/wp/queries';

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Life at JSS Ayurveda Hospital, Mysuru — our campus and infrastructure, green surroundings and herbal garden.',
};

export default async function GalleryPage() {
  const hidden = new Set(hiddenGalleryImages);
  const groups = (await getGallery())
    .map((group) => ({
      ...group,
      images: group.images.filter((image) => !hidden.has(image.src.split('/').pop() ?? '')),
    }))
    .filter((group) => group.images.length > 0);
  const total = groups.reduce((sum, group) => sum + group.images.length, 0);

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Life at JSS Ayurveda Hospital"
        crumbs={[{ label: 'Gallery' }]}
        image={photo.galleryBanner}
        intro={`Our campus, wards and gardens — ${total} photographs from the hospital.`}
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
