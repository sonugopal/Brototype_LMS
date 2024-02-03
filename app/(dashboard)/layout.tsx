"use client"

import { ThemeProvider } from "@/components/providers/theme-provider";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";
import { motion, AnimatePresence } from "framer-motion"
import Carousel from "./_components/carousal";
import { usePathname } from "next/navigation";


const DashboardLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {

  const pathname = usePathname();
  const showCarousel = pathname == '/';
  const hideNavbar = pathname == '/teacher/courses' || pathname == '/teacher/users' || pathname == '/teacher/analytics'

  return (
    <ThemeProvider attribute='class' defaultTheme="system">
      <AnimatePresence>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: 'easeInOut', duration: 0.8 }}
        >
          <div className="h-full w-full">
            {
              !hideNavbar ?
                <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
                  <Navbar />
                </div> : null
            }
            <div className="hidden md:flex h-full md:w-56 w-20 flex-col fixed inset-y-0 z-50">
              <Sidebar />
            </div>
            <main className="md:pl-56  h-full">
              {
                showCarousel ?
                  <div className={` mx-9 relative top-20 inset-y-0`}>
                    <Carousel />
                  </div> : null
              }
              <div className="relative top-20">
                {children}
              </div>
            </main>
          </div>
        </motion.div>
      </AnimatePresence>
    </ThemeProvider>
  );
}

export default DashboardLayout;