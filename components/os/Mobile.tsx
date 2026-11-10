"use client"

import { AnimatePresence, motion } from "motion/react"
import { ChevronLeft } from "lucide-react"
import { useEffect, useState } from "react"
import { profile } from "@/lib/data"
import { APPS } from "./apps"
import { Wallpaper } from "./Desktop"
import { AppIcon, GithubLogo } from "./icons"
import { useClock } from "./MenuBar"
import { About, NowBuildingWidget, SpotifyWidget } from "./Widgets"
import { appMeta, useOS, WinProvider, type AppId } from "./store"

const GRID: AppId[] = ["finder", "terminal", "trophies", "notes", "music", "mail", "preview"]
const DOCK: AppId[] = ["finder", "terminal", "music", "mail"]

export function Mobile() {
  const os = useOS()
  const now = useClock()
  const [width, setWidth] = useState(390)
  useEffect(() => {
    const sync = () => setWidth(window.innerWidth)
    sync()
    window.addEventListener("resize", sync)
    return () => window.removeEventListener("resize", sync)
  }, [])

  // the most recently focused window is the sheet on top
  const stack = [...os.windows].filter((w) => !w.minimized).sort((a, b) => a.z - b.z)
  const label = (app: AppId) => (app === "finder" ? "Projects" : app === "preview" ? "Resume" : appMeta[app].name.replace("Trophy Case", "Trophies"))

  return (
    <div className="fixed inset-0 overflow-hidden text-os-text">
      <Wallpaper />
      <div className="scroll-thin relative h-full overflow-y-auto px-5 pb-32 pt-3">
        <div className="flex items-center justify-between px-2 text-[13px] font-semibold tabular-nums">
          <span>{now?.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false })}</span>
          <span className="text-[12px] font-medium text-os-muted">{profile.location}</span>
        </div>

        <div className="mt-10">
          <About compact />
        </div>

        <div className="mt-10 grid grid-cols-4 gap-x-3 gap-y-5">
          {GRID.map((app) => (
            <button key={app} onClick={() => os.open(app)} className="flex flex-col items-center gap-1.5">
              <AppIcon app={app} size={58} />
              <span className="text-[11px] font-medium">{label(app)}</span>
            </button>
          ))}
          <a href={profile.github} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-1.5">
            <span className="grid h-[58px] w-[58px] place-items-center rounded-[23%] bg-[#18181b] text-white shadow">
              <GithubLogo className="h-7 w-7" />
            </span>
            <span className="text-[11px] font-medium">GitHub</span>
          </a>
        </div>

        <NowBuildingWidget className="mt-7" />
        <SpotifyWidget className="mt-3" />
      </div>

      <div className="glass absolute inset-x-5 bottom-5 flex justify-around rounded-[28px] border border-white/25 bg-[var(--os-dock)] p-3">
        {DOCK.map((app) => (
          <button key={app} onClick={() => os.open(app)} aria-label={label(app)}>
            <AppIcon app={app} size={56} />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {stack.map((w) => {
          const App = APPS[w.app]
          return (
            <motion.section
              key={w.id}
              role="dialog"
              aria-label={w.title}
              initial={{ y: "100%" }}
              animate={{ y: 0, transition: { type: "spring", stiffness: 380, damping: 38 } }}
              exit={{ y: "100%", transition: { duration: 0.25 } }}
              className="fixed inset-0 flex flex-col bg-os-win text-os-text glass"
              style={{ zIndex: 100 + w.z }}
            >
              <header className="flex h-12 shrink-0 items-center border-b border-os-line px-2">
                <button onClick={() => os.close(w.id)} className="flex items-center text-[15px] text-os-accent">
                  <ChevronLeft className="h-5 w-5" /> Back
                </button>
                <h2 className="flex-1 truncate pr-16 text-center text-[15px] font-semibold">{w.title}</h2>
              </header>
              <div className="relative min-h-0 flex-1">
                <WinProvider value={{ id: w.id, width, compact: true, props: w.props }}>
                  <App />
                </WinProvider>
              </div>
            </motion.section>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
