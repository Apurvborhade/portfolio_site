"use client"

import { motion } from "motion/react"
import { useEffect, useRef, useState } from "react"
import { DOCK_SPACE, MENUBAR_H, useOS, WinProvider, type Win } from "./store"

const MIN_W = 360
const MIN_H = 240

export function Window({ win, children }: { win: Win; children: React.ReactNode }) {
  const os = useOS()
  const focused = os.focused?.id === win.id
  // live geometry while dragging/resizing; committed to the store on release
  const [live, setLive] = useState<{ x: number; y: number; w: number; h: number } | null>(null)
  const drag = useRef<{ mode: "move" | "resize"; px: number; py: number; x: number; y: number; w: number; h: number } | null>(null)
  const [vp, setVp] = useState({ w: 1440, h: 900 })

  useEffect(() => {
    const sync = () => setVp({ w: window.innerWidth, h: window.innerHeight })
    sync()
    window.addEventListener("resize", sync)
    return () => window.removeEventListener("resize", sync)
  }, [])

  const geo = win.maximized
    ? { x: 8, y: MENUBAR_H + 8, w: vp.w - 16, h: vp.h - MENUBAR_H - DOCK_SPACE - 8 }
    : live ?? { x: win.x, y: win.y, w: win.w, h: win.h }

  const start = (mode: "move" | "resize") => (e: React.PointerEvent) => {
    if (e.button !== 0 || win.maximized) return
    e.preventDefault()
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    drag.current = { mode, px: e.clientX, py: e.clientY, x: win.x, y: win.y, w: win.w, h: win.h }
    os.focus(win.id)
  }

  const onMove = (e: React.PointerEvent) => {
    const d = drag.current
    if (!d) return
    const dx = e.clientX - d.px
    const dy = e.clientY - d.py
    if (d.mode === "move") {
      setLive({
        x: Math.min(Math.max(d.x + dx, 80 - d.w), vp.w - 80),
        y: Math.min(Math.max(d.y + dy, MENUBAR_H), vp.h - 60),
        w: d.w,
        h: d.h,
      })
    } else {
      setLive({ x: d.x, y: d.y, w: Math.max(MIN_W, d.w + dx), h: Math.max(MIN_H, d.h + dy) })
    }
  }

  const onUp = () => {
    const d = drag.current
    drag.current = null
    if (!d || !live) return
    if (d.mode === "move") os.move(win.id, live.x, live.y)
    else os.resize(win.id, live.w, live.h)
    setLive(null)
  }

  return (
    <motion.section
      role="dialog"
      aria-label={win.title}
      initial={{ opacity: 0, scale: 0.94, y: 14 }}
      animate={
        win.minimized
          ? { opacity: 0, scale: 0.2, y: vp.h - geo.y, transition: { duration: 0.32, ease: [0.4, 0, 0.6, 1] } }
          : { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 420, damping: 34 } }
      }
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.14 } }}
      onPointerDownCapture={() => !focused && os.focus(win.id)}
      className="glass absolute flex flex-col overflow-hidden rounded-[14px] bg-os-win text-os-text"
      style={{
        left: geo.x,
        top: geo.y,
        width: geo.w,
        height: geo.h,
        zIndex: win.z,
        boxShadow: "var(--os-shadow)",
        pointerEvents: win.minimized ? "none" : "auto",
        transition: live ? undefined : "left .28s cubic-bezier(.2,.8,.2,1), top .28s cubic-bezier(.2,.8,.2,1), width .28s cubic-bezier(.2,.8,.2,1), height .28s cubic-bezier(.2,.8,.2,1)",
      }}
    >
      <header
        onPointerDown={start("move")}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onDoubleClick={() => os.maximize(win.id)}
        className="relative flex h-10 shrink-0 cursor-default select-none items-center border-b border-os-line px-3.5"
      >
        <TrafficLights win={win} active={focused} />
        <h2 className={`pointer-events-none absolute inset-x-28 truncate text-center text-[13px] font-semibold ${focused ? "" : "opacity-50"}`}>
          {win.title}
        </h2>
      </header>
      <div className="relative min-h-0 flex-1">
        <WinProvider value={{ id: win.id, width: geo.w, compact: geo.w < 640, props: win.props }}>{children}</WinProvider>
      </div>
      {!win.maximized && (
        <div
          onPointerDown={start("resize")}
          onPointerMove={onMove}
          onPointerUp={onUp}
          className="absolute bottom-0 right-0 h-4 w-4 cursor-nwse-resize"
          aria-hidden
        />
      )}
    </motion.section>
  )
}

function TrafficLights({ win, active }: { win: Win; active: boolean }) {
  const os = useOS()
  const btn = "grid h-3 w-3 place-items-center rounded-full text-[8px] font-black leading-none text-black/60"
  const off = "bg-os-line"
  return (
    <div className="group relative z-10 flex items-center gap-2" onPointerDown={(e) => e.stopPropagation()}>
      <button aria-label="Close" onClick={() => os.close(win.id)} className={`${btn} ${active ? "bg-[#ff5f57]" : off} group-hover:bg-[#ff5f57]`}>
        <span className="opacity-0 group-hover:opacity-100">×</span>
      </button>
      <button aria-label="Minimize" onClick={() => os.minimize(win.id)} className={`${btn} ${active ? "bg-[#febc2e]" : off} group-hover:bg-[#febc2e]`}>
        <span className="opacity-0 group-hover:opacity-100">−</span>
      </button>
      <button aria-label="Maximize" onClick={() => os.maximize(win.id)} className={`${btn} ${active ? "bg-[#28c840]" : off} group-hover:bg-[#28c840]`}>
        <span className="opacity-0 group-hover:opacity-100">+</span>
      </button>
    </div>
  )
}
