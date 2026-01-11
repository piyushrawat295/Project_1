// import Navbar from "@/components/layout/Navbar";
// import Footer from "@/components/layout/Footer";

import Hero from "@/components/landing/Hero";
import Services from "@/components/landing/Services";
import Story from "@/components/landing/Story";
import CaseStudies from "@/components/landing/CaseStudies";
import Blogs from "@/components/landing/Blogs";
import Testimonials from "@/components/landing/Testimonials";
import FadeIn from "@/components/animations/FadeIn";

export default function HomePage() {
  return (
    <>
      <FadeIn><Hero /></FadeIn>
      <FadeIn delay={0.2}><Services /></FadeIn>
      <FadeIn delay={0.2}><Story /></FadeIn>
      <FadeIn delay={0.2}><CaseStudies /></FadeIn>
      <FadeIn delay={0.2}><Blogs /></FadeIn>
      <FadeIn delay={0.2}><Testimonials /></FadeIn>
      {/* <Footer /> */}
    </>
  );
}
