export type Project = {
  title: string
  description: string
  link?: string
  demo?: string
  date?: string
  award?: string
  roles: string[]
  // empty image renders a generated cover
  image: string
  techstack: string[]
  tags?: Tag[]
}

export type Tag = "blockchain" | "backend" | "frontend" | "ai" | "freelance"


export const education = {
  institute: "Dr. D.Y. Patil Institute of Technology, Pimpri",
  degree: "Bachelor of Engineering (Computer Engineering)",
  cgpa: "8.8",
  period: "June 2024 - August 2028",
  location: "Pune, Maharashtra",
}

export const personal_projects: Project[] = [
  {
    title: "NONY.MONEY",
    tags: ["blockchain", "backend"],
    description: "A private intent network: deposit ETH into TEE-secured custody addresses, swap on price conditions through the Uniswap Trading API, and withdraw to a fresh wallet. One attested AWS Nitro enclave holds the keys and the private ledger, so on-chain activity looks like regular transfers, with no privacy contracts involved.",
    link: "https://github.com/Apurvborhade/nony-money",
    demo: "https://nony.money",
    date: "NOV 2026",
    roles: ['FULLSTACK', 'BLOCKCHAIN'],
    image: 'nony.png',
    techstack: [
      'TYPESCRIPT',
      'AWS NITRO TEE',
      'UNISWAP TRADING API',
      'ETHEREUM',
      'FOUNDRY'
    ]
  },
  {
    title: "SITEPROOF",
    tags: ["ai", "frontend", "backend"],
    description: "Verified construction progress from the footage builders already take. Reads demand letters and bills of quantities, counts installed windows and doors in site clips with SAM 3.1, and marks every claim Verified, Short or Not seen yet with frame-level evidence. Built for the Meta Global AI Developer Hackathon; I led the frontend (the report and the demo) and also worked on the backend.",
    link: "https://github.com/furqaannabi/siteproof",
    demo: "https://siteproof-alpha.vercel.app",
    date: "OCT - NOV 2026",
    roles: ['FRONTEND', 'BACKEND'],
    image: 'siteproof.jpg',
    techstack: [
      'NEXTJS',
      'TYPESCRIPT',
      'SAM 3.1',
      'MUSE SPARK',
      'HONO',
      'BUN',
      'POSTGRESQL'
    ]
  },
  {
    title: "UNIFLOW",
    tags: ["blockchain", "backend"],
    description: "A cross-chain payroll system enabling a single USDC deposit with automated multi-chain salary distribution. Integrated Circle Developer-Controlled Wallets and CCTP for secure custody and cross-chain settlement, with event-driven backend services for treasury management, reconciliation, and automated payouts.",
    link: "https://github.com/Apurvborhade/UniFlow",
    demo: "https://youtu.be/aJNL2ifjt8Q",
    date: "FEB 2026",
    roles: ['BACKEND BLOCKCHAIN ENGINEER'],
    image: 'uniflow.jpg',
    techstack: [
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
    title: "DEALFORGE",
    tags: ["blockchain", "ai"],
    description: "A trustless AI-agent marketplace where agents autonomously negotiate, escrow funds, and settle deals entirely on-chain. LLM-powered negotiation (Venice AI / Gemini) evaluates proposals and generates counter-offers, with decentralized work verification on EigenCloud TEEs and EIP-712 cryptographic identity for passwordless auth.",
    link: "https://github.com/furqaannabi/DealForge",
    date: "MAR 2026",
    award: "2ND PRIZE · EIGENCOMPUTE",
    roles: ['FULLSTACK', 'BLOCKCHAIN'],
    image: '',
    techstack: [
      'SOLIDITY',
      'EIGENCLOUD TEE',
      'EIP-712',
      'VENICE AI',
      'GEMINI',
      'TYPESCRIPT'
    ]
  },
  {
    title: "RECONCILIATION ENGINE",
    tags: ["backend"],
    description: "A microservice-based financial transaction reconciliation engine using Kafka for asynchronous event processing. Durable transaction state management with PostgreSQL and Prisma, and fault-tolerant consumers with retry handling and deterministic matching to reconcile transaction records.",
    link: "https://github.com/HarshalAndhale9657/Reconcillation-Engine",
    date: "JAN - FEB 2026",
    roles: ['FULLSTACK'],
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
    tags: ["blockchain", "frontend"],
    description: "A decentralized meme-token platform built on Lens Protocol. Built the frontend integrating smart contracts and on-chain interactions, including wallet connection, transaction flows, and dynamic state updates.",
    link: "https://github.com/furqaannabi/memed",
    demo: "https://www.alchemy.com/university/projects/memedfun-lens-spring-hackathon",
    date: "MAY 2025",
    award: "1ST PRIZE · LENS PROTOCOL HACKATHON",
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
    tags: ["blockchain", "frontend"],
    description: "A multi-chain, no-code DeFi automation platform enabling users to build strategies using drag-and-drop workflows across Optimism and Etherlink.",
    demo: "https://youtu.be/UzCThAJmoVU",
    date: "JUL 2025",
    roles: ['FRONTEND'],
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
    title: "CREDORA",
    tags: ["blockchain", "ai"],
    description: "An x402-based autonomous agent lending protocol enabling AI agents to borrow, retry failed crypto API payments, and auto-repay loans on-chain without human intervention.",
    link: "https://github.com/Apurvborhade/AI-Agent-x402-enabled-lending-protocol",
    roles: ['PROTOCOL ENGINEER', 'SMART CONTRACT'],
    image: '',
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
    title: "GRADEWISE",
    tags: ["ai", "frontend"],
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
]

export const freelance_projects: Project[] = [
  {
    title: "NAECRE STUDIO",
    tags: ["freelance", "frontend"],
    description: "Designed and developed a cinematic portfolio site for Naecre, a creative studio specializing in film, motion and art direction. Features a full-screen video showreel with a scrubbable project strip, a live studio clock, and scroll-driven GSAP animations.",
    link: "https://naecre.studio",
    roles: [
      'DEVELOPER', 'DESIGNER'
    ],
    image: 'naecre.png',
    techstack: ['REACT', 'VITE', 'GSAP', 'SCROLLTRIGGER']
  },
  {
    title: "ARCHIIVE",
    tags: ["freelance", "frontend"],
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
    tags: ["freelance", "frontend"],
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
    tags: ["freelance", "frontend"],
    description: "Designed and developed an engaging website for the TEDx DYPDPU event, featuring a modern layout and dynamic animations to highlight speakers, agenda, and essential event details. The platform enhances visibility and simplifies information access for attendees and organizers.",
    link: "https://tedxdypdpu.com",
    roles: [
      'DEVELOPER', 'DESIGNER'
    ],
    image: 'tedx.png',
    techstack: ['NEXTJS', 'TAILWINDCSS', 'GSAP', 'ThreeJS']
  },
]

export const achievements = [
  {
    title: "1ST PRIZE · LENS PROTOCOL HACKATHON",
    place: "1st",
    event: "Lens Protocol Hackathon",
    prize: "$20,000",
    amount: 20000,
    project: "memed-fun",
    description: "Built Memed.fun, a decentralized meme-token platform.",
  },
  {
    title: "2ND PLACE · EIGENCOMPUTE (SYNTHESIS)",
    place: "2nd",
    event: "EigenCompute · Synthesis",
    amount: 0,
    project: "dealforge",
    description: "Built DealForge, a trustless AI-agent marketplace with on-chain settlement.",
  },
  {
    title: "ETHGLOBAL · SELFIE CHECK TRACK WINNER",
    place: "Track",
    event: "ETHGlobal · Selfie Check (World ID)",
    prize: "$1,166.67",
    amount: 1166.67,
    description: "Won the World ID-sponsored track for ArcAsset.",
  },
]

export const totalPrize = achievements.reduce((sum, a) => sum + a.amount, 0)

export const skills = [
  { category: "LANGUAGES", items: ['TYPESCRIPT', 'JAVASCRIPT', 'PYTHON', 'SOLIDITY', 'JAVA', 'SQL'] },
  { category: "FRONTEND", items: ['REACT.JS', 'NEXT.JS', 'TAILWIND CSS', 'REDUX'] },
  { category: "BACKEND & SYSTEMS", items: ['NODE.JS', 'EXPRESS.JS', 'POSTGRESQL', 'KAFKA', 'MICROSERVICES'] },
  { category: "DEVOPS & TOOLS", items: ['DOCKER', 'KUBERNETES', 'ARGOCD', 'GRAFANA', 'AWS', 'GIT', 'FOUNDRY', 'POSTMAN'] },
  { category: "DSA", items: ['ARRAYS', 'HASH MAPS', 'TREES', 'GRAPHS', 'DYNAMIC PROGRAMMING', 'GREEDY', 'BINARY SEARCH'] },
]

export const profile = {
  name: "Apurva Borhade",
  role: "Full-stack & Blockchain Engineer",
  location: "Pune, India",
  timezone: "Asia/Kolkata",
  email: "apurvaborhadee@gmail.com",
  github: "https://github.com/Apurvborhade",
  x: "https://x.com/apurvcodes",
  site: "apurvaborhade.dev",
  resume: "/resume/resume.pdf",
  bio: "I build backend systems, event-driven infrastructure and on-chain products. Computer engineering student in Pune, and a regular at hackathons.",
  summary: "I build backend systems, event-driven infrastructure and on-chain products, from cross-chain payroll to AI-agent marketplaces, and I've won prizes at Lens Protocol, EigenCompute and ETHGlobal hackathons.",
}

// swap these for your own Spotify playlists (the id is the last part of the playlist URL)
export const playlists = [
  { id: "37i9dQZF1DWWQRwui0ExPn", name: "Lofi Beats", note: "default coding loop" },
  { id: "37i9dQZF1DWZeKCadgRdKQ", name: "Deep Focus", note: "for debugging at 2am" },
]

export const slugify = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")

export const allProjects = [
  ...personal_projects.map((p) => ({ ...p, slug: slugify(p.title), kind: "personal" as const })),
  ...freelance_projects.map((p) => ({ ...p, slug: slugify(p.title), kind: "freelance" as const })),
]

export type ListedProject = (typeof allProjects)[number]

export const projectBySlug = (slug: string) => allProjects.find((p) => p.slug === slug)

export const projectImage = (image: string) => (image.startsWith("http") ? image : `/projects/${image}`)
