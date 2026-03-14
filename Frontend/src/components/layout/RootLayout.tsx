import { Outlet } from "react-router-dom";

import { Toaster } from "sonner";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function RootLayout() {
  return (

    <div className="px-6 mx-auto max-w-7xl">
      <Toaster position="top-right" richColors />
      <Navbar />
      <Outlet />
      <Footer />
    </div>

  )
}
