export default function CaseStudies() {
  return (
    <section className="bg-[#8BBBD4] py-16 md:py-20 rounded-2xl">
      <div className="max-w-[1264px] mx-auto px-4 flex flex-col items-center gap-10">
        
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-semibold text-white text-center">
          Our Case Studies
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-14 w-full">
          
          {/* Card 1 */}
          <div className="bg-white rounded-2xl px-6 py-8 md:px-8 md:py-10 shadow-sm flex flex-col items-center text-center">
            <img
              src="/images/vasundhara.png"
              alt="Vasundhara Maitri Foundation"
              className="h-14 mb-6"
            />
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
              Vasundhara Maitri Foundation
            </h3>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              Strengthening their voice for the planet. By improving their
              online presence, we made it simpler for supporters to discover
              their environmental initiatives.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl px-6 py-8 md:px-8 md:py-10 shadow-sm flex flex-col items-center text-center">
            <img
              src="/images/mata-gujri.png"
              alt="Mata Gujri Ji Birdh Ashram"
              className="h-14 mb-6"
            />
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
              Mata Gujri Ji Birdh Ashram
            </h3>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              Supporting dignified elder care. We helped the organization
              present its work with clarity and trust, making it easier for
              donors to understand their impact.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl px-6 py-8 md:px-8 md:py-10 shadow-sm flex flex-col items-center text-center">
            <img
              src="/images/jj-education.png"
              alt="J.J Education Academy"
              className="h-14 mb-6"
            />
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
              J.J Education Academy
            </h3>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              Helping education reach more children. We enhanced their digital
              identity so parents, students, and well-wishers can easily
              connect with their programs.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
