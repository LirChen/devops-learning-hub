# Sample Questions for Remaining Topics

This file contains example questions for each remaining quiz topic. Use these as templates to create full quizzes.

---

## 🎯 KUBERNETES QUIZ (Sample Questions)

```javascript
// Easy Questions
{
    difficulty: "easy",
    topic: "Kubernetes Basics",
    question: "What is the smallest deployable unit in Kubernetes?",
    options: ["Container", "Pod", "Node", "Deployment"],
    correct: 1,
    explanation: "A Pod is the smallest deployable unit. It can contain one or more containers that share network and storage. Most commonly, one pod = one container.",
    tip: "Think of pods as wrappers around containers. They add Kubernetes-specific features like health checks and resource limits."
},
{
    difficulty: "easy",
    topic: "kubectl Commands",
    question: "Which command shows all pods in all namespaces?",
    options: [
        "kubectl get pods",
        "kubectl get pods --all",
        "kubectl get pods -A",
        "kubectl show pods"
    ],
    correct: 2,
    explanation: "'kubectl get pods -A' or '--all-namespaces' shows pods across all namespaces. Without flags, only shows current namespace.",
    tip: "Add -o wide for more details: kubectl get pods -A -o wide"
},

// Medium Questions
{
    difficulty: "medium",
    topic: "Services",
    question: "What type of Service exposes pods to external traffic via cloud load balancer?",
    options: ["ClusterIP", "NodePort", "LoadBalancer", "ExternalName"],
    correct: 2,
    explanation: "LoadBalancer creates an external load balancer (AWS ELB, GCP LB, etc.). ClusterIP is internal only, NodePort exposes on each node's IP.",
    tip: "ClusterIP (default, internal) → NodePort (static port on nodes) → LoadBalancer (cloud LB)"
},
{
    difficulty: "medium",
    topic: "ConfigMaps",
    question: "How do you inject a ConfigMap as environment variables?",
    code: `apiVersion: v1
kind: Pod
spec:
  containers:
  - name: app
    envFrom:
    - ___:
        name: app-config`,
    options: ["configMap", "configMapRef", "configMapKeyRef", "secretRef"],
    correct: 1,
    explanation: "Use 'configMapRef' to inject all keys as env vars. 'configMapKeyRef' injects specific keys. Similar syntax for secrets (secretRef).",
    tip: "ConfigMaps for non-sensitive config, Secrets for passwords/tokens"
},

// Hard Questions
{
    difficulty: "hard",
    topic: "Deployments",
    question: "What's the difference between recreate and rolling update strategies?",
    options: [
        "No difference",
        "Recreate stops all pods then starts new ones (downtime), rolling updates one by one (zero downtime)",
        "Rolling is faster",
        "Recreate is for production"
    ],
    correct: 1,
    explanation: "Recreate: all old pods down, then all new pods up (simple but has downtime). Rolling: gradually replace old with new (complex but zero downtime). Choose based on your needs.",
    tip: "Rolling update is default. Use recreate only if your app can't handle multiple versions running simultaneously."
},
{
    difficulty: "hard",
    topic: "Resource Management",
    question: "What happens if a pod exceeds its memory limit?",
    code: `resources:
  limits:
    memory: \"128Mi\"
  requests:
    memory: \"64Mi\"`,
    options: [
        "Pod slows down",
        "Pod is throttled",
        "Pod is killed (OOMKilled)",
        "Warning is logged only"
    ],
    correct: 2,
    explanation: "Exceeding memory limit causes pod to be killed (OOMKilled). CPU limit causes throttling (slowdown), not killing. Requests are for scheduling, limits are hard caps.",
    tip: "Always set limits! Without them, one pod can consume all node resources. Memory: be generous. CPU: can be tighter."
}
```

---

## 🔄 CI/CD & JENKINS QUIZ (Sample Questions)

```javascript
// Easy Questions
{
    difficulty: "easy",
    topic: "CI/CD Basics",
    question: "What does CD stand for?",
    options: [
        "Code Delivery",
        "Continuous Deployment or Continuous Delivery",
        "Container Distribution",
        "Central Database"
    ],
    correct: 1,
    explanation: "CD = Continuous Delivery (automated to staging) OR Continuous Deployment (automated to production). Both build on CI (Continuous Integration).",
    tip: "CI = automated testing. Continuous Delivery = CAN deploy anytime. Continuous Deployment = DOES deploy automatically."
},
{
    difficulty: "easy",
    topic: "Pipeline Stages",
    question: "What is the typical order of CI/CD pipeline stages?",
    options: [
        "Deploy → Test → Build",
        "Build → Test → Deploy",
        "Test → Build → Deploy",
        "Build → Deploy → Test"
    ],
    correct: 1,
    explanation: "Standard pipeline: Build (compile/package) → Test (unit, integration) → Deploy (to env). You build first, test before deploying.",
    tip: "Think: Make it → Test it → Ship it. Can add stages: lint, security scan, performance tests."
},

// Medium Questions
{
    difficulty: "medium",
    topic: "Jenkins Pipeline",
    question: "What's the difference between Declarative and Scripted pipelines?",
    options: [
        "They're the same",
        "Declarative is simpler/structured, Scripted is more flexible/complex",
        "Scripted is newer",
        "Declarative is deprecated"
    ],
    correct: 1,
    explanation: "Declarative: structured, predefined syntax, easier to learn. Scripted: full Groovy, maximum flexibility, steeper learning curve. Start with Declarative.",
    tip: "Declarative starts with 'pipeline {', Scripted with 'node {'. 95% of cases, Declarative is enough."
},
{
    difficulty: "medium",
    topic: "Artifacts",
    question: "Why store build artifacts in an artifact repository?",
    options: [
        "Required by Jenkins",
        "Version control for binaries, faster deployments, central storage",
        "Makes builds faster",
        "Automatic testing"
    ],
    correct: 1,
    explanation: "Artifact repos (Artifactory, Nexus, S3) store build outputs (JARs, WARs, Docker images). Deploy from artifacts (fast) vs rebuilding (slow). Version control for binaries.",
    tip: "Pattern: Build once, deploy many. Store artifacts after successful build, deploy from artifacts."
},

// Hard Questions
{
    difficulty: "hard",
    topic: "Deployment Strategies",
    question: "When would you use blue-green vs canary deployment?",
    options: [
        "They're the same",
        "Blue-green for instant rollback, canary for gradual rollout with metrics",
        "Canary is for testing, blue-green for production",
        "Blue-green is deprecated"
    ],
    correct: 1,
    explanation: "Blue-green: Run old (blue) and new (green) simultaneously, switch traffic instantly, rollback instantly. Canary: Gradually shift traffic (5%→25%→100%), monitor metrics, rollback if issues.",
    tip: "Blue-green: faster, needs 2x resources. Canary: safer, complex. Choose based on: risk tolerance, resource availability, monitoring capability."
},
{
    difficulty: "hard",
    topic: "GitLab CI",
    question: "What does this .gitlab-ci.yml do?",
    code: `stages:
  - build
  - test
  
build:
  stage: build
  script:
    - docker build -t app:$CI_COMMIT_SHA .
  only:
    - main`,
    options: [
        "Builds on all branches",
        "Builds Docker image only on main branch with commit SHA as tag",
        "Tests then builds",
        "Pushes to registry"
    ],
    correct: 1,
    explanation: "'only: main' restricts to main branch. $CI_COMMIT_SHA is GitLab variable (git commit hash). Tags image with unique commit hash for traceability.",
    tip: "Always tag with commit SHA or build number for traceability. Never use only 'latest'!"
}
```

---

## ☁️ AWS & CLOUD QUIZ (Sample Questions)

```javascript
// Easy Questions
{
    difficulty: "easy",
    topic: "EC2 Basics",
    question: "What is an EC2 instance?",
    options: [
        "A database",
        "A virtual server",
        "A storage bucket",
        "A network"
    ],
    correct: 1,
    explanation: "EC2 (Elastic Compute Cloud) provides virtual servers. You choose instance type (CPU/RAM), OS, and pay per hour. It's the foundation of AWS compute.",
    tip: "Think of EC2 as a computer in AWS's data center that you rent by the hour."
},
{
    difficulty: "easy",
    topic: "S3",
    question: "What is S3 primarily used for?",
    options: [
        "Running applications",
        "Object storage (files)",
        "Compute",
        "Networking"
    ],
    correct: 1,
    explanation: "S3 (Simple Storage Service) stores objects (files). Highly durable (99.999999999% durability). Use for: backups, static websites, logs, data lakes.",
    tip: "S3 is like unlimited cloud storage. Organize with buckets (like folders). Pay per GB stored + data transfer."
},

// Medium Questions
{
    difficulty: "medium",
    topic: "VPC",
    question: "What is a VPC?",
    options: [
        "Virtual Private Cloud - isolated network in AWS",
        "A type of EC2 instance",
        "A database service",
        "A monitoring tool"
    ],
    correct: 0,
    explanation: "VPC is your private network in AWS. Define subnets (public/private), route tables, security groups. Resources in VPC are isolated from internet unless you allow it.",
    tip: "Pattern: Public subnet (has internet access) for web servers, private subnet (no internet) for databases."
},
{
    difficulty: "medium",
    topic: "IAM",
    question: "What's the difference between IAM users and IAM roles?",
    options: [
        "They're the same",
        "Users are for people, roles are for services/resources",
        "Roles are more secure",
        "Users are deprecated"
    ],
    correct: 1,
    explanation: "Users: permanent credentials for people. Roles: temporary credentials for services (EC2, Lambda). Roles are more secure (no long-term credentials to leak).",
    tip: "Best practice: People use SSO, applications use roles. Never hardcode IAM credentials!"
},

// Hard Questions
{
    difficulty: "hard",
    topic: "Auto Scaling",
    question: "How does Auto Scaling decide when to scale?",
    options: [
        "Random times",
        "Based on CloudWatch metrics (CPU, memory, custom) and thresholds",
        "Manual only",
        "Time-based only"
    ],
    correct: 1,
    explanation: "Auto Scaling uses CloudWatch alarms. Example: if average CPU > 70% for 5 min, add instances. If CPU < 30% for 10 min, remove instances. Can use any metric.",
    tip: "Set reasonable thresholds. Too sensitive = flapping (add/remove rapidly). Not sensitive enough = slow response."
},
{
    difficulty: "hard",
    topic: "Cost Optimization",
    question: "Which is the cheapest option for running a web server 24/7?",
    options: [
        "On-Demand instances",
        "Reserved Instances (1-3 year commitment)",
        "Spot Instances",
        "Lambda"
    ],
    correct: 1,
    explanation: "Reserved (1-year): 40% cheaper. Spot: 70-90% cheaper BUT can be terminated. On-Demand: most expensive. For 24/7 predictable workload, Reserved is best.",
    tip: "On-Demand: flexibility. Reserved: predictable long-term. Spot: fault-tolerant batch jobs. Savings Plans: newer, more flexible than Reserved."
}
```

---

## 📜 INFRASTRUCTURE AS CODE (Terraform/Ansible) QUIZ

```javascript
// Easy Questions
{
    difficulty: "easy",
    topic: "Terraform Basics",
    question: "What is Terraform used for?",
    options: [
        "Monitoring",
        "Infrastructure as Code - define infrastructure in config files",
        "Container orchestration",
        "Code compilation"
    ],
    correct: 1,
    explanation: "Terraform lets you define infrastructure (servers, networks, etc.) in HCL (HashiCorp Configuration Language) files. Version control your infrastructure like code.",
    tip: "IaC benefits: version control, repeatability, documentation, automation. No more manual clicking in console!"
},
{
    difficulty: "easy",
    topic: "Terraform Commands",
    question: "What does 'terraform apply' do?",
    options: [
        "Shows changes",
        "Creates/updates infrastructure to match config",
        "Destroys infrastructure",
        "Validates syntax"
    ],
    correct: 1,
    explanation: "'terraform apply' creates/updates resources. Always run 'terraform plan' first to see changes. 'terraform destroy' removes everything.",
    tip: "Workflow: write config → terraform init → terraform plan (review) → terraform apply"
},

// Medium Questions
{
    difficulty: "medium",
    topic: "Terraform State",
    question: "What is terraform.tfstate and why is it important?",
    options: [
        "Configuration file",
        "Tracks current infrastructure state - DON'T delete!",
        "Backup file",
        "Error log"
    ],
    correct: 1,
    explanation: "State file maps config to real resources. Terraform uses it to know what exists and plan changes. Losing state = Terraform doesn't know what it created!",
    tip: "NEVER commit state to git (has secrets). Use remote backends: S3, Terraform Cloud. Enable state locking!"
},
{
    difficulty: "medium",
    topic: "Ansible Basics",
    question: "What is an Ansible playbook?",
    options: [
        "A server inventory",
        "YAML file defining tasks to execute on hosts",
        "A type of server",
        "A monitoring dashboard"
    ],
    correct: 1,
    explanation: "Playbooks define what to do (install packages, copy files, etc.) on which hosts. Written in YAML. Idempotent: safe to run multiple times.",
    tip: "Playbook structure: hosts (where) → tasks (what) → handlers (triggers). Use roles for reusability."
},

// Hard Questions
{
    difficulty: "hard",
    topic: "Terraform Modules",
    question: "Why use Terraform modules?",
    options: [
        "Required by Terraform",
        "Reusability, organization, abstraction - like functions in programming",
        "Makes terraform faster",
        "For testing only"
    ],
    correct: 1,
    explanation: "Modules encapsulate resources. Example: VPC module used by multiple projects. DRY principle. Inputs = variables, outputs = values to use elsewhere.",
    tip: "Pattern: Create reusable modules for common patterns (VPC, EKS cluster). Teams share modules via git or registry."
},
{
    difficulty: "hard",
    topic: "Idempotency",
    question: "What does idempotency mean in IaC?",
    options: [
        "Running once is enough",
        "Running multiple times produces same result - safe to repeat",
        "Cannot be run twice",
        "Automatic rollback"
    ],
    correct: 1,
    explanation: "Idempotent: same action multiple times = same result. Example: 'ensure package installed' - installs if missing, skips if present. NOT: 'add user' (creates duplicates).",
    tip: "Terraform and Ansible are idempotent by design. Shell scripts often aren't - be careful with raw 'run command' tasks!"
}
```

---

## 📊 MONITORING & OBSERVABILITY QUIZ

```javascript
// Easy Questions
{
    difficulty: "easy",
    topic: "Monitoring Basics",
    question: "What's the difference between monitoring and observability?",
    options: [
        "They're the same",
        "Monitoring: is system up? Observability: why did it fail?",
        "Observability is outdated",
        "Monitoring is for clouds only"
    ],
    correct: 1,
    explanation: "Monitoring: known unknowns (CPU, memory, uptime). Observability: unknown unknowns (why is this API slow?). Logs + metrics + traces = observability.",
    tip: "Monitoring answers 'what happened'. Observability answers 'why it happened'. You need both!"
},
{
    difficulty: "easy",
    topic: "Prometheus",
    question: "What type of database is Prometheus?",
    options: [
        "SQL database",
        "Time-series database (for metrics)",
        "Document database",
        "Graph database"
    ],
    correct: 1,
    explanation: "Prometheus stores time-series data: metric values over time. Optimized for queries like 'CPU usage last 24h'. Pull-based: Prometheus scrapes metrics from targets.",
    tip: "Prometheus + Grafana is the standard open-source monitoring stack"
},

// Medium Questions
{
    difficulty: "medium",
    topic: "Metrics Types",
    question: "Which metric type would you use to track 'number of requests'?",
    options: ["Gauge", "Counter", "Histogram", "Summary"],
    correct: 1,
    explanation: "Counter: only goes up (requests, errors). Gauge: up and down (memory, connections). Histogram: distributions (latency buckets). Summary: like histogram but calculated client-side.",
    tip: "Counter: can only increase or reset. Rate() function calculates per-second rate: rate(requests_total[5m])"
},
{
    difficulty: "medium",
    topic: "Logging",
    question: "What's structured logging?",
    code: `# Unstructured\n\"User john logged in at 10:30\"\n\n# Structured\n{\"user\": \"john\", \"action\": \"login\", \"time\": \"10:30\"}`,
    options: [
        "Logs in a database",
        "JSON/key-value format - easily parseable and searchable",
        "Logs with timestamps",
        "Compressed logs"
    ],
    correct: 1,
    explanation: "Structured logs (JSON, logfmt) are machine-readable. Easy to query: 'show all login actions'. Unstructured logs require regex parsing. Modern best practice.",
    tip: "Use structured logging from day 1! Format: JSON or logfmt. Include: timestamp, level, message, context fields."
},

// Hard Questions
{
    difficulty: "hard",
    topic: "Alerting Strategy",
    question: "What makes a good alert?",
    options: [
        "Alert on everything",
        "Actionable (requires human response), not noisy, includes context",
        "Alert on warnings only",
        "Email only"
    ],
    correct: 1,
    explanation: "Good alert: 1) Actionable (something you can fix), 2) Not noisy (alert fatigue), 3) Includes context (what's wrong, where, how severe). Bad: 'something is wrong somewhere'.",
    tip: "Alert on symptoms (user impact), not causes (internal metrics). Example: alert on 'API error rate' not 'CPU high'."
},
{
    difficulty: "hard",
    topic: "SLOs/SLIs",
    question: "What's an SLO?",
    options: [
        "Server Load Optimizer",
        "Service Level Objective - target for reliability (e.g., 99.9% uptime)",
        "Security Level Override",
        "System Log Output"
    ],
    correct: 1,
    explanation: "SLI = Service Level Indicator (metric: latency, availability). SLO = Service Level Objective (target: 99.9%). SLA = Service Level Agreement (contract with consequences).",
    tip: "SLI = measurement, SLO = goal, SLA = promise. Example SLO: '99.9% of requests < 200ms' measured by SLI (actual latency)"
}
```

---

## 💡 How to Use These Templates

1. **Copy the question structure**
2. **Adapt to your specific needs**
3. **Add real-world scenarios**
4. **Include code examples where relevant**
5. **Write detailed explanations**
6. **Add practical tips**

---

## 🎯 Question Difficulty Guidelines

### Easy (30% of quiz)
- Basic definitions
- Single-step commands
- Fundamental concepts
- Yes/no scenarios

### Medium (50% of quiz)
- Application of concepts
- Multi-step processes
- Common scenarios
- Best practices

### Hard (20% of quiz)
- Complex scenarios
- Design decisions
- Troubleshooting
- Advanced concepts

---

## 📝 Next Steps

1. Create 25 questions for each remaining topic using these templates
2. Test each quiz yourself
3. Get feedback from peers
4. Iterate and improve
5. Add more topics as needed

Good luck building your comprehensive DevOps learning system! 🚀
