'use client';

import { useEffect, use } from 'react';
import { getNGOBySlug } from '@/data/ngos';
import { useGlobe } from '@/context/GlobeContext';
import { notFound, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, MapPin, Globe } from 'lucide-react';

export default function NGODetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const unwrappedParams = use(params);
  const slug = unwrappedParams.slug;
  const ngo = getNGOBySlug(slug);
  const { setSelectedLocation, setViewMode } = useGlobe();
  const router = useRouter();

  if (!ngo) {
    notFound();
  }

  // Sync with Globe on mount
  useEffect(() => {
    if (ngo) {
      setSelectedLocation(ngo);
      setViewMode('focus');
    }
  }, [ngo, setSelectedLocation, setViewMode]);

  return (
    <div className="min-h-screen bg-white">
      {/* Top Banner / Actions */}
      <div className="border-b bg-gray-50 px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link
            href="/ngos"
            className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to List
          </Link>
          <button
             onClick={() => {
                setViewMode('globe');
                setSelectedLocation(null);
                router.push('/');
             }}
             className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            <Globe className="mr-2 h-4 w-4" />
            View on Globe
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16">
          {/* Info Section */}
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {ngo.name}
            </h1>
            <div className="mt-4 flex items-center text-lg text-gray-500">
               <MapPin className="mr-2 h-5 w-5 text-gray-400" />
               {ngo.city}
            </div>

            <div className="mt-8 prose prose-blue text-gray-600">
               <p>
                 {ngo.name} is a dedicated organization working in {ngo.city} to provide 
                 essential support and community development. We bridge the gap between 
                 donors and those in need through transparent and impactful initiatives.
               </p>
               <h3>Our Mission</h3>
               <p>
                 To empower underprivileged communities through education, healthcare, 
                 and sustainable livelihood opportunities in the {ngo.city} region.
               </p>
               <h3>Contact Information</h3>
               <ul>
                 <li>Email: contact@{ngo.slug.replace(/-/g, '')}.org</li>
                 <li>Phone: +91 98765 43210</li>
               </ul>
            </div>

            <div className="mt-10">
              <button className="flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-8 py-3 text-base font-medium text-white hover:bg-blue-700 md:w-auto md:py-4 md:text-lg md:px-10">
                Donate Now
              </button>
            </div>
          </div>

          {/* Placeholder for Images or Stats */}
          <div className="mt-10 lg:mt-0">
             <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-lg bg-gray-100 shadow-lg">
                <div className="flex h-full w-full items-center justify-center bg-blue-50 text-blue-200">
                   <Globe className="h-32 w-32" />
                </div>
             </div>
             <p className="mt-4 text-center text-sm text-gray-500">
               Interact with the globe to see our exact location.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
