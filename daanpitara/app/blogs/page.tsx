import React from 'react';
import Image from 'next/image';
import { BLOG_POSTS, CATEGORIES } from './blog-data';
import BlogCard from '@/components/blogs/BlogCard';
import FeaturedCard from '@/components/blogs/FeaturedCard';
import CategoryCard from '@/components/blogs/CategoryCard';
import TypewriterText from '@/components/animations/TypewriterText';
import { Search } from 'lucide-react';
import FadeIn from "@/components/animations/FadeIn";

export default function BlogsPage() {
  const featuredPost = BLOG_POSTS[0];
  const latestPosts = BLOG_POSTS.slice(1);

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-16 lg:py-20 max-w-7xl">
          <FadeIn>
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                {/* Left Content */}
                <div className="max-w-2xl">
                    <h1 className="text-4xl lg:text-[56px] font-bold text-gray-900 mb-6 leading-[1.1] tracking-tight">
                        Explore Stories, Insights, Impact & Ideas That <span className="text-[#007EA7]">Inspire Change</span>
                    </h1>
                    <p className="text-lg text-gray-500 mb-10 leading-relaxed font-normal">
                        Our blog brings together insights, stories, and research from across the social-impact ecosystem — helping nonprofits, CSR teams, and donors discover meaningful ideas that spark growth.
                    </p>
                    
                    <div className="relative max-w-lg shadow-sm">
                        <input 
                            type="text" 
                            placeholder="Search your organization or nearby" 
                            className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007EA7]/20 focus:border-[#007EA7] transition-all text-gray-900 placeholder-gray-400"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    </div>
                </div>

                {/* Right Image */}
                <div className="relative h-[380px] w-full rounded-2xl overflow-hidden shadow-2xl shadow-gray-200/50 hidden lg:block rotate-1 hover:rotate-0 transition-transform duration-700">
                     {/* Using the featured post image for the hero as requested "article related" */}
                    <Image 
                        src={featuredPost.image} 
                        alt="Hero Image" 
                        fill 
                        className="object-cover"
                    />
                </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="container mx-auto px-4 py-20 max-w-7xl space-y-28">
        
        {/* Featured Article */}
        <section>
            <div className="flex items-center gap-4 mb-10">
                <h2 className="text-[32px] font-bold text-gray-900">Featured Article</h2>
            </div>
            <FeaturedCard post={featuredPost} />
        </section>

        {/* Latest Articles */}
        <section className="relative">
            <div className="flex items-center justify-between mb-8 border-b-2 border-dotted border-[#007EA7]/30 pb-2">
                <h2 className="text-[32px] font-bold text-gray-900 relative">
                    Latest Article
                    <span className="absolute -bottom-[10px] left-0 w-full h-[3px] bg-gradient-to-r from-[#007EA7] to-transparent"></span>
                </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {latestPosts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                ))}
            </div>
        </section>

        {/* Categories */}
        <section>
             <h2 className="text-[32px] font-bold text-gray-900 mb-8">Explore by Category</h2>
            
            <div className="bg-gray-100 rounded-[32px] p-10 lg:p-14">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {CATEGORIES.map((category) => (
                        <CategoryCard key={category.id} {...category} />
                    ))}
                </div>
            </div>
        </section>

      </div>
    </div>
  );
}

