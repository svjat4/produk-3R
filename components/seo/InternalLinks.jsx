import Link from 'next/link';
import { programmaticData } from '@/data/programmatic';

export default function InternalLinks() {
  // Ambil 6 link acak atau statis
  const links = programmaticData.slice(0, 6);

  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Pencarian Terkait:</h3>
      <div className="flex flex-wrap gap-2">
        {links.map((link) => (
          <Link 
            key={link.slug} 
            href={`/p/${link.slug}`}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm transition-colors"
          >
            {link.keyword}
          </Link>
        ))}
      </div>
    </div>
  );
}