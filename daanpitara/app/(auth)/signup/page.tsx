'use client';

import { useActionState, useState } from 'react';
import { signup } from '@/actions/auth';
import Link from 'next/link';
import { Shield, Building2, User, ArrowLeft, Eye, EyeOff, Mail, Lock, CheckCircle, Search } from 'lucide-react';
import { signIn } from 'next-auth/react';
import AuthBranding from '@/components/auth/AuthBranding';

export default function SignupPage() {
  const [role, setRole] = useState<'ngo' | 'user' | 'admin' | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [state, action, pending] = useActionState(signup, undefined);

  // Toggle Password Visibility
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  if (!role) {
    return (
      <div className="h-screen w-screen bg-white flex flex-col md:flex-row overflow-hidden font-[Satoshi]">
        {/* Left Side - Selection */}
        <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-8 md:px-16 relative overflow-y-auto">
            <div className="max-w-md mx-auto w-full">
                 <div className="mb-8 text-center md:text-left">
                    <h1 className="text-3xl font-bold text-gray-900">Join <span className="text-[#2B7FFF]">DaanPitara</span></h1>
                    <p className="mt-2 text-gray-500">Choose your path to compassion</p>
                 </div>

                 <div className="space-y-4">
                     <button
                        onClick={() => setRole('user')}
                        className="w-full group flex items-center p-4 border-2 border-gray-100 rounded-2xl hover:border-green-500 hover:bg-green-50 transition-all duration-200"
                      >
                        <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-4">
                           <User className="h-6 w-6" />
                        </div>
                        <div className="text-left">
                           <h3 className="font-bold text-gray-900">Donor / User</h3>
                           <p className="text-sm text-gray-500">Support causes & donate</p>
                        </div>
                     </button>

                     <button
                        onClick={() => setRole('ngo')}
                        className="w-full group flex items-center p-4 border-2 border-gray-100 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
                      >
                         <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4">
                           <Building2 className="h-6 w-6" />
                        </div>
                        <div className="text-left">
                           <h3 className="font-bold text-gray-900">NGO Partner</h3>
                           <p className="text-sm text-gray-500">Register your organization</p>
                        </div>
                     </button>
                 </div>
                 
                 <div className="mt-8 text-center text-sm text-gray-500">
                    Already have an account? <Link href="/signin" className="font-bold text-[#1572A1] hover:underline">Sign In</Link>
                 </div>
            </div>
        </div>

        {/* Right Side - Branding */}
        <AuthBranding />
      </div>
    );
  }

  // Handle Admin Selection -> Show Message
  if (role === 'admin') {
     return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
           <Shield className="h-16 w-16 text-gray-400 mb-4" />
           <h2 className="text-2xl font-bold text-gray-900">Admin Registration Restricted</h2>
           <p className="mt-2 text-gray-600 max-w-md">
              Public signup for administrators is disabled for security reasons. If you are a team member, please use the provided credentials to log in.
           </p>
           <div className="mt-8 flex gap-4">
              <button onClick={() => setRole(null)} className="text-gray-600 hover:text-gray-900">Go Back</button>
              <Link href="/signin" className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">Go to Login</Link>
           </div>
        </div>
     )
  }

  return (
    <div className="h-screen w-screen bg-white flex flex-col md:flex-row overflow-hidden font-[Satoshi]">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 h-full flex flex-col items-center justify-center px-8 md:px-16 relative">
         <button 
            onClick={() => setRole(null)} 
            className="absolute top-8 left-8 flex items-center text-[#6A7282] hover:text-black transition-colors cursor-pointer z-10"
         >
             <ArrowLeft className="mr-2 h-5 w-5" /> Change Role
         </button>

         <div className="w-full max-w-md overflow-y-auto max-h-full py-1 no-scrollbar"> 
            <div className="mb-4 mt-12">
                 <span style={{color: 'black', fontSize: '32px', fontWeight: '700', fontFamily: 'Satoshi'}}>Welcome To </span>
                 <span style={{color: '#1572A1', fontSize: '32px', fontWeight: '700', fontFamily: 'Satoshi'}}>Daan</span>
                 <span style={{color: '#2B7FFF', fontSize: '32px', fontWeight: '700', fontFamily: 'Satoshi'}}>Pitara</span>
            </div>
            
            <h2 style={{color: 'black', fontSize: '20px', fontWeight: '500'}} className="mb-4 font-[Satoshi]">
                Sign Up
            </h2>

            <form action={action} className="space-y-3">
                <input type="hidden" name="role" value={role} />
                
                <div>
                   <label style={{color: 'black', fontSize: '14px', fontWeight: '400'}} className="block mb-1 font-[Satoshi]">Full Name</label>
                   <div className="relative">
                      <input
                        name="name"
                        type="text"
                        placeholder="Yashwant sah"
                        style={{fontSize: '14px', fontWeight: '400', color: 'black'}}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2B7FFF] focus:border-transparent outline-none transition-all placeholder-[#6A7282]"
                        required
                      />
                   </div>
                   {state?.errors?.name && <p className="mt-1 text-xs text-red-600">{state.errors.name}</p>}
                </div>

                {role === 'ngo' && (
                  <div>
                    <label style={{color: 'black', fontSize: '14px', fontWeight: '400'}} className="block mb-1 font-[Satoshi]">Organization Name</label>
                    <input
                      name="organizationName"
                      type="text"
                       style={{fontSize: '14px', fontWeight: '400'}}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2B7FFF] focus:border-transparent outline-none transition-all placeholder-[#6A7282]"
                      placeholder="Hope Foundation"
                      required
                    />
                    {state?.errors?.organizationName && <p className="mt-1 text-xs text-red-600">{state.errors.organizationName}</p>}
                  </div>
                )}

                <div>
                    <label style={{color: 'black', fontSize: '14px', fontWeight: '400'}} className="block mb-1 font-[Satoshi]">Email Address</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6A7282]" />
                        <input
                            name="email"
                            type="email"
                            placeholder="yoy@example.com"
                             style={{fontSize: '14px', fontWeight: '400'}}
                            className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2B7FFF] focus:border-transparent outline-none transition-all placeholder-[#6A7282]"
                            required
                        />
                    </div>
                    {state?.errors?.email && <p className="mt-1 text-xs text-red-600">{state.errors.email}</p>}
                </div>

                <div>
                    <label style={{color: 'black', fontSize: '14px', fontWeight: '400'}} className="block mb-1 font-[Satoshi]">Password</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6A7282]" />
                        <input
                            name="password"
                            type={showPassword ? "text" : "password"}
                             style={{fontSize: '14px', fontWeight: '400'}}
                            className="w-full pl-9 pr-10 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2B7FFF] focus:border-transparent outline-none transition-all placeholder-[#6A7282]"
                            placeholder="••••••••"
                            required
                        />
                         <button type="button" onClick={togglePasswordVisibility} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6A7282] hover:text-black cursor-pointer">
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                    </div>
                    {state?.errors?.password && <p className="mt-1 text-xs text-red-600">{state.errors.password}</p>}
                </div>

                <div>
                    <label style={{color: 'black', fontSize: '14px', fontWeight: '400'}} className="block mb-1 font-[Satoshi]">Repeat Password</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6A7282]" />
                        <input
                            name="confirmPassword"
                            type={showPassword ? "text" : "password"}
                             style={{fontSize: '14px', fontWeight: '400'}}
                            className="w-full pl-9 pr-10 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2B7FFF] focus:border-transparent outline-none transition-all placeholder-[#6A7282]"
                            placeholder="••••••••"
                            // Not required for now to not break server action, visual only
                        />
                    </div>
                </div>

                {state?.message && <p className="text-xs text-red-600 text-center bg-red-50 p-1.5 rounded">{state.message}</p>}

                <button
                    type="submit"
                    disabled={pending}
                    style={{backgroundColor: '#1572A1', fontSize: '16px', fontWeight: '500'}}
                    className="w-full text-white py-2.5 px-4 rounded-lg shadow-lg hover:shadow-xl hover:opacity-90 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer font-[Satoshi] mt-1"
                >
                    {pending ? 'Creating Account...' : 'Sign Up'}
                </button>

                 <div className="relative my-3">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300"></div></div>
                    <div className="relative flex justify-center text-xs">
                        <span style={{color: '#6A7282', fontSize: '14px', fontWeight: '500'}} className="px-2 bg-white font-[Satoshi]">Or Continue with</span>
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-3">
                     <button 
                        type="button" 
                        onClick={() => signIn('google')}
                        className="flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
                     >
                         <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="h-4 w-4 mr-2" alt="Google" />
                         <span style={{color: '#4C4B4B', fontSize: '16px', fontWeight: '500'}} className="font-[Satoshi] group-hover:text-black">Google</span>
                     </button>
                     <button 
                        type="button" 
                        onClick={() => signIn('linkedin')}
                        className="flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
                     >
                         <img src="https://www.svgrepo.com/show/448234/linkedin.svg" className="h-4 w-4 mr-2" alt="LinkedIn" />
                         <span style={{color: '#4C4B4B', fontSize: '16px', fontWeight: '500'}} className="font-[Satoshi] group-hover:text-black">LinkedIn</span>
                     </button>
                 </div>
                 
                 <div className="mt-3 text-center text-xs text-gray-500">
                    Already have an account? <Link href="/signin" className="font-bold text-[#1572A1] hover:underline cursor-pointer">Sign In</Link>
                 </div>
            </form>
         </div>
      </div>

       {/* Right Side - Branding */}
       <AuthBranding />
    </div>
  );
}
