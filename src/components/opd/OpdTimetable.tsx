import { opdRoster, opdSundayNote, opdWeekdays } from '@/content/clinical';
import { cn } from '@/lib/utils';

const dayNames: Record<(typeof opdWeekdays)[number], string> = {
  Mon: 'Monday',
  Tue: 'Tuesday',
  Wed: 'Wednesday',
  Thu: 'Thursday',
  Fri: 'Friday',
  Sat: 'Saturday',
};

/** Fallback when a roster id is not on the Doctors page: `dr-beena-m-d` → "Dr Beena M D". */
const nameFromId = (id: string) =>
  id
    .split('-')
    .map((part) => (part.length <= 2 && part !== 'dr' ? part.toUpperCase() : part[0].toUpperCase() + part.slice(1)))
    .join(' ');

/**
 * Room-wise consultant roster, Monday to Saturday. Names come from the Doctors
 * page (WordPress) so the spelling always matches the consultant's profile.
 */
export function OpdTimetable({ names, className }: { names: Map<string, string>; className?: string }) {
  const nameOf = (id: string) => names.get(id) ?? nameFromId(id);

  return (
    <div className={className}>
      <div className="overflow-x-auto rounded-card border border-sand-200 bg-white">
        <table className="w-full min-w-[60rem] border-collapse text-left text-[0.8125rem] leading-snug">
          <caption className="sr-only">Consultant OPD days by room, Monday to Saturday</caption>
          <thead>
            <tr className="bg-jade-900 text-sand-50">
              <th scope="col" className="sticky left-0 z-10 bg-jade-900 px-4 py-3.5 font-semibold">
                Room &amp; department
              </th>
              {opdWeekdays.map((day) => (
                <th key={day} scope="col" className="px-3 py-3.5 font-semibold">
                  <abbr title={dayNames[day]} className="no-underline">
                    {day}
                  </abbr>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {opdRoster.map((room, index) => {
              const tone = index % 2 === 0 ? 'bg-white' : 'bg-sand-50';
              return (
                <tr key={room.room} className={cn('border-t border-sand-200 align-top', tone)}>
                  <th scope="row" className={cn('sticky left-0 z-10 w-56 px-4 py-3 font-normal', tone)}>
                    <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-turmeric-700">
                      Room {room.room}
                    </span>
                    <span className="mt-0.5 block font-semibold text-jade-900">{room.name}</span>
                  </th>

                  {room.note ? (
                    <td colSpan={opdWeekdays.length} className="px-3 py-3 italic text-ink-500">
                      {room.note}
                    </td>
                  ) : (
                    opdWeekdays.map((day) => {
                      const ids = room.days?.[day] ?? [];
                      return (
                        <td key={day} className="px-3 py-3 text-ink-700">
                          {ids.length > 0 ? (
                            ids.map((id) => (
                              <span key={id} className="block [&+&]:mt-1">
                                {nameOf(id)}
                              </span>
                            ))
                          ) : (
                            <span aria-label="No consultant listed" className="text-sand-400">
                              —
                            </span>
                          )}
                        </td>
                      );
                    })
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-[0.8125rem] text-ink-500">
        {opdSundayNote}.<span className="lg:hidden"> Scroll the table sideways to see every day.</span>
      </p>
    </div>
  );
}
