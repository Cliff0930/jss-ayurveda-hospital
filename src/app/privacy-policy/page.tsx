import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { CtaBand } from '@/components/shared/CtaBand';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { formatDate } from '@/lib/utils';
import { getLegalPage, WP_SLUGS } from '@/lib/wp/queries';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How JSS Ayurveda Hospital, Mysuru collects, uses and protects your personal information.',
};

export default async function PrivacyPolicyPage() {
  const page = await getLegalPage(WP_SLUGS.privacy);
  if (!page) notFound();

  const updated = formatDate(page.updatedAt);

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={page.title}
        crumbs={[{ label: 'Privacy Policy' }]}
        intro={updated ? `Last updated ${updated}` : undefined}
      />

      <Section tone="cream">
        <div className="container-page">
          <div className="mx-auto max-w-3xl rounded-[2rem] border border-sand-200 bg-white p-7 md:p-12">
            {/* Content authored in the hospital's own WordPress install. */}
            <div className="prose-jss" dangerouslySetInnerHTML={{ __html: page.html }} />
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
