/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { Loader2 } from "lucide-react"
import Form from "next/Form"
import React from "react"
import { useActionState } from "react"
const theMessage = {
    message: '',
}

type SignUpProps = {
    action: (prevState: any, formData: FormData) => Promise<{message: string | null}> 
}
const SignUp = ({action}: SignUpProps) => {
    const [useAction,formAction,isPending] = useActionState(action, theMessage)

    return (
        <Form action={formAction} className ='max-w-md mx-auto my-16 bg-white rounded-lg shadow-md text-black'>
            <h1 className = 'text-2xl font-semibold text-center my-4'>
                JOIN US NOW!
            </h1>
            <p className = 'text-center text-sm text-rose-600 font-semibold mb-2 my-4'>
            🔥LIMITED TIME OFFER🔥
            </p>
            <p className = 'text-center text-sm text-gray-600 mb-6 my-4'>
                Sign up now and get 90& OFF your first purchase!🕙
            </p>
            <div className='space-y-6 px-4'>
                <div className = 'space-y-2'>
                    {/*email*/}
                    <label htmlFor="email" className = 'block text-sm font-medium text-gray'>Email Address</label>
                    <input 
                        type='email'
                        id='email'
                        autoComplete='email'
                        required
                        className= 'w-full px-4 py-3 border border-gry-200 rounded-md focus:ring-2 focus:ring-black focus:border-transparent transition-colors'
                        placeholder='Enter your email address '
                     />
                </div>
                <div className = 'space-y-2'>
                    {/*password*/}
                    <label htmlFor="password" className = 'block text-sm font-medium text-gray'>Password</label>
                    <input 
                        type='password'
                        id='password'
                        autoComplete='password'
                        required
                        className= 'w-full px-4 py-3 border border-gry-200 rounded-md focus:ring-2 focus:ring-black focus:border-transparent transition-colors'
                        placeholder='Create a password'
                     />
                </div>

                <div className = ''>
                     {/*copy*/}
                     <p className = 'text-sm text-gray-500 mb-4 text-center '>⚡Only 345 welcome bonus packages remaining!</p>
                     <p className = 'text-sm text-gray-500 mb-4 text-center'>⏱Offer expires in 13:45</p>

                </div>
                <button 
                        className={`w-full bg-rose-600 text-white py-3 rounded-md hover:bg-rose-700 transition-colors font-medium flex item-center justify-center gap-2 ${isPending ? 'cursor-not-allowed': ''}`}
                        type='submit'
                        disabled={isPending}
                        >

                     {/*create account*/}
                     {isPending ? (
                            <React.Fragment>
                                <Loader2 className='h-4 w-4 animate-spin '/>
                                CREATING ACCOUNT...
                            </React.Fragment>
                     ):(
                        'CREATE ACCOUNT'
                     )}
                </button>
            </div>

        </Form>
    )
}
export default SignUp