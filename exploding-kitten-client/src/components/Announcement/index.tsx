import { useAtomValue } from 'jotai';
import { announcementAtom } from 'atoms/connection';

export default function Announcement() {
  const announcement = useAtomValue(announcementAtom);

  return (
    <div className="rounded-lg bg-black bg-opacity-70 p- text-white h-40 w-80 overflow-auto px-6 py-4 text-xs">
      {announcement.map((item, index) => (
        <div key={`${index + 1}`}>{item}</div>
      ))}
    </div>
  );
}
