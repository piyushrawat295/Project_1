
import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BLOG_POSTS, CATEGORIES } from '../../blog-data';
import BlogCard from '@/components/blogs/BlogCard';
import { ArrowLeft, Search } from 'lucide-react';
import FadeIn from "@/components/animations/FadeIn";

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    slug: cat.id,
  }));
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.id === slug);

  if (!category) {
    notFound();
  }

  // Filter posts by categoryId (matches slug)
  const posts = BLOG_POSTS.filter((post) => post.categoryId === slug);

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 pt-8 pb-12 max-w-7xl">
            {/* Row 1: Back Link */}
            <div className="mb-6">
                <Link href="/blogs" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Blog Dashboard
                </Link>
            </div>

            {/* Row 2: Title & Search */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-2">
                <h1 className="text-4xl font-bold text-gray-900">{category.name}</h1>
                
                <div className="relative w-full md:max-w-xs">
                    <input 
                    type="text" 
                    placeholder="Search articles..." 
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 text-sm transition-all"
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>
            </div>

            {/* Row 3: Count */}
            <p className="text-gray-500 text-sm">
                {posts.length} articles available
            </p>
        </div>
      </div>

      {/* Article Grid Section - Grey Background */}
      <div className="bg-gray-100/50 min-h-[calc(100vh-250px)]">
         <div className="container mx-auto px-4 py-12 max-w-7xl">
            {posts.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post, index) => (
                        <FadeIn key={post.id} delay={index * 0.1}>
                            <BlogCard post={post} />
                        </FadeIn>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-200 rounded-full mb-4">
                        <Search className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">No articles found</h3>
                    <p className="text-gray-500">We couldn&apos;t find any articles in this category yet.</p>
                </div>
            )}
         </div>
      </div>
    </div>
  );
}
