'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
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
       router.push('/dashboard');
       router.refresh();
    }
  };

  return (
    <div className="h-screen w-screen bg-white flex flex-col md:flex-row overflow-hidden font-[Satoshi]">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 h-full flex flex-col items-center justify-center px-8 md:px-16 bg-[#F9FAFB]/30 overflow-hidden">
      
         <div className="max-w-md mx-auto w-full py-8 text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 font-[Satoshi]">
                 Welcome To DaanPitara
            </h1>
            <p className="text-gray-500 mb-8 font-medium font-[Satoshi]">Login to continue</p>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5 text-left">
                    <label className="block text-sm font-bold text-gray-700 font-[Satoshi]">Email Address</label>
                    <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            name="email"
                            type="email"
                            placeholder="yoy@example.com"
                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all placeholder-gray-400 bg-white shadow-sm"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-1.5 text-left">
                    <label className="block text-sm font-bold text-gray-700 font-[Satoshi]">Password</label>
                    <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            className="w-full pl-11 pr-12 py-3 rounded-xl border border-gray-300 focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all placeholder-gray-400 bg-white shadow-sm"
                            placeholder="••••••••"
                            required
                        />
                        <button type="button" onClick={togglePasswordVisibility} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black cursor-pointer bg-white px-1">
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                    </div>
                </div>
                
                <div className="flex justify-end -mt-2">
                   <Link href="/forgot-password" className="text-sm font-bold text-[#1572A1] hover:text-blue-700 cursor-pointer font-[Satoshi]">Forgot Password?</Link>
                </div>

                {error && <p className="text-sm text-red-600 text-center bg-red-50 p-2.5 rounded-xl border border-red-100 animate-shake">{error}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#1572A1] text-white font-bold py-3.5 px-4 rounded-xl shadow-lg hover:shadow-xl hover:opacity-95 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer font-bold font-[Satoshi] text-lg active:scale-[0.98]"
                >
                    {loading ? 'Logging In...' : 'Login →'}
                </button>

                 <div className="relative py-2 text-center">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
                    <span className="relative px-4 bg-[#F9FAFB] text-sm text-gray-500 font-medium font-[Satoshi]">Or Continue with</span>
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                     <button 
                        type="button" 
                        onClick={() => signIn('google')}
                        className="flex items-center justify-center px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group hover:border-gray-300"
                     >
                         <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="h-5 w-5 mr-3" alt="Google" />
                         <span className="text-[#4C4B4B] font-bold font-[Satoshi] group-hover:text-black">Google</span>
                     </button>
                     <button 
                        type="button" 
                        onClick={() => signIn('linkedin')}
                        className="flex items-center justify-center px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group hover:border-gray-300"
                     >
                         <img src="https://www.svgrepo.com/show/448234/linkedin.svg" className="h-5 w-5 mr-3" alt="LinkedIn" />
                         <span className="text-[#4C4B4B] font-bold font-[Satoshi] group-hover:text-black">LinkedIn</span>
                     </button>
                 </div>
                 
                 <div className="mt-6 text-center text-sm text-gray-500">
                    Don't have an account? <Link href="/signup" className="font-bold text-[#1572A1] hover:underline cursor-pointer ml-1">Sign Up</Link>
                 </div>
            </form>
         </div>
      </div>
      <AuthBranding />
    </div>
  );
}
