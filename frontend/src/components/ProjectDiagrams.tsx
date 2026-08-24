interface DiagramProps {
  accent: string;
  rule: string;
  ink: string;
}

function Box({
  x,
  y,
  w,
  h,
  label,
  stroke,
  fill = "none",
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  stroke: string;
  fill?: string;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={fill} stroke={stroke} strokeWidth={1} />
      <text
        x={x + w / 2}
        y={y + h / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="JetBrains Mono, monospace"
        fontSize="10"
        fill={stroke === "none" ? "currentColor" : stroke}
        letterSpacing="0.02em"
      >
        {label}
      </text>
    </g>
  );
}

function Arrow({ x1, y1, x2, y2, stroke }: { x1: number; y1: number; x2: number; y2: number; stroke: string }) {
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth={1} markerEnd="url(#arrowhead)" />
    </g>
  );
}

function ArrowDefs({ stroke }: { stroke: string }) {
  return (
    <defs>
      <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
        <path d="M0,0 L6,3 L0,6 Z" fill={stroke} />
      </marker>
    </defs>
  );
}

export function VoiceAgentDiagram({ accent, rule, ink }: DiagramProps) {
  return (
    <svg viewBox="0 0 720 220" className="w-full h-auto" role="img" aria-label="Voice agent architecture: telephony connects through speech-to-text into an LLM tool-calling core, which reaches CRM and ticketing APIs, then returns through text-to-speech.">
      <ArrowDefs stroke={rule} />
      <Box x={10} y={90} w={110} h={44} label="TWILIO" stroke={ink} />
      <Arrow x1={120} y1={112} x2={168} y2={112} stroke={rule} />
      <Box x={170} y={90} w={110} h={44} label="STT" stroke={ink} />
      <Arrow x1={280} y1={112} x2={328} y2={112} stroke={rule} />
      <Box x={330} y={60} w={140} h={100} label="LLM AGENT" stroke={accent} fill="none" />
      <Arrow x1={470} y1={112} x2={518} y2={112} stroke={rule} />
      <Box x={520} y={20} w={180} h={40} label="CRM / TICKETING API" stroke={ink} />
      <Arrow x1={400} y1={60} x2={400} y2={20} stroke={rule} />
      <Box x={330} y={0} w={140} h={0} label="" stroke="none" />
      <Arrow x1={470} y1={160} x2={518} y2={160} stroke={rule} />
      <Box x={520} y={140} w={180} h={40} label="POSTGRES / REDIS" stroke={ink} />
      <Arrow x1={330} y1={130} x2={282} y2={175} stroke={rule} />
      <Box x={170} y={160} w={110} h={44} label="TTS" stroke={ink} />
      <Arrow x1={168} y1={182} x2={122} y2={182} stroke={rule} />
      <Box x={10} y={160} w={110} h={44} label="CALLER" stroke={ink} />
    </svg>
  );
}

export function MultiAgentDiagram({ accent, rule, ink }: DiagramProps) {
  return (
    <svg viewBox="0 0 720 240" className="w-full h-auto" role="img" aria-label="Multi-agent platform architecture: a planner agent routes to retrieval, execution and validation agents, each connected via MCP to vector search, databases and REST tools.">
      <ArrowDefs stroke={rule} />
      <Box x={290} y={10} w={140} h={44} label="PLANNER" stroke={accent} />
      <Arrow x1={330} y1={54} x2={140} y2={96} stroke={rule} />
      <Arrow x1={360} y1={54} x2={360} y2={96} stroke={rule} />
      <Arrow x1={390} y1={54} x2={580} y2={96} stroke={rule} />

      <Box x={60} y={98} w={150} h={44} label="RETRIEVAL AGENT" stroke={ink} />
      <Box x={285} y={98} w={150} h={44} label="EXECUTION AGENT" stroke={ink} />
      <Box x={510} y={98} w={150} h={44} label="VALIDATION AGENT" stroke={ink} />

      <Arrow x1={135} y1={142} x2={135} y2={180} stroke={rule} />
      <Arrow x1={360} y1={142} x2={360} y2={180} stroke={rule} />
      <Arrow x1={585} y1={142} x2={585} y2={180} stroke={rule} />

      <Box x={40} y={182} w={190} h={40} label="MCP: QDRANT / DOCS" stroke={ink} />
      <Box x={265} y={182} w={190} h={40} label="MCP: POSTGRES / FILES" stroke={ink} />
      <Box x={490} y={182} w={190} h={40} label="MCP: REST SERVICES" stroke={ink} />
    </svg>
  );
}

export function RagPlatformDiagram({ accent, rule, ink }: DiagramProps) {
  return (
    <svg viewBox="0 0 720 200" className="w-full h-auto" role="img" aria-label="RAG platform architecture: documents are parsed, chunked, embedded into Qdrant, then queried through FastAPI for semantic search and RAG answers.">
      <ArrowDefs stroke={rule} />
      <Box x={10} y={78} w={130} h={44} label="PDF / DOCX / PPTX" stroke={ink} />
      <Arrow x1={140} y1={100} x2={188} y2={100} stroke={rule} />
      <Box x={190} y={78} w={120} h={44} label="DOCLING PARSE" stroke={ink} />
      <Arrow x1={310} y1={100} x2={358} y2={100} stroke={rule} />
      <Box x={360} y={78} w={140} h={44} label="SEMANTIC CHUNKING" stroke={ink} />
      <Arrow x1={500} y1={100} x2={548} y2={100} stroke={rule} />
      <Box x={550} y={68} w={160} h={64} label="QDRANT INDEX" stroke={accent} />

      <Arrow x1={630} y1={68} x2={630} y2={30} stroke={rule} />
      <Box x={550} y={0} w={160} h={30} label="FASTAPI QUERY" stroke={ink} />
      <Arrow x1={550} y1={15} x2={140} y2={15} stroke={rule} />
      <Box x={10} y={0} w={130} h={30} label="RAG ANSWER" stroke={ink} />
    </svg>
  );
}

export function WebOpsAgentDiagram({ accent, rule, ink }: DiagramProps) {
  return (
    <svg viewBox="0 0 720 200" className="w-full h-auto" role="img" aria-label="Web operations agent architecture: a natural-language objective is planned, executed via Playwright browser control, and returned as structured extracted data.">
      <ArrowDefs stroke={rule} />
      <Box x={10} y={78} w={150} h={44} label="NL OBJECTIVE" stroke={ink} />
      <Arrow x1={160} y1={100} x2={208} y2={100} stroke={rule} />
      <Box x={210} y={78} w={140} h={44} label="TASK PLANNER" stroke={ink} />
      <Arrow x1={350} y1={100} x2={398} y2={100} stroke={rule} />
      <Box x={400} y={58} w={150} h={84} label="PLAYWRIGHT BROWSER" stroke={accent} />
      <Arrow x1={550} y1={100} x2={598} y2={100} stroke={rule} />
      <Box x={600} y={78} w={110} h={44} label="DOM ANALYSIS" stroke={ink} />

      <Arrow x1={475} y1={58} x2={475} y2={20} stroke={rule} />
      <Box x={400} y={0} w={150} h={20} label="" stroke="none" />
      <Arrow x1={400} y1={20} x2={160} y2={20} stroke={rule} />
      <Box x={10} y={0} w={150} h={40} label="STRUCTURED RESULT" stroke={ink} />
    </svg>
  );
}

export function ObservabilityDiagram({ accent, rule, ink }: DiagramProps) {
  return (
    <svg viewBox="0 0 720 190" className="w-full h-auto" role="img" aria-label="Observability platform architecture: LLM and agent calls send telemetry to a FastAPI gateway, which records traces and spans in PostgreSQL and runs automated evaluations.">
      <ArrowDefs stroke={rule} />
      <Box x={10} y={70} w={140} h={44} label="LLM / AGENT CALL" stroke={ink} />
      <Arrow x1={150} y1={92} x2={198} y2={92} stroke={rule} />
      <Box x={200} y={70} w={150} h={44} label="TELEMETRY GATEWAY" stroke={accent} />
      <Arrow x1={350} y1={80} x2={398} y2={40} stroke={rule} />
      <Arrow x1={350} y1={104} x2={398} y2={140} stroke={rule} />
      <Box x={400} y={18} w={170} h={44} label="TRACES / SPANS DB" stroke={ink} />
      <Box x={400} y={118} w={170} h={44} label="EVAL: FAITHFULNESS" stroke={ink} />
      <Arrow x1={570} y1={40} x2={618} y2={70} stroke={rule} />
      <Arrow x1={570} y1={140} x2={618} y2={100} stroke={rule} />
      <Box x={600} y={70} w={110} h={44} label="COST / LATENCY" stroke={ink} />
    </svg>
  );
}
