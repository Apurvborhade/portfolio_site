"use client"

import { AnimatePresence } from "motion/react"
import { useCallback, useEffect, useState } from "react"
import { Boot } from "./Boot"
import { Desktop } from "./Desktop"
import { Mobile } from "./Mobile"
import { OSProvider, useOS, type Theme } from "./store"

const BOOTED_KEY = "apurvaos:booted"

export default function OS() {
  const [env, setEnv] = useState<{ mobile: boolean; theme: Theme } | null>(null)
  const [booting, setBooting] = useState(false)
  // bumping the key remounts the whole OS, which is what "Restart…" does
  const [session, setSession] = useState(0)

  useEffect(() => {
    let seen = false
    try {
      seen = sessionStorage.getItem(BOOTED_KEY) === "1"
    } catch {}
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    setEnv({
      mobile: window.matchMedia("(max-width: 767px)").matches,
      theme: "light",
    })
    setBooting(!seen && !reduced)
    const mq = window.matchMedia("(max-width: 767px)")
    const onChange = () => setEnv((e) => (e ? { ...e, mobile: mq.matches } : e))
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  const finishBoot = useCallback(() => {
    setBooting(false)
    try {
      sessionStorage.setItem(BOOTED_KEY, "1")
    } catch {}
  }, [])

  const reboot = useCallback(() => {
    setSession((n) => n + 1)
    setBooting(true)
  }, [])

  if (!env) return <div className="fixed inset-0 bg-[#e8e6e1]" />

  return (
    <OSProvider key={session} mobile={env.mobile} onReboot={reboot} initialTheme={env.theme}>
      <Themed>{booting ? null : env.mobile ? <Mobile /> : <Desktop />}</Themed>
      <AnimatePresence>{booting && <Boot onDone={finishBoot} />}</AnimatePresence>
    </OSProvider>
  )
}

function Themed({ children }: { children: React.ReactNode }) {
  const { theme } = useOS()
  useEffect(() => {
    document.documentElement.style.colorScheme = theme
  }, [theme])
  return (
    <div data-theme={theme} className="fixed inset-0">
      {children}
    </div>
  )
}
