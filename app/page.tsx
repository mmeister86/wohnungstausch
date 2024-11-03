"use client"
import Header from "@/components/header"
import Main from "@/components/main"
import Footer from "@/components/footer"
import * as React from "react"

export default function LandingPage() {
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const totalSlides = 5

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black">
      <Header />
      <Main currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} totalSlides={totalSlides} />
      <Footer />
    </div>
  )
}
