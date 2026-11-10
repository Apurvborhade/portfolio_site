"use client"

import { useEffect, useRef, useState } from "react"
import { achievements, allProjects, education, profile, skills, totalPrize } from "@/lib/data"
import { useOS, type AppId } from "../store"
import { openProject } from "./Finder"

type Line = { id: number; input?: string; out?: React.ReactNode }

const HOST = "apurva@Apurvas-MacBook-Pro"

const APPS: Record<string, AppId> = {
  projects: "finder",
  finder: "finder",
  spotify: "music",
  music: "music",
  trophies: "trophies",
  achievements: "trophies",
  notes: "notes",
  about: "notes",
  mail: "mail",
  resume: "preview",
  trash: "trash",
}

const COMMANDS: [string, string][] = [
  ["about", "who I am"],
  ["skills [area]", "languages, frontend, backend, devops, dsa"],
  ["ls", "list projects"],
  ["open <name>", "open a project or app, e.g. open uniflow"],
  ["achievements", "hackathon wins"],
  ["education", "where I study"],
  ["contact", "ways to reach me"],
  ["clear", "clear the screen"],
]

const b = (s: string) => <span className="font-semibold">{s}</span>
const dim = (s: React.ReactNode) => <span className="opacity-55">{s}</span>
const a = (href: string, label: string) => (
  <a className="underline underline-offset-2" href={href} target="_blank" rel="noreferrer">
    {label}
  </a>
)

function lastLogin() {
  const d = new Date()
  const day = d.toLocaleDateString("en-US", { weekday: "short" })
  const month = d.toLocaleDateString("en-US", { month: "short" })
  return `Last login: ${day} ${month} ${String(d.getDate()).padStart(2, " ")} ${d.toTimeString().slice(0, 8)} on ttys000`
}

export function Terminal() {
  const os = useOS()
  const [lines, setLines] = useState<Line[]>([])
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<string[]>([])
  const [cursor, setCursor] = useState(-1)
  const scroller = useRef<HTMLDivElement>(null)
  const field = useRef<HTMLInputElement>(null)
  const nextId = useRef(0)

  const print = (input: string | undefined, out: React.ReactNode) => setLines((l) => [...l, { id: nextId.current++, input, out }])

  const run = (raw: string) => {
    const [name, ...rest] = raw.trim().split(/\s+/)
    const arg = rest.join(" ").toLowerCase()
    switch (name?.toLowerCase()) {
      case "":
        return print(raw, null)
      case "help":
        return print(
          raw,
          <div>
            {COMMANDS.map(([c, d]) => (
              <p key={c}>
                <span className="inline-block w-36">{c}</span>
                {dim(d)}
              </p>
            ))}
          </div>,
        )
      case "about":
      case "whoami":
        return print(
          raw,
          <div className="max-w-[64ch] space-y-2">
            <p>
              {b(profile.name)} {dim(`— ${profile.role}, ${profile.location}`)}
            </p>
            <p>{profile.summary}</p>
            <p>{dim(`${allProjects.length} projects · $${totalPrize.toLocaleString("en-US")} in hackathon prizes · CGPA ${education.cgpa}`)}</p>
          </div>,
        )
      case "skills": {
        const list = arg ? skills.filter((s) => s.category.toLowerCase().includes(arg)) : skills
        if (!list.length) return print(raw, `skills: no area "${arg}". try languages, frontend, backend, devops or dsa`)
        return print(
          raw,
          <div className="space-y-1.5">
            {list.map((s) => (
              <div key={s.category}>
                <p>{b(s.category.toLowerCase())}</p>
                <p className="pl-4">{s.items.map((i) => i.toLowerCase()).join(", ")}</p>
              </div>
            ))}
          </div>,
        )
      }
      case "ls":
      case "projects":
        return print(
          raw,
          <div className="grid grid-cols-[repeat(auto-fill,minmax(190px,1fr))]">
            {allProjects.map((p) => (
              <span key={p.slug}>{p.slug}</span>
            ))}
          </div>,
        )
      case "open":
      case "cd": {
        const project = allProjects.find((p) => p.slug === arg || p.slug.startsWith(arg) || p.title.toLowerCase() === arg)
        if (arg && project) {
          openProject(os, project)
          return print(raw, null)
        }
        if (APPS[arg]) {
          os.open(APPS[arg])
          return print(raw, null)
        }
        return print(raw, `${name}: no such file or directory: ${arg}`)
      }
      case "achievements":
        return print(
          raw,
          <div>
            {achievements.map((x) => (
              <p key={x.title}>
                {x.event} {dim(`— ${x.place === "Track" ? "track winner" : `${x.place} place`}${x.prize ? `, ${x.prize}` : ""}`)}
              </p>
            ))}
          </div>,
        )
      case "education":
        return print(raw, `${education.degree}, ${education.institute} (${education.period}, CGPA ${education.cgpa})`)
      case "contact":
        return print(
          raw,
          <div>
            <p>email   {a(`mailto:${profile.email}`, profile.email)}</p>
            <p>github  {a(profile.github, profile.github.replace("https://", ""))}</p>
            <p>x       {a(profile.x, profile.x.replace("https://", ""))}</p>
          </div>,
        )
      case "sudo":
        if (arg === "hire apurva") {
          setTimeout(() => os.open("mail"), 600)
          return print(raw, "Password: ••••••••\nOpening Mail…")
        }
        return print(raw, `${HOST.split("@")[0]} is not in the sudoers file. This incident will be reported.`)
      case "clear":
        return setLines([])
      case "date":
        return print(raw, new Date().toString())
      case "echo":
        return print(raw, rest.join(" "))
      case "pwd":
        return print(raw, "/Users/apurva")
      case "exit":
        return os.close("terminal")
      default:
        return print(raw, `zsh: command not found: ${name}`)
    }
  }

  useEffect(() => {
    if (nextId.current) return // strict mode runs effects twice in dev
    print(undefined, lastLogin())
    print(undefined, dim("Type `help` to see what this Mac can tell you about me."))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight })
  }, [lines])

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(input)
      if (input.trim()) setHistory((h) => [input, ...h])
      setInput("")
      setCursor(-1)
    } else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault()
      const next = Math.max(-1, Math.min(history.length - 1, cursor + (e.key === "ArrowUp" ? 1 : -1)))
      setCursor(next)
      setInput(next === -1 ? "" : history[next])
    } else if (e.key === "Tab") {
      e.preventDefault()
      const words = [...COMMANDS.map(([c]) => c.split(" ")[0]), ...allProjects.map((p) => `open ${p.slug}`)]
      const hit = words.find((w) => w.startsWith(input) && w !== input)
      if (hit) setInput(hit)
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault()
      setLines([])
    }
  }

  const prompt = <span>{HOST} ~ % </span>

  return (
    <div
      ref={scroller}
      onClick={() => window.getSelection()?.isCollapsed && field.current?.focus()}
      className="scroll-thin h-full overflow-y-auto bg-[var(--term-bg)] px-2 py-1.5 font-mono text-[12px] leading-[1.45] text-[var(--term-text)]"
    >
      {lines.map((l) => (
        <div key={l.id} className="whitespace-pre-wrap">
          {l.input !== undefined && (
            <p>
              {prompt}
              {l.input}
            </p>
          )}
          {l.out}
        </div>
      ))}
      <label className="flex">
        <span className="whitespace-pre">{HOST} ~ % </span>
        <input
          ref={field}
          autoFocus={!os.mobile}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKey}
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          aria-label="Terminal input"
          className="min-w-0 flex-1 bg-transparent text-[var(--term-text)] caret-[var(--term-text)] outline-none"
        />
      </label>
    </div>
  )
}
