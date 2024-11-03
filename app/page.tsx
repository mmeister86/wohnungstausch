"use client"
import Header from "@/components/header"
import Main from "@/components/main"
import Footer from "@/components/footer"
import * as React from "react"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black">
      <Header />
      <Main />
      <Footer />
    </div>
  )
}
