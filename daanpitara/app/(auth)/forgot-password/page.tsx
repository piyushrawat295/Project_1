'use client';

import { useActionState } from 'react';
import { requestOtp } from '@/actions/forgot-password';
import Link from 'next/link';
import { ArrowLeft, Mail } from 'lucide-react';

import AuthBranding from '@/components/auth/AuthBranding';

export default function ForgotPasswordPage() {
  const [state, action, pending] = useActionState(requestOtp, undefined);

  return (
    <div className="h-screen w-screen bg-white flex flex-col md:flex-row overflow-hidden font-[Satoshi]">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-8 md:px-16 relative overflow-y-auto">
         <Link 
            href="/signin" 
            className="absolute top-8 left-8 flex items-center text-[#6A7282] hover:text-black transition-colors cursor-pointer z-10"
         >
            <ArrowLeft className="mr-2 h-5 w-5" /> Back to Login
         </Link>

         <div className="max-w-md mx-auto w-full py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 font-[Satoshi]">
                 Forgot Password
            </h1>
            <p className="text-gray-500 mb-8 font-[Satoshi]">
                Enter your email address and we'll send you an OTP to reset your password.
            </p>

            <form action={action} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-[Satoshi]">Email Address</label>
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
                    {state?.errors?.email && <p className="mt-1 text-sm text-red-600">{state.errors.email}</p>}
                </div>

                {state?.message && <p className="text-sm text-green-600 text-center bg-green-50 p-2 rounded">{state.message}</p>}

                <button
                    type="submit"
                    disabled={pending}
                    style={{backgroundColor: '#1572A1'}}
                    className="w-full text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl hover:opacity-90 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer font-[Satoshi]"
                >
                    {pending ? 'Sending OTP...' : 'Send OTP'}
                </button>
            </form>
         </div>
      </div>

       {/* Right Side - Branding */}
       <AuthBranding />
    </div>
  );
}
