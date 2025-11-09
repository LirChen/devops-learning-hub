const questions = [
    // EASY QUESTIONS (1-10)
    {
        difficulty: "easy",
        topic: "Monitoring Basics",
        question: "What's the difference between monitoring and observability?",
        options: [
        "Monitoring: known issues (is system up?). Observability: unknown issues (why did it fail?)",
        "Observability is outdated",
        "They're the same",
        "Monitoring is only for production"
    ],
        correct: 0,
        explanation: "Monitoring: track known metrics (CPU, memory, uptime) - 'known unknowns'. Observability: investigate unknown issues - 'unknown unknowns'. Observability uses logs + metrics + traces to debug anything.",
        tip: "Monitoring answers 'what happened'. Observability answers 'why it happened'. Modern systems need both!"
    },
    {
        difficulty: "easy",
        topic: "Prometheus Basics",
        question: "What type of database is Prometheus?",
        options: [
        "SQL database",
        "Graph database",
        "Document database",
        "Time-series database for metrics"
    ],
        correct: 3,
        explanation: "Prometheus stores time-series data: metric values over time. Optimized for queries like 'CPU usage last 24h'. Pull-based: Prometheus scrapes metrics from targets (HTTP endpoints).",
        tip: "Prometheus + Grafana is the standard open-source monitoring stack. Prometheus stores/queries data, Grafana visualizes."
    },
    {
        difficulty: "easy",
        topic: "Grafana",
        question: "What is Grafana used for?",
        options: [
        "Running applications",
        "Storing metrics",
        "Collecting logs",
        "Visualizing metrics via dashboards and graphs"
    ],
        correct: 3,
        explanation: "Grafana is visualization and analytics platform. Creates dashboards with graphs, charts, alerts. Works with multiple data sources: Prometheus, Elasticsearch, CloudWatch, InfluxDB, etc.",
        tip: "Grafana doesn't store data - it visualizes from data sources. Popular pattern: Prometheus (storage) + Grafana (visualization)."
    },
    {
        difficulty: "easy",
        topic: "Logs vs Metrics",
        question: "What's the difference between logs and metrics?",
        options: [
        "Metrics are more detailed",
        "Logs are faster",
        "Logs: detailed events/messages. Metrics: numeric measurements over time",
        "No difference"
    ],
        correct: 2,
        explanation: "Logs: textual records of events ('User logged in', 'Error: DB timeout'). Metrics: numeric measurements over time (CPU=70%, request_count=1234). Logs give detail, metrics give trends.",
        tip: "Use metrics for trends and alerting (CPU, latency, errors). Use logs for debugging specific issues. Both are essential!"
    },
    {
        difficulty: "easy",
        topic: "Metrics Types",
        question: "Which metric type would you use to track 'total number of requests'?",
        options: [
        "Counter",
        "Histogram",
        "Gauge",
        "Summary"
    ],
        correct: 0,
        explanation: "Counter: only increases (or resets to zero). Use for: requests, errors, bytes sent. Gauge: goes up and down. Use for: CPU, memory, connections. Histogram/Summary: distributions (latency).",
        tip: "Counter: cumulative count (requests_total). Use rate() to get per-second rate: rate(requests_total[5m])"
    },
    {
        difficulty: "easy",
        topic: "Alerting Basics",
        question: "What makes a good alert?",
        options: [
        "Alert on everything",
        "Email only",
        "Warn about everything",
        "Actionable (requires response), not noisy, includes context"
    ],
        correct: 3,
        explanation: "Good alerts: 1) Actionable (something you can fix), 2) Not noisy (prevent alert fatigue), 3) Clear context (what, where, severity). Bad: vague alerts or alerts for non-issues.",
        tip: "Alert on symptoms (user impact: errors, latency) not causes (CPU high). If alert doesn't need action, don't alert!"
    },
    {
        difficulty: "easy",
        topic: "Three Pillars",
        question: "What are the three pillars of observability?",
        options: [
        "Dev, Test, Prod",
        "CPU, Memory, Disk",
        "Alerts, Dashboards, Reports",
        "Metrics, Logs, Traces"
    ],
        correct: 3,
        explanation: "Three pillars: 1) Metrics (numeric trends), 2) Logs (detailed events), 3) Traces (request flow through system). Together they enable full system observability.",
        tip: "Metrics for trends, logs for details, traces for distributed systems. Modern observability platforms integrate all three."
    },
    {
        difficulty: "easy",
        topic: "Health Checks",
        question: "What's the purpose of health check endpoints?",
        options: [
        "Allow monitoring systems to check if application is healthy",
        "User authentication",
        "Security",
        "Data storage"
    ],
        correct: 0,
        explanation: "Health check endpoints (e.g., /health, /healthz) return 200 OK if app is healthy. Load balancers and orchestrators use them to know if instance should receive traffic.",
        tip: "Implement health checks: liveness (is app alive?) and readiness (can it serve traffic?). Check dependencies: database, cache, disk space."
    },
    {
        difficulty: "easy",
        topic: "CloudWatch",
        question: "What is AWS CloudWatch?",
        options: [
        "A database",
        "A deployment service",
        "AWS monitoring service for metrics, logs, and alarms",
        "A security service"
    ],
        correct: 2,
        explanation: "CloudWatch is AWS's monitoring and observability service. Collects metrics, logs, and events from AWS resources. Create dashboards, set alarms, automate responses.",
        tip: "CloudWatch basics: Metrics (CPU, network), Logs (application logs), Alarms (alert on thresholds), Events (respond to changes). Essential for AWS."
    },
    {
        difficulty: "easy",
        topic: "APM",
        question: "What does APM (Application Performance Monitoring) do?",
        options: [
        "Deploys applications",
        "Monitors servers",
        "Monitors application performance and user experience",
        "Manages passwords"
    ],
        correct: 2,
        explanation: "APM monitors application-level metrics: response times, error rates, throughput, user experience. Tools: New Relic, Datadog, AppDynamics. Goes beyond infrastructure monitoring.",
        tip: "APM provides: transaction tracing, error tracking, database query analysis, user experience metrics. Essential for understanding app performance."
    },

    // MEDIUM QUESTIONS (11-18)
    {
        difficulty: "medium",
        topic: "Prometheus Metrics",
        question: "What's the difference between Counter and Gauge?",
        options: [
        "No difference",
        "Counter only increases (requests, errors). Gauge goes up/down (CPU, memory)",
        "Gauge is deprecated",
        "Counter is faster"
    ],
        correct: 1,
        explanation: "Counter: monotonically increasing (resets on restart). Use rate() to get per-second rate. Gauge: current value that varies. Counter for cumulative, Gauge for point-in-time.",
        tip: "Counter example: http_requests_total (use rate()). Gauge example: memory_usage_bytes (use as-is). Histogram for distributions."
    },
    {
        difficulty: "medium",
        topic: "Structured Logging",
        question: "What is structured logging and why use it?",
        code: `# Unstructured\n"User john logged in at 10:30"\n\n# Structured\n{"user": "john", "action": "login", "time": "10:30"}`,
        options: [
            "Logs in database",
            "JSON/key-value format - easily parseable and searchable",
            "Logs with timestamps",
            "Compressed logs"
        ],
        correct: 1,
        explanation: "Structured logs (JSON, logfmt) are machine-readable. Easy to query: 'show all login actions', 'errors from user X'. Unstructured logs require regex parsing. Modern best practice.",
        tip: "Use structured logging from day 1! Format: JSON or logfmt. Include: timestamp, level, message, context (user, request_id, etc.). Tools: ELK, Loki."
    },
    {
        difficulty: "medium",
        topic: "Distributed Tracing",
        question: "What is distributed tracing?",
        options: [
        "Log aggregation",
        "Metric collection",
        "Error tracking",
        "Track requests across multiple services (microservices) to see full flow"
    ],
        correct: 3,
        explanation: "Distributed tracing tracks requests through microservices. Each request has trace ID, services add spans. See: latency per service, bottlenecks, errors. Essential for microservices debugging.",
        tip: "Tracing tools: Jaeger, Zipkin, AWS X-Ray. Pattern: Generate trace_id at entry, propagate through services, aggregate spans. See exactly where time is spent."
    },
    {
        difficulty: "medium",
        topic: "PromQL",
        question: "What does this PromQL query do: rate(http_requests_total[5m])?",
        options: [
        "Average requests",
        "Requests in last 5 minutes",
        "Total requests",
        "Per-second rate of requests over last 5 minutes"
    ],
        correct: 3,
        explanation: "rate() calculates per-second average rate of counter increase over time window. [5m] = last 5 minutes. Result: requests per second. Essential for counter metrics.",
        tip: "rate() for counters (requests, errors). irate() for instant rate (spiky, last 2 points). avg_over_time() for gauges."
    },
    {
        difficulty: "medium",
        topic: "Log Aggregation",
        question: "Why aggregate logs centrally (ELK, Loki)?",
        options: [
        "It's required",
        "Makes logs faster",
        "Automatic fixing",
        "Search across all services, correlate events, retain history, scale"
    ],
        correct: 3,
        explanation: "Central log aggregation: search all services at once, correlate events (same request_id), retain history, handle scale. Alternatives to SSH into each server: not scalable.",
        tip: "Log aggregation stacks: ELK (Elasticsearch, Logstash, Kibana), EFK (Fluentd instead of Logstash), Loki + Grafana (lightweight)."
    },
    {
        difficulty: "medium",
        topic: "Alerting Strategy",
        question: "Should you alert on high CPU or slow API responses?",
        options: [
        "Neither",
        "Both equally",
        "High CPU",
        "Slow API responses (symptom, user impact)"
    ],
        correct: 3,
        explanation: "Alert on symptoms (user-visible issues: errors, latency) not causes (CPU, memory). High CPU might be fine (batch job). Slow responses = user impact = alert. CPU can be dashboard/investigation tool.",
        tip: "Symptom-based alerting: error rate, latency, saturation affecting users. Cause-based (CPU, disk) often false positives. Alert on user impact!"
    },
    {
        difficulty: "medium",
        topic: "SLIs and SLOs",
        question: "What's the relationship between SLI, SLO, and SLA?",
        options: [
        "SLI is deprecated",
        "Only use SLA",
        "SLI measures, SLO targets, SLA contracts with consequences",
        "They're the same"
    ],
        correct: 2,
        explanation: "SLI (Service Level Indicator): measurement (latency, availability). SLO (Service Level Objective): internal target (99.9% uptime). SLA (Service Level Agreement): contract with customers (penalties if missed).",
        tip: "Example: SLI = measured uptime, SLO = 99.9% uptime target, SLA = 99.5% with refund if missed. SLO tighter than SLA (error budget)."
    },
    {
        difficulty: "medium",
        topic: "Metric Cardinality",
        question: "What is metric cardinality and why does it matter?",
        options: [
        "Metric format",
        "Metric accuracy",
        "Number of unique label combinations - high cardinality = performance/cost issues",
        "Metric speed"
    ],
        correct: 2,
        explanation: "Cardinality = unique time series (metric + label combinations). High cardinality (user_id as label): millions of series, high memory/cost. Keep cardinality low: avoid unbounded labels.",
        tip: "Bad: labels with high cardinality (user_id, email, session_id). Good: labels with low cardinality (environment, service, status_code). Use logs for high-cardinality data."
    },

    // HARD QUESTIONS (19-25)
    {
        difficulty: "hard",
        topic: "Error Budgets",
        question: "What is an error budget?",
        options: [
        "Number of bugs allowed",
        "Testing budget",
        "Budget for fixing errors",
        "Allowed downtime based on SLO (e.g., 99.9% = 43min/month downtime budget)"
    ],
        correct: 3,
        explanation: "Error budget = allowed unreliability from SLO. 99.9% uptime = 0.1% downtime = 43 min/month. Spend budget on innovation/velocity. Exceed budget = focus on reliability. Balances innovation vs stability.",
        tip: "Error budget example: 99.9% SLO = 43min/month budget. Use for: risky deploys, experiments. Zero budget = freeze changes, improve reliability first."
    },
    {
        difficulty: "hard",
        topic: "Four Golden Signals",
        question: "What are the Four Golden Signals for monitoring?",
        options: [
        "Latency, Traffic, Errors, Saturation",
        "Dev, Test, Staging, Prod",
        "Uptime, Speed, Cost, Security",
        "CPU, Memory, Disk, Network"
    ],
        correct: 0,
        explanation: "Four Golden Signals (Google SRE): 1) Latency (response time), 2) Traffic (demand), 3) Errors (failure rate), 4) Saturation (capacity). Monitor these for any system.",
        tip: "Golden Signals for any service: Latency (p50, p95, p99), Traffic (RPS), Errors (%), Saturation (CPU, memory, queue depth). Start here!"
    },
    {
        difficulty: "hard",
        topic: "Anomaly Detection",
        question: "What is anomaly detection in monitoring?",
        options: [
        "Log parsing",
        "Manual review",
        "Static thresholds",
        "Automated detection of unusual patterns using ML/statistics"
    ],
        correct: 3,
        explanation: "Anomaly detection uses ML/statistics to identify unusual patterns automatically. Better than static thresholds for: seasonality, gradual changes, complex patterns. Tools: Datadog, CloudWatch Anomaly Detection.",
        tip: "Static threshold: alert if CPU > 80%. Anomaly detection: alert if CPU deviates from learned pattern. Better for: traffic patterns, seasonal changes."
    },
    {
        difficulty: "hard",
        topic: "RED vs USE",
        question: "What's the difference between RED and USE methodologies?",
        options: [
        "RED is deprecated",
        "USE is for security",
        "RED for services (Rate, Errors, Duration). USE for resources (Utilization, Saturation, Errors)",
        "Same thing"
    ],
        correct: 2,
        explanation: "RED (Request-based): Rate (throughput), Errors (%), Duration (latency). Use for services/APIs. USE (Resource-based): Utilization (%), Saturation (queue depth), Errors. Use for infrastructure (CPU, disk, memory).",
        tip: "RED for microservices: requests/sec, error rate, latency. USE for resources: CPU utilization, memory saturation, disk errors. Apply appropriate method."
    },
    {
        difficulty: "hard",
        topic: "Sampling in Tracing",
        question: "Why use sampling in distributed tracing?",
        options: [
        "Not needed",
        "Reduce volume/cost by tracing subset of requests (1%, 10%) while maintaining statistical validity",
        "Increase accuracy",
        "Security"
    ],
        correct: 1,
        explanation: "Tracing all requests (100%) at high scale = expensive, too much data. Sampling traces 1-10% of requests, still provides statistical accuracy. Adaptive sampling: trace all errors, sample successes.",
        tip: "Sampling strategies: Head-based (decide at entry, simple). Tail-based (decide after, complex, keep interesting traces). Always trace errors."
    },
    {
        difficulty: "hard",
        topic: "Observability-Driven Development",
        question: "What is observability-driven development?",
        options: [
        "Documentation",
        "Manual testing",
        "Writing tests",
        "Building observability into code from start (instrumentation, structured logs, metrics)"
    ],
        correct: 3,
        explanation: "Observability-driven development: design systems with observability built-in from day 1. Add instrumentation as you write code (metrics, structured logs, traces). Makes debugging in production possible.",
        tip: "Instrument as you code: emit metrics for key operations, structured logs with context, trace IDs, semantic events. Don't retrofit observability later!"
    },
    {
        difficulty: "hard",
        topic: "Alert Fatigue",
        question: "How do you prevent alert fatigue?",
        options: [
        "Ignore alerts",
        "Email only",
        "More alerts",
        "Alert on symptoms not causes, use severity levels, aggregate, auto-resolve"
    ],
        correct: 3,
        explanation: "Prevent alert fatigue: 1) Alert only on actionable issues, 2) Use severity tiers (P1-P4), 3) Aggregate similar alerts, 4) Auto-resolve transient issues, 5) Regular alert tuning. Alert fatigue = ignored alerts = outages.",
        tip: "Alert tuning: If alert doesn't require action, remove or dashboard it. If alert fires often but no action taken = tune threshold or remove. Review alerts quarterly."
    }
];
