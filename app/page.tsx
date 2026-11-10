import Link from "next/link"
import { ArrowDown, ArrowUpRight } from "lucide-react"
import { Albert_Sans } from "next/font/google"
import Image from "next/image"
import { personal_projects, freelance_projects, achievements, skills, education, type Project } from "@/lib/data"

const albertSans = Albert_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-albert-sans",
})

function HoverLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <Link href={href} target="_blank" className="text-sm inline-flex items-center relative group overflow-hidden px-2">
      <span className="relative z-10 group-hover:text-white transition-colors flex items-center">{children} <ArrowUpRight className="ml-1 h-4 w-4" /></span>
      <div className="absolute inset-0 bg-black transform translate-x-[-110%] group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></div>
    </Link>
  )
}

function ProjectRow({ project, index }: { project: Project, index: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-b border-[#000000]">
      <div className="-translate-y-6">
        <div className="text-sm font-medium">{`[0${index + 1}]`}</div>
        <div className="h-full w-full relative min-h-64">
          <Image alt={project.title} src={`${project.image.startsWith('http') ? project.image : `/projects/${project.image}`}`} fill className="md:object-contain object-cover" />
        </div>
      </div>
      <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">

        <div>
          <div className="flex items-baseline justify-between gap-4 mb-4">
            <h3 className="text-xl font-medium">{project.title}</h3>
            {project.date && <p className="text-xs whitespace-nowrap">{project.date}</p>}
          </div>
          {project.award && (
            <p className="inline-block text-xs font-medium bg-black text-white px-2 py-1 mb-4">{project.award}</p>
          )}
          <p className="uppercase text-sm mb-6">
            {project.description}
          </p>
          <div className="flex items-center gap-4">
            {project.link && <HoverLink href={project.link}>VIEW PROJECT</HoverLink>}
            {project.demo && <HoverLink href={project.demo}>DEMO</HoverLink>}
          </div>

          <div className="mt-16">
            <div className="mb-4">
              <h4 className="text-sm font-medium">ROLES</h4>
              <div className="flex items-center gap-3 mt-2">
                {project.roles.map((role, index) => (
                  <p className="text-xs uppercase" key={index}>{role}</p>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium">TECHNOLOGY</h4>
              <div className="flex flex-wrap items-center gap-3 w-full mt-2">
                {project.techstack.map((stack, index) => (
                  <p className="text-xs whitespace-nowrap uppercase" key={index}>{stack}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-[#000000]">
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center py-4">
          <div className="font-medium">APURVA BORHADE/</div>
          <nav className="flex items-center space-x-6 text-sm">
            <div className="md:mr-32 flex items-center justify-between gap-10">
              <Link href="#projects" className="font-medium relative group overflow-hidden px-2">
                <span className="relative z-10 group-hover:text-white transition-colors">PROJECTS</span>
                <div className="absolute inset-0 bg-black transform translate-x-[-110%] group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></div>
              </Link>
              <Link href="#achievements" className="font-medium relative group overflow-hidden px-2">
                <span className="relative z-10 group-hover:text-white transition-colors">ACHIEVEMENTS</span>
                <div className="absolute inset-0 bg-black transform translate-x-[-110%] group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></div>
              </Link>
              <Link
                href="/resume/resume.pdf"
                download
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium flex items-center justify-center relative group overflow-hidden px-2"
              >
                <span className="relative z-10 group-hover:text-white transition-colors flex items-center">
                  RESUME <ArrowUpRight className="scale-75" />
                </span>
                <div className="absolute inset-0 bg-black transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></div>
              </Link>
            </div>
            <Link href="#contact" className="font-medium relative group overflow-hidden px-2">
              <span className="relative z-10 group-hover:text-white transition-colors">CONTACT</span>
              <div className="absolute inset-0 bg-black transform translate-x-[-110%] group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></div>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h1 className="text-6xl md:text-7xl font-bold mb-8">APURVA BORHADE</h1>
            <p className={`${albertSans.className} text-justify uppercase  text-sm max-w-7xl leading-relaxed`}>
              Full-stack & blockchain engineer and computer engineering student at {education.institute} (CGPA {education.cgpa}). I build backend systems, event-driven infrastructure, and on-chain products — from cross-chain payroll to AI-agent marketplaces — and have won prizes at Lens Protocol, EigenCompute, and ETHGlobal hackathons.
            </p>
          </div>
          <div>
          </div>
        </div>
        <div className="w-full flex justify-end">
          <div className="text-right mt-16 flex items-center ml-auto">{`{ SCROLL FOR MORE`}<ArrowDown className="scale-75" />{`}`} </div>
        </div>
      </section>

      {/* Selected Projects */}
      <section id="projects" className="container mx-auto px-4 md:px-6 py-16">
        <h2 className="text-2xl font-medium mb-8">PERSONAL PROJECTS</h2>
        <div className="border-t border-[#000000] pt-4">
          {personal_projects.map((project, index) => (
            <ProjectRow key={project.title} project={project} index={index} />
          ))}
        </div>
      </section>

      <section id="freelance" className="container mx-auto px-4 md:px-6 py-16">
        <h2 className="text-2xl font-medium mb-8">FREELANCE PROJECTS</h2>
        <div className="border-t border-[#000000] pt-4">
          {freelance_projects.map((project, index) => (
            <ProjectRow key={project.title} project={project} index={index} />
          ))}
        </div>
      </section>

      {/* Achievements */}
      <section id="achievements" className="container mx-auto px-4 md:px-6 py-16">
        <h2 className="text-2xl font-medium mb-8">ACHIEVEMENTS</h2>
        <div className="border-t border-[#000000]">
          {achievements.map((achievement, index) => (
            <div key={achievement.title} className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 py-8 border-b border-[#000000]">
              <div className="text-sm font-medium">{`[0${index + 1}]`}</div>
              <div className="md:col-span-2 flex flex-col md:flex-row md:items-baseline justify-between gap-2">
                <div>
                  <h3 className="text-xl font-medium mb-2">{achievement.title}</h3>
                  <p className="uppercase text-sm">{achievement.description}</p>
                </div>
                {achievement.prize && <p className="text-3xl md:text-4xl font-bold whitespace-nowrap">{achievement.prize}</p>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="container mx-auto px-4 md:px-6 py-16">
        <h2 className="text-2xl font-medium mb-8">SKILLS</h2>
        <div className="border-t border-[#000000]">
          {skills.map((skill) => (
            <div key={skill.category} className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-8 py-6 border-b border-[#000000]">
              <h4 className="text-sm font-medium">{skill.category}</h4>
              <div className="md:col-span-2 flex flex-wrap gap-x-4 gap-y-2">
                {skill.items.map((item) => (
                  <p className="text-xs whitespace-nowrap uppercase" key={item}>{item}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="flex justify-between">
          <div>
            <h2 className="text-6xl md:text-9xl font-bold">GET IN</h2>
          </div>
          <div className="flex flex-col items-end">
            <h2 className="text-6xl md:text-9xl font-bold">TOUCH</h2>
            <div className="mt-16 text-right">
              <p className="text-sm mb-1">LET'S CONNECT -WHETHER YOU HAVE A QUESTION</p>
              <p className="text-sm mb-1">NEED ASSISTANCE, OR WANT TO EXPLORE OPPORTUNITIES</p>
              <p className="text-sm">I AM HERE TO HELP.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 md:px-6 py-8 border-t border-[#000000]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="flex space-x-6 mb-4 md:mb-0">
            <Link href="https://github.com/Apurvborhade" target="_blank" className="text-sm relative group overflow-hidden">
              <span className="relative z-10 group-hover:text-white transition-colors">GITHUB</span>
              <div className="absolute inset-0 bg-black transform translate-x-[-110%] group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></div>
            </Link>
            <Link href="https://x.com/apurvcodes" target="_blank" className="text-sm relative group overflow-hidden">
              <span className="relative z-10 group-hover:text-white transition-colors">X</span>
              <div className="absolute inset-0 bg-black transform translate-x-[-110%] group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></div>
            </Link>
          </div>
          <div>
            <a href="mailto:apurvaborhadee@gmail.com" className="text-sm">
              APURVABORHADEE@GMAIL.COM
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}

