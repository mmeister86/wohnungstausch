import Main from "@/components/main"
import HowItWorks from "@/components/how-it-works"
import CurrentOffers from "@/components/current-offers"
import * as React from "react"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black">
      <Main />
      <HowItWorks />
      <CurrentOffers />
    </div>
  )
}
