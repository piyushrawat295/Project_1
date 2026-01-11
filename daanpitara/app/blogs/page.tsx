import FadeIn from "@/components/animations/FadeIn";
import TypewriterText from "@/components/animations/TypewriterText";

export default function BlogsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <FadeIn>
      <TypewriterText 
        text="Blogs" 
        className="text-3xl font-bold mb-4"
      />
      <p>Read our latest stories and updates from the NGO community.</p>
      </FadeIn>
    </div>
  );
}
