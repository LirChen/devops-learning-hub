const questions = [
    // Mix of medium-hard questions from all topics (35 questions total)
    
    // Kubernetes (5 questions)
    {
        difficulty: "medium",
        topic: "Kubernetes",
        question: "What is the difference between 'Recreate' and 'RollingUpdate' deployment strategies?",
        options: [
            "No difference",
            "Recreate stops all pods then starts new ones (downtime), RollingUpdate updates gradually (zero downtime)",
            "RollingUpdate is faster",
            "Recreate is for production"
        ],
        correct: 1,
        explanation: "Recreate: all old pods are terminated before new ones are created (simple but has downtime). RollingUpdate: gradually replaces old pods with new ones (more complex but zero downtime).",
        tip: "RollingUpdate is the default and recommended for production. Use Recreate only if your app can't handle multiple versions running simultaneously."
    },
    {
        difficulty: "medium",
        topic: "Kubernetes",
        question: "What type of Service exposes pods to external traffic via a cloud load balancer?",
        options: ["ClusterIP", "NodePort", "LoadBalancer", "ExternalName"],
        correct: 2,
        explanation: "LoadBalancer creates an external load balancer in supported cloud providers (AWS ELB, GCP LB, etc.). ClusterIP is internal only, NodePort exposes on each node's IP.",
        tip: "Service types: ClusterIP (default, internal only) → NodePort (static port on nodes) → LoadBalancer (cloud LB)"
    },
    {
        difficulty: "hard",
        topic: "Kubernetes",
        question: "What do maxUnavailable and maxSurge control in rolling updates?",
        code: `strategy:
  type: RollingUpdate
  rollingUpdate:
    maxUnavailable: 1
    maxSurge: 1`,
        options: [
            "Update speed",
            "maxUnavailable: how many pods can be down, maxSurge: how many extra pods during update",
            "Resource limits",
            "Health check settings"
        ],
        correct: 1,
        explanation: "maxUnavailable: max pods that can be unavailable during update. maxSurge: max pods above desired count during update. Both can be absolute numbers or percentages.",
        tip: "Conservative: maxUnavailable=0, maxSurge=1 (slow, no downtime). Aggressive: maxUnavailable=50%, maxSurge=50% (fast, requires resources)."
    },
    {
        difficulty: "hard",
        topic: "Kubernetes",
        question: "What's the relationship between PersistentVolume (PV) and PersistentVolumeClaim (PVC)?",
        options: [
            "They are the same",
            "PV is actual storage, PVC is a request for storage. Pods use PVCs.",
            "PVC creates PVs",
            "PV is deprecated"
        ],
        correct: 1,
        explanation: "PV is the actual storage resource (provisioned by admin or dynamically). PVC is a request for storage by users. PVCs are bound to PVs. Pods reference PVCs, not PVs directly.",
        tip: "Think of it like: PV = available storage inventory, PVC = storage request ticket. StorageClass automates PV creation."
    },
    {
        difficulty: "hard",
        topic: "Kubernetes",
        question: "How does HorizontalPodAutoscaler (HPA) decide when to scale?",
        options: [
            "Random times",
            "Based on metrics (CPU, memory, custom) compared to target values",
            "Manual triggers only",
            "Time-based schedules"
        ],
        correct: 1,
        explanation: "HPA automatically scales pods based on metrics. Example: if average CPU > 80%, add pods. Checks metrics periodically (default: every 15s). Can use CPU, memory, or custom metrics (requests/sec).",
        tip: "HPA scales replicas. For resource scaling (CPU/memory per pod), use VerticalPodAutoscaler. For node scaling, use ClusterAutoscaler."
    },

    // CI/CD (5 questions)
    {
        difficulty: "medium",
        topic: "CI/CD",
        question: "What's the difference between Declarative and Scripted Jenkins pipelines?",
        options: [
            "They're the same",
            "Declarative is simpler/structured (pipeline {}), Scripted is more flexible (node {})",
            "Scripted is newer",
            "Declarative is deprecated"
        ],
        correct: 1,
        explanation: "Declarative: structured syntax, predefined sections, easier to learn, sufficient for most cases. Scripted: full Groovy power, maximum flexibility, steeper learning curve.",
        tip: "Start with Declarative unless you need advanced logic. Declarative has better error messages and is more maintainable."
    },
    {
        difficulty: "medium",
        topic: "CI/CD",
        question: "What is blue-green deployment?",
        options: [
            "Deploying to multiple regions",
            "Maintaining two environments (blue/green), switching traffic instantly",
            "Gradual rollout",
            "A/B testing"
        ],
        correct: 1,
        explanation: "Blue-green: maintain two identical environments. Deploy new version to inactive environment (green), test it, then switch traffic from blue to green. Instant rollback by switching back.",
        tip: "Blue-green: instant switch, instant rollback, needs 2x resources. Perfect when you can't afford downtime and have resources."
    },
    {
        difficulty: "hard",
        topic: "CI/CD",
        question: "When would you use blue-green vs canary deployment?",
        options: [
            "They're the same",
            "Blue-green: instant rollback priority, have resources. Canary: risk mitigation, gradual validation",
            "Canary for testing only",
            "Blue-green is deprecated"
        ],
        correct: 1,
        explanation: "Blue-green: instant switch/rollback, needs 2x resources, all-or-nothing. Canary: gradual rollout, monitor real user impact, partial rollback, needs sophisticated routing/monitoring. Choose based on: risk tolerance, resources, monitoring capability.",
        tip: "High risk change + good monitoring = Canary. Need instant rollback + have resources = Blue-green. Small change + limited resources = Rolling update."
    },
    {
        difficulty: "hard",
        topic: "CI/CD",
        question: "What are secrets management best practices in CI/CD?",
        options: [
            "Hardcode in Jenkinsfile",
            "Use CI/CD secret stores, never commit secrets, rotate regularly, principle of least privilege",
            "Store in git",
            "Email them"
        ],
        correct: 1,
        explanation: "Secrets best practices: use CI/CD secret stores (Jenkins Credentials, GitHub Secrets), never commit to git, rotate regularly, audit access, least privilege, mask in logs, use short-lived tokens when possible.",
        tip: "Tools: Jenkins Credentials, GitHub Secrets, HashiCorp Vault, AWS Secrets Manager. Pattern: inject at runtime, never hardcode."
    },
    {
        difficulty: "hard",
        topic: "CI/CD",
        question: "Why is observability crucial in CD (Continuous Deployment)?",
        options: [
            "It's optional",
            "To detect issues quickly, validate deployments, enable safe automation",
            "For compliance only",
            "To slow down deployments"
        ],
        correct: 1,
        explanation: "With automated production deployments, observability is critical: detect issues fast, automatically rollback bad deploys, validate health, correlate metrics with deployments. Without monitoring, automated deployment is reckless.",
        tip: "CD requirements: comprehensive monitoring, automated rollback, deployment tracking, alerting. Pattern: deploy → health check → monitor metrics → rollback if spike in errors."
    },

    // AWS (5 questions)
    {
        difficulty: "medium",
        topic: "AWS",
        question: "What's the difference between IAM users and IAM roles?",
        options: [
            "They're the same",
            "Users have permanent credentials (people), roles have temporary credentials (services/resources)",
            "Roles are more secure",
            "Users are deprecated"
        ],
        correct: 1,
        explanation: "IAM Users: permanent credentials for people. IAM Roles: temporary credentials for AWS services, applications, or federated users. Roles are more secure (no long-term credentials to leak).",
        tip: "Best practice: People use SSO/federation, applications use roles. Never hardcode IAM credentials! Use roles for EC2/Lambda/ECS."
    },
    {
        difficulty: "medium",
        topic: "AWS",
        question: "What's the difference between public and private subnets?",
        options: [
            "No difference",
            "Public subnets have route to Internet Gateway, private don't",
            "Public subnets are faster",
            "Private subnets are more secure"
        ],
        correct: 1,
        explanation: "Public subnet: has route to Internet Gateway (resources can reach internet). Private subnet: no route to Internet Gateway (isolated, but can use NAT Gateway for outbound). Security is about configuration, not subnet type.",
        tip: "Pattern: Public subnet for load balancers/bastion hosts, private subnet for app servers/databases. Private resources access internet via NAT Gateway."
    },
    {
        difficulty: "hard",
        topic: "AWS",
        question: "Which option is cheapest for running EC2 24/7 for 1-3 years?",
        options: [
            "On-Demand instances",
            "Reserved Instances (1-3 year commitment)",
            "Spot Instances",
            "Lambda"
        ],
        correct: 1,
        explanation: "Reserved Instances (1-year: ~40% cheaper, 3-year: ~60% cheaper than On-Demand). Spot: 70-90% cheaper BUT can be terminated. For predictable 24/7 workload, Reserved is best. Spot is for fault-tolerant batch jobs.",
        tip: "On-Demand: flexibility, highest cost. Reserved: commitment, big savings. Spot: interruptible, huge savings. Savings Plans: newer, more flexible than Reserved."
    },
    {
        difficulty: "hard",
        topic: "AWS",
        question: "How do you achieve Multi-AZ deployment for RDS?",
        options: [
            "Manual setup",
            "Enable Multi-AZ option - AWS creates standby replica in different AZ, auto failover",
            "Create multiple databases",
            "Use Read Replicas"
        ],
        correct: 1,
        explanation: "Multi-AZ RDS: AWS maintains synchronous standby replica in different AZ. Automatic failover (30-120 sec) if primary fails. For high availability, not read scaling. Read Replicas (async) are for scaling reads.",
        tip: "Multi-AZ: HA and failover (same endpoint). Read Replicas: read scaling (different endpoints). You can have both: Multi-AZ for HA + Read Replicas for scaling."
    },
    {
        difficulty: "hard",
        topic: "AWS",
        question: "What are the four DR strategies in AWS (fastest to slowest)?",
        options: [
            "All the same speed",
            "Multi-site (active-active) > Warm standby > Pilot light > Backup & restore",
            "Backup only",
            "Replication only"
        ],
        correct: 1,
        explanation: "DR strategies by RTO (Recovery Time Objective): 1) Multi-site/active-active (minutes), 2) Warm standby (15-30 min), 3) Pilot light (hours), 4) Backup & restore (24+ hours). Trade-off: speed vs cost.",
        tip: "Choose based on RTO/RPO requirements and budget. Multi-site: expensive but instant failover. Backup & restore: cheapest but slowest. Most use warm standby (good balance)."
    },

    // Infrastructure as Code (5 questions)
    {
        difficulty: "medium",
        topic: "IaC",
        question: "What is terraform.tfstate and why is it critical?",
        options: [
            "Configuration file",
            "Tracks infrastructure state - maps config to real resources. Losing it = disaster!",
            "Backup file",
            "Error log"
        ],
        correct: 1,
        explanation: "State file maps Terraform config to real-world resources. Terraform uses it to know what exists, calculate changes, and manage dependencies. Losing state = Terraform doesn't know what it created (disaster).",
        tip: "NEVER commit state to git (contains secrets). Use remote backends: S3, Terraform Cloud, Azure Blob. Enable state locking (DynamoDB for S3) to prevent concurrent modifications."
    },
    {
        difficulty: "medium",
        topic: "IaC",
        question: "Why use Terraform modules?",
        options: [
            "Required by Terraform",
            "Reusability, organization, abstraction - like functions in programming",
            "Makes Terraform faster",
            "For testing only"
        ],
        correct: 1,
        explanation: "Modules encapsulate and reuse infrastructure code. Like functions: inputs (variables), processing (resources), outputs (values). DRY principle. Example: VPC module used by multiple projects.",
        tip: "Module pattern: Create reusable modules for common patterns (VPC, EKS, ALB). Teams share via git or Terraform Registry. Main config calls modules."
    },
    {
        difficulty: "medium",
        topic: "IaC",
        question: "What are handlers in Ansible?",
        options: [
            "Error handlers",
            "Tasks that run only when notified by other tasks (e.g., restart service after config change)",
            "File managers",
            "User managers"
        ],
        correct: 1,
        explanation: "Handlers are tasks triggered by 'notify' from other tasks. Run once at end of play, even if notified multiple times. Common use: restart service after config change.",
        tip: "Pattern: task updates config file → notifies handler → handler restarts service. Handlers run once at play end, even if notified 10 times."
    },
    {
        difficulty: "hard",
        topic: "IaC",
        question: "Why use remote backend for Terraform state?",
        options: [
            "It's faster",
            "Team collaboration, locking, encryption, backup, security",
            "Required by Terraform",
            "Automatic updates"
        ],
        correct: 1,
        explanation: "Remote backend benefits: 1) Team collaboration (shared state), 2) State locking (prevent conflicts), 3) Encryption at rest, 4) Automatic backup, 5) No secrets in git. Essential for teams. Backends: S3+DynamoDB, Terraform Cloud, Azure Blob.",
        tip: "S3 backend pattern: S3 bucket (state storage) + DynamoDB table (locking) + encryption. Never use local state for team projects."
    },
    {
        difficulty: "hard",
        topic: "IaC",
        question: "What is GitOps for infrastructure?",
        options: [
            "Using Git for code only",
            "Infrastructure changes via Git PRs: review → merge → automated apply",
            "Manual deployments",
            "Git backups"
        ],
        correct: 1,
        explanation: "GitOps: Git as single source of truth for infrastructure. Process: 1) Change IaC code, 2) Create PR, 3) Review terraform plan, 4) Merge, 5) CI/CD auto-applies. Benefits: audit trail, collaboration, rollback, automation.",
        tip: "GitOps pattern: terraform plan in CI (on PR), terraform apply in CD (on merge). Add: cost estimation, security scanning, policy checks. Git history = infrastructure history."
    },

    // Monitoring (5 questions)
    {
        difficulty: "medium",
        topic: "Monitoring",
        question: "What's the difference between Counter and Gauge?",
        options: [
            "No difference",
            "Counter only increases (requests, errors). Gauge goes up/down (CPU, memory)",
            "Counter is faster",
            "Gauge is deprecated"
        ],
        correct: 1,
        explanation: "Counter: monotonically increasing (resets on restart). Use rate() to get per-second rate. Gauge: current value that varies. Counter for cumulative, Gauge for point-in-time.",
        tip: "Counter example: http_requests_total (use rate()). Gauge example: memory_usage_bytes (use as-is). Histogram for distributions."
    },
    {
        difficulty: "medium",
        topic: "Monitoring",
        question: "What is distributed tracing?",
        options: [
            "Error tracking",
            "Track requests across multiple services (microservices) to see full flow",
            "Log aggregation",
            "Metric collection"
        ],
        correct: 1,
        explanation: "Distributed tracing tracks requests through microservices. Each request has trace ID, services add spans. See: latency per service, bottlenecks, errors. Essential for microservices debugging.",
        tip: "Tracing tools: Jaeger, Zipkin, AWS X-Ray. Pattern: Generate trace_id at entry, propagate through services, aggregate spans. See exactly where time is spent."
    },
    {
        difficulty: "medium",
        topic: "Monitoring",
        question: "Should you alert on high CPU or slow API responses?",
        options: [
            "High CPU",
            "Slow API responses (symptom, user impact)",
            "Both equally",
            "Neither"
        ],
        correct: 1,
        explanation: "Alert on symptoms (user-visible issues: errors, latency) not causes (CPU, memory). High CPU might be fine (batch job). Slow responses = user impact = alert. CPU can be dashboard/investigation tool.",
        tip: "Symptom-based alerting: error rate, latency, saturation affecting users. Cause-based (CPU, disk) often false positives. Alert on user impact!"
    },
    {
        difficulty: "hard",
        topic: "Monitoring",
        question: "What is an error budget?",
        options: [
            "Budget for fixing errors",
            "Allowed downtime based on SLO (e.g., 99.9% = 43min/month downtime budget)",
            "Number of bugs allowed",
            "Testing budget"
        ],
        correct: 1,
        explanation: "Error budget = allowed unreliability from SLO. 99.9% uptime = 0.1% downtime = 43 min/month. Spend budget on innovation/velocity. Exceed budget = focus on reliability. Balances innovation vs stability.",
        tip: "Error budget example: 99.9% SLO = 43min/month budget. Use for: risky deploys, experiments. Zero budget = freeze changes, improve reliability first."
    },
    {
        difficulty: "hard",
        topic: "Monitoring",
        question: "What are the Four Golden Signals for monitoring?",
        options: [
            "CPU, Memory, Disk, Network",
            "Latency, Traffic, Errors, Saturation",
            "Uptime, Speed, Cost, Security",
            "Dev, Test, Staging, Prod"
        ],
        correct: 1,
        explanation: "Four Golden Signals (Google SRE): 1) Latency (response time), 2) Traffic (demand), 3) Errors (failure rate), 4) Saturation (capacity). Monitor these for any system.",
        tip: "Golden Signals for any service: Latency (p50, p95, p99), Traffic (RPS), Errors (%), Saturation (CPU, memory, queue depth). Start here!"
    },

    // Docker & Linux (5 questions)
    {
        difficulty: "medium",
        topic: "Docker",
        question: "What's the difference between CMD and ENTRYPOINT?",
        options: [
            "They're the same",
            "ENTRYPOINT defines main command, CMD provides default arguments (can be overridden)",
            "CMD is newer",
            "ENTRYPOINT is deprecated"
        ],
        correct: 1,
        explanation: "ENTRYPOINT: main executable (hard to override). CMD: default arguments (easy to override). Use both: ENTRYPOINT for command, CMD for default args. Override CMD from docker run.",
        tip: "Pattern: ENTRYPOINT ['python', 'app.py'], CMD ['--port', '8080']. docker run myimage --port 9000 overrides CMD only."
    },
    {
        difficulty: "medium",
        topic: "Linux",
        question: "What does this command do: ps aux | grep nginx | awk '{print $2}' | xargs kill?",
        options: [
            "Counts nginx processes",
            "Finds nginx processes, extracts PIDs, kills them",
            "Restarts nginx",
            "Shows nginx config"
        ],
        correct: 1,
        explanation: "ps aux lists processes, grep filters for nginx, awk extracts PID (column 2), xargs passes PIDs to kill command. Kills all nginx processes. Better: killall nginx or systemctl stop nginx.",
        tip: "Breaking down pipes: ps aux → grep → awk → xargs. Each step transforms/filters data. Powerful for automation."
    },
    {
        difficulty: "hard",
        topic: "Docker",
        question: "What is multi-stage Docker build?",
        code: `FROM golang:1.19 AS builder
RUN go build -o app

FROM alpine
COPY --from=builder /app /app`,
        options: [
            "Building multiple images",
            "Using multiple FROM statements to reduce final image size (builder + runtime)",
            "Parallel builds",
            "Backup strategy"
        ],
        correct: 1,
        explanation: "Multi-stage build: use builder image (with compilers/tools) to build, copy artifacts to smaller runtime image. Result: much smaller image (no build tools in final image). Essential for production.",
        tip: "Pattern: Stage 1 (builder): large image with tools. Stage 2 (runtime): small image (alpine, distroless), copy only artifacts. Image size: GB → MB."
    },
    {
        difficulty: "hard",
        topic: "Linux",
        question: "What does 'chmod 755 script.sh' do?",
        options: [
            "Deletes file",
            "Sets permissions: owner=rwx, group=rx, others=rx",
            "Renames file",
            "Compresses file"
        ],
        correct: 1,
        explanation: "755 = rwxr-xr-x. 7=rwx(4+2+1), 5=r-x(4+0+1). Owner can read/write/execute, group and others can read/execute. Common for scripts and directories.",
        tip: "Common permissions: 644 (files: rw-r--r--), 755 (scripts/dirs: rwxr-xr-x), 600 (secrets: rw-------), 777 (danger: rwxrwxrwx)."
    },
    {
        difficulty: "hard",
        topic: "Docker",
        question: "How do you optimize Docker build cache?",
        options: [
            "Disable cache",
            "Order Dockerfile: least-changing lines first, most-changing last (COPY code at end)",
            "Use bigger images",
            "Build more frequently"
        ],
        correct: 1,
        explanation: "Cache optimization: order matters. Put stable layers first (OS, dependencies), changing layers last (app code). Each line creates layer. Change invalidates that layer and all after. Pattern: FROM → system packages → dependencies → code.",
        tip: "Example: COPY package.json, RUN npm install (cached), then COPY app code (changes often). If code changes, dependency install reuses cache."
    },

    // Python & Git (5 questions)
    {
        difficulty: "medium",
        topic: "Python",
        question: "What's the difference between '==' and 'is' in Python?",
        options: [
            "They're the same",
            "== compares values, 'is' compares identity (same object in memory)",
            "'is' is faster",
            "== is deprecated"
        ],
        correct: 1,
        explanation: "==: checks if values are equal. 'is': checks if same object (same memory address). Use == for value comparison, 'is' for None checks and singleton comparisons.",
        tip: "Correct: if x is None (identity). Incorrect: if x == None (works but not Pythonic). 'is' is faster for None checks."
    },
    {
        difficulty: "medium",
        topic: "Git",
        question: "What does 'git rebase' do?",
        options: [
            "Deletes branches",
            "Replays commits from current branch onto another branch (rewrite history)",
            "Merges branches",
            "Tags a release"
        ],
        correct: 1,
        explanation: "Rebase takes commits from your branch, replays them on top of target branch. Creates linear history (cleaner than merge commits). NEVER rebase public/shared branches! Use for local cleanup.",
        tip: "Merge: preserves history, creates merge commit. Rebase: linear history, rewrites history. Rebase local feature branches before merging. Golden rule: never rebase public history."
    },
    {
        difficulty: "hard",
        topic: "Python",
        question: "What's the output?",
        code: `def func(l=[]):\n    l.append(1)\n    return l\n\nprint(func())\nprint(func())`,
        options: ["[1] [1]", "[1] [1, 1]", "Error", "[] []"],
        correct: 1,
        explanation: "Mutable default arguments are created once at function definition, not each call. Same list is reused. Both calls append to same list: [1], then [1,1]. Fix: use None as default, create new list inside function.",
        tip: "Never use mutable defaults (list, dict). Pattern: def func(l=None): if l is None: l = []. Immutable defaults (int, str, None) are safe."
    },
    {
        difficulty: "hard",
        topic: "Git",
        question: "What's the difference between 'git merge --squash' and regular merge?",
        options: [
            "Same thing",
            "Squash combines all commits into one commit before merging (cleaner history)",
            "Squash is faster",
            "Squash is deprecated"
        ],
        correct: 1,
        explanation: "Regular merge: preserves all commits + merge commit. Squash merge: combines all commits into single commit (loses individual commit history). Use squash for: cleaning up messy feature branch history before merging to main.",
        tip: "Squash use case: Feature branch has 50 'fix typo' commits. Squash into one meaningful commit: 'Add user authentication feature'. Cleaner main branch history."
    },
    {
        difficulty: "hard",
        topic: "Python",
        question: "What are Python generators and why use them?",
        options: [
            "Random number generators",
            "Functions that yield values lazily (one at a time) - memory efficient for large datasets",
            "Code generators",
            "Error generators"
        ],
        correct: 1,
        explanation: "Generators yield values one at a time (lazy evaluation) instead of creating entire list in memory. Memory efficient for large datasets. Use 'yield' instead of 'return'. Iterator protocol.",
        tip: "List: [x*2 for x in range(million)] = load million items in memory. Generator: (x*2 for x in range(million)) = one at a time. Huge memory savings."
    }
];
