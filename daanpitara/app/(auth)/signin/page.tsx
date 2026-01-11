'use client';

import { useActionState, useState } from 'react';
import { signin, loginAdmin } from '@/actions/auth';
import Link from 'next/link';
import { Shield, ArrowLeft, Eye, EyeOff, Mail, Lock, CheckCircle } from 'lucide-react';
import { signIn } from 'next-auth/react';
import AuthBranding from '@/components/auth/AuthBranding';

export default function SigninPage() {
  const [role, setRole] = useState<'admin' | 'user' | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  
  // Separate states for different actions
  const [userState, userAction, userPending] = useActionState(signin, undefined);
  const [adminState, adminAction, adminPending] = useActionState(loginAdmin, undefined);

  // Toggle Password Visibility
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  if (!role) {
    return (
      <div className="h-screen w-screen bg-white flex flex-col md:flex-row overflow-hidden font-[Satoshi]">
        {/* Left Side - Selection */}
        <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-8 md:px-16 relative overflow-y-auto">
             <div className="max-w-md mx-auto w-full">
                 <div className="mb-8 text-center md:text-left">
                    <h1 className="text-3xl font-bold text-gray-900">Welcome To <span className="text-[#2B7FFF]">DaanPitara</span></h1>
                    <p className="mt-2 text-gray-500">Please select your role to continue</p>
                 </div>

                 <div className="space-y-4">
                     <button
                        onClick={() => setRole('user')}
                        className="w-full group flex items-center p-4 border-2 border-gray-100 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
                      >
                        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4">
                           <CheckCircle className="h-6 w-6" />
                        </div>
                        <div className="text-left">
                           <h3 className="font-bold text-gray-900">User / NGO Login</h3>
                           <p className="text-sm text-gray-500">For donors, NGOs, and partners</p>
                        </div>
                     </button>

                     <button
                        onClick={() => setRole('admin')}
                        className="w-full group flex items-center p-4 border-2 border-gray-100 rounded-2xl hover:border-red-500 hover:bg-red-50 transition-all duration-200"
                      >
                         <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 mr-4">
                           <Shield className="h-6 w-6" />
                        </div>
                        <div className="text-left">
                           <h3 className="font-bold text-gray-900">Admin Login</h3>
                           <p className="text-sm text-gray-500">Internal management portal</p>
                        </div>
                     </button>
                 </div>
                 
                 <div className="mt-8 text-center text-sm text-gray-500">
                    Don't have an account? <Link href="/signup" className="font-bold text-[#1572A1] hover:underline">Sign Up</Link>
                 </div>
            </div>
        </div>

        {/* Right Side - Branding */}
        <AuthBranding />
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-white flex flex-col md:flex-row overflow-hidden font-[Satoshi]">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-8 md:px-16 relative overflow-y-auto">
         <button 
            onClick={() => setRole(null)} 
            className="absolute top-8 left-8 flex items-center text-[#6A7282] hover:text-black transition-colors cursor-pointer z-10"
         >
            <ArrowLeft className="mr-2 h-5 w-5" /> Change Role
         </button>

         <div className="max-w-md mx-auto w-full py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 font-[Satoshi]">
                 {role === 'admin' ? 'Admin Login' : 'Welcome To DaanPitara'}
            </h1>
            <p className="text-gray-500 mb-6 font-[Satoshi]">Login to continue</p>

            {role === 'user' ? (
                /* USER FORM */
                <form action={userAction} className="space-y-4">
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
                        {userState?.errors?.email && <p className="mt-1 text-sm text-red-600">{userState.errors.email}</p>}
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
                        {userState?.errors?.password && <p className="mt-1 text-sm text-red-600">{userState.errors.password}</p>}
                    </div>
                    
                    <div className="flex justify-end">
                       <Link href="/forgot-password" className="text-sm font-medium text-[#1572A1] hover:text-blue-700 cursor-pointer font-[Satoshi]">Forgot Password?</Link>
                    </div>

                    {userState?.message && <p className="text-sm text-red-600 text-center bg-red-50 p-2 rounded">{userState.message}</p>}

                    <button
                        type="submit"
                        disabled={userPending}
                        style={{backgroundColor: '#1572A1'}}
                        className="w-full text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl hover:opacity-90 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer font-[Satoshi]"
                    >
                        {userPending ? 'Logging In...' : 'Login →'}
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
            ) : (
                /* ADMIN FORM */
                 <form action={adminAction} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 font-[Satoshi]">Admin Email</label>
                         <div className="relative">
                            <Shield className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                name="email"
                                type="email"
                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all placeholder-[#6A7282]"
                                required
                            />
                        </div>
                         {adminState?.errors?.email && <p className="mt-1 text-sm text-red-600">{adminState.errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 font-[Satoshi]">Password</label>
                        <div className="relative">
                             <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                className="w-full pl-10 pr-12 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all placeholder-[#6A7282]"
                                required
                            />
                             <button type="button" onClick={togglePasswordVisibility} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer">
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                        {adminState?.errors?.password && <p className="mt-1 text-sm text-red-600">{adminState.errors.password}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 font-[Satoshi]">Security Key</label>
                        <input
                            name="secretKey"
                            type="password"
                             className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all placeholder-[#6A7282]"
                            placeholder="Enter security key"
                            required
                        />
                         {adminState?.errors?.secretKey && <p className="mt-1 text-sm text-red-600">{adminState.errors.secretKey}</p>}
                    </div>

                     {adminState?.message && <p className="text-sm text-red-600 text-center bg-red-50 p-2 rounded">{adminState.message}</p>}

                    <button
                        type="submit"
                        disabled={adminPending}
                        className="w-full bg-gray-900 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer font-[Satoshi]"
                    >
                        {adminPending ? 'Verifying...' : 'Access Admin Portal ->'}
                    </button>
                 </form>
            )}
         </div>
      </div>

       {/* Right Side - Branding (Fixed for both views) */}
       {/* Right Side - Branding (Fixed for both views) */}
       <AuthBranding />
    </div>
  );
}
