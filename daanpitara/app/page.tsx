import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import Hero from "@/components/landing/Hero";
import Services from "@/components/landing/Services";
import Story from "@/components/landing/Story";
import CaseStudies from "@/components/landing/CaseStudies";
import Blogs from "@/components/landing/Blogs";
import Testimonials from "@/components/landing/Testimonials";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Story />
      <CaseStudies />
      <Blogs />
      <Testimonials />
      <Footer />
    </>
  );
}
