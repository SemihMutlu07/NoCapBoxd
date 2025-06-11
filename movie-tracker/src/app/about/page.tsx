import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-8 max-w-lg mx-auto">
        <div className="mb-8">
          <Image
            src="/tmdb-logo.svg"
            alt="The Movie Database (TMDB) Logo"
            width={200}
            height={48}
            className="mx-auto"
          />
        </div>
        <p className="text-zinc-400 text-lg">
          This product uses the TMDB API but is not endorsed or certified by TMDB.
        </p>
        <div className="mt-10">
            <Link href="/" className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors">
                Return to Home
            </Link>
        </div>
      </div>
    </div>
  );
} 