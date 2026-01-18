
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { BlogPost } from '@/app/blogs/blog-data';
import { motion } from 'framer-motion';

interface FeaturedCardProps {
  post: BlogPost;
}

export default function FeaturedCard({ post }: FeaturedCardProps) {
  return (
    <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 grid lg:grid-cols-2 gap-0"
    >
      {/* Image Side - Left */}
      <div className="relative h-[300px] lg:h-auto overflow-hidden">
        <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-6 left-6">
             <span className="px-4 py-2 text-sm font-bold bg-white/95 backdrop-blur-md text-gray-900 rounded-lg shadow-sm">
                {post.category}
             </span>
        </div>
      </div>

      {/* Content Side - Right */}
      <div className="p-8 lg:p-12 flex flex-col justify-center relative bg-white">
        
        <Link href={`/blogs/${post.slug}`}>
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-6 group-hover:text-amber-600 transition-colors leading-tight tracking-tight">
                {post.title}
            </h2>
        </Link>
        
        <p className="text-gray-600 mb-8 text-lg leading-relaxed line-clamp-3">
            {post.excerpt}
        </p>

        <div className="flex items-center justify-between mt-auto">
             <div className="flex items-center gap-3">
                 <div className="w-10 h-10 relative rounded-full overflow-hidden border border-gray-200">
                     <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
                 </div>
                 <div className="flex flex-col">
                    <span className="text-sm font-bold text-gray-900">{post.author.name}</span>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                         <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                         <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                         <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                    </div>
                 </div>
             </div>

            <Link 
                href={`/blogs/${post.slug}`} 
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#007EA7] text-white rounded-lg font-bold shadow-lg shadow-[#007EA7]/20 hover:bg-[#006A8E] hover:shadow-[#007EA7]/30 transition-all transform hover:-translate-y-0.5"
            >
                Read Full Article <ArrowRight className="w-5 h-5" />
            </Link>
        </div>
      </div>
    </motion.div>
  );
}
