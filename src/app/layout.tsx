import type { Metadata } from "next"
import "./globals.css";
import {Inter} from "next/font/google"
import Header from "@/components/layout/Header";
import { getCurrentSession } from "@/actions/auth";

const inter = Inter({subsets: ["latin"]});


export const metadata: Metadata = {
  title: "myApp",
  description: "Generated by Next.js",
};

const RootLayout = async ({
  children,
}: Readonly <{
  children: React.ReactNode
}>) => {
  const {user} = await getCurrentSession();
  
  return (
    <html lang="en">
      <body className = {`${inter.className} antialiased bg-white min-h-[120vh]`}>
        <Header user ={user}/>
        {children}
        </body>
    </html>
  )
}
export default RootLayout; 
