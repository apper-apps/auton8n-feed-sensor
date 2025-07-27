import React from "react"
import { Outlet } from "react-router-dom"
import Header from "@/components/organisms/Header"
import AnimatedBackground from "@/components/atoms/AnimatedBackground"

const Layout = () => {
  return (
    <div className="min-h-screen bg-black text-white relative">
      <AnimatedBackground />
      <Header />
      <main className="relative z-10">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout