"use client"

import { motion, useMotionValue, useSpring, useTransform, useAnimationControls, type MotionValue } from "motion/react"
import { useRef } from "react"
import { AppIcon } from "./icons"
import { appMeta, useOS, type AppId } from "./store"

const MAIN: AppId[] = ["finder", "terminal", "music", "trophies", "notes", "mail"]
const TAIL: AppId[] = ["preview", "trash"]

export function Dock() {
  const mouseX = useMotionValue(Infinity)
  return (
    <nav aria-label="Dock" className="pointer-events-none absolute inset-x-0 bottom-3 z-[9000] flex justify-center">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="glass pointer-events-auto flex h-[66px] items-end gap-2 rounded-[22px] border border-white/25 bg-[var(--os-dock)] px-2.5 pb-2 shadow-[0_20px_50px_-15px_rgba(0,0,0,.5)]"
      >
        {MAIN.map((app) => (
          <DockItem key={app} app={app} mouseX={mouseX} />
        ))}
        <div className="mx-1 mb-1 h-11 w-px self-end bg-white/30" />
        {TAIL.map((app) => (
          <DockItem key={app} app={app} mouseX={mouseX} />
        ))}
      </motion.div>
    </nav>
  )
}

function DockItem({ app, mouseX }: { app: AppId; mouseX: MotionValue<number> }) {
  const os = useOS()
  const ref = useRef<HTMLButtonElement>(null)
  const bounce = useAnimationControls()
  const distance = useTransform(mouseX, (x) => {
    const r = ref.current?.getBoundingClientRect()
    return r ? x - r.left - r.width / 2 : Infinity
  })
  const size = useSpring(useTransform(distance, [-140, 0, 140], [50, 76, 50]), { stiffness: 380, damping: 26, mass: 0.2 })
  const scale = useTransform(size, (s) => s / 50)
  const running = os.windows.some((w) => w.app === app)

  const launch = () => {
    if (!running) bounce.start({ y: [0, -18, 0, -6, 0], transition: { duration: 0.6 } })
    os.open(app)
  }

  return (
    <motion.button
      ref={ref}
      onClick={launch}
      aria-label={appMeta[app].name}
      style={{ width: size, height: size }}
      animate={bounce}
      className="group relative flex flex-col items-center"
    >
      <span className="pointer-events-none absolute -top-10 whitespace-nowrap rounded-md bg-black/70 px-2.5 py-1 text-xs text-white opacity-0 shadow transition-opacity group-hover:opacity-100">
        {appMeta[app].name}
      </span>
      <motion.div style={{ scale }} className="absolute bottom-0 left-1/2 -ml-[25px] origin-bottom">
        <AppIcon app={app} size={50} />
      </motion.div>
      <span className={`absolute -bottom-[7px] h-1 w-1 rounded-full bg-[var(--os-bar-text)] transition-opacity ${running ? "opacity-80" : "opacity-0"}`} />
    </motion.button>
  )
}
