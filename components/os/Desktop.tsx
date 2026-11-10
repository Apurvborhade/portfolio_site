"use client"

import { AnimatePresence, motion } from "motion/react"
import { useEffect, useState } from "react"
import { APPS } from "./apps"
import { Dock } from "./Dock"
import { AppIcon } from "./icons"
import { MenuBar } from "./MenuBar"
import { Spotlight } from "./Spotlight"
import { MENUBAR_H, useOS, type AppId } from "./store"
import { About, NowBuildingWidget, SpotifyWidget } from "./Widgets"
import { Window } from "./Window"

export function Wallpaper() {
  const os = useOS()
  return <div className={`wp wp-${os.wallpaper}`} aria-hidden />
}

export function Desktop() {
  const os = useOS()
  const [menu, setMenu] = useState<{ x: number; y: number } | null>(null)

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      onContextMenu={(e) => {
        if (e.target !== e.currentTarget && !(e.target as HTMLElement).dataset.desktop) return
        e.preventDefault()
        setMenu({ x: Math.min(e.clientX, window.innerWidth - 220), y: Math.min(e.clientY, window.innerHeight - 200) })
      }}
      onPointerDown={() => menu && setMenu(null)}
    >
      <Wallpaper />
      <div data-desktop="1" className="absolute inset-0" />

      <div className="pointer-events-none absolute inset-x-0 flex items-center justify-center px-6" style={{ top: MENUBAR_H, bottom: 92 }}>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.15 } }} className="pointer-events-auto">
          <About />
          <DesktopIcons />
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
        className="absolute bottom-[100px] right-6 flex w-[330px] flex-col gap-3"
      >
        <NowBuildingWidget />
        <SpotifyWidget />
      </motion.div>

      <AnimatePresence>
        {os.windows.map((w) => {
          const App = APPS[w.app]
          return (
            <Window key={w.id} win={w}>
              <App />
            </Window>
          )
        })}
      </AnimatePresence>

      <MenuBar />
      <Dock />
      <Spotlight />

      {menu && (
        <div
          className="glass absolute z-[9800] min-w-[200px] rounded-[10px] border border-os-line bg-os-win p-1.5 text-[13px] text-os-text shadow-[var(--os-shadow)]"
          style={{ left: menu.x, top: menu.y }}
          onPointerDown={(e) => e.stopPropagation()}
        >
          {[
            { label: "New Terminal", run: () => os.open("terminal") },
            { label: "Open Projects", run: () => os.open("finder") },
            { label: "Change Wallpaper", run: os.nextWallpaper },
            { label: os.theme === "dark" ? "Light Mode" : "Dark Mode", run: () => os.setTheme(os.theme === "dark" ? "light" : "dark") },
            { label: "Clean Up Windows", run: os.closeAll },
          ].map((i) => (
            <button
              key={i.label}
              onClick={() => {
                i.run()
                setMenu(null)
              }}
              className="block w-full rounded-[6px] px-2.5 py-1 text-left hover:bg-os-accent hover:text-white"
            >
              {i.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

type Icon = { id: string; label: string; open: () => void; glyph: React.ReactNode }

function DesktopIcons() {
  const os = useOS()
  const [selected, setSelected] = useState<string | null>(null)
  useEffect(() => {
    const clear = () => setSelected(null)
    window.addEventListener("pointerdown", clear)
    return () => window.removeEventListener("pointerdown", clear)
  }, [])
  const icon = (app: AppId) => <AppIcon app={app} size={56} />
  const icons: Icon[] = [
    { id: "projects", label: "Projects", open: () => os.open("finder"), glyph: icon("finder") },
    { id: "skills", label: "Skills", open: () => os.open("terminal"), glyph: icon("terminal") },
    { id: "wins", label: "Achievements", open: () => os.open("trophies"), glyph: icon("trophies") },
    { id: "about", label: "About me", open: () => os.open("notes"), glyph: icon("notes") },
    { id: "resume", label: "Resume.pdf", open: () => os.open("preview"), glyph: icon("preview") },
  ]
  return (
    <div className="mt-14 flex justify-center gap-4" onPointerDown={(e) => e.stopPropagation()}>
      {icons.map((i) => (
        <button
          key={i.id}
          onClick={() => setSelected(i.id)}
          onDoubleClick={() => {
            i.open()
            setSelected(null)
          }}
          onKeyDown={(e) => e.key === "Enter" && i.open()}
          className="group flex w-[92px] flex-col items-center gap-1 rounded-lg p-1.5 outline-none"
        >
          <span className={`grid h-[62px] place-items-center rounded-lg px-1 transition group-hover:-translate-y-0.5 ${selected === i.id ? "bg-os-hover" : ""}`}>{i.glyph}</span>
          <span className={`rounded px-1.5 text-[12px] font-medium ${selected === i.id ? "bg-os-accent text-white" : "text-os-text"}`}>
            {i.label}
          </span>
        </button>
      ))}
    </div>
  )
}
