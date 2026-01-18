
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BLOG_POSTS } from '../blog-data';
import { Calendar, Clock, ArrowLeft, Share2, Bookmark } from 'lucide-react';
import FadeIn from "@/components/animations/FadeIn";
import BlogCard from '@/components/blogs/BlogCard';

interface BlogPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}


export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Find related posts (exclude current one)
  const relatedPosts = BLOG_POSTS.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-white pb-20">
      
      {/* Hero Banner - Full Width */}
      <div className="relative w-full h-[70vh] min-h-[500px] flex items-end">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
             <Image 
                src={post.image} 
                alt={post.title} 
                fill 
                className="object-cover"
                priority
             />
             {/* Stronger Gradient for text readability */}
             <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
        </div>

        {/* Hero Content Overlay */}
        <div className="container mx-auto px-4 pb-16 relative z-10 max-w-5xl">
             <FadeIn>
                <div className="flex flex-wrap items-center gap-4 mb-8">
                    <Link href="/blogs" className="group flex items-center gap-2 text-white hover:text-white transition-all text-sm font-semibold bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Blog
                    </Link>
                    <span className="px-4 py-2 text-sm font-bold text-blue-100 bg-blue-500/20 border border-blue-400/30 rounded-full backdrop-blur-md">
                        {post.category}
                    </span>
                    <span className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-rose-100 bg-rose-500/20 border border-rose-400/30 rounded-full backdrop-blur-md">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                        </span>
                        Trending
                    </span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-8 leading-[1.1] tracking-tight drop-shadow-2xl">
                    {post.title}
                </h1>

                <div className="flex flex-wrap items-center gap-8 text-white/90 text-sm font-medium">
                    <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/30 shadow-lg">
                            <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-white font-bold text-base leading-tight mb-0.5">{post.author.name}</span>
                            <span className="text-white/70 text-xs uppercase tracking-wider font-semibold">Author</span>
                        </div>
                    </div>
                    <div className="w-px h-10 bg-white/20 hidden sm:block"></div>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2.5">
                            <Calendar className="w-5 h-5 text-white/80" /> 
                            <span className="text-base">{post.date}</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                            <Clock className="w-5 h-5 text-white/80" /> 
                            <span className="text-base">{post.readTime}</span>
                        </div>
                    </div>
                </div>
             </FadeIn>
        </div>
      </div>

      {/* Article Content */}
      <article className="container mx-auto px-4 py-16 max-w-3xl">
        <FadeIn delay={0.2}>
            {/* Excerpt */}
            <p className="text-2xl text-gray-600 mb-12 leading-relaxed font-light border-b border-gray-100 pb-12">
                {post.excerpt}
            </p>

            {/* Content Body */}
            <div className="prose prose-lg prose-amber max-w-none text-gray-800 leading-loose">
                 <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
            
            {/* Quote / Highlight */}
            <div className="my-16 p-10 bg-amber-50 rounded-2xl border border-amber-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-amber-500"></div>
                <p className="text-2xl font-serif italic text-gray-800 relative z-10">
                    &quot;The true measure of any society can be found in how it treats its most vulnerable members.&quot;
                </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-16 pt-8 border-t border-gray-100">
                {post.tags.map(tag => (
                    <span key={tag} className="px-4 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors cursor-default">
                        #{tag}
                    </span>
                ))}
            </div>

            {/* Author Card (Compact) */}
            <div className="bg-gray-50 rounded-2xl p-8 flex items-center gap-6 border border-gray-100">
                <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-sm">
                    <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Written by {post.author.name}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        {post.author.role} passionate about social impact and technology. Sharing insights to help NGOs grow.
                    </p>
                </div>
            </div>
        </FadeIn>
      </article>

      {/* Related Articles */}
      <div className="bg-gray-50 py-20 border-t border-gray-200 mt-12">
        <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex items-center justify-between mb-12 max-w-4xl mx-auto xl:max-w-none">
                <div className="flex items-center gap-4">
                    <div className="w-1.5 h-8 bg-amber-500 rounded-full"></div>
                    <h3 className="text-2xl font-bold text-gray-900">Related Articles</h3>
                </div>
                <Link href="/blogs" className="text-amber-600 font-semibold hover:text-amber-700">View All</Link>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto xl:max-w-none">
                 {relatedPosts.map(post => (
                     <BlogCard key={post.id} post={post} />
                 ))}
            </div>
        </div>
      </div>
    </div>
  );
}
