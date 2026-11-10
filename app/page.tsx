import OS from "@/components/os/OS"
import { achievements, allProjects, profile, skills } from "@/lib/data"

export default function Home() {
  return (
    <main>
      <OS />
      {/* plain-text version for search engines and screen readers; the desktop above is client-rendered */}
      <div className="sr-only">
        <h1>
          {profile.name}, {profile.role}
        </h1>
        <p>{profile.summary}</p>
        <h2>Projects</h2>
        <ul>
          {allProjects.map((p) => (
            <li key={p.slug}>
              <h3>{p.title}</h3>
              {p.award && <p>{p.award}</p>}
              <p>{p.description}</p>
              {p.link && <a href={p.link}>{p.link}</a>}
            </li>
          ))}
        </ul>
        <h2>Achievements</h2>
        <ul>
          {achievements.map((a) => (
            <li key={a.title}>
              {a.title}: {a.description}
            </li>
          ))}
        </ul>
        <h2>Skills</h2>
        <ul>
          {skills.map((s) => (
            <li key={s.category}>
              {s.category}: {s.items.join(", ")}
            </li>
          ))}
        </ul>
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
      </div>
    </main>
  )
}
