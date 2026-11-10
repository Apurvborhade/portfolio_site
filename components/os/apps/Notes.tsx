"use client"

import { useState } from "react"
import { achievements, education, profile, totalPrize } from "@/lib/data"
import { useOS, useWin } from "../store"

type Note = { id: string; title: string; preview: string; body: (open: ReturnType<typeof useOS>["open"]) => React.ReactNode }

const link = "font-medium text-os-accent underline decoration-os-accent/30 underline-offset-2 hover:decoration-os-accent"

const NOTES: Note[] = [
  {
    id: "hello",
    title: "hello, world",
    preview: "I'm Apurva, a full-stack & blockchain engineer",
    body: (open) => (
      <>
        <p>
          I&apos;m <strong>{profile.name}</strong>, a {profile.role.toLowerCase()} based in {profile.location}.
        </p>
        <p>{profile.summary}</p>
        <p>
          Most of what I enjoy lives where money moves: cross-chain payroll with Circle&apos;s CCTP, Kafka-driven reconciliation, agents that negotiate and
          settle on-chain, and a private trading network running inside a TEE.
        </p>
        <p>
          Start with the{" "}
          <button className={link} onClick={() => open("finder")}>
            projects
          </button>
          , check the{" "}
          <button className={link} onClick={() => open("trophies")}>
            trophy case
          </button>
          , or{" "}
          <button className={link} onClick={() => open("mail")}>
            say hi
          </button>
          .
        </p>
      </>
    ),
  },
  {
    id: "now",
    title: "now",
    preview: "Building nony.money",
    body: (open) => (
      <>
        <p>
          Building <strong>nony.money</strong>: a private intent network where one attested AWS Nitro enclave holds the keys and the ledger, so deposits,
          swaps and withdrawals look like ordinary transfers on-chain.
        </p>
        <p>
          <button
            className={link}
            onClick={() => open("project", { id: "project:nony-money", title: "NONY.MONEY", props: { slug: "nony-money" } })}
          >
            Open the project →
          </button>
        </p>
      </>
    ),
  },
  {
    id: "edu",
    title: "education",
    preview: education.institute,
    body: () => (
      <>
        <p>
          <strong>{education.degree}</strong>
        </p>
        <p>
          {education.institute}, {education.location}
          <br />
          {education.period} · CGPA {education.cgpa}
        </p>
      </>
    ),
  },
  {
    id: "wins",
    title: "wins",
    preview: `$${Math.round(totalPrize).toLocaleString("en-US")}+ in hackathon prizes`,
    body: () => (
      <ul className="list-disc space-y-1 pl-5">
        {achievements.map((a) => (
          <li key={a.title}>
            {a.event}: {a.place === "Track" ? "track winner" : `${a.place} place`}
            {a.prize ? ` (${a.prize})` : ""}
          </li>
        ))}
      </ul>
    ),
  },
  {
    id: "site",
    title: "about this site",
    preview: "How this desktop is built",
    body: () => (
      <>
        <p>This site is a tiny operating system: Next.js, Tailwind and Motion, with a hand-rolled window manager (drag, resize, focus, minimise).</p>
        <p>Things to try: drag a window by its title bar, double-click it to fill the screen, switch wallpapers from the menu bar, or open Terminal and type <code className="rounded bg-os-hover px-1 font-mono text-[12px]">help</code>.</p>
      </>
    ),
  },
]

export function Notes() {
  const os = useOS()
  const { compact } = useWin()
  const [active, setActive] = useState(NOTES[0].id)
  const note = NOTES.find((n) => n.id === active)!

  return (
    <div className={`flex h-full ${compact ? "flex-col" : ""}`}>
      <aside
        className={`scroll-thin shrink-0 overflow-auto bg-os-side p-2 ${compact ? "flex gap-1.5 border-b border-os-line" : "w-[230px] space-y-0.5 border-r border-os-line"}`}
      >
        {NOTES.map((n) => (
          <button
            key={n.id}
            onClick={() => setActive(n.id)}
            className={`block rounded-lg text-left ${compact ? "shrink-0 px-3 py-1.5" : "w-full px-3 py-2"} ${
              n.id === active ? "bg-[#ffd65a] text-[#3d2e00]" : "hover:bg-os-hover"
            }`}
          >
            <span className="block text-[13px] font-semibold">{n.title}</span>
            {!compact && <span className={`block truncate text-[11.5px] ${n.id === active ? "text-[#3d2e00]/70" : "text-os-muted"}`}>{n.preview}</span>}
          </button>
        ))}
      </aside>
      <article className="scroll-thin min-w-0 flex-1 overflow-y-auto px-8 py-7">
        <p className="mb-2 text-center font-mono text-[11px] text-os-muted">{profile.location.toLowerCase()} · notes</p>
        <h3 className="mb-4 font-light text-4xl tracking-tight">{note.title}</h3>
        <div className="max-w-[60ch] space-y-3 text-[14.5px] leading-relaxed">{note.body(os.open)}</div>
      </article>
    </div>
  )
}
