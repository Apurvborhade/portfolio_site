import Link from "next/link"
import { ArrowDown, ArrowUpRight } from "lucide-react"
import { Albert_Sans } from "next/font/google"
import Image from "next/image"

const albertSans = Albert_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-albert-sans",
})

const personal_projects = [
  {
    title: "UNIFLOW",
    description: "A cross-chain payroll and treasury management platform enabling organizations to deposit USDC once, earn yield on idle funds, and automate multi-chain salary distribution using Circle infrastructure and Arc.",
    link: "https://github.com/Apurvborhade/UniFlow",
    roles: ['FULLSTACK', 'BLOCKCHAIN'],
    image: 'uniflow.jpg',
    techstack: [
      'NEXTJS',
      'NODEJS',
      'POSTGRESQL',
      'PRISMA',
      'CIRCLE API',
      'USDC',
      'CCTP',
      'DOCKER'
    ]
  },
  {
    title: "CREDORA",
    description: "An x402-based autonomous agent lending protocol enabling AI agents to borrow, retry failed crypto API payments, and auto-repay loans on-chain without human intervention.",
    link: "https://github.com/Apurvborhade/AI-Agent-x402-enabled-lending-protocol",
    roles: ['PROTOCOL ENGINEER', 'SMART CONTRACT'],
    image: 'https://placehold.co/600x400?text=CREDORA',
    techstack: [
      'SOLIDITY',
      'BASE',
      'NODEJS',
      'PYTHON',
      'SMART CONTRACTS',
      'ON-CHAIN WATCHERS'
    ]
  },
  {
    title: "RECONCILIATION ENGINE",
    description: "A distributed financial reconciliation system that validates on-chain transactions against internal ledgers using event-driven architecture and Kafka-based consumers.",
    link: "https://github.com/HarshalAndhale9657/Reconcillation-Engine",
    roles: ['BACKEND', 'SYSTEM DESIGN'],
    image: 'reconciliation.png',
    techstack: [
      'NODEJS',
      'KAFKA',
      'POSTGRESQL',
      'PRISMA',
      'DOCKER',
      'MICROSERVICES'
    ]
  },
  {
    title: "MEMED.FUN",
    description: "1st Prize winning Lens Protocol hackathon project. A decentralized meme-token platform integrating smart contracts, wallet flows, and on-chain engagement rewards.",
    link: "https://github.com/furkannabisumji/memed",
    roles: ['FRONTEND'],
    image: 'memed.png',
    techstack: [
      'NEXTJS',
      'TYPESCRIPT',
      'LENS SDK',
      'SMART CONTRACTS',
      'WEB3',
      'WALLET INTEGRATION'
    ]
  },
  {
    title: "1NODE",
    description: "A visual no-code DeFi automation platform enabling users to build multi-chain strategies using drag-and-drop workflows across Optimism and Etherlink.",
    link: "https://youtu.be/UzCThAJmoVU",
    roles: ['FRONTEND ENGINEER'],
    image: '1node.jpg',
    techstack: [
      'REACT FLOW',
      'TYPESCRIPT',
      'NEXTJS',
      'MULTICHAIN',
      '1INCH FUSION+',
      'SMART CONTRACT INTEGRATION'
    ]
  },
  {
    title: "GRADEWISE",
    description: "An AI-powered academic platform automating grading, plagiarism detection, and personalized feedback using embeddings and vector search.",
    link: "https://gradewise-lilac.vercel.app/",
    roles: ['FULLSTACK'],
    image: 'gradewise.jpg',
    techstack: [
      'NEXTJS',
      'FIREBASE',
      'SUPABASE',
      'PINECONE',
      'REDUX TOOLKIT',
      'ML EMBEDDINGS'
    ]
  }
];

const freelance_projects = [
  {
    title: "ARCHIIVE",
    description: "Designed and developed a sleek, high-performance portfolio site for a studio specializing in architectural photography. Features a stunning gallery, smooth navigation, and SEO optimization to showcase work beautifully and attract clients.",
    link: "https://archiive.co",
    roles: [
      'DEVELOPER', 'DESIGNER'
    ],
    image: 'archive.jpg',
    techstack: ['NEXTJS', 'TAILWINDCSS', 'GSAP']
  },
  {
    title: "SHRIYASH BORHADE",
    description: "Designed and developed a responsive, visually immersive portfolio for a 3D artist. Features dynamic galleries, smooth animations, and optimized performance for an engaging user experience. ",
    link: "https://shriyashborhade.com",
    roles: [
      'DEVELOPER', 'DESIGNER'
    ],
    image: 'shriyashborhade.png',
    techstack: ['NEXTJS', 'TAILWINDCSS', 'GSAP']
  },
  {
    title: "TEDX DYPDPU",
    description: "Designed and developed an engaging website for the TEDx DYPDPU event, featuring a modern layout and dynamic animations to highlight speakers, agenda, and essential event details. The platform enhances visibility and simplifies information access for attendees and organizers.",
    link: "https://tedxdypdpu.com",
    roles: [
      'DEVELOPER', 'DESIGNER'
    ],
    image: 'tedx.png',
    techstack: ['NEXTJS', 'TAILWINDCSS', 'GSAP', 'ThreeJS']
  },
]
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
              I’m passionate about building software solutions that are both functional and visually engaging. As a software engineering student, I love exploring new technologies, developing web applications, and continuously improving my skills. This website showcases my projects, technical expertise, and learning journey in the world of software development.
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
          {/* Projects */}
          {personal_projects && personal_projects.map((project, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-b border-[#000000]">
              <div className="-translate-y-6">
                <div className="text-sm font-medium">{`[0${index + 1}]`}</div>
                <div className="h-full w-full relative min-h-64">
                  <Image alt={project.title} src={`${project.image.startsWith('http') ? project.image : `/projects/${project.image}`}`} fill className="md:object-contain object-cover" />
                </div>
              </div>
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">

                <div>
                  <h3 className="text-xl font-medium mb-4">{project.title}</h3>
                  <p className="uppercase text-sm mb-6">
                    {project.description}
                  </p>
                  <Link href={project.link} target="_blank" className="text-sm inline-flex items-center relative group overflow-hidden px-2">
                    <span className="relative z-10 group-hover:text-white transition-colors flex items-center">VIEW PROJECT <ArrowUpRight className="ml-1 h-4 w-4" /></span>
                    <div className="absolute inset-0 bg-black transform translate-x-[-110%] group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></div>
                  </Link>

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
                      <div className="flex items-center gap-3 w-full mt-2">
                        {project.techstack.map((stack, index) => (
                          <p className="text-xs whitespace-nowrap uppercase" key={index}>{stack}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}


        </div>

      </section>
      <section id="projects" className="container mx-auto px-4 md:px-6 py-16">
        <h2 className="text-2xl font-medium mb-8">FREELANCE PROJECTS</h2>

        <div className="border-t border-[#000000] pt-4">
          {/* Project 1 */}
          {freelance_projects && freelance_projects.map((project, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-b border-[#000000]">
              <div className="-translate-y-6">
                <div className="text-sm font-medium">{`[0${index + 1}]`}</div>
                <div className="h-full w-full relative min-h-64">
                  <Image alt={project.title} src={`/projects/${project.image}`} fill className="md:object-contain object-contain" />
                </div>
              </div>
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">

                <div>
                  <h3 className="text-xl font-medium mb-4">{project.title}</h3>
                  <p className="uppercase text-sm mb-6">
                    {project.description}
                  </p>
                  <Link href={project.link} target="_blank" className="text-sm inline-flex items-center relative group overflow-hidden px-2">
                    <span className="relative z-10 group-hover:text-white transition-colors flex items-center">VIEW PROJECT <ArrowUpRight className="ml-1 h-4 w-4" /></span>
                    <div className="absolute inset-0 bg-black transform translate-x-[-110%] group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></div>
                  </Link>

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
                      <div className="flex items-center gap-3 w-full mt-2">
                        {project.techstack.map((stack, index) => (
                          <p className="text-xs whitespace-nowrap uppercase" key={index}>{stack}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
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

