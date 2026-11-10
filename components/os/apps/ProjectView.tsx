"use client"

import { ArrowUpRight, Award, Calendar } from "lucide-react"
import { projectBySlug } from "@/lib/data"
import { GithubLogo } from "../icons"
import { useWin } from "../store"
import { Chip, ProjectCover } from "./shared"

export function ProjectView() {
  const { props, compact } = useWin()
  const p = props?.slug ? projectBySlug(props.slug) : undefined
  if (!p) return <p className="p-6 text-sm text-os-muted">Project not found.</p>

  const repo = p.link?.includes("github.com")
  return (
    <div className="scroll-thin h-full overflow-y-auto">
      <ProjectCover project={p} className="aspect-[16/8] w-full border-b border-os-line" />
      <div className={compact ? "p-5" : "grid grid-cols-[1fr_210px] gap-8 p-7"}>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            {p.award && (
              <span className="inline-flex items-center gap-1 rounded-full bg-os-accent px-2.5 py-1 text-[11px] font-semibold text-white">
                <Award className="h-3.5 w-3.5" /> {p.award}
              </span>
            )}
            {p.kind === "freelance" && <Chip accent>Client work</Chip>}
          </div>
          <h1 className="mt-3 font-light text-[clamp(2rem,5vw,3rem)] leading-none tracking-tight">{p.title.toLowerCase()}</h1>
          <p className="mt-4 text-[14.5px] leading-relaxed">{p.description}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {p.link && (
              <a href={p.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-lg bg-os-text px-3.5 py-2 text-[13px] font-medium text-[var(--os-win)] hover:opacity-90">
                {repo ? <GithubLogo className="h-3.5 w-3.5" /> : null}
                {repo ? "Source" : "Visit site"} <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
            {p.demo && (
              <a href={p.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-lg border border-os-line px-3.5 py-2 text-[13px] font-medium hover:bg-os-hover">
                {p.demo.includes("youtu") ? "Watch demo" : "Live demo"} <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
        <dl className={`space-y-4 text-[12.5px] ${compact ? "mt-6" : ""}`}>
          {p.date && (
            <div>
              <dt className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-os-muted">When</dt>
              <dd className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-os-muted" /> {p.date}
              </dd>
            </div>
          )}
          <div>
            <dt className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-os-muted">My role</dt>
            <dd className="flex flex-wrap gap-1">
              {p.roles.map((r) => (
                <Chip key={r} accent>
                  {r}
                </Chip>
              ))}
            </dd>
          </div>
          <div>
            <dt className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-os-muted">Stack</dt>
            <dd className="flex flex-wrap gap-1">
              {p.techstack.map((t) => (
                <Chip key={t}>{t}</Chip>
              ))}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
