
'use client';

import React from 'react';
import { HandHeart, Laptop, Users, Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface CategoryCardProps {
  id: string;
  name: string;
  icon: string;
  color: string;
  count: number;
}

const IconMap: { [key: string]: React.ElementType } = {
  'HandHeart': HandHeart,
  'Laptop': Laptop,
  'Users': Users,
  'Star': Star,
};

export default function CategoryCard({ id, name, icon, color, count }: CategoryCardProps) {
  const Icon = (IconMap[icon] || Star) as any;
  
  return (
    <Link href={`/blogs/category/${id}`} className="block h-full group"> 
       <div className="bg-white p-6 rounded-2xl h-full flex flex-col items-start hover:-translate-y-1 transition-all duration-300">
         <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${color}`}>
            <Icon className="w-7 h-7" />
         </div>
         
         <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#007EA7] transition-colors">
            {name}
         </h3>
         
         <p className="text-gray-500 text-sm mb-4 line-clamp-2">
             Strategies to build trust, retain donors, and maximize fundraising
         </p>
         
         <div className="mt-auto text-[#007EA7] text-sm font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
            Explore <ArrowRight className="w-4 h-4" />
         </div>
       </div>
    </Link>
  );
}
