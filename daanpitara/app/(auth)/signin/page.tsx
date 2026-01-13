'use client';

import { useState } from 'react';
// import { signin, loginAdmin } from '@/actions/auth'; // Not used anymore
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Shield, ArrowLeft, Eye, EyeOff, Mail, Lock, CheckCircle } from 'lucide-react';
import { signIn } from 'next-auth/react';
import AuthBranding from '@/components/auth/AuthBranding';

export default function SigninPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  // Toggle Password Visibility
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
       setError('Invalid email or password');
       setLoading(false);
    } else {
       // Redirect is handled by the client or we can push
       router.push('/');
       router.refresh();
    }
  };

  return (
    <div className="h-screen w-screen bg-white flex flex-col md:flex-row overflow-hidden font-[Satoshi]">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-8 md:px-16 relative overflow-y-auto">
      
         <div className="max-w-md mx-auto w-full py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 font-[Satoshi]">
                 Welcome To DaanPitara
            </h1>
            <p className="text-gray-500 mb-6 font-[Satoshi]">Login to continue</p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 font-[Satoshi]">Email Address</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            name="email"
                            type="email"
                            placeholder="yoy@example.com"
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2B7FFF] focus:border-transparent outline-none transition-all placeholder-[#6A7282]"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 font-[Satoshi]">Password</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            className="w-full pl-10 pr-12 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2B7FFF] focus:border-transparent outline-none transition-all placeholder-[#6A7282]"
                            placeholder="••••••••"
                            required
                        />
                        <button type="button" onClick={togglePasswordVisibility} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer">
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                    </div>
                </div>
                
                <div className="flex justify-end">
                   <Link href="/forgot-password" className="text-sm font-medium text-[#1572A1] hover:text-blue-700 cursor-pointer font-[Satoshi]">Forgot Password?</Link>
                </div>

                {error && <p className="text-sm text-red-600 text-center bg-red-50 p-2 rounded">{error}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    style={{backgroundColor: '#1572A1'}}
                    className="w-full text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl hover:opacity-90 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer font-[Satoshi]"
                >
                    {loading ? 'Logging In...' : 'Login →'}
                </button>

                 <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300"></div></div>
                    <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500 font-[Satoshi]">Or Continue with</span></div>
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                     <button 
                        type="button" 
                        onClick={() => signIn('google')}
                        className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
                     >
                         <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="h-5 w-5 mr-2" alt="Google" />
                         <span className="text-[#4C4B4B] font-medium font-[Satoshi] group-hover:text-black">Google</span>
                     </button>
                     <button 
                        type="button" 
                        onClick={() => signIn('linkedin')}
                        className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
                     >
                         <img src="https://www.svgrepo.com/show/448234/linkedin.svg" className="h-5 w-5 mr-2" alt="LinkedIn" />
                         <span className="text-[#4C4B4B] font-medium font-[Satoshi] group-hover:text-black">LinkedIn</span>
                     </button>
                 </div>
                 
                 <div className="mt-6 text-center text-sm text-gray-500">
                    Don't have an account? <Link href="/signup" className="font-bold text-[#1572A1] hover:underline cursor-pointer">Sign Up</Link>
                 </div>
            </form>
         </div>
      </div>

       {/* Right Side - Branding (Fixed for both views) */}
       {/* Right Side - Branding (Fixed for both views) */}
       <AuthBranding />
    </div>
  );
}
