import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";




export default function RootLayout() {
  return (
    <>
    <div className="px-6 mx-auto max-w-7xl">
      <Navbar/>
       <Outlet/>
      <Footer/>
    </div></>
    
  )
}
