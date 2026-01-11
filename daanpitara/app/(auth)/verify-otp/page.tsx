'use client';

import { useActionState, useState, use } from 'react';
import { resetPassword } from '@/actions/forgot-password';
import Link from 'next/link';
import { ArrowLeft, Lock, KeyRound } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

import AuthBranding from '@/components/auth/AuthBranding';

export default function VerifyOtpPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  
  const [state, action, pending] = useActionState(resetPassword, undefined);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="h-screen w-screen bg-white flex flex-col md:flex-row overflow-hidden font-[Satoshi]">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-8 md:px-16 relative overflow-y-auto">
         <Link 
            href="/forgot-password" 
            className="absolute top-8 left-8 flex items-center text-[#6A7282] hover:text-black transition-colors cursor-pointer z-10"
         >
            <ArrowLeft className="mr-2 h-5 w-5" /> Back
         </Link>

         <div className="max-w-md mx-auto w-full py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 font-[Satoshi]">
                 Reset Password
            </h1>
            <p className="text-gray-500 mb-8 font-[Satoshi]">
                Enter the OTP sent to <span className="font-semibold text-gray-900">{email}</span> and your new password.
            </p>

            <form action={action} className="space-y-4">
                <input type="hidden" name="email" value={email} />

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 font-[Satoshi]">One-Time Password (OTP)</label>
                    <div className="relative">
                        <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            name="otp"
                            type="text"
                            placeholder="123456"
                            maxLength={6}
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2B7FFF] focus:border-transparent outline-none transition-all placeholder-[#6A7282] tracking-widest"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 font-[Satoshi]">New Password</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2B7FFF] focus:border-transparent outline-none transition-all placeholder-[#6A7282]"
                            required
                        />
                    </div>
                    {state?.errors?.password && <p className="mt-1 text-sm text-red-600">{state.errors.password}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 font-[Satoshi]">Confirm Password</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            name="confirmPassword"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2B7FFF] focus:border-transparent outline-none transition-all placeholder-[#6A7282]"
                            required
                        />
                    </div>
                    {state?.errors?.confirmPassword && <p className="mt-1 text-sm text-red-600">{state.errors.confirmPassword}</p>}
                </div>

                 <div className="flex items-center mb-4">
                    <input 
                        type="checkbox" 
                        id="showPass"
                        checked={showPassword} 
                        onChange={() => setShowPassword(!showPassword)}
                        className="mr-2"
                    />
                    <label htmlFor="showPass" className="text-sm text-gray-600 cursor-pointer select-none">Show Passwords</label>
                </div>

                {state?.message && <p className="text-sm text-red-600 text-center bg-red-50 p-2 rounded">{state.message}</p>}

                <button
                    type="submit"
                    disabled={pending}
                    style={{backgroundColor: '#1572A1'}}
                    className="w-full text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl hover:opacity-90 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer font-[Satoshi]"
                >
                    {pending ? 'Resetting...' : 'Reset Password'}
                </button>
            </form>
         </div>
      </div>

       {/* Right Side - Branding */}
       <AuthBranding />
    </div>
  );
}
