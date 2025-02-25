/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { Loader2 } from "lucide-react"
import React from "react"
import { useActionState } from "react"
import Form from 'next/form'

const initialState= {
    message: '',
    success: false,
}
type SignUpProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    action: (prevState:any, formData: FormData) => Promise<{ message: string} | undefined>
}

const  SignUp = ({ action }: SignUpProps) => {
    const [state, formAction, isPending] = useActionState(action, initialState)

    return (
        <Form action={formAction} className="max-w-md mx-auto my-16 bg-white rounded-lg shadow-md text-black px-6 py-6">
            <h1 className="text-2xl font-bold text-center my-2">JOIN US NOW!</h1>
            <p className="text-center text-sm text-blue-600 font-semibold mb-2">
            🔵 LIMITED TIME OFFER 🔵
            </p>
            <p className="text-center text-sm text-gray-600 mb-6">
                Sign up now and get 90% OFF your first purchase! 🕙
            </p>
            <div className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email Address
                    </label>
                    <input 
                        type="email"
                        id="email"
                        name="email"
                        autoComplete="email"
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                        placeholder="Enter your email address"
                    />
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input 
                        type="password"
                        id="password"
                        name="password"
                        autoComplete="new-password"
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                        placeholder="Create a password"
                    />
                </div>
                <div className = 'text-center'>
                    <p className ='text-xs text-gray-500 mv-2'>⚡ Only 127 welcome bonus package remaining</p>
                    <p className ='text-xs text-gray-500 mv-4'>⌛ Offers expires in 19:29</p>
                    
                </div>

                {/* CTA & Loading State */}
                <button 
                    className={`w-full bg-blue-950 text-white py-3 rounded-md hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2 ${isPending ? 'cursor-not-allowed' : ''}`}
                    type="submit"
                    disabled={isPending}
                >
                    {isPending ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            CREATING ACCOUNT...
                        </>
                    ) : (
                        "CREATE ACCOUNT"
                    )}
                </button>
                {state?.message && state.message.length > 0 && (
                    <p className='text-center text-sm text-red-600'>
                        {state.message}
                    </p>
                )} 
            </div>
        </Form>
    )
}

export default SignUp
