"use client"

import { Music2 } from "lucide-react"
import { useState } from "react"
import { playlists } from "@/lib/data"
import { useWin } from "../store"

const COVERS = ["linear-gradient(135deg,#ff5a1f,#7a1fa2)", "linear-gradient(135deg,#1db954,#0b3d91)", "linear-gradient(135deg,#ffd65a,#ff3b6b)"]

export function Music() {
  const { compact } = useWin()
  const [active, setActive] = useState(0)
  const list = playlists[active]

  return (
    <div className="flex h-full bg-[#111113] text-white">
      {!compact && (
        <aside className="w-[210px] shrink-0 border-r border-white/5 bg-black/40 p-3">
          <p className="px-2 pb-2 text-[12px] font-semibold text-white/60">Your Library</p>
          {playlists.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActive(i)}
              className={`flex w-full items-center gap-2.5 rounded-md p-2 text-left ${i === active ? "bg-white/10" : "hover:bg-white/5"}`}
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded" style={{ background: COVERS[i % COVERS.length] }}>
                <Music2 className="h-4 w-4 text-white/80" />
              </span>
              <span className="min-w-0">
                <span className={`block truncate text-[13px] font-medium ${i === active ? "text-[#1ed760]" : ""}`}>{p.name}</span>
                <span className="block truncate text-[11px] text-white/50">{p.note}</span>
              </span>
            </button>
          ))}
        </aside>
      )}
      <div className="scroll-thin flex min-w-0 flex-1 flex-col overflow-y-auto">
        <div className="flex items-end gap-4 p-5 pb-4" style={{ background: `${COVERS[active % COVERS.length]}`, backgroundBlendMode: "multiply" }}>
          <div className="grid h-24 w-24 shrink-0 place-items-center rounded-md bg-black/25 shadow-xl">
            <Music2 className="h-10 w-10 text-white/90" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-white/80">What I code to</p>
            <h3 className="truncate font-light text-4xl leading-tight">{list.name}</h3>
            <p className="text-[12px] text-white/75">{list.note}</p>
          </div>
        </div>
        {compact && (
          <div className="flex gap-1.5 px-4 pt-3">
            {playlists.map((p, i) => (
              <button key={p.id} onClick={() => setActive(i)} className={`rounded-full px-3 py-1 text-xs ${i === active ? "bg-[#1ed760] text-black" : "bg-white/10"}`}>
                {p.name}
              </button>
            ))}
          </div>
        )}
        <div className="flex-1 p-4">
          <iframe
            key={list.id}
            title={`Spotify playlist: ${list.name}`}
            src={`https://open.spotify.com/embed/playlist/${list.id}?utm_source=generator&theme=0`}
            className="h-full min-h-[352px] w-full rounded-xl border-0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  )
}
