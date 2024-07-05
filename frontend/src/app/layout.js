"use client"
import { Inter } from "next/font/google";
import { usePathname } from 'next/navigation'
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const path = usePathname();
  const isRender = path != "/login" && path != "/signup";
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {isRender && <Navbar />}
          {children}
          {isRender&&<Footer/>}
          <ToastContainer />
       </AuthProvider>
      </body>
    </html>
  );
}
