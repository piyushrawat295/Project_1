
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { BlogPost } from '@/app/blogs/blog-data';
import { motion } from 'framer-motion';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#007EA7]/30 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full hover:-translate-y-1"
    >
      {/* Image Container */}
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 text-xs font-semibold bg-white/95 backdrop-blur-sm text-gray-900 rounded-lg shadow-sm border border-gray-100">
            {post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <Link href={`/blogs/${post.slug}`} className="block mb-3">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#007EA7] transition-colors line-clamp-2 leading-snug">
            {post.title}
          </h3>
        </Link>
        
        <p className="text-gray-600 mb-6 text-sm line-clamp-2 leading-relaxed flex-grow">
          {post.excerpt}
        </p>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2.5">
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-200">
                    <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
                </div>
                <div className="flex flex-col">
                    <span className="text-xs font-semibold text-gray-900">{post.author.name}</span>
                    <div className="flex items-center gap-2 text-[10px] text-gray-500">
                        <span>{post.date}</span>
                        <span className="w-0.5 h-0.5 rounded-full bg-gray-300"></span>
                        <span>{post.readTime}</span>
                    </div>
                </div>
            </div>
            
            <Link 
                href={`/blogs/${post.slug}`} 
                className="flex items-center gap-1 text-sm font-semibold text-[#007EA7] group-hover:gap-2 transition-all"
            >
                Read <ArrowRight className="w-4 h-4" />
            </Link>
        </div>
      </div>
    </motion.div>
  );
}
