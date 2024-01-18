"use client"

import { ThemeProvider } from "@/components/providers/theme-provider";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";
import { motion, AnimatePresence } from "framer-motion"


const DashboardLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return ( 
    <ThemeProvider attribute='class' defaultTheme="system">
      <AnimatePresence>
        <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ type: 'easeInOut', duration: 0.8 }}
        >
          <div className="h-full">
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <main className="md:pl-56 pt-[80px] h-full">
        {children}
      </main>
    </div>
        </motion.div>
      </AnimatePresence>
    </ThemeProvider>
   );
}
 
export default DashboardLayout;