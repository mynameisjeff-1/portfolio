// Single source of truth for every piece of content on the site.
// Every fact here is copied verbatim from Hamza's CV. Edit here, not in components.

export interface Profile {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  summary: string;
}

export const profile: Profile = {
  name: "Hamza Asim",
  title: "AI Engineer | Generative AI | Machine Learning | Agentic Systems",
  location: "Yanbu Al-Bahr, Saudi Arabia",
  email: "asimh0596@gmail.com",
  phone: "+966 59 947 3849",
  summary:
    "AI Engineer and Data Science graduate with hands-on experience building production-oriented generative AI, agentic automation, NLP and machine learning systems. Skilled in Python, LLM/RAG workflows, MCP, vector search, FastAPI, data pipelines and cloud deployment across AWS, Azure and GCP. Experienced delivering end-to-end AI solutions from data ingestion and model integration to APIs, orchestration, evaluation and deployment, with measurable gains in accuracy, retrieval speed and operational efficiency.",
};

export interface SkillCategory {
  category: string;
  skills: string[];
}

export const skills: SkillCategory[] = [
  {
    category: "Generative AI & Agents",
    skills: [
      "Large Language Models (LLMs)",
      "RAG",
      "AI Agents",
      "Multi-Agent Systems",
      "Model Context Protocol (MCP)",
      "MCP Servers",
      "Tool/Function Calling",
      "Prompt Engineering",
    ],
  },
  {
    category: "Retrieval & LLM Systems",
    skills: [
      "Embeddings",
      "Semantic Search",
      "Vector Databases",
      "Qdrant",
      "Context/State Management",
      "Structured Outputs",
      "LLM Orchestration",
    ],
  },
  {
    category: "Machine Learning & NLP",
    skills: [
      "Python",
      "Scikit-learn",
      "Pandas",
      "NumPy",
      "PySpark",
      "NLP",
      "Classification",
      "Information Extraction",
      "Feature Engineering",
      "Model Evaluation",
    ],
  },
  {
    category: "Backend & Data Engineering",
    skills: [
      "FastAPI",
      "REST APIs",
      "PostgreSQL",
      "Redis",
      "Snowflake",
      "Apache Airflow",
      "SQL",
      "ETL/Data Pipelines",
      "Microservices",
    ],
  },
  {
    category: "Cloud & DevOps",
    skills: [
      "Docker",
      "Git/GitHub",
      "Linux",
      "AWS",
      "Azure",
      "GCP",
      "AWS RDS",
      "API Integration",
      "Model Deployment",
    ],
  },
];

export interface ExperienceRole {
  title: string;
  company: string;
  dateRange: string;
  bullets: string[];
}

export const experience: ExperienceRole[] = [
  {
    title: "AI Engineer",
    company: "Docwyn.ai (Wyoming, USA — Remote)",
    dateRange: "Feb 2024 – Present",
    bullets: [
      "Engineered Python/NLP document-intelligence workflows that converted unstructured business records into validated, query-ready outputs, improving extraction accuracy by 18%.",
      "Orchestrated Apache Airflow pipelines consolidating operational data from 120+ US retail locations into Snowflake for downstream AI, search and automation services.",
      "Optimized reusable Python/SQL processing components and Snowflake retrieval patterns, reducing data retrieval time by 40% across high-volume workflows.",
      "Automated document-processing and backend data workflows, improving consistency across AI-ready data preparation, reporting and product operations.",
    ],
  },
  {
    title: "AI Engineer Intern",
    company: "Glowing Soft",
    dateRange: "Jul 2023 - Oct 2023",
    bullets: [
      "Built Python ML/NLP pipelines processing 500K+ records per day, automating ingestion, cleaning and transformation while reducing manual processing time by 40%.",
      "Applied NLP classification and information extraction to contract datasets, converting free-form text into structured business fields and saving approximately 3 hours of manual review per day.",
      "Delivered 3 production-ready analytical/ML models and optimized SQL workloads on AWS RDS by 35%, accelerating experimentation and client-facing model outputs.",
    ],
  },
];

export interface Project {
  title: string;
  techStack: string[];
  bullets: string[];
  repoUrl: string;
}

export const projects: Project[] = [
  {
    title: "enterprise-realtime-voice-ai",
    techStack: ["LLMs", "FastAPI", "Twilio", "ElevenLabs", "PostgreSQL", "Redis", "Docker", "Microservices"],
    bullets: [
      "Architected a real-time voice AI agent integrating telephony, speech-to-text, LLM tool calling, CRM/internal APIs and text-to-speech for context-aware customer support.",
      "Built modular FastAPI services for orchestration, session state, authentication and CRM/ticketing, backed by PostgreSQL/Redis and Dockerized for independent scaling.",
      "Implemented account/order lookup, ticket creation, conversation memory and human escalation with context handoff, connecting conversational AI to executable backend workflows.",
    ],
    repoUrl: "https://github.com/mynameisjeff-1/enterprise-realtime-voice-ai",
  },
  {
    title: "enterprise-document-intelligence",
    techStack: ["Python", "Docling", "FastAPI", "Qdrant", "RapidOCR", "PyMuPDF", "Docker"],
    bullets: [
      "Built a document-processing and RAG system that extracts, structures, indexes and retrieves information from complex business documents, ingesting PDF, Word, PowerPoint and HTML content.",
      "Implemented layout-aware parsing of tables, metadata, document hierarchy and mathematical formulas, with semantic window chunking and overlap to preserve context across document boundaries.",
      "Indexed embeddings in Qdrant with metadata-aware filtering, exposing document ingestion, extraction, semantic search and RAG query operations through FastAPI endpoints.",
    ],
    repoUrl: "https://github.com/mynameisjeff-1/enterprise-document-intelligence",
  },
  {
    title: "autonomous-web-ops-agent",
    techStack: ["Python", "Playwright", "FastAPI", "Pydantic", "Redis", "Docker"],
    bullets: [
      "Built an AI-driven browser automation platform that executes web tasks from high-level natural-language objectives, combining browser control, DOM analysis, task planning and structured extraction.",
      "Used Playwright to control modern websites and multi-tab sessions, analyzing page structure in a form optimized for LLM reasoning and goal-directed, step-by-step action execution.",
      "Exposed task dispatch, execution traces and direct extraction through FastAPI endpoints, backed by Redis-compatible task queuing and Dockerized browser binaries for Chromium, Firefox and WebKit.",
    ],
    repoUrl: "https://github.com/mynameisjeff-1/autonomous-web-ops-agent",
  },
  {
    title: "agentops-llm-observability",
    techStack: ["Python", "FastAPI", "PostgreSQL", "Asyncio", "Docker"],
    bullets: [
      "Built an LLM evaluation and observability platform that traces LLM and agent execution workflows, recording nested spans for model calls, retrievers and tool invocations.",
      "Tracked token usage, estimated model cost, generation latency and tool-call reliability, with automated evaluation data for faithfulness, contextual relevance and hallucination.",
      "Exposed a FastAPI telemetry gateway for ingesting traces and metrics, persisting traces, spans, evaluations and operational records in PostgreSQL.",
    ],
    repoUrl: "https://github.com/mynameisjeff-1/agentops-llm-observability",
  },
  {
    title: "Arzachel",
    techStack: ["Python", "Streamlit", "Folium", "LLaMA 3.2 Vision", "Together AI", "Docker"],
    bullets: [
      "Built an AI-driven Earth Observation and Precision Agriculture platform combining NASA Earth-observation data, global soil data and geospatial analysis with multimodal AI for agricultural and environmental insights.",
      "Implemented geospatial soil analysis using SoilGrids data, historical and current environmental trend analysis, AI-assisted crop recommendations and wildfire-risk monitoring.",
      "Delivered an interactive Streamlit dashboard with Folium maps for drawing and analyzing geographic areas, integrating LLaMA-based vision-language models via Together AI for multimodal reasoning.",
    ],
    repoUrl: "https://github.com/mynameisjeff-1/Arzachel",
  },
];

export interface Publication {
  title: string;
  year: string;
  status: string;
  abstract: string;
  summary: string;
  url: string;
}

export const publications: Publication[] = [
  {
    title:
      "The Agreeable Swarm: Sycophantic Drift, Consensus Cascades, and Epistemic Collapse in Multi-Agent Large Language Model Systems",
    year: "2026",
    status: "Research",
    abstract:
      "Research on multi-agent LLM reliability; introduces the ESRD/MA-ESRD framework and Sycophancy Amplification Factor (SAF), and analyzes consensus cascades, correlated-agent failure and mitigation strategies.",
    summary:
      "In plain terms: AI models tend to agree with users even when the user is wrong, because their training rewards agreeable answers over correct ones. This paper studies what happens when several AI agents pass work to each other in a pipeline — that same people-pleasing tendency doesn't just persist, it compounds, since each agent's agreeable output becomes 'evidence' the next agent trusts. The paper introduces a framework for classifying this drift and a metric (SAF) for measuring how much worse it gets as more agents are chained together, then reviews ways to guard against it.",
    url: "https://doi.org/10.13140/RG.2.2.11922.21440",
  },
  {
    title:
      "When Small Models Create Big Overhead: The Specialization-Coordination Trade-off in Hybrid SLM-LLM Agent Systems",
    year: "2026",
    status: "Manuscript",
    abstract:
      "Theoretical research on system-level efficiency in agentic AI; develops a coordination-cost framework, break-even analysis and architecture-selection framework for SLM, LLM, multi-SLM and hybrid agent systems.",
    summary:
      "In plain terms: it's tempting to replace one expensive large AI model with several cheaper, specialized small ones, since each individual call gets cheaper. This paper argues that logic can backfire — coordinating multiple smaller models (routing requests, passing context between them, double-checking each other's work) adds its own overhead, which can end up costing more than just using one capable model. It builds a cost model to show where that break-even point falls, and works through a set of test scenarios to see when splitting up the work actually pays off versus when it doesn't.",
    url: "",
  },
];

export interface Award {
  headline: string;
  detail: string;
  description: string;
  stats: string[];
}

export const award: Award = {
  headline: "TOP 50",
  detail: "Global Top 50 — Google Gemini Hackathon 2024",
  description:
    "Ranked among the global top 50 from 57,000+ participants across 160+ countries. Built an AI-driven agriculture platform using NASA Earth-observation data, geospatial analytics and vision-language models for crop recommendations, yield insights, wildfire-risk alerts and sustainability guidance.",
  stats: ["57,000+ PARTICIPANTS", "160+ COUNTRIES", "GLOBAL TOP 50"],
};

export interface VolunteerEntry {
  organization: string;
  description: string;
  url: string;
}

export const volunteer: VolunteerEntry = {
  organization: "Akhuwat Foundation",
  description:
    "Volunteered with Akhuwat Foundation for one month as part of a community clothing donation initiative focused on supporting underprivileged and needy individuals.\n\nDuring the activity, Hamza helped collect new clothing donations from different people and locations, organized the collected items, and contributed to preparing them for distribution to families and individuals in need.\n\nThe experience strengthened his communication, coordination, teamwork and community-engagement skills while allowing him to contribute directly to a humanitarian initiative aimed at helping vulnerable communities.",
  url: "https://x.com/HamzaAsim_Dev/status/2034275932723458256?s=20",
};

export interface Education {
  degree: string;
  institution: string;
}

export const education: Education = {
  degree: "Bachelor in Data Science",
  institution: "University of Central Punjab, Lahore",
};

export interface ContactLinks {
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
}

export const contact: ContactLinks = {
  email: profile.email,
  phone: profile.phone,
  location: profile.location,
  linkedin: "https://www.linkedin.com/in/hamza-asim-/",
  github: "https://github.com/mynameisjeff-1",
};
