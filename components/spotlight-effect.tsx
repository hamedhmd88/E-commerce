"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function SpotlightEffect() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {/* Dark overlay */}
      <motion.div
        className="absolute inset-0 bg-black/20 dark:bg-black/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Moving spotlight */}
      <motion.div
        className="absolute w-96 h-96 rounded-full"
        style={{
          background: `radial-gradient(circle, transparent 40%, rgba(0,0,0,0.8) 70%)`,
          filter: "blur(1px)",
        }}
        animate={{
          x: mousePosition.x - 192, // Half of width (384px / 2)
          y: mousePosition.y - 192, // Half of height (384px / 2)
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
          opacity: { duration: 0.3 },
        }}
      />

      {/* Inner bright spotlight */}
      <motion.div
        className="absolute w-32 h-32 rounded-full bg-white/10 dark:bg-white/20"
        style={{
          filter: "blur(8px)",
        }}
        animate={{
          x: mousePosition.x - 64, // Half of width (128px / 2)
          y: mousePosition.y - 64, // Half of height (128px / 2)
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 300,
          opacity: { duration: 0.3 },
        }}
      />
    </div>
  )
}
