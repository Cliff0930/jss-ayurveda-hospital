import type { Metadata } from 'next';

import { AttendanceExplorer, type MonthSummary } from '@/components/data/AttendanceExplorer';
import { CtaBand } from '@/components/shared/CtaBand';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { formatDate } from '@/lib/utils';
import { getAttendance } from '@/lib/wp/queries';

export const metadata: Metadata = {
  title: 'Attendance Analysis',
  description:
    'Monthly staff attendance records for JSS Ayurveda Hospital, Mysuru — days present, working days, weekly off, leave and loss of pay, published for every member of staff.',
};

export default async function AttendanceAnalysisPage({
  searchParams,
}: {
  searchParams: Promise<{ month?: string }>;
}) {
  const { month } = await searchParams;
  const data = await getAttendance();

  if (data.months.length === 0) {
    return (
      <>
        <PageHero
          eyebrow="Transparency"
          title="Attendance Analysis"
          crumbs={[{ label: 'Attendance Analysis' }]}
          imageSlot="transparency-band"
        />
        <Section tone="cream">
          <div className="container-page">
            <div className="rounded-card border border-dashed border-sand-300 bg-white/60 px-6 py-20 text-center">
              <p className="font-display text-xl text-jade-900">
                Attendance records are not available right now
              </p>
              <p className="mt-2 text-[0.9375rem] text-ink-500">
                We could not reach the hospital records service. Please try again shortly.
              </p>
            </div>
          </div>
        </Section>
        <CtaBand />
      </>
    );
  }

  const selected = data.months.find((entry) => entry.id === month) ?? data.months[0];

  const summaries: MonthSummary[] = data.months.map((entry) => ({
    id: entry.id,
    label: entry.label,
    headcount: entry.headcount,
    averagePresent: entry.averagePresent,
    totalLeave: entry.totalLeave,
  }));

  const selectedSummary = summaries.find((entry) => entry.id === selected.id) ?? summaries[0];
  const updated = formatDate(data.updatedAt);

  return (
    <>
      <PageHero
        eyebrow="Transparency"
        title="Attendance Analysis"
        crumbs={[{ label: 'Attendance Analysis' }]}
        imageSlot="transparency-band"
        intro={`Monthly staff attendance records of JSS Ayurveda Hospital — ${data.months.length} reporting periods, published in full for every member of staff.`}
      />

      <Section tone="cream">
        <div className="container-page">
          <Reveal>
            <div className="mb-10 rounded-card border border-jade-100 bg-jade-50 p-6 md:p-8">
              <h2 className="text-lg">About these records</h2>
              <p className="mt-2 max-w-3xl text-[0.9375rem] leading-relaxed text-ink-500">
                Attendance is recorded against each employee for every reporting month. Columns show
                days present, additional working days, weekly offs, approved leave
                (CL&nbsp;/&nbsp;EL&nbsp;/&nbsp;C.Off&nbsp;/&nbsp;HO&nbsp;/&nbsp;GH&nbsp;/&nbsp;ML&nbsp;/&nbsp;OOD)
                and loss of pay. Select a month below, then search or filter by designation.
                {updated ? <span className="mt-1 block text-sand-600">Last updated {updated}.</span> : null}
              </p>
            </div>
          </Reveal>

          <AttendanceExplorer
            months={summaries}
            selected={selectedSummary}
            entries={selected.entries}
            designations={selected.designations}
          />
        </div>
      </Section>

      <CtaBand
        title="Open records, openly published"
        intro="Staff attendance, bio-medical waste disposal and our full staff register are all published here — the same records we maintain internally."
        primary={{ label: 'Bio-medical waste data', href: '/waste-data' }}
        secondary={{ label: 'Staff directory', href: '/staff' }}
      />
    </>
  );
}
