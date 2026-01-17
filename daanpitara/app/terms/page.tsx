"use client";

import { motion } from "framer-motion";

export default function TermsAndConditions() {
  return (
    <main className="min-h-screen bg-[#FFFDF9] py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms and Conditions</h1>
          <p className="text-gray-600 mb-6">Last Updated: January 17, 2026</p>

          <section className="space-y-8 text-gray-700 leading-relaxed">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Agreement to Terms</h2>
              <p>
                By accessing or using DaanPitara, you agree to be bound by these Terms and Conditions. 
                If you do not agree with all of these terms, then you are expressly prohibited from using 
                the site and you must discontinue use immediately.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. NGO Responsibilities</h2>
              <p>
                NGOs registered on DaanPitara must provide accurate and truthful information regarding their organization, 
                registration status, and projects. Misrepresentation of facts may lead to account suspension or termination.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Donation Policy</h2>
              <p>
                All donations made through DaanPitara are processed securely. DaanPitara acts as a bridge between 
                donors and NGOs. While we verify NGOs, donors are encouraged to perform their own due diligence. 
                Donations are generally non-refundable unless specified otherwise by the recipient organization.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Prohibited Activities</h2>
              <p>
                You may not access or use the site for any purpose other than that for which we make the site available. 
                The site may not be used in connection with any commercial endeavors except those that are specifically 
                endorsed or approved by us.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Intellectual Property Rights</h2>
              <p>
                Unless otherwise indicated, the Site is our proprietary property and all source code, databases, 
                functionality, software, website designs, audio, video, text, photographs, and graphics on the Site 
                are owned or controlled by us.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Limitation of Liability</h2>
              <p>
                In no event will we or our directors, employees, or agents be liable to you or any third party 
                for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages 
                arising from your use of the site.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Governing Law</h2>
              <p>
                These Terms shall be governed by and defined following the laws of India. DaanPitara 
                and yourself irrevocably consent that the courts of Punjab, India shall have exclusive 
                jurisdiction to resolve any dispute which may arise in connection with these terms.
              </p>
            </div>
          </section>
        </motion.div>
      </div>
    </main>
  );
}
