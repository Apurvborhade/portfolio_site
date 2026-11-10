import { projectImage, type ListedProject } from "@/lib/data"

// hue derived from the title so generated covers stay stable between renders
const hue = (s: string) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) % 360, 7)

export function ProjectCover({ project, className = "" }: { project: ListedProject; className?: string }) {
  if (project.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={projectImage(project.image)} alt={project.title} draggable={false} className={`object-cover ${className}`} />
    )
  }
  const h = hue(project.title)
  return (
    <div
      className={`relative grid place-items-center overflow-hidden ${className}`}
      style={{
        containerType: "inline-size",
        background: `radial-gradient(80% 90% at 15% 110%, hsl(${h} 90% 60%), transparent 60%), radial-gradient(70% 80% at 90% -10%, hsl(${(h + 60) % 360} 80% 55%), transparent 60%), hsl(${(h + 200) % 360} 35% 12%)`,
      }}
    >
      <span className="font-light text-[clamp(1.5rem,6cqw,3.5rem)] tracking-tight text-white/90">{project.title.toLowerCase()}</span>
      <span className="absolute bottom-2 left-3 right-3 truncate font-mono text-[10px] uppercase tracking-widest text-white/50">{project.techstack.slice(0, 3).join(" · ")}</span>
    </div>
  )
}

export function Chip({ children, accent = false }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 font-mono text-[10.5px] uppercase tracking-wide ${
        accent ? "border-transparent bg-os-accent-soft text-os-accent" : "border-os-line text-os-muted"
      }`}
    >
      {children}
    </span>
  )
}
