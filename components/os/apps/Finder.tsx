"use client"

import { Award, Blocks, Briefcase, Cpu, LayoutGrid, List, Search, Server, Sparkles, SquareStack } from "lucide-react"
import { useState } from "react"
import { allProjects, profile, type ListedProject } from "@/lib/data"
import { GithubLogo } from "../icons"
import { useOS, useWin } from "../store"
import { Chip, ProjectCover } from "./shared"

const FOLDERS = [
  { id: "all", label: "All Projects", icon: SquareStack, match: (p: ListedProject) => p.kind === "personal" },
  { id: "winners", label: "Prize Winners", icon: Award, match: (p: ListedProject) => !!p.award },
  { id: "blockchain", label: "Blockchain", icon: Blocks, match: (p: ListedProject) => !!p.tags?.includes("blockchain") },
  { id: "backend", label: "Backend & Systems", icon: Server, match: (p: ListedProject) => !!p.tags?.includes("backend") },
  { id: "ai", label: "AI", icon: Sparkles, match: (p: ListedProject) => !!p.tags?.includes("ai") },
  { id: "frontend", label: "Frontend", icon: Cpu, match: (p: ListedProject) => !!p.tags?.includes("frontend") && p.kind === "personal" },
  { id: "freelance", label: "Client Work", icon: Briefcase, match: (p: ListedProject) => p.kind === "freelance" },
] as const

export function openProject(os: ReturnType<typeof useOS>, p: ListedProject) {
  os.open("project", { id: `project:${p.slug}`, title: p.title, props: { slug: p.slug } })
}

export function Finder() {
  const os = useOS()
  const { compact, width, props } = useWin()
  const [folder, setFolder] = useState<string>(props?.folder ?? "all")
  const [query, setQuery] = useState("")
  const [view, setView] = useState<"grid" | "list">("grid")
  const [selected, setSelected] = useState<string | null>(null)

  const current = FOLDERS.find((f) => f.id === folder) ?? FOLDERS[0]
  const q = query.trim().toLowerCase()
  const items = allProjects.filter(
    (p) => current.match(p) && (!q || `${p.title} ${p.description} ${p.techstack.join(" ")}`.toLowerCase().includes(q)),
  )
  const sel = items.find((p) => p.slug === selected)
  const showInspector = !compact && width >= 900
  const activate = (p: ListedProject) => (compact || os.mobile ? openProject(os, p) : setSelected(p.slug))

  return (
    <div className="flex h-full">
      {!compact && (
        <aside className="scroll-thin w-[190px] shrink-0 overflow-y-auto border-r border-os-line bg-os-side px-2 py-3 text-[13px]">
          <p className="px-2 pb-1 text-[11px] font-semibold text-os-muted">Folders</p>
          {FOLDERS.map((f) => (
            <button
              key={f.id}
              onClick={() => {
                setFolder(f.id)
                setSelected(null)
              }}
              className={`flex w-full items-center gap-2 rounded-md px-2 py-[5px] text-left ${folder === f.id ? "bg-os-hover font-medium" : "hover:bg-os-hover"}`}
            >
              <f.icon className="h-3.5 w-3.5 text-os-accent" />
              <span className="flex-1 truncate">{f.label}</span>
              <span className="text-[11px] text-os-muted">{allProjects.filter(f.match).length}</span>
            </button>
          ))}
          <p className="mt-4 px-2 pb-1 text-[11px] font-semibold text-os-muted">Elsewhere</p>
          <a href={profile.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-md px-2 py-[5px] hover:bg-os-hover">
            <GithubLogo className="h-3.5 w-3.5" /> GitHub ↗
          </a>
        </aside>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-3 border-b border-os-line px-4 py-2.5">
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-[15px] font-semibold">{current.label}</h3>
            <p className="text-[11px] text-os-muted">{items.length} items</p>
          </div>
          {!os.mobile && (
            <div className="flex rounded-md border border-os-line p-0.5">
              {(["grid", "list"] as const).map((v) => (
                <button key={v} onClick={() => setView(v)} aria-label={`${v} view`} className={`rounded px-1.5 py-1 ${view === v ? "bg-os-hover" : ""}`}>
                  {v === "grid" ? <LayoutGrid className="h-3.5 w-3.5" /> : <List className="h-3.5 w-3.5" />}
                </button>
              ))}
            </div>
          )}
          <label className="flex w-[38%] max-w-[220px] items-center gap-1.5 rounded-md border border-os-line bg-os-raised px-2 py-1">
            <Search className="h-3.5 w-3.5 shrink-0 text-os-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tech, name…"
              className="w-full bg-transparent text-[12.5px] outline-none placeholder:text-os-muted"
            />
          </label>
        </div>

        {compact && (
          <div className="scroll-thin flex gap-1.5 overflow-x-auto border-b border-os-line px-3 py-2">
            {FOLDERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFolder(f.id)}
                className={`shrink-0 rounded-full px-3 py-1 text-xs ${folder === f.id ? "bg-os-accent text-white" : "bg-os-hover"}`}
              >
                {f.label}
              </button>
            ))}
          </div>
        )}

        <div className="flex min-h-0 flex-1">
          <div className="scroll-thin min-w-0 flex-1 overflow-y-auto p-4" onClick={() => setSelected(null)}>
            {items.length === 0 && <p className="mt-16 text-center text-sm text-os-muted">Nothing matches “{query}”.</p>}
            {view === "grid" || os.mobile ? (
              <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(auto-fill, minmax(${compact ? 150 : 190}px, 1fr))` }}>
                {items.map((p) => (
                  <button
                    key={p.slug}
                    onClick={(e) => {
                      e.stopPropagation()
                      activate(p)
                    }}
                    onDoubleClick={() => openProject(os, p)}
                    className="group text-left"
                  >
                    <div
                      className={`relative overflow-hidden rounded-[10px] border transition ${
                        selected === p.slug ? "border-os-accent ring-2 ring-os-accent/40" : "border-os-line group-hover:-translate-y-0.5"
                      }`}
                    >
                      <ProjectCover project={p} className="aspect-[16/10] w-full" />
                      {p.award && (
                        <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-black/65 px-2 py-0.5 text-[10px] font-semibold text-[#ffd36b] backdrop-blur">
                          <Award className="h-3 w-3" /> {p.award.split("·")[0].trim()}
                        </span>
                      )}
                    </div>
                    <p className={`mt-2 truncate text-[13px] font-semibold ${selected === p.slug ? "text-os-accent" : ""}`}>{p.title}</p>
                    <p className="truncate text-[11px] text-os-muted">{p.date ?? p.roles.join(" · ").toLowerCase()}</p>
                  </button>
                ))}
              </div>
            ) : (
              <table className="w-full text-left text-[12.5px]">
                <thead className="text-[11px] text-os-muted">
                  <tr className="border-b border-os-line">
                    <th className="py-1.5 font-medium">Name</th>
                    <th className="font-medium">Role</th>
                    <th className="font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((p, i) => (
                    <tr
                      key={p.slug}
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelected(p.slug)
                      }}
                      onDoubleClick={() => openProject(os, p)}
                      className={`cursor-default ${selected === p.slug ? "bg-os-accent text-white" : i % 2 ? "bg-os-hover" : ""}`}
                    >
                      <td className="rounded-l-md px-2 py-1.5 font-medium">{p.title}</td>
                      <td className="opacity-80">{p.roles.join(", ").toLowerCase()}</td>
                      <td className="rounded-r-md opacity-80">{p.date ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {showInspector && !sel && (
            <aside className="grid w-[270px] shrink-0 place-items-center border-l border-os-line p-6 text-center text-[12.5px] text-os-muted">
              <p>
                Select a project to preview it.
                <br />
                Double-click to open.
              </p>
            </aside>
          )}
          {showInspector && sel && (
            <aside className="scroll-thin w-[270px] shrink-0 overflow-y-auto border-l border-os-line p-4">
              <ProjectCover project={sel} className="aspect-[16/10] w-full rounded-lg border border-os-line" />
              <h4 className="mt-3 text-[15px] font-semibold">{sel.title}</h4>
              {sel.award && <p className="mt-1 text-[11px] font-semibold text-os-accent">{sel.award}</p>}
              <p className="mt-2 line-clamp-6 text-[12.5px] leading-relaxed text-os-muted">{sel.description}</p>
              <div className="mt-3 flex flex-wrap gap-1">
                {sel.techstack.slice(0, 6).map((t) => (
                  <Chip key={t}>{t}</Chip>
                ))}
              </div>
              <button onClick={() => openProject(os, sel)} className="mt-4 w-full rounded-md bg-os-accent py-1.5 text-[13px] font-medium text-white hover:brightness-110">
                Open
              </button>
              <p className="mt-2 text-center text-[11px] text-os-muted">or double-click the project</p>
            </aside>
          )}
        </div>
      </div>
    </div>
  )
}
