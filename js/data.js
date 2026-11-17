export const PROFILE = {
  name: "Vikranth Gaddam",
  domain: "vikranthgaddam.com",
  email: "hello@vikranthgaddam.com",
  github: "https://github.com/vikranthgaddam",
  linkedin: "https://www.linkedin.com/in/vikranthgaddam"
};

export const PROJECTS = [
  {
    id: "chronos-engine",
    index: "01",
    category: "systems",
    categoryLabel: "Systems & Infra",
    year: "2025",
    title: "Chronos — Distributed Log & Consensus Engine",
    summary:
      "A Raft-backed, partitioned event streaming storage engine written in Rust with zero-copy I/O, deterministic simulation testing, and sub-5ms P99 write replication.",
    benchmark: "420k msg/sec sustained throughput · 3.8ms P99 commit latency",
    deployedIn: "Core Telemetry & Financial Ledger Pipelines (Apex Cloud Systems)",
    image: "assets/project_distributed_engine.jpg",
    stack: ["Rust", "io_uring", "Raft Consensus", "gRPC", "Protobuf"],
    metrics: [
      { value: "3.8ms", label: "P99 Commit" },
      { value: "420k/s", label: "Writes / Node" },
      { value: "0", label: "Jepsen Data Loss" }
    ],
    useCases: [
      "High-frequency event ingestion & write-ahead log (WAL) replication for latency-critical microservices",
      "Idempotent financial transaction ordering and deterministic state-machine replay",
      "Multi-AZ change-data-capture (CDC) buffer between OLTP databases and columnar analytics stores"
    ],
    implementations: [
      {
        context: "Apex Cloud Systems · Core Telemetry Pipeline",
        environment: "3 AWS Regions · Bare-Metal NVMe Cluster",
        detail:
          "Deployed as the durable ingestion backbone ahead of ClickHouse analytics clusters, replacing legacy JVM brokers and eliminating GC-induced tail-latency spikes across 1.8M+ peak events/sec."
      },
      {
        context: "Order & Settlement State Replication",
        environment: "Multi-Raft Consensus Groups (Quorum = 3)",
        detail:
          "Used as the replicated write-ahead log for distributed state machines requiring strict serializability and zero-data-loss recovery under network partition faults."
      }
    ],
    problem:
      "Existing JVM-based message brokers suffered from garbage collection tail-latency spikes (P99.9 > 180ms) during high-fanout segment compaction windows.",
    architecture:
      "Engineered a thread-per-core storage engine in Rust leveraging Linux io_uring for asynchronous page-cache bypass, custom CRC32C segment checksums, and Multi-Raft group leasing.",
    tradeoffs:
      "Traded dynamic runtime thread migration for strict CPU core pinning and pre-allocated ring buffers, increasing startup provisioning complexity in exchange for deterministic tail latency.",
    repoUrl: "https://github.com/vikranthgaddam"
  },
  {
    id: "aether-runtime",
    index: "02",
    category: "systems",
    categoryLabel: "Systems & Infra",
    year: "2024",
    title: "Aether — Multi-Tenant Micro-VM Edge Scheduler",
    summary:
      "Orchestration control plane and Firecracker micro-VM snapshot manager enabling cold starts under 35ms for untrusted serverless workloads across regional edge nodes.",
    benchmark: "28ms median micro-VM restore time · 4.2x denser host bin-packing",
    deployedIn: "Multi-Tenant Customer Webhook & Edge Compute Fleet (19 Regions)",
    image: "assets/project_cloud_runtime.jpg",
    stack: ["Go", "Firecracker", "eBPF", "Kubernetes", "Linux Cgroups"],
    metrics: [
      { value: "28ms", label: "Warm Restore" },
      { value: "4.2x", label: "Node Density" },
      { value: "19 Regions", label: "Control Plane" }
    ],
    useCases: [
      "Sandboxed execution of untrusted customer-authored webhooks, ETL transforms, and AI agent code",
      "Burst-tolerant serverless API endpoints requiring hardware-virtualized KVM isolation",
      "Ephemeral CI/CD build runners and isolated pull-request preview sandboxes"
    ],
    implementations: [
      {
        context: "Customer Compute & Webhook Extension Engine",
        environment: "Production Edge Fleet · 19 Global PoPs",
        detail:
          "Runs thousands of concurrent tenant functions inside hardware-isolated Firecracker micro-VMs restored from copy-on-write memory snapshots with eBPF XDP packet routing."
      },
      {
        context: "Ephemeral PR Verification Sandboxes",
        environment: "Internal Developer Platform · Kubernetes + KVM",
        detail:
          "Provisions isolated full-stack preview environments per pull request in seconds, cutting compute idle waste by 76% via rapid snapshot hibernation."
      }
    ],
    problem:
      "Running untrusted third-party compute plugins inside shared Kubernetes pods created noisy-neighbor CPU throttling and unacceptable container escape surfaces.",
    architecture:
      "Designed a Go control plane that pre-warms copy-on-write memory snapshots for Firecracker micro-VMs and routes ingress packets via an eBPF XDP datapath.",
    tradeoffs:
      "Replaced standard CNI iptables chaining with a custom eBPF socket-redirect layer, requiring kernel >= 5.15 across fleet hosts.",
    repoUrl: "https://github.com/vikranthgaddam"
  },
  {
    id: "pulse-observability",
    index: "03",
    category: "fullstack",
    categoryLabel: "Full-Stack & Tooling",
    year: "2024",
    title: "Pulse — High-Cardinality Observability & Trace Studio",
    summary:
      "Columnar trace analytics platform and WebGL flamegraph workbench capable of querying 500M+ spans in sub-second interactive debugging workflows.",
    benchmark: "60fps canvas rendering on 100k-span traces · 180ms P95 ClickHouse query",
    deployedIn: "Production Incident Response & Distributed Tracing Workbench",
    image: "assets/project_observability_studio.jpg",
    stack: ["TypeScript", "React", "WebGL", "ClickHouse", "OpenTelemetry"],
    metrics: [
      { value: "180ms", label: "P95 Query" },
      { value: "60 FPS", label: "Flamegraph UI" },
      { value: "72%", label: "Storage Compression" }
    ],
    useCases: [
      "Root-cause analysis of cascading tail-latency spikes across polyglot gRPC and HTTP microservices",
      "High-cardinality attribute slicing (tenant ID, region, build SHA, shard key) over billions of spans",
      "Interactive critical-path flamegraph inspection for traces exceeding 100,000 child spans"
    ],
    implementations: [
      {
        context: "SRE On-Call & Incident Response Console",
        environment: "200+ Production Microservices · OpenTelemetry",
        detail:
          "Adopted by platform and product engineering teams as the primary debugging studio during production incidents, reducing Mean Time to Resolution (MTTR) by 54%."
      },
      {
        context: "Continuous Performance Regression Gate",
        environment: "Staging & Canary Deployment Pipelines",
        detail:
          "Compares P95/P99 span duration distributions between baseline and canary releases automatically before promoting rollouts to 100% traffic."
      }
    ],
    problem:
      "Engineers debugging cascading microservice timeouts waited 15+ seconds for high-cardinality trace queries and hit browser DOM freezes when inspecting traces with >20k spans.",
    architecture:
      "Combined a Go OpenTelemetry collector writing ZSTD-compressed columnar blocks into ClickHouse with a custom hardware-accelerated WebGL flamegraph viewport in TypeScript.",
    tradeoffs:
      "Moved span tree assembly into a Web Worker using SharedArrayBuffer typed arrays rather than React state objects to eliminate main-thread frame drops.",
    repoUrl: "https://github.com/vikranthgaddam"
  },
  {
    id: "schemaforge-cli",
    index: "04",
    category: "opensource",
    categoryLabel: "Open Source",
    year: "2023",
    title: "SchemaForge — Zero-Downtime Postgres Migration Engine",
    summary:
      "Static analyzer and transactional expand/contract migration runner that prevents table-locking DDL operations in high-traffic PostgreSQL clusters.",
    benchmark: "100% lock-safe schema transitions · AST-level SQL lock verification",
    deployedIn: "CI/CD Release Pipelines Across 30+ Production PostgreSQL Clusters",
    image: "",
    stack: ["Go", "PostgreSQL", "libpg_query", "GitHub Actions", "Docker"],
    metrics: [
      { value: "0s", label: "Lock Downtime" },
      { value: "28 Rules", label: "AST Linters" },
      { value: "<1.5s", label: "CI Verification" }
    ],
    useCases: [
      "Automated CI/CD pull-request linting to block table-locking SQL DDL before merge",
      "Zero-downtime column type alterations, non-blocking index builds, and constraint validation on multi-terabyte tables",
      "Automated expand/contract dual-write trigger setup and throttled background batch backfills"
    ],
    implementations: [
      {
        context: "Vanguard Data Labs · Core Database Release Pipeline",
        environment: "30+ Production Microservices · GitHub Actions",
        detail:
          "Enforced as a mandatory GitHub Actions status check and deployment orchestrator across all PostgreSQL-backed services, eliminating migration-related outages."
      },
      {
        context: "High-Volume Ledger Schema Evolution",
        environment: "Multi-TB Transactional Tables (50k+ TPS)",
        detail:
          "Executed live primary-key partitioning and column migrations on active financial ledger tables with zero read/write stalls and automatic lock-timeout circuit breaking."
      }
    ],
    problem:
      "Unintended ACCESS EXCLUSIVE locks during routine PostgreSQL schema migrations stalled production read/write queues in high-throughput services.",
    architecture:
      "Parses SQL migrations using PostgreSQL's native C parser (`libpg_query`) to detect unsafe lock acquisitions in CI and orchestrates shadow-table dual-write backfills.",
    tradeoffs:
      "Enforces strict two-phase expand/contract migration semantics instead of single-step destructive DDL alterations.",
    repoUrl: "https://github.com/vikranthgaddam"
  }
];

export const EXPERIENCE = [
  {
    id: "exp-1",
    period: "2024 — PRESENT",
    role: "Senior Software Engineer — Core Infrastructure",
    company: "Apex Cloud Systems · San Francisco, CA",
    expanded: true,
    bullets: [
      "Architected and migrated the core telemetry ingestion pipeline to Rust, Kafka, and ClickHouse, cutting P99 tail latency by 68% while reducing compute spend by $420k/yr.",
      "Designed multi-region active-active state replication across 3 AWS regions achieving 99.995% availability under 1.8M+ peak requests/sec.",
      "Mentored 6 engineers on deterministic simulation testing, memory profiling, and zero-downtime deployment workflows."
    ],
    stack: ["Rust", "Go", "Kafka", "ClickHouse", "Kubernetes", "AWS"]
  },
  {
    id: "exp-2",
    period: "2022 — 2024",
    role: "Software Engineer — Platform & Developer Experience",
    company: "Vanguard Data Labs · New York, NY",
    expanded: true,
    bullets: [
      "Engineered ephemeral Kubernetes preview environments powered by copy-on-write database clones, reducing pull-request verification cycles from 42 minutes to under 4 minutes.",
      "Authored the company-wide zero-downtime PostgreSQL migration runner adopted across 30+ production microservices.",
      "Built the internal developer portal and real-time deployment health dashboard in TypeScript and React."
    ],
    stack: ["Go", "TypeScript", "React", "PostgreSQL", "Kubernetes", "Terraform"]
  },
  {
    id: "exp-3",
    period: "2020 — 2022",
    role: "Software Engineering Associate — Distributed Services",
    company: "Helios Financial Technologies · Seattle, WA",
    expanded: false,
    bullets: [
      "Implemented idempotent double-entry ledger APIs in Go and PostgreSQL processing $1.2B+ in annualized transaction volume.",
      "Introduced distributed OpenTelemetry tracing across 18 backend services, reducing mean time to resolution (MTTR) by 54%."
    ],
    stack: ["Go", "PostgreSQL", "Redis", "gRPC", "OpenTelemetry"]
  }
];

export const COMPETENCIES = [
  {
    index: "SPEC // 01",
    title: "Distributed Systems & Storage",
    description:
      "Consensus protocols (Raft), partitioned log storage, high-throughput stream ingestion, backpressure control, and deterministic fault-injection testing.",
    tags: ["Rust", "Go", "Kafka", "gRPC", "Raft", "io_uring"]
  },
  {
    index: "SPEC // 02",
    title: "Cloud Infrastructure & Runtime",
    description:
      "Multi-region Kubernetes orchestration, micro-VM isolation, eBPF networking, observability pipelines, and infrastructure-as-code automation.",
    tags: ["Kubernetes", "AWS", "Firecracker", "eBPF", "Terraform", "Docker"]
  },
  {
    index: "SPEC // 03",
    title: "Full-Stack Product & Tooling",
    description:
      "High-frame-rate developer interfaces, columnar analytics dashboards, type-safe API contracts, and latency-conscious web applications.",
    tags: ["TypeScript", "React", "ClickHouse", "PostgreSQL", "WebGL", "Node.js"]
  }
];
