"use client"

import { AnimatePresence, motion } from "motion/react"
import { Search } from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"
import { allProjects, profile } from "@/lib/data"
import { openProject } from "./apps/Finder"
import { AppIcon } from "./icons"
import { appMeta, useOS, type AppId } from "./store"

type Result = { id: string; label: string; kind: string; icon: React.ReactNode; run: () => void }

const APPS: AppId[] = ["finder", "terminal", "trophies", "notes", "music", "mail", "preview"]

export function Spotlight() {
  const os = useOS()
  const [query, setQuery] = useState("")
  const [index, setIndex] = useState(0)
  const field = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        os.setSpotlight(!os.spotlight)
      } else if (e.key === "Escape" && os.spotlight) {
        os.setSpotlight(false)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [os])

  useEffect(() => {
    if (os.spotlight) {
      setQuery("")
      setIndex(0)
      setTimeout(() => field.current?.focus(), 10)
    }
  }, [os.spotlight])

  const results = useMemo<Result[]>(() => {
    const q = query.trim().toLowerCase()
    const all: Result[] = [
      ...APPS.map((app) => ({
        id: app,
        label: appMeta[app].name,
        kind: "Application",
        icon: <AppIcon app={app} size={22} />,
        run: () => os.open(app),
      })),
      ...allProjects.map((p) => ({
        id: p.slug,
        label: p.title.toLowerCase(),
        kind: p.kind === "freelance" ? "Client work" : `Project · ${p.techstack.slice(0, 2).join(", ").toLowerCase()}`,
        icon: <AppIcon app="finder" size={22} />,
        run: () => openProject(os, p),
      })),
      { id: "resume-dl", label: "Download resume", kind: "Action", icon: <AppIcon app="preview" size={22} />, run: () => window.open(profile.resume, "_blank") },
      { id: "email", label: `Email ${profile.email}`, kind: "Action", icon: <AppIcon app="mail" size={22} />, run: () => (window.location.href = `mailto:${profile.email}`) },
    ]
    if (!q) return all.slice(0, 7)
    return all.filter((r) => `${r.label} ${r.kind}`.toLowerCase().includes(q) || allProjects.find((p) => p.slug === r.id)?.techstack.join(" ").toLowerCase().includes(q))
  }, [query, os])

  const choose = (r?: Result) => {
    if (!r) return
    r.run()
    os.setSpotlight(false)
  }

  return (
    <AnimatePresence>
      {os.spotlight && (
        <motion.div
          className="fixed inset-0 z-[9900]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.12 } }}
          onPointerDown={() => os.setSpotlight(false)}
        >
          <motion.div
            initial={{ scale: 0.97, y: -6, x: "-50%" }}
            animate={{ scale: 1, y: 0, x: "-50%" }}
            onPointerDown={(e) => e.stopPropagation()}
            className="glass absolute left-1/2 top-[22%] w-[min(640px,calc(100vw-32px))] overflow-hidden rounded-[16px] border border-os-line bg-os-win text-os-text shadow-[var(--os-shadow)]"
          >
            <label className="flex items-center gap-3 px-4 py-3">
              <Search className="h-5 w-5 text-os-muted" />
              <input
                ref={field}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setIndex(0)
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault()
                    setIndex((i) => Math.min(results.length - 1, i + 1))
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault()
                    setIndex((i) => Math.max(0, i - 1))
                  } else if (e.key === "Enter") choose(results[index])
                }}
                placeholder="Spotlight Search"
                aria-label="Spotlight Search"
                className="flex-1 bg-transparent text-[20px] font-light outline-none placeholder:text-os-muted"
              />
            </label>
            {results.length > 0 && (
              <ul className="scroll-thin max-h-[340px] overflow-y-auto border-t border-os-line p-1.5">
                {results.map((r, i) => (
                  <li key={r.id}>
                    <button
                      onMouseEnter={() => setIndex(i)}
                      onClick={() => choose(r)}
                      className={`flex w-full items-center gap-3 rounded-[8px] px-2.5 py-1.5 text-left text-[13.5px] ${i === index ? "bg-os-accent text-white" : ""}`}
                    >
                      {r.icon}
                      <span className="flex-1 truncate">{r.label}</span>
                      <span className={`truncate text-[12px] ${i === index ? "text-white/75" : "text-os-muted"}`}>{r.kind}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
