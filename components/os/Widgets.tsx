"use client"

import { ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"
import { playlists, profile, projectBySlug, projectImage, totalPrize } from "@/lib/data"
import { openProject } from "./apps/Finder"
import { useOS } from "./store"

export const widgetCard =
  "glass rounded-[20px] border border-white/25 bg-os-win text-os-text shadow-[0_14px_36px_-18px_rgba(0,0,0,.45)]"

const inline = "inline font-bold text-os-text underline decoration-os-text/40 decoration-[1.5px] underline-offset-[5px] transition hover:decoration-os-text"

// the desktop centrepiece: photo, role and a couple of lines about me
export function About({ compact = false }: { compact?: boolean }) {
  const os = useOS()
  const now = projectBySlug("nony-money")
  return (
    <div className={`flex items-center text-os-text ${compact ? "flex-col gap-6 text-center" : "gap-8 text-left"}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/os/me.jpg"
        alt={profile.name}
        draggable={false}
        className={`${compact ? "h-36 w-36" : "h-40 w-40"} shrink-0 rounded-full object-cover shadow-[0_18px_40px_-16px_rgba(0,0,0,.5)]`}
      />
      <div className={compact ? "max-w-[340px]" : "max-w-[440px]"}>
        <p className="text-[13px] font-bold uppercase tracking-[0.16em]">{profile.role}</p>
        <p className="mt-3 text-[15px] font-medium leading-relaxed text-os-muted">
          I&apos;m a computer engineering student at{" "}
          <button onClick={() => os.open("notes")} className={inline}>
            DYPIT
          </button>
          , based in {profile.location.split(",")[0]}.
        </p>
        <p className="mt-2.5 text-[15px] font-medium leading-relaxed text-os-muted">
          I&apos;m building{" "}
          {now && (
            <button onClick={() => openProject(os, now)} className={inline}>
              nony.money
            </button>
          )}
          , a private trading network inside a TEE, and I&apos;ve won{" "}
          <button onClick={() => os.open("trophies")} className={inline}>
            ${Math.floor(totalPrize / 1000)}k at hackathons
          </button>
          .
        </p>
        <button
          onClick={() => os.open("notes")}
          className="mt-5 inline-flex items-center gap-2 border-b-[1.5px] border-os-text/40 pb-1 text-[13px] font-bold uppercase tracking-[0.14em] transition hover:border-os-text"
        >
          More about me <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}

export function NowBuildingWidget({ className = "" }: { className?: string }) {
  const os = useOS()
  const p = projectBySlug("nony-money")
  if (!p) return null
  return (
    <div className={`${widgetCard} p-2.5 ${className}`}>
      <div className="flex items-center justify-between px-1.5 pb-2">
        <p className="flex items-center gap-1.5 text-[11.5px] font-medium text-os-muted">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#28c840] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#28c840]" />
          </span>
          currently building
        </p>
        {p.demo && (
          <a href={p.demo} target="_blank" rel="noreferrer" className="text-[11px] text-os-muted hover:text-os-text">
            {p.demo.replace("https://", "")} ↗
          </a>
        )}
      </div>
      <button onClick={() => openProject(os, p)} className="group flex w-full gap-3 rounded-[12px] bg-os-hover p-2 text-left">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={projectImage(p.image)} alt="" className="h-[74px] w-[118px] shrink-0 rounded-md border border-os-line object-cover transition group-hover:brightness-110" />
        <div className="min-w-0 py-0.5">
          <p className="text-[14px] font-semibold">{p.title.toLowerCase()}</p>
          <p className="mt-0.5 line-clamp-2 text-[12px] leading-snug text-os-muted">Private intent network: one attested TEE holds the keys and the ledger.</p>
          <p className="mt-1 truncate text-[10.5px] text-os-muted">{p.techstack.slice(0, 3).join(" · ").toLowerCase()}</p>
        </div>
      </button>
    </div>
  )
}

export function SpotifyWidget({ className = "" }: { className?: string }) {
  const [active, setActive] = useState(0)
  const list = playlists[active]
  return (
    <div className={`${widgetCard} p-2.5 ${className}`}>
      <div className="flex items-center justify-between px-1.5 pb-2">
        <p className="flex items-center gap-1.5 text-[11.5px] font-medium text-os-muted">
          <span className="flex h-3 items-end gap-[2px]" aria-hidden>
            {[0.5, 1, 0.7].map((h, i) => (
              <span key={i} className="w-[2px] animate-pulse rounded-full bg-[#1ed760]" style={{ height: `${h * 100}%`, animationDelay: `${i * 0.2}s` }} />
            ))}
          </span>
          on my desk
        </p>
        {playlists.length > 1 && (
          <div className="flex gap-1">
            {playlists.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setActive(i)}
                className={`rounded-full px-2 py-0.5 text-[10.5px] ${i === active ? "bg-os-text text-[var(--os-win)]" : "text-os-muted hover:bg-os-hover"}`}
              >
                {p.name}
              </button>
            ))}
          </div>
        )}
      </div>
      <iframe
        key={list.id}
        title={`Spotify playlist: ${list.name}`}
        src={`https://open.spotify.com/embed/playlist/${list.id}?utm_source=generator&theme=0`}
        className="block h-[152px] w-full rounded-[12px] border-0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
    </div>
  )
}
