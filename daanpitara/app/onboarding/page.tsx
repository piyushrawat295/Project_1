"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, 
  Handshake, 
  Heart, 
  User, 
  ChevronRight, 
  ArrowLeft,
  Briefcase,
  FileText,
  Upload,
  Info,
  CheckCircle2,
  Lock,
  Globe
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { submitOnboarding } from "@/actions/ngo-features";
import { getNGOProfile } from "@/actions/dashboard";

// --- Types ---
type OnboardingStep = 1 | 2 | 3 | 4;
type ProfileType = "ngo" | "corporate" | "donor" | "individual" | null;

interface UploadedFile {
  title: string;
  fileName: string;
  url: string;
}

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<OnboardingStep>(1);
  const [profileType, setProfileType] = useState<ProfileType>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Form State
  const [formData, setFormData] = useState({
    organizationName: "",
    registrationNumber: "",
    establishedYear: "",
    website: "",
    address: "",
    contactName: "",
    designation: "",
    email: "",
    phone: "",
    operationalRegions: "",
    focusedAreas: [] as string[],
    description: "",
  });

  useEffect(() => {
    async function checkStatus() {
      try {
        const ngo = await getNGOProfile();
        if (ngo) {
          setFormData(prev => ({
            ...prev,
            organizationName: ngo.name || "",
            registrationNumber: ngo.registrationNumber || "",
            establishedYear: ngo.foundedYear ? ngo.foundedYear.toString() : "",
            address: ngo.headquarters || "",
            description: ngo.description || "",
            operationalRegions: ngo.operationalStates ? ngo.operationalStates.join(', ') : "",
            focusedAreas: (ngo.focusAreas as string[]) || [],
            // Other fields won't overwrite unless they exist in the schema mapped
          }));
          if (ngo.type) {
            setProfileType(ngo.type as ProfileType);
            // Optionally, we could jump straight to step 3 if they have profile data,
            // but for now let's let them review/edit it.
          }
        }
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    }
    checkStatus();
  }, [router]);

  const [uploadStep, setUploadStep] = useState(1);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const nextStep = () => {
    if (step < 4) setStep((s) => (s + 1) as OnboardingStep);
  };

  const prevStep = () => {
    if (step > 1) setStep((s) => (s - 1) as OnboardingStep);
  };

  const toggleFocusedArea = (area: string) => {
    setFormData(prev => ({
      ...prev,
      focusedAreas: prev.focusedAreas.includes(area)
        ? prev.focusedAreas.filter(a => a !== area)
        : [...prev.focusedAreas, area]
    }));
  };

  const handleFinish = async () => {
    setIsSubmitting(true);
    try {
      const result = await submitOnboarding({ ...formData, profileType }, uploadedFiles);
      if (result.success) {
        nextStep();
      } else {
        alert("Action failed: " + result.error);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong during submission.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FFFDF9] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-blue-100 border-t-blue-500 animate-spin" />
          <p className="text-gray-500 font-medium animate-pulse">Syncing your NGO profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFDF9] flex flex-col font-sans text-[#1A1A1A]">
      <header className="fixed top-0 left-0 right-0 w-full bg-white/90 backdrop-blur-xl z-[999] border-b border-gray-100 shadow-sm flex justify-center">
        <div className="px-6 py-4 flex justify-between items-center max-w-[1440px] w-full">
          <Link href="/dashboard" className="w-[120px] h-[40px] relative">
            <Image src="/Logo.png" alt="DaanPitara" fill className="object-contain object-left" />
          </Link>
          
          {/* Step Indicator Badge */}
          <div className="bg-[#E0F2FE] text-[#0F71A8] px-4 py-1.5 rounded-lg text-sm font-semibold">
            Step {step} of 4
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-start pt-[104px] pb-32 px-4 relative">
        <AnimatePresence mode="wait">
          <motion.div 
            key={step}
            className="w-full flex flex-col items-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {step === 1 && (
              <Step1ProfileType 
                selected={profileType} 
                onSelect={(type) => { setProfileType(type); nextStep(); }} 
              />
            )}

            {step === 2 && (
              <Step2BasicInfo 
                formData={formData} 
                setFormData={setFormData}
                toggleFocusedArea={toggleFocusedArea}
              />
            )}

            {step === 3 && (
              <Step3Documents 
                uploadStep={uploadStep}
                setUploadStep={setUploadStep}
                uploadedFiles={uploadedFiles}
                setUploadedFiles={setUploadedFiles}
              />
            )}

            {step === 4 && (
              <Step4Success />
            )}

            {/* Inline Navigation Buttons (Below details, not over footer) */}
            {step > 1 && step < 4 && (
              <div className="max-w-[800px] w-full mt-16 pt-8 border-t border-gray-100 flex justify-between items-center">
                <button 
                  onClick={prevStep}
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </button>
                
                <div className="flex items-center gap-4">
                  {step === 3 && (
                    <button className="text-gray-400 hover:text-gray-600 font-medium px-4">
                      Upload Later
                    </button>
                  )}
                  <button 
                    disabled={isSubmitting}
                    onClick={() => {
                       if (step === 3 && uploadStep < 5) {
                          setUploadStep(uploadStep + 1);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                       } else if (step === 3 && uploadStep === 5) {
                          handleFinish();
                       } else {
                          nextStep();
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                       }
                    }}
                    className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-[#0F71A8] to-[#26A9E0] text-white hover:shadow-xl hover:shadow-blue-200 transition-all font-bold disabled:opacity-50"
                  >
                    {isSubmitting ? "Submitting..." : step === 3 && uploadStep === 5 ? "Finish" : "Continue"}
                    {!isSubmitting && <ChevronRight className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

// --- Step Components ---

function Step1ProfileType({ selected, onSelect }: { selected: ProfileType, onSelect: (type: ProfileType) => void }) {
  const profiles = [
    { id: "ngo", title: "NGO / Nonprofit Organization", icon: Building2, desc: "Register your NGO to access CSR funding, digital tools & impact reports" },
    { id: "corporate", title: "Corporate / CSR Partner", icon: Briefcase, desc: "Register your NGO to access CSR funding, digital tools & impact reports" },
    { id: "donor", title: "Donor / Philanthropist", icon: Heart, desc: "Register your NGO to access CSR funding, digital tools & impact reports" },
    { id: "individual", title: "Individual / Volunteer", icon: User, desc: "Register your NGO to access CSR funding, digital tools & impact reports" },
  ];

  return (
    <div className="max-w-[900px] w-full text-center">
      <h1 className="text-3xl font-bold mb-2">Choose Your Profile Type</h1>
      <p className="text-gray-500 mb-12">Help us understand how you want to create impact.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {profiles.map((p) => (
          <button
            key={p.id}
            onClick={() => onSelect(p.id as ProfileType)}
            className={`group relative bg-white p-8 rounded-2xl border transition-all text-left flex flex-col items-start gap-4 hover:shadow-xl hover:shadow-blue-50/50 hover:border-blue-200
              ${selected === p.id ? "border-blue-500 ring-2 ring-blue-50" : "border-gray-100"}`}
          >
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-colors
              ${selected === p.id ? "bg-blue-500 text-white" : "bg-[#F0F9FF] text-blue-500"}`}>
              <p.icon size={28} />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">{p.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">{p.desc}</p>
              <div className="flex items-center gap-2 text-blue-500 font-semibold text-sm">
                Continue <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function Step2BasicInfo({ formData, setFormData, toggleFocusedArea }: any) {
  const focusedAreas = [
    "Education", "Healthcare", "Livelihood", "Disaster Relief", "Child Welfare", 
    "Animal Welfare", "Women Empowerment", "Elderly Care", "Others"
  ];

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-[800px] w-full">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">Tell Us About Yourself</h1>
        <p className="text-gray-500">Help us understand your goals so we can provide the best support</p>
      </div>

      <div className="space-y-8">
        {/* Organization Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputGroup 
            label="Organization Name" 
            name="organizationName" 
            value={formData.organizationName} 
            onChange={handleChange} 
            placeholder="Enter Organization Name"
            icon={Building2}
            required
          />
          <InputGroup 
            label="Registration Number" 
            sub=" (NGO/NPO ID)" 
            name="registrationNumber" 
            value={formData.registrationNumber} 
            onChange={handleChange} 
            placeholder="Enter NGO/NPO ID"
            icon={FileText}
            required
          />
          <InputGroup 
            label="Year Of Establishment" 
            name="establishedYear" 
            value={formData.establishedYear} 
            onChange={handleChange} 
            placeholder="YYYY"
            icon={FileText}
            required
          />
          <InputGroup 
            label="Website / Social Links" 
            name="website" 
            value={formData.website} 
            onChange={handleChange} 
            placeholder="https://yourorganization.org"
            icon={Globe}
            required
          />
        </div>

        <InputGroup 
          label="Registered Address" 
          name="address" 
          value={formData.address} 
          onChange={handleChange} 
          placeholder="Enter Complete Registered Address"
          icon={CheckCircle2}
          required
          fullWidth
        />

        {/* Primary Contact */}
        <div>
          <h2 className="text-xl font-bold mb-6">Primary Contact Person</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputGroup 
              label="Full Name" 
              name="contactName" 
              value={formData.contactName} 
              onChange={handleChange} 
              placeholder="Enter Full Name"
              icon={User}
              required
            />
            <InputGroup 
              label="Designation" 
              name="designation" 
              value={formData.designation} 
              onChange={handleChange} 
              placeholder="e.g. Director"
              icon={Briefcase}
              required
            />
            <InputGroup 
              label="Email Address" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              placeholder="Contact@gmail.com"
              icon={FileText}
              required
            />
            <InputGroup 
              label="Phone Number" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
              placeholder="+91-XXXXXXXXXX"
              icon={Briefcase}
              required
            />
          </div>
        </div>

        <InputGroup 
          label="Operational Regions" 
          name="operationalRegions" 
          value={formData.operationalRegions} 
          onChange={handleChange} 
          placeholder="e.g. Maharashtra, Delhi (Comma Separated)"
          icon={Building2}
          required
          fullWidth
        />

        {/* Focused Area */}
        <div>
          <label className="block text-sm font-semibold mb-3">Focused Area <span className="text-red-500">*</span></label>
          <div className="flex flex-wrap gap-3">
            {focusedAreas.map((area) => (
              <button
                key={area}
                onClick={() => toggleFocusedArea(area)}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all border
                  ${formData.focusedAreas.includes(area)
                    ? "bg-[#E0F2FE] border-[#0F71A8] text-[#0F71A8]"
                    : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"}`}
              >
                {area}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
           <label className="block text-sm font-semibold">Tell us what brings you to DaanPitara <span className="text-red-500">*</span></label>
           <textarea 
             name="description"
             value={formData.description}
             onChange={handleChange}
             placeholder="Short description of your impact goals"
             className="w-full h-32 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all resize-none"
           />
        </div>

        <div className="text-xs text-gray-500 pt-4">
          All fields marked with <span className="text-red-500">*</span> are required
        </div>
      </div>
    </div>
  );
}

function Step3Documents({ uploadStep, setUploadStep, uploadedFiles, setUploadedFiles }: any) {
  const documents = [
    { step: 1, docs: [{ title: "Registration Certificate", sub: "PDF (max 2MB) or JPG (max 5MB)" }, { title: "12A Certificate", sub: "PDF (max 2MB) or JPG (max 5MB)" }] },
    { step: 2, docs: [{ title: "FCRA Certificate", sub: "PDF (max 2MB) or JPG (max 5MB)" }, { title: "Board Member List with Aadhar/PAN of Trustees", sub: "PDF (max 2MB) or JPG (max 5MB)" }] },
    { step: 3, docs: [{ title: "80G Certificate", sub: "PDF (max 2MB) or JPG (max 5MB)" }, { title: "PAN Card of Organization", sub: "PDF (max 2MB) or JPG (max 5MB)" }] },
    { step: 4, docs: [{ title: "Latest Annual Report", sub: "PDF (max 2MB) or JPG (max 5MB)" }, { title: "Audited Financials (Last 3 Years)", sub: "PDF (max 2MB) or JPG (max 10MB)" }] },
    { step: 5, docs: [{ title: "Trust Deed / Bylaws", sub: "PDF (max 2MB) or JPG (max 5MB)" }, { title: "Authorization Letter", sub: "PDF (max 2MB) or JPG (max 5MB)" }] },
  ];

  const currentDocs = documents.find(d => d.step === uploadStep)?.docs || documents[0].docs;

  const handleUploadSuccess = (title: string, uploadedData: { name: string, url: string }) => {
    setUploadedFiles((prev: any) => [
      ...prev.filter((f: any) => f.title !== title),
      { title, fileName: uploadedData.name, url: uploadedData.url }
    ]);
  };

  return (
    <div className="max-w-[900px] w-full">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">Upload Verification Documents</h1>
        <p className="text-gray-500">Help us verify your identity and ensure transparency. All documents are securely encrypted.</p>
      </div>

      {/* Sub-Step Indicator */}
      <div className="flex items-center justify-center gap-4 mb-12">
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((s) => (
            <div key={s} className="flex items-center">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all relative
                  ${uploadStep === s ? "bg-[#0EA5E9] text-white ring-4 ring-blue-50" : 
                    uploadStep > s ? "bg-[#0EA5E9] text-white" : "border-2 border-gray-100 text-gray-300 bg-white"}`}
              >
                {uploadStep > s ? <CheckCircle2 size={20} /> : s}
                
                {/* Connector Line */}
                {s < 5 && (
                  <div className={`absolute left-10 w-[42px] h-1 -z-10 transition-colors
                    ${uploadStep > s ? "bg-[#0EA5E9]" : "bg-gray-100"}`} 
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {currentDocs.map((doc, idx) => (
          <UploadCard 
            key={idx} 
            title={doc.title} 
            sub={doc.sub} 
            required 
            onUpload={(data: { name: string, url: string }) => handleUploadSuccess(doc.title, data)}
            isUploaded={uploadedFiles.some((f: any) => f.title === doc.title)}
            fileName={uploadedFiles.find((f: any) => f.title === doc.title)?.fileName}
          />
        ))}
      </div>

      {/* Security Info */}
      <div className="bg-[#F0F9FF] border border-blue-100 rounded-2xl p-6 flex gap-4 items-start">
        <div className="bg-white p-2.5 rounded-xl text-blue-500 shadow-sm border border-blue-50">
          <Lock size={24} />
        </div>
        <div className="space-y-1">
          <h4 className="font-bold text-[#0F71A8] flex items-center gap-2">
            <Info size={16} />
            Document Security
          </h4>
          <p className="text-[13px] text-gray-600 leading-relaxed">
            All documents are encrypted and stored securely. We use them only for verification purposes and comply with data protection regulations. Your information is safe with us.
          </p>
        </div>
      </div>
    </div>
  );
}

function Step4Success() {
  return (
    <div className="max-w-[600px] w-full text-center py-12">
      <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
        <CheckCircle2 size={48} />
      </div>
      <h1 className="text-4xl font-bold mb-4">Verification Submitted!</h1>
      <p className="text-gray-500 text-lg mb-10 leading-relaxed">
        Thank you for submitting your details. Our team will review your documents and verify your profile within 2-3 business days.
      </p>
      
      <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-10 text-left flex items-start gap-4">
        <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center shrink-0">
          <Info size={20} />
        </div>
        <div>
          <h4 className="font-bold text-gray-900 mb-1">What happens next?</h4>
          <p className="text-sm text-gray-500">You can still use most of the dashboard features, but some fundraising options will be unlocked after verification.</p>
        </div>
      </div>

      <Link href="/dashboard">
        <button className="w-full bg-[#0F71A8] text-white py-4 rounded-xl font-bold hover:bg-[#0c5a86] transition-all shadow-lg hover:shadow-blue-200">
          Go to Dashboard
        </button>
      </Link>
    </div>
  );
}

// --- UI Helpers ---

function InputGroup({ label, name, value, onChange, placeholder, icon: Icon, required, sub, fullWidth }: any) {
  return (
    <div className={`flex flex-col gap-2 ${fullWidth ? 'w-full' : ''}`}>
      <label className="text-sm font-semibold text-gray-700">
        {label}{sub && <span className="text-gray-400 font-normal">{sub}</span>}{required && <span className="text-red-500"> *</span>}
      </label>
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
          <Icon size={20} />
        </div>
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-50 focus:border-blue-400 outline-none transition-all placeholder:text-gray-300"
        />
      </div>
    </div>
  );
}

interface UploadCardProps {
  title: string;
  sub: string;
  required?: boolean;
  onUpload: (data: { name: string, url: string }) => void;
  isUploaded: boolean;
  fileName?: string;
}

function UploadCard({ title, sub, required, onUpload, isUploaded, fileName }: UploadCardProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type === 'application/pdf' && file.size > 2 * 1024 * 1024) {
      alert("Please upload a compressed PDF. Maximum size allowed for PDFs is 2MB.");
      return;
    }

    setUploading(true);
    setProgress(20); // Initial progress
    
    try {
      // Simulate some progress for smooth UX while preparing request
      const progressInterval = setInterval(() => {
        setProgress(p => (p < 80 ? p + 10 : p));
      }, 200);

      const formData = new FormData();
      formData.append('file', file);
      
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      clearInterval(progressInterval);
      setProgress(100);
      
      if (!res.ok) throw new Error("Upload failed");
      
      const data = await res.json();
      
      if (data.success && data.url) {
        // Pass the new file object with the URL back up
        onUpload({ name: file.name, url: data.url });
      } else {
         throw new Error(data.error || "Upload failed");
      }
    } catch (err) {
      console.error("Error uploading file:", err);
      alert("Failed to upload file. Please try again.");
    } finally {
      setTimeout(() => setUploading(false), 500);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-1">
        <h3 className="text-lg font-bold">
          {title}{required && <span className="text-red-500"> *</span>}
        </h3>
        {isUploaded && <CheckCircle2 className="text-green-500 w-5 h-5" />}
      </div>
      <p className="text-sm text-gray-400 mb-6">{sub}</p>
      
      <div className="relative">
        <input 
          type="file" 
          id={`file-${title}`} 
          className="hidden" 
          onChange={handleFileChange}
          accept=".pdf,.jpg,.jpeg,.png"
          disabled={uploading}
        />
        <label 
          htmlFor={`file-${title}`}
          className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center transition-all cursor-pointer
            ${isUploaded ? "border-green-100 bg-green-50/30" : "border-gray-100 bg-[#F8FAFC] hover:bg-white hover:border-blue-200"}`}
        >
          {uploading ? (
            <div className="flex flex-col items-center w-full">
              <div className="w-12 h-12 rounded-full border-4 border-blue-100 border-t-blue-500 animate-spin mb-4" />
              <p className="text-sm font-bold text-blue-600">Uploading {progress}%</p>
              <div className="w-full bg-gray-100 h-1.5 rounded-full mt-4 overflow-hidden">
                <motion.div 
                  className="bg-blue-500 h-full" 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ) : isUploaded ? (
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-4">
                <FileText size={24} />
              </div>
              <p className="text-sm font-bold text-gray-900 mb-1">{fileName}</p>
              <p className="text-xs text-green-600 font-medium">Click to replace file</p>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-gray-400 shadow-sm mb-4">
                <Upload size={24} />
              </div>
              <p className="text-sm font-medium text-gray-900 mb-1">Drop file here or click to browse</p>
              <p className="text-xs text-gray-400">PDF (max 2MB), JPG, PNG</p>
            </>
          )}
        </label>
      </div>
    </div>
  );
}
