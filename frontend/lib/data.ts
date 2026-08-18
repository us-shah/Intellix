export const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Divisions", href: "#divisions" },
  { label: "Academy", href: "/academy" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" }
];

export const divisions = [
  {
    name: "Software House",
    slug: "software-house",
    blurb:
      "Enterprise applications, CRMs, ERPs, and SaaS products engineered to run production workloads from day one.",
    icon: "Code2"
  },
  {
    name: "AI Lab",
    slug: "ai-lab",
    blurb:
      "LLM applications, agentic systems, RAG pipelines, and computer vision built for real operational use.",
    icon: "BrainCircuit"
  },
  {
    name: "Data Analytics",
    slug: "data-analytics",
    blurb:
      "BI dashboards, ETL pipelines, and predictive models that turn raw data into decisions leadership trusts.",
    icon: "BarChart3"
  },
  {
    name: "Academy",
    slug: "academy",
    blurb:
      "Cohort-based training in programming, AI, and analytics with mentorship, projects, and placement support.",
    icon: "GraduationCap"
  },
  {
    name: "Cloud Solutions",
    slug: "cloud-solutions",
    blurb:
      "Cloud architecture, migration, and DevOps on AWS, Azure, and GCP — built for uptime and cost control.",
    icon: "Cloud"
  },
  {
    name: "Research Center",
    slug: "research-center",
    blurb:
      "Applied research in ML and systems, published openly and fed directly back into client-facing products.",
    icon: "FlaskConical"
  },
  {
    name: "Digital Marketing",
    slug: "digital-marketing",
    blurb:
      "SEO, paid acquisition, and content strategy for technology brands that need to be found and trusted.",
    icon: "Megaphone"
  },
  {
    name: "Startup Incubator",
    slug: "startup-incubator",
    blurb:
      "Technical co-founding support, MVP builds, and architecture guidance for early-stage founders.",
    icon: "Rocket"
  }
];

export const services = {
  "Software House": [
    "Enterprise Software",
    "CRM & ERP Systems",
    "Hospital & School Management Systems",
    "SaaS Product Engineering",
    "API Development",
    "Long-Term Maintenance"
  ],
  "AI & Machine Learning": [
    "LLM Applications & AI Agents",
    "RAG Systems",
    "Computer Vision",
    "NLP & Generative AI",
    "AI Automation",
    "Recommendation Systems"
  ],
  "Data Analytics": [
    "Power BI & Tableau Dashboards",
    "SQL & Advanced Excel Analytics",
    "ETL Pipelines & Data Warehousing",
    "Executive & KPI Reporting",
    "Predictive Analytics",
    "Marketing & HR Analytics"
  ],
  "Cloud & DevOps": [
    "AWS, Azure & GCP Architecture",
    "Docker & Kubernetes",
    "CI/CD Pipelines",
    "Infrastructure Monitoring",
    "Cloud Cost Optimization",
    "Migration & Modernization"
  ]
};

export const process = [
  {
    step: "01",
    title: "Discover",
    description:
      "We map your workflows, constraints, and success metrics before a single line of code is written."
  },
  {
    step: "02",
    title: "Architect",
    description:
      "Systems and data models are designed for the scale you'll actually reach, not just the demo."
  },
  {
    step: "03",
    title: "Build",
    description:
      "Engineers ship in short cycles with continuous review, so you see working software every week."
  },
  {
    step: "04",
    title: "Launch & Support",
    description:
      "We deploy, monitor, and stay on to maintain, tune, and extend the system as your business grows."
  }
];

export const stats = [
  { value: 120, suffix: "+", label: "Projects Delivered" },
  { value: 40, suffix: "+", label: "Enterprise Clients" },
  { value: 1500, suffix: "+", label: "Academy Graduates" },
  { value: 98, suffix: "%", label: "Client Retention" }
];

export const technologies = [
  "Next.js", "React", "TypeScript", "Node.js", "FastAPI", "Python",
  "PostgreSQL", "Docker", "Kubernetes", "AWS", "LangChain", "PyTorch",
  "Power BI", "Tableau", "GraphQL", "Flutter"
];

export const testimonials = [
  {
    quote:
      "Intellix rebuilt our inventory and POS systems from the ground up. Stock discrepancies dropped to near zero within the first quarter.",
    name: "Ayesha Raza",
    role: "Operations Director, Retail Chain"
  },
  {
    quote:
      "Their AI Lab shipped a support agent that now resolves most of our tier-one tickets without a human touching them.",
    name: "Hamza Farooq",
    role: "Head of Product, SaaS Startup"
  },
  {
    quote:
      "The BI dashboards Intellix built gave our leadership team a single source of truth for the first time in company history.",
    name: "Sara Malik",
    role: "CFO, Manufacturing Group"
  }
];

export const faqs = [
  {
    q: "What industries does Intellix work with?",
    a: "We work across retail, healthcare, education, manufacturing, and financial services, along with early-stage startups building their first product."
  },
  {
    q: "Do you offer fixed-price or time-and-materials engagements?",
    a: "Both. Clearly scoped projects run fixed-price; ongoing product work runs on a monthly retainer with a dedicated team."
  },
  {
    q: "Can Intellix Academy graduates join client projects?",
    a: "Top-performing graduates move into paid internships and, in many cases, full-time roles on delivery teams."
  },
  {
    q: "Do you sign NDAs and handle data securely?",
    a: "Yes. Every engagement starts with an NDA, and production systems follow role-based access control and encryption at rest and in transit."
  },
  {
    q: "How long does a typical software project take?",
    a: "A focused MVP typically ships in 6–10 weeks; enterprise systems with integrations run 3–6 months depending on scope."
  }
];


// Public-site content used by the marketing pages. Kept typed as any[] so pages can evolve independently.
export const values: any[] = [
 { title: "Engineering Excellence", description: "We build maintainable systems with measurable business outcomes." },
 { title: "Trust & Security", description: "Security, privacy and responsible access are part of every delivery." },
 { title: "Continuous Learning", description: "Our academy and engineering teams share knowledge through real projects." },
 { title: "Client Partnership", description: "We work as a long-term technology partner, not a one-off vendor." },
];
export const milestones: any[] = [
 { year: "2024", label: "Intellix expanded its software, data and AI delivery practice." },
 { year: "2025", label: "Academy programs and enterprise product development were unified." },
 { year: "2026", label: "Intellix Platform brought CRM, LMS, analytics and AI into one workspace." },
];
export const departments: any[] = [
 { name:"Software Engineering", slug:"software-engineering", courses:[{title:"Full Stack Web Development",slug:"full-stack-web-development",duration:"6 months"},{title:"Python & FastAPI",slug:"python-fastapi",duration:"4 months"}] },
 { name:"Artificial Intelligence", slug:"artificial-intelligence", courses:[{title:"AI & Machine Learning",slug:"ai-machine-learning",duration:"6 months"},{title:"LLM & RAG Engineering",slug:"llm-rag-engineering",duration:"4 months"}] },
 { name:"Data Analytics", slug:"data-analytics", courses:[{title:"Data Analytics Professional",slug:"data-analytics-professional",duration:"5 months"}] },
];
export const courseDetails: Record<string, any> = {
 "full-stack-web-development": { outcomes:["Build responsive web applications","Create secure APIs","Deploy production projects"], curriculum:["Web foundations","React and Next.js","Python and FastAPI","Databases and deployment"], instructor:"Intellix Engineering Faculty" },
 "python-fastapi": { outcomes:["Build REST APIs","Use SQL databases","Implement authentication"], curriculum:["Python","FastAPI","SQLAlchemy","Deployment"], instructor:"Intellix Engineering Faculty" },
 "ai-machine-learning": { outcomes:["Prepare data","Train ML models","Deploy AI solutions"], curriculum:["Python for AI","Machine learning","Deep learning","MLOps"], instructor:"Intellix AI Faculty" },
 "llm-rag-engineering": { outcomes:["Build RAG systems","Integrate LLM APIs","Evaluate AI applications"], curriculum:["LLM foundations","Embeddings","Vector search","RAG applications"], instructor:"Intellix AI Faculty" },
 "data-analytics-professional": { outcomes:["Build dashboards","Analyze SQL data","Communicate insights"], curriculum:["Excel","SQL","Power BI","Python analytics"], instructor:"Intellix Data Faculty" },
};
export const blogPosts: any[] = [
 { slug:"building-ai-first-enterprises", title:"Building AI-First Enterprise Software", excerpt:"How modern companies combine operational systems with trustworthy AI.", category:"AI", readingTime:"6 min read", date:"2026-07-01" },
 { slug:"crm-data-quality", title:"Why CRM Data Quality Matters", excerpt:"Practical habits that make sales and analytics systems reliable.", category:"CRM", readingTime:"4 min read", date:"2026-06-15" },
];
export const jobs: any[] = [
 { title:"Full Stack Engineer", department:"Engineering", type:"Full time", location:"Pakistan / Hybrid" },
 { title:"AI Engineer", department:"AI Lab", type:"Full time", location:"Pakistan / Hybrid" },
 { title:"Academy Instructor", department:"Academy", type:"Part time", location:"Pakistan" },
];
export const caseStudies: any[] = [
 { slug:"enterprise-crm", client:"Professional Services Client", division:"Software House", title:"Unified CRM and Operations Platform", summary:"A centralized system for customer, sales and operational workflows.", results:["Single source of truth","Faster reporting","Improved workflow visibility"] },
 { slug:"ai-support", client:"Technology Client", division:"AI Lab", title:"AI Knowledge Assistant", summary:"A source-grounded assistant over internal business knowledge.", results:["Faster answers","Source citations","Controlled access"] },
];
export const galleryImages: any[] = [
 { src:"https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&q=80", alt:"Technology team collaborating" },
 { src:"https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80", alt:"Students learning together" },
];
export const pricingTiers: any[] = [
 { name:"Starter", price:"Custom", description:"For focused projects and small teams.", features:["Core implementation","Deployment support","Documentation"], highlighted:false },
 { name:"Growth", price:"Custom", description:"For growing businesses that need integrated systems.", features:["CRM/ERP modules","Analytics","Integrations","Priority support"], highlighted:true },
 { name:"Enterprise", price:"Contact us", description:"For multi-team and AI-enabled transformation.", features:["Enterprise architecture","AI & RAG","Security review","Dedicated delivery team"], highlighted:false },
];
export const resources: any[] = [
 { title:"CRM Implementation Checklist", type:"Guide" },
 { title:"AI RAG Readiness Checklist", type:"Template" },
 { title:"Analytics KPI Planning Sheet", type:"Worksheet" },
];
export const team: any[] = [
 { name:"Intellix Engineering Team", role:"Software & Platform Engineering", division:"Software House" },
 { name:"Intellix AI Team", role:"AI & Applied Research", division:"AI Lab" },
 { name:"Intellix Academy Faculty", role:"Technical Education", division:"Academy" },
];
