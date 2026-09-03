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
  title: "AI Engineer | LLM Systems | Agentic AI | RAG and Document Intelligence",
  location: "Yanbu Al-Bahr, Saudi Arabia",
  email: "asimh0596@gmail.com",
  phone: "+966 59 947 3849",
  summary:
    "AI Engineer building and deploying LLM applications, multi-agent systems, MCP-based tools, RAG pipelines, AI voice agents, document intelligence systems and workflow automation. Published researcher in multi-agent LLM systems and hybrid SLM-LLM architectures, with hackathon-winning AI projects. Strong background in Python, FastAPI, LangGraph, vector databases, REST APIs, microservices, Docker, Kubernetes and cloud deployment on AWS and GCP.",
};

export interface SkillCategory {
  category: string;
  skills: string[];
}

export const skills: SkillCategory[] = [
  {
    category: "LLM & Agents",
    skills: [
      "RAG",
      "GraphRAG",
      "Multi-Agent Systems",
      "Model Context Protocol (MCP)",
      "Tool and Function Calling",
      "LangChain",
      "LangGraph",
      "LlamaIndex",
      "LangSmith",
      "Guardrails",
      "LLM Evaluation",
      "Reinforcement Learning",
    ],
  },
  {
    category: "Retrieval & Knowledge",
    skills: [
      "Embeddings",
      "Vector Databases",
      "Qdrant",
      "FAISS",
      "Chroma",
      "Hybrid Search",
      "Reranking",
      "Knowledge Graphs",
      "Neo4j",
    ],
  },
  {
    category: "Document AI & NLP",
    skills: [
      "OCR",
      "AWS Textract",
      "PaddleOCR",
      "Tesseract",
      "Layout Parsing",
      "Table Extraction",
      "Information Extraction",
      "Text Classification",
      "spaCy",
      "Hugging Face Transformers",
      "LoRA and PEFT Fine Tuning",
    ],
  },
  {
    category: "Backend & Data",
    skills: [
      "Python",
      "FastAPI",
      "REST APIs",
      "Microservices",
      "PostgreSQL",
      "Redis",
      "SQL",
      "Snowflake",
      "Apache Airflow",
      "ETL Pipelines",
    ],
  },
  {
    category: "Cloud & MLOps",
    skills: [
      "Docker",
      "Kubernetes",
      "AWS (Bedrock, Lambda, S3, RDS)",
      "GCP",
      "GitHub Actions",
      "CI/CD",
      "Twilio",
      "Deepgram",
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
    company: "Docwyn.ai (Wyoming, USA, Remote)",
    dateRange: "Feb 2024 – Present",
    bullets: [
      "Built and deployed an end-to-end OCR pipeline for an enterprise client with 20,000+ employees, turning daily documents into a searchable database.",
      "Raised extraction accuracy from 78% to 96% by pairing layout-aware OCR with validation rules and confidence thresholds routing low-certainty pages to review.",
      "Cut turnaround on daily document batches from 6 hours to under 45 minutes by parallelising extraction across worker queues and batching inference.",
      "Shipped an internal RAG assistant over the processed document store, letting operations staff answer record-level questions in seconds.",
      "Orchestrated Apache Airflow pipelines consolidating data from 120+ US retail locations into Snowflake, cutting retrieval time 40% by rewriting query patterns and standardising reusable Python and SQL components.",
    ],
  },
  {
    title: "Machine Learning Engineer",
    company: "Omdena (New York, USA, Remote, Contract)",
    dateRange: "Jan 2025 – Jun 2025",
    bullets: [
      "Built an agentic mental health support system on a four-stage LangGraph pipeline (Triage, Retrieval, Response, Safety Validation), with conditional edges, retry limits and deterministic routing keeping clinical decisions out of the model's hands.",
      "Grounded replies in a RAG layer over curated mental health resources using sentence embeddings with FAISS and Chroma, replacing open-ended generation with retrieval-backed answers.",
      "Implemented structured risk scoring with Pydantic schemas across self-harm language, hopelessness, severe distress and repeated high-risk intent, escalating at a configurable threshold or immediately on critical cues.",
      "Routed escalations through FastAPI, PostgreSQL, Redis and Twilio/SendGrid to alert therapists with risk category, conversation ID and context summary, and traced agent paths, token use, latency and escalation events in LangSmith.",
    ],
  },
  {
    title: "AI Engineer Intern",
    company: "Glowing Soft (Lahore, Pakistan)",
    dateRange: "Jul 2023 - Oct 2023",
    bullets: [
      "Built Python NLP pipelines processing 500K+ records per day, automating ingestion, cleaning and transformation and cutting manual work 40%.",
      "Applied classification and extraction to contract data, turning free-form text into structured fields and saving 3 hours of review daily.",
      "Delivered 3 production-ready models and tuned SQL workloads on AWS RDS by 35%, speeding up experimentation and client-facing outputs.",
      "Cut downstream data defects 30% with automated schema and validation checks that caught malformed records before reporting.",
      "Cut model retraining turnaround from 2 days to 6 hours by packaging preprocessing and evaluation into a reusable workflow across 3 projects.",
    ],
  },
];

export interface Project {
  title: string;
  displayTitle: string;
  techStack: string[];
  bullets: string[];
  repoUrl: string;
}

export const projects: Project[] = [
  {
    title: "enterprise-realtime-voice-ai",
    displayTitle: "Autonomous Voice Sales and Service Agent",
    techStack: ["LLMs", "FastAPI", "Twilio", "Deepgram", "ElevenLabs", "PostgreSQL", "Docker", "Kubernetes", "AWS"],
    bullets: [
      "Built a multi-tenant voice agent for outbound sales and inbound support, pipelining telephony, speech to text, LLM tool calling and synthesis to hold turn latency near 800ms across 50+ concurrent calls.",
      "Connected it to CRM and product databases for live inventory, quotes and confirmed orders mid call, with transcript analysis covering intent, sentiment, churn risk and upsell signals written back to CRM.",
      "Trained a reinforcement learning layer over call outcomes to tune pitch sequencing and objection handling, lifting test conversion by 22%, and packaged the system as configurable microservices on Kubernetes so a new business onboards in under a day.",
    ],
    repoUrl: "https://github.com/mynameisjeff-1/enterprise-realtime-voice-ai",
  },
  {
    title: "priv",
    displayTitle: "Multi-Agent Automation Platform with MCP Tooling",
    techStack: ["Python", "MCP", "FastAPI", "LangGraph", "Qdrant", "PostgreSQL", "Redis", "Celery", "Docker"],
    bullets: [
      "Designed a four agent system (Planner, Retrieval, Execution, Validation) that decomposes a natural language request into a typed task graph, routes each step to the right tool and verifies output before returning it.",
      "Exposed databases, vector search, internal REST services and file stores as MCP tools behind versioned schemas, so adding a capability means writing a server contract rather than editing agent logic.",
      "Raised multi step task completion from 62% to 89% with a validation agent that re-runs failed steps against schema checks, backed by exponential backoff retries and persistent state in PostgreSQL and Redis for resumable jobs.",
      "Cut token cost per workflow by 35% by routing simple lookups to a smaller model, caching retrieval results and reserving the larger model for planning, with step level trace logging for debugging.",
    ],
    repoUrl: "",
  },
  {
    title: "enterprise-document-intelligence",
    displayTitle: "Enterprise Document Intelligence & RAG Platform",
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
    displayTitle: "Autonomous Web Operations Agent",
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
    displayTitle: "AgentOps — LLM Evaluation & Observability Platform",
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
    displayTitle: "Arzachel — Google Gemini Hackathon Project",
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
      "Introduces the ESRD and MA-ESRD drift framework and the Sycophancy Amplification Factor (SAF), a metric for how far a multi-agent swarm shifts from a correct position under peer pressure, plus mitigations such as adversarial reviewer roles and confidence weighted aggregation.",
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
      "Shows when splitting work across small specialist models stops paying off because coordination overhead outgrows the compute saved, and builds a break-even framework across token, latency and handoff costs into architecture selection guidance for SLM, LLM and hybrid systems.",
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
    "Ranked in the global top 50 from 57,000+ participants across 160+ countries. Built an AI agriculture platform using NASA Earth-observation data, geospatial analytics and vision-language models for crop, yield and wildfire-risk insights.",
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
  dateRange: string;
}

export const education: Education = {
  degree: "Bachelor of Science in Data Science",
  institution: "University of Central Punjab, Lahore",
  dateRange: "2022-2026",
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
