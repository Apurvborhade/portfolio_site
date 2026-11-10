"use client"

import { motion } from "motion/react"
import { useEffect } from "react"
import { Mark } from "./icons"

const DURATION = 1.8

export function Boot({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, DURATION * 1000 + 250)
    window.addEventListener("keydown", onDone)
    return () => {
      clearTimeout(t)
      window.removeEventListener("keydown", onDone)
    }
  }, [onDone])

  return (
    <motion.div
      key="boot"
      exit={{ opacity: 0, transition: { duration: 0.45 } }}
      onClick={onDone}
      className="fixed inset-0 z-[99999] flex cursor-default flex-col items-center justify-center bg-black text-white"
    >
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.4 } }}>
        <Mark className="h-[72px] w-[72px]" />
      </motion.div>
      <div className="mt-16 h-[5px] w-[180px] overflow-hidden rounded-full bg-white/25">
        <motion.div
          className="h-full rounded-full bg-white"
          initial={{ width: "0%" }}
          animate={{ width: "100%", transition: { duration: DURATION, ease: [0.4, 0.1, 0.3, 1] } }}
        />
      </div>
    </motion.div>
  )
}
