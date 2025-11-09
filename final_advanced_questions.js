const questions = [
    // Advanced DevOps scenarios - real-world problem solving (40 questions total)
    
    // Kubernetes Advanced (8 questions)
    {
        difficulty: "hard",
        topic: "Kubernetes",
        question: "Your application pods are being evicted frequently. What are likely causes and solutions?",
        options: [
        "Too many pods",
        "Always a Kubernetes bug",
        "Network issues",
        "Resource pressure (memory/disk), missing requests/limits, or node conditions. Fix: set requests/limits, add resources, check node pressure"
    ],
        correct: 3,
        explanation: "Pod eviction happens when: 1) Node under memory/disk pressure, 2) Pods without resource requests evicted first, 3) QoS class matters (BestEffort evicted before Burstable/Guaranteed). Solutions: set accurate requests/limits, add node capacity, check node conditions (kubectl describe node).",
        tip: "Prevention: Always set resource requests/limits. Guaranteed QoS (requests=limits) for critical pods. Monitor: kubectl top nodes, check node conditions."
    },
    {
        difficulty: "hard",
        topic: "Kubernetes",
        question: "How do you troubleshoot a CrashLoopBackOff pod?",
        options: [
        "Delete and recreate",
        "Restart cluster",
        "Wait for auto-recovery",
        "Check logs, describe pod, check startup probe, dependencies, resources, config/secrets"
    ],
        correct: 3,
        explanation: "CrashLoopBackOff = container crashing repeatedly. Debug steps: 1) kubectl logs pod (and --previous), 2) kubectl describe pod (events), 3) Check: startup issues, missing dependencies, config/secrets, resource limits, health probe failures. Root cause often in logs.",
        tip: "Debug flow: logs → describe → check config → exec into container. Common causes: missing DB, wrong config, OOM killed, failing health checks."
    },
    {
        difficulty: "hard",
        topic: "Kubernetes",
        question: "What's the best way to handle database credentials in Kubernetes?",
        options: [
        "Use Secrets (or better: external secret stores like Vault, AWS Secrets Manager) + RBAC + encryption at rest",
        "Hardcode in deployment YAML",
        "ConfigMaps",
        "Environment variables in Docker image"
    ],
        correct: 0,
        explanation: "Best practices: 1) External secret stores (Vault, AWS Secrets Manager, GCP Secret Manager) synced to K8s Secrets, 2) Enable encryption at rest, 3) RBAC to limit access, 4) Short-lived credentials when possible, 5) Secret rotation. Never use ConfigMaps for secrets (not encrypted).",
        tip: "Tools: External Secrets Operator, Sealed Secrets, HashiCorp Vault. Pattern: Secrets stored externally, synced to K8s, mounted as files or env vars. Rotate regularly."
    },
    {
        difficulty: "hard",
        topic: "Kubernetes",
        question: "How do you implement zero-downtime deployments with database migrations?",
        options: [
        "Manual deployment only",
        "Backward-compatible migrations: deploy code accepting old+new schema, migrate, deploy code using new schema",
        "Ignore migrations",
        "Stop app, migrate, start app"
    ],
        correct: 1,
        explanation: "Zero-downtime migration strategy: 1) Make schema backward-compatible (add optional columns), 2) Deploy app supporting both old/new schema, 3) Run migration, 4) Deploy app using new schema only, 5) Clean up old schema later. Key: multiple deployment phases.",
        tip: "Pattern: Expand (add new, keep old) → Migrate data → Contract (remove old). Example: adding column: add as nullable → populate → make required → remove old code."
    },
    {
        difficulty: "hard",
        topic: "Kubernetes",
        question: "Your cluster is out of resources. How do you identify resource hogs?",
        options: [
        "Use kubectl top pods --sort-by=memory/cpu, check requests vs usage, review metrics",
        "Delete random pods",
        "Restart cluster",
        "Guess randomly"
    ],
        correct: 0,
        explanation: "Resource troubleshooting: 1) kubectl top nodes (overall), 2) kubectl top pods --sort-by=memory -A (biggest consumers), 3) Check: pods without limits (unbounded), overallocated (high requests, low usage), actual usage vs requests. Tools: metrics-server, Prometheus queries.",
        tip: "Commands: kubectl top pods --sort-by=cpu -A, kubectl describe nodes (Allocated resources). Look for: over-requested resources, pods hitting limits, resource fragmentation."
    },
    {
        difficulty: "hard",
        topic: "Kubernetes",
        question: "What's the difference between Node Affinity and Pod Affinity?",
        options: [
        "Same thing",
        "Node Affinity: schedule pod to nodes with labels. Pod Affinity: schedule pod near/away from other pods",
        "Node Affinity is deprecated",
        "Pod Affinity is faster"
    ],
        correct: 1,
        explanation: "Node Affinity: schedule based on node labels (example: SSD nodes, GPU nodes). Pod Affinity: schedule based on other pods (example: place web pods on same nodes as cache). Anti-affinity: spread pods apart (HA). Both have required/preferred rules.",
        tip: "Use Node Affinity for hardware requirements. Use Pod Affinity for co-location (latency). Use Anti-affinity for HA (spread replicas across nodes/zones)."
    },
    {
        difficulty: "hard",
        topic: "Kubernetes",
        question: "How do you implement multi-tenancy in Kubernetes?",
        options: [
        "One cluster per user",
        "Trust all users",
        "Create separate folders",
        "Use Namespaces + RBAC + NetworkPolicies + ResourceQuotas + PodSecurityPolicies"
    ],
        correct: 3,
        explanation: "Multi-tenancy layers: 1) Namespaces (isolation), 2) RBAC (who can do what), 3) NetworkPolicies (network isolation), 4) ResourceQuotas (prevent resource hogging), 5) Pod Security Standards (security). For hard isolation: separate clusters.",
        tip: "Soft tenancy: namespaces + RBAC (teams share cluster). Hard tenancy: separate clusters (regulatory/security). Tools: Hierarchical Namespaces, vCluster."
    },
    {
        difficulty: "hard",
        topic: "Kubernetes",
        question: "What causes 'ImagePullBackOff' and how do you debug it?",
        options: [
        "Always a Kubernetes bug",
        "Delete everything",
        "Image doesn't exist, wrong tag, registry auth issues, network problems. Check: describe pod, registry credentials",
        "Pod is broken"
    ],
        correct: 2,
        explanation: "ImagePullBackOff causes: 1) Image doesn't exist/wrong tag, 2) Missing/wrong registry credentials, 3) Network issues to registry, 4) Registry rate limits, 5) Image too large. Debug: kubectl describe pod (events show exact error), check imagePullSecrets.",
        tip: "Debug steps: describe pod → check image name/tag → verify registry access → check imagePullSecrets. Common fix: create/update docker-registry secret."
    },

    // CI/CD Advanced (6 questions)
    {
        difficulty: "hard",
        topic: "CI/CD",
        question: "Your CI/CD pipeline takes 45 minutes. How do you optimize?",
        options: [
        "Remove all tests",
        "Parallelize tests, optimize Docker layers/cache, matrix builds, incremental testing, caching dependencies",
        "Buy faster servers only",
        "Accept it"
    ],
        correct: 1,
        explanation: "Optimization strategies: 1) Parallelize (test jobs, matrix builds), 2) Cache (dependencies, Docker layers), 3) Incremental testing (only changed code), 4) Optimize Docker (multi-stage, layer order), 5) Faster runners, 6) Profile to find bottlenecks. Target: sub-10 minute CI for fast feedback.",
        tip: "Quick wins: parallel test jobs, cache npm/pip packages, optimize Dockerfile layer order. Measure: which step is slowest? Focus there first."
    },
    {
        difficulty: "hard",
        topic: "CI/CD",
        question: "How do you implement approval gates for production deployments?",
        options: [
        "Manual approval step in pipeline (GitHub Environments, Jenkins input, ArgoCD approval)",
        "No approvals needed",
        "Email approvals",
        "Post-deployment approvals"
    ],
        correct: 0,
        explanation: "Approval gates: 1) GitHub: use Environments with required reviewers, 2) Jenkins: input step with approved users, 3) GitLab: manual deploy jobs, 4) ArgoCD: sync windows/approval CRDs. Pattern: deploy to staging (auto) → approval gate → deploy to prod. Log all approvals for audit.",
        tip: "Best practice: Require approval for prod only. Auto-deploy dev/staging. Track: who approved, when, which version. Some orgs: approval after automated testing, before prod deploy."
    },
    {
        difficulty: "hard",
        topic: "CI/CD",
        question: "Your production deployment failed. How do you implement safe rollback?",
        options: [
        "Ignore and redeploy",
        "Wait for next deployment",
        "Automated rollback: monitor metrics, trigger rollback on errors/latency spike, or manual rollback button",
        "Manual fixes only"
    ],
        correct: 2,
        explanation: "Rollback strategies: 1) Automated: monitor key metrics (error rate, latency), auto-rollback on threshold breach, 2) Manual: easy rollback button/command, 3) Keep previous version deployable (containers, artifacts). Kubernetes: kubectl rollout undo. Blue-green: switch traffic back.",
        tip: "Pattern: Deploy new version → monitor error rate/latency → if spike, auto-rollback. Tools: Flagger (automated), ArgoCD rollback, Kubernetes rollout undo."
    },
    {
        difficulty: "hard",
        topic: "CI/CD",
        question: "How do you implement progressive delivery with feature flags?",
        options: [
        "Deploy to everyone at once",
        "Feature flags control who sees new features (by %, user ID, region), deploy code dark, enable gradually",
        "Manual testing only",
        "Only use branches"
    ],
        correct: 1,
        explanation: "Progressive delivery with flags: 1) Deploy new feature code (but disabled), 2) Enable flag for 1% users, 3) Monitor metrics, 4) Gradually increase % (5% → 25% → 50% → 100%), 5) Roll back by disabling flag (no redeploy). Separate deployment from release.",
        tip: "Tools: LaunchDarkly, Unleash, FlagSmith. Pattern: deploy once (feature dark), enable gradually via flag, instant rollback. Decouple code deployment from feature release."
    },
    {
        difficulty: "hard",
        topic: "CI/CD",
        question: "How do you handle database rollbacks in CI/CD?",
        options: [
        "Manual SQL scripts",
        "Never rollback database",
        "Forward-only migrations, backward-compatible changes, separate data migrations from schema",
        "Restore from backup every time"
    ],
        correct: 2,
        explanation: "DB rollback strategy: 1) Prefer forward-only (no rollback), 2) Backward-compatible changes (expand-contract), 3) Separate data/schema migrations, 4) Test migration rollback in lower environments, 5) Last resort: point-in-time restore. Key: plan for failure upfront.",
        tip: "Best practice: Make migrations idempotent and backward-compatible. Can't safely rollback DB? Don't couple DB changes with app deploy. Test migration+rollback in staging."
    },
    {
        difficulty: "hard",
        topic: "CI/CD",
        question: "What security checks should be in CI/CD pipelines?",
        options: [
        "Manual security review only",
        "SAST, dependency scanning, secrets detection, container scanning, license compliance, DAST",
        "No security needed in CI/CD",
        "Only in production"
    ],
        correct: 1,
        explanation: "CI/CD security gates: 1) SAST (static code analysis), 2) Dependency scanning (vulnerable packages), 3) Secrets detection (leaked keys), 4) Container image scanning, 5) License compliance, 6) DAST (dynamic testing). Fail build on high-severity issues. Tools: Snyk, Trivy, GitLab Security, GitHub Advanced Security.",
        tip: "Shift-left security: catch issues in CI, not production. Pipeline: code → SAST → build → container scan → dependency check → deploy. Block on critical vulnerabilities."
    },

    // AWS Advanced (6 questions)
    {
        difficulty: "hard",
        topic: "AWS",
        question: "Your AWS bill increased 300% this month. How do you investigate?",
        options: [
        "Delete everything",
        "Call AWS support immediately",
        "Use Cost Explorer (filter by service/resource), check anomaly detection, review: new resources, data transfer, unused resources",
        "Ignore it"
    ],
        correct: 2,
        explanation: "Cost spike investigation: 1) Cost Explorer → filter by service/date/tag, 2) Cost Anomaly Detection alerts, 3) Check: new EC2/RDS instances, data transfer costs, Spot instances not terminating, CloudWatch logs retention, S3 storage/requests. Common culprits: forgotten resources, data transfer, development instances running 24/7.",
        tip: "Prevention: Tag resources, set billing alarms, use AWS Budgets, regular resource audits, auto-shutdown dev/test environments. Cost optimization: Reserved Instances, right-sizing, S3 lifecycle policies."
    },
    {
        difficulty: "hard",
        topic: "AWS",
        question: "How do you implement cross-region disaster recovery for a web application?",
        options: [
        "Hope for the best",
        "Multi-region architecture: Route53 health checks + failover, replicate data (RDS cross-region, S3 replication), infrastructure as code for quick rebuild",
        "One region is enough",
        "Manual migration"
    ],
        correct: 1,
        explanation: "Cross-region DR: 1) Route53 health checks with failover routing, 2) RDS cross-region read replicas (promote if primary fails), 3) S3 cross-region replication, 4) IaC to rebuild in DR region, 5) Regular DR drills. Active-passive or active-active. Pilot light, warm standby, or multi-site depending on RTO/RPO.",
        tip: "Components: Route53 failover → ALB in DR region → RDS replica (promote) → S3 replication. Test DR regularly! Automate with Lambda + CloudWatch alarms."
    },
    {
        difficulty: "hard",
        topic: "AWS",
        question: "How do you secure S3 buckets properly?",
        options: [
        "Make everything public",
        "Block public access, bucket policies, encryption at rest/transit, versioning, MFA delete, access logging, VPC endpoints",
        "Security not needed for S3",
        "Default settings are fine"
    ],
        correct: 1,
        explanation: "S3 security best practices: 1) Enable 'Block Public Access', 2) Bucket policies (least privilege), 3) Encryption (SSE-S3/KMS), 4) Versioning (recover from deletion), 5) MFA Delete (prevent accidental deletion), 6) Access logging (audit), 7) VPC endpoints (private access), 8) IAM roles (not access keys).",
        tip: "Default S3 to private. Use CloudFront + OAI for public content. Enable: versioning, encryption, logging. Common mistake: mixing bucket policy + ACLs (use bucket policy)."
    },
    {
        difficulty: "hard",
        topic: "AWS",
        question: "Your RDS instance has high CPU. How do you troubleshoot and optimize?",
        options: [
        "Check slow queries, enable Performance Insights, optimize queries/indexes, consider Read Replicas, connection pooling",
        "Restart database",
        "Upgrade to biggest instance",
        "Delete data"
    ],
        correct: 0,
        explanation: "RDS high CPU troubleshooting: 1) Enable Performance Insights (top SQL), 2) Check slow query log, 3) Identify expensive queries, 4) Solutions: optimize queries, add indexes, connection pooling, Read Replicas (offload reads), upgrade instance class, partition data. Monitor: query patterns, connections, cache hit ratio.",
        tip: "Tools: Performance Insights (free tier), Enhanced Monitoring. Common fixes: missing indexes, N+1 queries, too many connections. Read-heavy? Add Read Replicas. Write-heavy? Optimize writes or shard."
    },
    {
        difficulty: "hard",
        topic: "AWS",
        question: "How do you implement least privilege IAM policies?",
        options: [
        "Give everyone admin access",
        "No IAM policies needed",
        "Use only managed policies",
        "Start with minimal permissions, use IAM Access Analyzer, grant only needed actions/resources, use conditions, review regularly"
    ],
        correct: 3,
        explanation: "Least privilege implementation: 1) Start with minimum permissions, 2) Use IAM Access Analyzer (finds unused permissions), 3) Specific resources (not *), 4) Conditions (MFA, IP, time), 5) Service-specific roles, 6) Regular access reviews. Policy: Action + Resource + Condition. Avoid: wildcard permissions, overly broad managed policies.",
        tip: "Pattern: CloudWatch Logs → Access Analyzer → remove unused permissions. Use managed policies as template, customize. Principle: grant minimum needed, expand when required."
    },
    {
        difficulty: "hard",
        topic: "AWS",
        question: "What's the best way to manage multiple AWS accounts?",
        options: [
        "Use single account for everything",
        "Don't use multiple accounts",
        "AWS Organizations: master account + member accounts, SCPs for guardrails, consolidated billing, separate environments",
        "Manual account creation"
    ],
        correct: 2,
        explanation: "Multi-account strategy with AWS Organizations: 1) Master/management account (billing, SCPs), 2) Separate accounts (prod, dev, test, security, logs), 3) Service Control Policies (guardrails), 4) Consolidated billing (discounts), 5) Cross-account roles (access), 6) CloudFormation StackSets (deploy across accounts). Benefits: isolation, security boundaries, cost allocation.",
        tip: "Common structure: Master account → OUs (Production, Development, Security) → accounts. SCPs prevent risky actions. Tools: Control Tower (automated setup), Landing Zone."
    },

    // Infrastructure as Code Advanced (6 questions)
    {
        difficulty: "hard",
        topic: "IaC",
        question: "Your Terraform state is corrupted/lost. What do you do?",
        options: [
        "Recreate everything",
        "Delete all infrastructure",
        "Restore from backup (S3 versioning), or import existing resources into new state file",
        "Give up"
    ],
        correct: 2,
        explanation: "State disaster recovery: 1) Best case: restore from S3 versioning or backup, 2) No backup: terraform import for each resource (tedious but works), 3) Use terraform state commands to rebuild. Prevention: remote backend with versioning, backups, state locking. Never edit state file manually!",
        tip: "Prevention is key: S3 backend + versioning + backup. If lost: terraform import resource_type.name resource_id for each resource. Or use Terraformer to import entire infrastructure."
    },
    {
        difficulty: "hard",
        topic: "IaC",
        question: "How do you manage Terraform for large infrastructure with multiple teams?",
        options: [
        "Separate state files per environment/service, use modules, workspaces, remote backend with locking, code reviews",
        "Single state file for everything",
        "Each team does their own thing",
        "No coordination needed"
    ],
        correct: 0,
        explanation: "Large-scale Terraform: 1) Separate states (by environment, service), 2) Shared modules in registry/git, 3) Remote backend + state locking, 4) Terraform workspaces (or separate directories), 5) CI/CD (terraform plan on PR), 6) Policy as code (Sentinel, OPA), 7) Code reviews, naming conventions. Avoid: single giant state file (slow, risky).",
        tip: "Pattern: Separate repos/directories for environments. Shared modules. State per component. Example: network state, database state, application state (separate). Use data sources to reference between states."
    },
    {
        difficulty: "hard",
        topic: "IaC",
        question: "What's the best way to handle secrets in Terraform?",
        options: [
        "Environment variables only",
        "Hardcode in .tf files",
        "Use external secret stores (Vault, AWS Secrets Manager), inject at runtime, never commit secrets, use sensitive attribute",
        "Store in git"
    ],
        correct: 2,
        explanation: "Secret management: 1) External stores (Vault, AWS Secrets Manager), 2) Read via data sources (not hardcode), 3) Mark variables as sensitive (hidden in logs), 4) Never commit secrets to git, 5) Encrypt state file, 6) Use CI/CD secret stores for automation. State file contains secrets (encrypt backend, restrict access).",
        tip: "Pattern: data aws_secretsmanager_secret, terraform_data sensitive. State has secrets → S3 bucket encryption + restricted access. CI/CD: inject secrets at runtime from secret store."
    },
    {
        difficulty: "hard",
        topic: "IaC",
        question: "How do you implement testing for Infrastructure as Code?",
        options: [
        "Unit tests (Terratest), integration tests (deploy to test env), policy tests (OPA), cost estimation, security scanning",
        "Test in production",
        "Manual testing only",
        "Don't test IaC"
    ],
        correct: 0,
        explanation: "IaC testing levels: 1) Static: linting (tflint), security (Checkov, tfsec), cost (Infracost), 2) Unit: Terratest (Go tests), Kitchen-Terraform, 3) Integration: deploy to ephemeral environment, validate, destroy, 4) Policy: OPA, Sentinel. Run in CI/CD pipeline.",
        tip: "Testing pyramid: Many static tests (fast) → Some unit tests → Few integration tests (slow). Tools: tflint, Checkov, Terratest, OPA. CI/CD: plan on PR, apply on merge."
    },
    {
        difficulty: "hard",
        topic: "IaC",
        question: "What's the best practice for Ansible inventory management?",
        options: [
        "No inventory needed",
        "Single static file",
        "Hardcode IPs everywhere",
        "Dynamic inventory (AWS, GCP plugins), separate by environment, group_vars/host_vars, version control"
    ],
        correct: 3,
        explanation: "Inventory best practices: 1) Dynamic inventory (cloud plugins auto-discover), 2) Separate inventories per environment, 3) group_vars/host_vars for configuration, 4) Version control (git), 5) Use tags for grouping, 6) Encrypt sensitive vars (ansible-vault). Avoid: hardcoded IPs, secrets in inventory.",
        tip: "Structure: inventory/production/, inventory/staging/ with hosts, group_vars, host_vars. Dynamic: aws_ec2 plugin queries AWS tags. Encrypt: ansible-vault encrypt group_vars/all/secrets.yml."
    },
    {
        difficulty: "hard",
        topic: "IaC",
        question: "How do you handle Terraform drift (manual changes to infrastructure)?",
        options: [
        "Manual tracking",
        "Ignore drift",
        "Detect: terraform plan regularly, import changes or revert manual changes, prevent with policies/permissions",
        "Recreate everything"
    ],
        correct: 2,
        explanation: "Drift management: 1) Detect: run terraform plan regularly (CI/CD cron), 2) Resolve: revert manual changes, or import into state if intentional, 3) Prevent: restrictive IAM (only CI/CD can modify infra), policy as code, education. Tools: Terraform Cloud drift detection, custom scripts.",
        tip: "Best practice: All changes via Terraform. Restrict direct access to cloud console. CI/CD job: daily terraform plan, alert on drift. Drift = security/compliance risk."
    },

    // Monitoring Advanced (6 questions)
    {
        difficulty: "hard",
        topic: "Monitoring",
        question: "How do you monitor and debug microservices with 20+ services?",
        options: [
        "Distributed tracing (Jaeger), service mesh observability, centralized logging, service dependency maps, SLOs per service",
        "Check each service manually",
        "Only monitor edge services",
        "Hope for the best"
    ],
        correct: 0,
        explanation: "Microservices observability: 1) Distributed tracing (see request flow), 2) Service mesh (Istio, Linkerd) for automatic metrics, 3) Centralized logging (ELK, Loki) with correlation IDs, 4) Service dependency maps, 5) SLOs per service, 6) Error budgets. Track: latency per service, error propagation, dependencies.",
        tip: "Essential tools: Jaeger/Zipkin (tracing), Prometheus (metrics), Grafana (visualization), ELK (logs). Pattern: Inject trace_id, propagate through services, correlate logs/metrics/traces."
    },
    {
        difficulty: "hard",
        topic: "Monitoring",
        question: "Your alerting system causes alert fatigue (too many alerts). How do you fix it?",
        options: [
        "Just send more alerts",
        "Ignore all alerts",
        "Alert on symptoms not causes, adjust thresholds, group related alerts, implement escalation, use SLOs",
        "Remove all alerts"
    ],
        correct: 2,
        explanation: "Reducing alert fatigue: 1) Alert on user impact (errors, latency) not resources (CPU), 2) Tune thresholds (reduce false positives), 3) Group related alerts, 4) Escalation policies (warning vs critical), 5) Auto-remediation for known issues, 6) Regular alert reviews (delete unused). Goal: high signal-to-noise ratio.",
        tip: "Good alert properties: Actionable, meaningful, correlation with user impact, correct urgency. Bad alerts: High CPU (maybe OK), low disk (predict earlier), noisy. Use runbooks for common alerts."
    },
    {
        difficulty: "hard",
        topic: "Monitoring",
        question: "How do you implement effective SLOs for a web application?",
        options: [
        "Copy from other companies",
        "Target 100% uptime",
        "No SLOs needed",
        "Define SLIs (availability, latency, error rate), set realistic SLO targets (99.9%), measure error budget, review regularly"
    ],
        correct: 3,
        explanation: "SLO implementation: 1) Choose SLIs (Service Level Indicators): availability %, latency p95/p99, error rate, 2) Set SLOs: 99.9% availability (43 min/month downtime), p95 latency < 200ms, 3) Calculate error budget, 4) Alert on burn rate (spending budget too fast), 5) Review and adjust. SLOs drive reliability work.",
        tip: "Start simple: availability and latency. Example SLO: 99.9% of requests succeed in < 200ms (p95). Error budget = 0.1% = acceptable failures. Burn too fast? Slow down releases."
    },
    {
        difficulty: "hard",
        topic: "Monitoring",
        question: "What's the difference between RED and USE metrics?",
        options: [
        "USE is only for databases",
        "They're the same",
        "RED (services): Rate, Errors, Duration. USE (resources): Utilization, Saturation, Errors",
        "RED is deprecated"
    ],
        correct: 2,
        explanation: "RED method (for services): Rate (requests/sec), Errors (failure rate), Duration (latency). USE method (for resources): Utilization (% busy), Saturation (queue depth), Errors. Use RED for microservices/APIs, USE for infrastructure (CPU, disk, memory, network).",
        tip: "RED for services: request rate, error rate, latency (p50, p95, p99). USE for resources: CPU utilization, load average (saturation), disk errors. Monitor both!"
    },
    {
        difficulty: "hard",
        topic: "Monitoring",
        question: "How do you design a dashboard for on-call engineers?",
        options: [
        "Only pretty visualizations",
        "Focus on symptoms (errors, latency), key metrics (RED/USE), relevant time ranges, links to runbooks, minimize clutter",
        "Show all metrics",
        "Random charts"
    ],
        correct: 1,
        explanation: "On-call dashboard design: 1) Top: current incidents/alerts, 2) Key metrics: error rate, latency (p95, p99), traffic, 3) System health: RED/USE metrics, 4) Time range: last hour (detail) + last week (context), 5) Drill-down links, 6) Runbook links, 7) Minimize noise. Goal: quick incident triage.",
        tip: "Structure: Alerts → Key Metrics (RED) → System Health (USE) → Dependencies. Avoid: vanity metrics, unnecessary precision, clutter. Test: can on-call engineer triage in 2 minutes?"
    },
    {
        difficulty: "hard",
        topic: "Monitoring",
        question: "How do you monitor and alert on Kubernetes cluster health?",
        options: [
        "Kubernetes self-heals, no monitoring needed",
        "Only monitor applications",
        "Only logs",
        "Monitor: node health, pod status, control plane metrics, resource usage, network, persistent volumes, cluster events"
    ],
        correct: 3,
        explanation: "Kubernetes monitoring: 1) Cluster level: node health, control plane (API server, scheduler), 2) Workload level: pod status, restarts, resource usage vs limits, 3) Events: kubectl events for issues, 4) Persistent volumes (capacity), 5) Network policies. Tools: Prometheus (metrics), kube-state-metrics, node-exporter. Alert on: node NotReady, pod CrashLoopBackOff, high restart rate.",
        tip: "Essential alerts: node NotReady, pod failures, API server errors, high resource usage. Tools: Prometheus Operator, kube-state-metrics. Dashboard: cluster health + workload metrics."
    },

    // Docker & Linux Advanced (4 questions)
    {
        difficulty: "hard",
        topic: "Docker",
        question: "Your Docker build is 2GB. How do you reduce image size?",
        options: [
        "Accept large images",
        "Use bigger disk",
        "Compress image",
        "Multi-stage builds, smaller base image (alpine, distroless), remove unnecessary files, combine RUN commands, .dockerignore"
    ],
        correct: 3,
        explanation: "Image size optimization: 1) Multi-stage builds (builder + minimal runtime), 2) Smaller base: alpine (5MB), distroless (no shell/package manager), 3) Minimize layers: combine RUN commands, 4) .dockerignore (exclude build artifacts), 5) Remove package caches, 6) Only COPY needed files. Target: production images < 100MB.",
        tip: "Example: Node app: 1GB+ with node:latest → 50MB with node:alpine + multi-stage. Python: 900MB → 100MB with python:slim + multi-stage. Use dive tool to analyze layers."
    },
    {
        difficulty: "hard",
        topic: "Docker",
        question: "How do you handle container security in production?",
        options: [
        "Scan images, non-root user, read-only filesystem, minimize attack surface, secrets management, network policies, updates",
        "Run as root",
        "Trust all images",
        "Security not needed for containers"
    ],
        correct: 0,
        explanation: "Container security: 1) Scan images (Trivy, Snyk), 2) Run as non-root user, 3) Read-only root filesystem, 4) Minimal base images (distroless), 5) No secrets in images, 6) Network policies, 7) Resource limits, 8) Regular updates, 9) Security contexts (K8s). Defense in depth.",
        tip: "Dockerfile security: USER non-root, COPY --chown, scan with trivy, use distroless/alpine. K8s: PodSecurityStandards, NetworkPolicies, securityContext (readOnlyRootFilesystem, runAsNonRoot)."
    },
    {
        difficulty: "hard",
        topic: "Linux",
        question: "Server is unresponsive. How do you troubleshoot?",
        options: [
        "Wait and hope",
        "Restart immediately",
        "Format and reinstall",
        "Check: CPU (top), memory (free), disk (df, iotop), network (netstat), processes (ps), logs (/var/log), dmesg"
    ],
        correct: 3,
        explanation: "Troubleshooting unresponsive server: 1) Can you SSH? Check load average, 2) CPU: top (CPU hog?), 3) Memory: free -h (OOM?), dmesg (OOM killer), 4) Disk: df -h (full?), iotop (disk bottleneck?), 5) Network: netstat, tcpdump, 6) Processes: ps aux (zombie processes?), 7) Logs: /var/log/syslog, dmesg. Prioritize: can users access service?",
        tip: "Quick checks: uptime (load average), free (memory), df -h (disk full?), top (what's consuming resources?). Common culprits: disk full, memory leak, CPU-bound process, network saturation."
    },
    {
        difficulty: "hard",
        topic: "Linux",
        question: "How do you debug a process using 100% CPU?",
        options: [
        "Ignore it",
        "Restart server",
        "Kill it immediately",
        "Identify with top/htop, check what it's doing (strace, lsof), review logs, profiling, determine if legitimate or bug"
    ],
        correct: 3,
        explanation: "High CPU debugging: 1) top or htop (identify process), 2) strace -p PID (system calls - what's it doing?), 3) Check: infinite loop, heavy computation (legitimate?), lock contention, 4) Application logs, 5) Profile (perf, flamegraphs), 6) Resource limits (ulimit). Determine: bug or expected load?",
        tip: "Commands: top (find PID), strace -p PID (trace syscalls), lsof -p PID (open files), perf (profiling). Common issues: infinite loop, runaway recursion, lock contention. Check: is the CPU usage expected?"
    },

    // Python, Git, General DevOps (4 questions)
    {
        difficulty: "hard",
        topic: "Python",
        question: "Your Python application has memory leaks. How do you debug?",
        options: [
        "Restart regularly",
        "Use memory profilers (memory_profiler, tracemalloc), check for circular references, large objects, unclosed resources",
        "Rewrite in another language",
        "Ignore it"
    ],
        correct: 1,
        explanation: "Memory leak debugging: 1) Profile: memory_profiler, tracemalloc, objgraph, 2) Check: circular references (weakref), unclosed files/connections, global caches growing unbounded, large objects not released, 3) Garbage collection: gc module, 4) Monitor over time. Common culprits: closures capturing large objects, event listeners not removed, caching without limits.",
        tip: "Tools: memory_profiler (@profile decorator), tracemalloc (snapshot diff), objgraph (ref cycles). Common Python leaks: circular refs (use weakref), unclosed resources (use context managers), unbounded caches (use LRU cache with maxsize)."
    },
    {
        difficulty: "hard",
        topic: "Git",
        question: "You accidentally committed secrets to Git. What do you do?",
        options: [
        "Delete the commit and hope",
        "Ignore it",
        "Make repo private",
        "Rotate secrets immediately, remove from history (BFG Repo-Cleaner, git filter-branch), force push, notify team"
    ],
        correct: 3,
        explanation: "Secret leak response: 1) IMMEDIATELY rotate/revoke secrets, 2) Remove from Git history: BFG Repo-Cleaner or git filter-branch, 3) Force push (coordinate with team), 4) Notify security team, 5) All clones/forks may have secrets. Prevention: git-secrets, pre-commit hooks, secret scanning (GitHub, GitLab).",
        tip: "Emergency: rotate secrets FIRST (assume compromised). Clean history: BFG Repo-Cleaner (faster than git filter-branch). Prevention: git-secrets hooks, GitHub secret scanning, never commit .env files."
    },
    {
        difficulty: "hard",
        topic: "DevOps",
        question: "How do you implement disaster recovery for a microservices platform?",
        options: [
        "Multi-region deployment, automated failover, data replication, regular DR drills, runbooks, backup/restore procedures",
        "Hope it doesn't fail",
        "Manual process",
        "One backup is enough"
    ],
        correct: 0,
        explanation: "Microservices DR: 1) Multi-region active-passive or active-active, 2) Data replication (databases, object storage), 3) IaC for infrastructure rebuild, 4) Automated failover (DNS, load balancers), 5) Service dependencies (external APIs?), 6) Regular DR drills (test failover), 7) Runbooks, 8) RTO/RPO targets. Complexity: service mesh, message queues, state.",
        tip: "DR components: Multi-region K8s, RDS cross-region replicas, S3 replication, Route53 failover, disaster recovery runbook. TEST DR regularly (chaos engineering). Automate failover."
    },
    {
        difficulty: "hard",
        topic: "DevOps",
        question: "What is chaos engineering and why is it important?",
        options: [
        "Ignoring problems",
        "Breaking things randomly",
        "Intentionally injecting failures to test system resilience and find weaknesses before they cause outages",
        "Deleting production"
    ],
        correct: 2,
        explanation: "Chaos engineering: deliberately inject failures in controlled manner to test resilience. Examples: kill random pods, add latency, partition network. Goal: find weaknesses before real outage. Start small (dev), gradually increase (staging, prod). Tools: Chaos Monkey, Litmus, Chaos Mesh. Requires good monitoring and rollback.",
        tip: "Start: kill single pod, observe recovery. Progress: zone failure, dependency failure, network issues. Requirements: monitoring, automated recovery, gradual rollout. Netflix Simian Army: random instance termination."
    }
];
