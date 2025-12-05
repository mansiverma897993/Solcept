"use client"

import { SolanaLearningUniverse } from "@/components/solana-learning-universe"
import { useEffect, useState } from "react"

export default function Home() {
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error("[v0] Client error:", event.error)
      setError(event.error)
    }

    window.addEventListener("error", handleError)
    return () => window.removeEventListener("error", handleError)
  }, [])

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="max-w-md p-6 text-center">
          <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
          <p className="text-muted-foreground mb-4">
            Please try refreshing the page. If the problem persists, your browser may not support WebGL or 3D graphics.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90"
          >
            Reload Page
          </button>
        </div>
      </div>
    )
  }

  return <SolanaLearningUniverse />
}
