import Image from 'next/image';

interface Props {
  item: {
    title: string;
    url: string;
    summary: string;
    image_url: string | null;
    source: string;
  };
}

export default function Card({ item }: Props) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col"
    >
      {item.image_url && (
        <div className="relative w-full h-40 mb-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.image_url}
            alt={item.title}
            className="object-cover w-full h-full rounded-lg"
          />
        </div>
      )}
      <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
      <p className="text-sm flex-1">{item.summary}</p>
      <span className="mt-3 text-xs opacity-70">{item.source}</span>
    </a>
  );
}