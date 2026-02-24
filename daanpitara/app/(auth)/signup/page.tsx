'use client';

import { useActionState, useState } from 'react';
import { signup } from '@/actions/auth';
import Link from 'next/link';
import { Shield, Building2, User, ArrowLeft, Eye, EyeOff, Mail, Lock, CheckCircle, Search } from 'lucide-react';
import { signIn } from 'next-auth/react';
import AuthBranding from '@/components/auth/AuthBranding';

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, action, pending] = useActionState(signup, undefined);

  // Toggle Password Visibility
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="h-screen w-screen bg-white flex flex-col md:flex-row overflow-hidden font-[Satoshi]">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 h-full flex flex-col items-center justify-center px-8 md:px-16 bg-[#F9FAFB]/30 overflow-hidden">
      
         <div className="w-full max-w-md py-4"> 
            <div className="mb-6 block text-center md:text-left">
                 <span style={{color: 'black', fontSize: '28px', fontWeight: '700', fontFamily: 'Satoshi'}}>Welcome To </span>
                 <span style={{color: '#1572A1', fontSize: '28px', fontWeight: '700', fontFamily: 'Satoshi'}}>Daan</span>
                 <span style={{color: '#2B7FFF', fontSize: '28px', fontWeight: '700', fontFamily: 'Satoshi'}}>Pitara</span>
            </div>
            
            <h2 style={{color: 'black', fontSize: '18px', fontWeight: '500'}} className="mb-4 font-[Satoshi]">
                Sign Up as NGO
            </h2>

             <form action={action} className="space-y-3.5">
                <div className="space-y-1">
                   <label style={{color: '#374151', fontSize: '13px', fontWeight: '600'}} className="block font-[Satoshi]">Full Name</label>
                   <div className="relative">
                      <input
                        name="name"
                        type="text"
                        placeholder="Yashwant sah"
                        style={{fontSize: '14px', fontWeight: '400', color: 'black'}}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all placeholder-gray-400 bg-white"
                        required
                      />
                   </div>
                   {state?.errors?.name && <p className="mt-1 text-xs text-red-600">{state.errors.name}</p>}
                </div>

                <div className="space-y-1">
                  <label style={{color: '#374151', fontSize: '13px', fontWeight: '600'}} className="block font-[Satoshi]">Organization Name</label>
                  <input
                    name="organizationName"
                    type="text"
                    style={{fontSize: '14px', fontWeight: '400'}}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all placeholder-gray-400 bg-white"
                    placeholder="Hope Foundation"
                    required
                  />
                  {state?.errors?.organizationName && <p className="mt-1 text-xs text-red-600">{state.errors.organizationName}</p>}
                </div>

                <div className="space-y-1">
                    <label style={{color: '#374151', fontSize: '13px', fontWeight: '600'}} className="block font-[Satoshi]">Email Address</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            name="email"
                            type="email"
                            placeholder="yoy@example.com"
                             style={{fontSize: '14px', fontWeight: '400'}}
                            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-300 focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all placeholder-gray-400 bg-white"
                            required
                        />
                    </div>
                    {state?.errors?.email && <p className="mt-1 text-xs text-red-600">{state.errors.email}</p>}
                </div>

                <div className="space-y-1">
                    <label style={{color: '#374151', fontSize: '13px', fontWeight: '600'}} className="block font-[Satoshi]">Password</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            name="password"
                            type={showPassword ? "text" : "password"}
                             style={{fontSize: '14px', fontWeight: '400'}}
                            className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-gray-300 focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all placeholder-gray-400 bg-white"
                            placeholder="••••••••"
                            required
                        />
                         <button type="button" onClick={togglePasswordVisibility} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black cursor-pointer bg-white px-1">
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                    </div>
                    {state?.errors?.password && <p className="mt-1 text-xs text-red-600">{state.errors.password}</p>}
                </div>

                <div className="space-y-1">
                    <label style={{color: '#374151', fontSize: '13px', fontWeight: '600'}} className="block font-[Satoshi]">Repeat Password</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            name="confirmPassword"
                            type={showPassword ? "text" : "password"}
                             style={{fontSize: '14px', fontWeight: '400'}}
                            className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-gray-300 focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all placeholder-gray-400 bg-white"
                            placeholder="••••••••"
                        />
                    </div>
                </div>

                {state?.message && <p className="text-[11px] text-red-600 text-center bg-red-50 p-2 rounded-lg border border-red-100">{state.message}</p>}

                <button
                    type="submit"
                    disabled={pending}
                    className="w-full bg-[#1572A1] text-white py-2.5 px-4 rounded-xl shadow-lg hover:shadow-xl hover:opacity-95 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer font-bold text-base mt-1 active:scale-[0.98]"
                >
                    {pending ? 'Creating Account...' : 'Sign Up'}
                </button>

                 <div className="relative py-1 text-center">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
                    <span className="relative px-3 bg-[#F9FAFB] text-[11px] text-gray-500 font-medium">Or Continue with</span>
                 </div>

                 <div className="grid grid-cols-2 gap-3">
                     <button 
                        type="button" 
                        onClick={() => signIn('google')}
                        className="flex items-center justify-center px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group hover:border-gray-300"
                     >
                         <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="h-4 w-4 mr-2" alt="Google" />
                         <span className="text-[#4C4B4B] text-sm font-bold group-hover:text-black">Google</span>
                     </button>
                     <button 
                        type="button" 
                        onClick={() => signIn('linkedin')}
                        className="flex items-center justify-center px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group hover:border-gray-300"
                     >
                         <img src="https://www.svgrepo.com/show/448234/linkedin.svg" className="h-4 w-4 mr-2" alt="LinkedIn" />
                         <span className="text-[#4C4B4B] text-sm font-bold group-hover:text-black">LinkedIn</span>
                     </button>
                 </div>
                 
                 <div className="mt-2 text-center text-xs text-gray-500">
                    Already have an account? <Link href="/signin" className="font-bold text-[#1572A1] hover:underline cursor-pointer ml-1">Sign In</Link>
                 </div>
            </form>
         </div>
      </div>

       {/* Right Side - Branding */}
       <AuthBranding />
    </div>
  );
}
