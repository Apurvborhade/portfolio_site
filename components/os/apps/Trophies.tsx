"use client"

import { ArrowRight } from "lucide-react"
import { achievements, projectBySlug, totalPrize } from "@/lib/data"
import { useOS, useWin } from "../store"
import { openProject } from "./Finder"

const METAL: Record<string, { face: string; rim: string; ink: string }> = {
  "1st": { face: "#ffd65a", rim: "#b8860b", ink: "#5a3d00" },
  "2nd": { face: "#e3e7ee", rim: "#8a93a3", ink: "#2d3340" },
  Track: { face: "#f0a46b", rim: "#9c5a2b", ink: "#4a2410" },
}

function Medal({ place }: { place: string }) {
  const m = METAL[place] ?? METAL.Track
  return (
    <div className="relative mx-auto h-24 w-24">
      {/* ribbon */}
      <div className="absolute -top-6 left-1/2 h-10 w-14 -translate-x-1/2 bg-[repeating-linear-gradient(90deg,#ff5a1f_0_8px,#1b1b1f_8px_16px)] [clip-path:polygon(0_0,100%_0,80%_100%,20%_100%)]" />
      <div
        className="absolute inset-0 grid place-items-center rounded-full shadow-[0_10px_24px_-8px_rgba(0,0,0,.5)]"
        style={{
          background: `conic-gradient(from 210deg, ${m.face}, #fff8 15%, ${m.face} 30%, ${m.rim} 55%, ${m.face} 75%, #fff6 88%, ${m.face})`,
          border: `3px solid ${m.rim}`,
        }}
      >
        <div className="grid h-[72%] w-[72%] place-items-center rounded-full" style={{ background: m.face, boxShadow: `inset 0 2px 6px ${m.rim}` }}>
          <span className="text-2xl font-medium" style={{ color: m.ink }}>
            {place === "Track" ? "★" : place}
          </span>
        </div>
      </div>
    </div>
  )
}

export function Trophies() {
  const os = useOS()
  const { compact } = useWin()
  return (
    <div className="scroll-thin h-full overflow-y-auto bg-[radial-gradient(120%_70%_at_50%_0%,var(--os-accent-soft),transparent_60%)]">
      <div className="px-7 pb-2 pt-8 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-os-muted">hackathon prize money</p>
        <p className="mt-1 font-light text-[clamp(2.75rem,8vw,4.5rem)] leading-none tracking-tight">
          ${totalPrize.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </p>
        <p className="mt-2 text-sm text-os-muted">{achievements.length} podiums · Lens Protocol, EigenCompute, ETHGlobal</p>
      </div>
      <div className={`grid gap-5 px-6 pb-8 pt-10 ${compact ? "grid-cols-1" : "grid-cols-3"}`}>
        {achievements.map((a) => {
          const project = a.project ? projectBySlug(a.project) : undefined
          return (
            <article key={a.title} className="flex flex-col rounded-2xl border border-os-line bg-os-raised p-5 pt-9 text-center shadow-sm">
              <Medal place={a.place} />
              <p className="mt-5 text-[11px] font-semibold uppercase tracking-wider text-os-accent">{a.place === "Track" ? "Track winner" : `${a.place} place`}</p>
              <h3 className="mt-1 text-[15px] font-semibold leading-snug">{a.event}</h3>
              <p className="mt-2 flex-1 text-[12.5px] leading-relaxed text-os-muted">{a.description}</p>
              <p className="mt-3 font-light text-2xl">{a.prize ?? "—"}</p>
              {project && (
                <button onClick={() => openProject(os, project)} className="mx-auto mt-3 inline-flex items-center gap-1 text-[12.5px] font-medium text-os-accent hover:underline">
                  See {project.title.toLowerCase()} <ArrowRight className="h-3.5 w-3.5" />
                </button>
              )}
            </article>
          )
        })}
      </div>
    </div>
  )
}
