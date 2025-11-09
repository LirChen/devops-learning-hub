const questions = [
    // EASY QUESTIONS (1-10)
    {
        difficulty: "easy",
        topic: "CI/CD Basics",
        question: "What does CI/CD stand for?",
        options: [
            "Code Integration / Code Deployment",
            "Continuous Integration / Continuous Delivery or Deployment",
            "Container Integration / Container Distribution",
            "Central Integration / Central Database"
        ],
        correct: 1,
        explanation: "CI/CD stands for Continuous Integration and Continuous Delivery (or Continuous Deployment). CI automates code integration and testing. CD automates deployment to staging (Delivery) or production (Deployment).",
        tip: "CI = automated testing on every commit. Continuous Delivery = CAN deploy anytime. Continuous Deployment = DOES deploy automatically to production."
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
        explanation: "Standard pipeline flow: Build (compile/package code) → Test (unit, integration tests) → Deploy (to environment). You build first, test before deploying.",
        tip: "Think: Make it → Test it → Ship it. Can add stages: lint, security scan, smoke tests, performance tests."
    },
    {
        difficulty: "easy",
        topic: "Version Control",
        question: "Why is version control essential for CI/CD?",
        options: [
            "It's optional",
            "Tracks changes, enables collaboration, triggers pipelines",
            "Only for documentation",
            "Required by law"
        ],
        correct: 1,
        explanation: "Version control (Git) is the foundation of CI/CD. Every commit can trigger automated builds and tests. It provides history, rollback capability, and collaboration.",
        tip: "Modern CI/CD: push to git → webhook triggers pipeline → automated build/test/deploy. Version control is the source of truth."
    },
    {
        difficulty: "easy",
        topic: "Jenkins Basics",
        question: "What is Jenkins?",
        options: [
            "A programming language",
            "An open-source automation server for CI/CD",
            "A container platform",
            "A cloud provider"
        ],
        correct: 1,
        explanation: "Jenkins is an open-source automation server that orchestrates CI/CD pipelines. It integrates with virtually every tool in the DevOps ecosystem.",
        tip: "Jenkins alternatives: GitLab CI, GitHub Actions, CircleCI, Travis CI. All serve the same purpose: automate build/test/deploy."
    },
    {
        difficulty: "easy",
        topic: "Build Artifacts",
        question: "What are build artifacts?",
        options: [
            "Error logs",
            "Output files from builds (JARs, WARs, Docker images, etc.)",
            "Source code",
            "Configuration files"
        ],
        correct: 1,
        explanation: "Artifacts are output files from successful builds (compiled binaries, JARs, Docker images, etc.). They're stored in artifact repositories for deployment.",
        tip: "Pattern: Build once, deploy many. Store artifacts after successful build, deploy from artifacts (fast) vs rebuilding (slow)."
    },
    {
        difficulty: "easy",
        topic: "Testing Levels",
        question: "What are unit tests?",
        options: [
            "Tests of the entire application",
            "Tests of individual functions/components in isolation",
            "Manual tests",
            "Performance tests"
        ],
        correct: 1,
        explanation: "Unit tests verify individual functions/methods work correctly in isolation. They're fast, run frequently, and form the base of the testing pyramid.",
        tip: "Testing pyramid: Unit tests (many, fast) → Integration tests (some, slower) → E2E tests (few, slowest). Run unit tests on every commit."
    },
    {
        difficulty: "easy",
        topic: "Continuous Integration",
        question: "What is the main goal of Continuous Integration?",
        options: [
            "Deploy faster",
            "Detect integration problems early by merging code frequently",
            "Reduce testing",
            "Save money"
        ],
        correct: 1,
        explanation: "CI's goal is to detect integration problems early by having developers merge code to mainline frequently (multiple times per day). Automated tests catch issues immediately.",
        tip: "CI best practices: commit daily, fix broken builds immediately, keep builds fast (<10 min), automate everything, test in clone of production."
    },
    {
        difficulty: "easy",
        topic: "Jenkinsfile",
        question: "What is a Jenkinsfile?",
        options: [
            "Jenkins configuration file",
            "Pipeline definition as code (declarative or scripted)",
            "Log file",
            "Backup file"
        ],
        correct: 1,
        explanation: "Jenkinsfile defines your pipeline as code. It lives in your repository alongside code. Can be Declarative (structured) or Scripted (Groovy). Pipeline as code = version controlled, reviewable.",
        tip: "Store Jenkinsfile in repo root. Declarative (easier) starts with 'pipeline {', Scripted (flexible) with 'node {'."
    },
    {
        difficulty: "easy",
        topic: "Environment Types",
        question: "What is the purpose of a staging environment?",
        options: [
            "For developers to write code",
            "To test deployments in a production-like environment before production",
            "For backups",
            "For training"
        ],
        correct: 1,
        explanation: "Staging is a production-like environment for final testing before production deployment. It catches environment-specific issues that dev/test environments miss.",
        tip: "Common environments: Dev (rapid changes) → Test/QA (thorough testing) → Staging (prod replica) → Production (live users)."
    },
    {
        difficulty: "easy",
        topic: "Webhooks",
        question: "How do webhooks trigger CI/CD pipelines?",
        options: [
            "Manual clicks",
            "Git sends HTTP POST to Jenkins/CI server on code changes",
            "Scheduled cron jobs",
            "Email notifications"
        ],
        correct: 1,
        explanation: "Webhooks are HTTP callbacks. When you push code to Git, it sends a webhook (HTTP POST) to your CI server, which triggers the pipeline automatically.",
        tip: "Setup: Git repository settings → Add webhook → Jenkins URL. Events: push, pull request, tag. Alternative: polling (CI checks git periodically)."
    },

    // MEDIUM QUESTIONS (11-18)
    {
        difficulty: "medium",
        topic: "Jenkins Pipeline",
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
        topic: "Artifact Management",
        question: "Why use an artifact repository (Nexus, Artifactory)?",
        options: [
            "Required by Jenkins",
            "Version control for binaries, faster deployments, dependency caching",
            "Makes builds faster",
            "Automatic testing"
        ],
        correct: 1,
        explanation: "Artifact repositories store build outputs (JARs, Docker images, npm packages). Benefits: version control for binaries, fast deployments (no rebuilding), caching dependencies, security scanning.",
        tip: "Popular repos: Nexus, Artifactory, AWS S3, Docker Registry. Pattern: build → push artifact → deploy from artifact."
    },
    {
        difficulty: "medium",
        topic: "Pipeline as Code",
        question: "What are the benefits of defining pipelines as code?",
        options: [
            "Faster execution",
            "Version controlled, reviewable, reproducible, documented",
            "Uses less resources",
            "Automatic optimization"
        ],
        correct: 1,
        explanation: "Pipeline as code means Jenkinsfile/gitlab-ci.yml in git. Benefits: version history, peer review via PRs, easy rollback, self-documenting, reproducible across environments.",
        tip: "Treat infrastructure/pipeline like code: version control, review, test, automate. This is the DevOps way."
    },
    {
        difficulty: "medium",
        topic: "Deployment Strategies",
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
        difficulty: "medium",
        topic: "Deployment Strategies",
        question: "What is canary deployment?",
        options: [
            "Deploying at night",
            "Gradually rolling out to small percentage of users, monitoring, then full rollout",
            "Deploying to one server",
            "Testing on birds"
        ],
        correct: 1,
        explanation: "Canary: deploy to small percentage of users (5%), monitor metrics/errors, gradually increase (10%, 25%, 50%, 100%). Rollback if issues detected. Named after canary in coal mine.",
        tip: "Canary pattern: 5% → monitor 10 min → 25% → monitor → 50% → monitor → 100%. Rollback immediately if error rate spikes."
    },
    {
        difficulty: "medium",
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
            "Builds Docker image only on main branch, tags with commit SHA",
            "Tests then builds",
            "Pushes to registry"
        ],
        correct: 1,
        explanation: "'only: main' restricts to main branch. $CI_COMMIT_SHA is GitLab variable (git commit hash). Tags image with unique commit hash for traceability. No push step means image stays on runner.",
        tip: "Always tag with commit SHA or build number for traceability. Never rely only on 'latest' tag. Add: 'docker push' to publish."
    },
    {
        difficulty: "medium",
        topic: "GitHub Actions",
        question: "What triggers this GitHub Action?",
        code: `on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]`,
        options: [
            "Manual trigger only",
            "Push to main OR pull request targeting main",
            "Push to any branch",
            "Schedule only"
        ],
        correct: 1,
        explanation: "Triggers on: 1) direct push to main branch, OR 2) pull request that targets main. This is common for CI: test on PRs and main branch pushes.",
        tip: "GitHub Actions triggers: push, pull_request, schedule (cron), workflow_dispatch (manual), and many more. Combine for complex workflows."
    },
    {
        difficulty: "medium",
        topic: "Testing Strategy",
        question: "What is integration testing?",
        options: [
            "Testing single functions",
            "Testing how multiple components work together",
            "Manual testing",
            "Load testing"
        ],
        correct: 1,
        explanation: "Integration tests verify multiple components work together (app + database, microservices communication, API endpoints). More complex than unit tests, but catch different bugs.",
        tip: "Test pyramid: Many unit tests (fast, isolated) → Some integration tests (slower, realistic) → Few E2E tests (slowest, full system)."
    },

    // HARD QUESTIONS (19-25)
    {
        difficulty: "hard",
        topic: "Advanced Deployment",
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
        topic: "Pipeline Optimization",
        question: "How can you speed up slow CI/CD pipelines?",
        options: [
            "Skip tests",
            "Parallelize jobs, cache dependencies, optimize Docker layers, use faster runners",
            "Run less frequently",
            "Remove security scans"
        ],
        correct: 1,
        explanation: "Speed up pipelines: run tests in parallel, cache dependencies (npm/maven), optimize Docker builds (layer caching, multi-stage), use faster machines, fail fast (quick checks first). Goal: <10 min for fast feedback.",
        tip: "Quick wins: parallel test execution, dependency caching, Docker layer caching. Advanced: distributed testing, incremental builds."
    },
    {
        difficulty: "hard",
        topic: "Jenkins Shared Libraries",
        question: "What are Jenkins Shared Libraries used for?",
        options: [
            "Storing logs",
            "Reusable pipeline code across projects (DRY principle)",
            "Backup system",
            "Plugin management"
        ],
        correct: 1,
        explanation: "Shared Libraries let you create reusable Groovy functions/steps for pipelines. DRY principle: define common patterns once, use everywhere. Example: standardized deploy function used by all teams.",
        tip: "Pattern: Create library with common steps (buildDocker, deployK8s, notify). Teams import and use. Maintains consistency and reduces duplication."
    },
    {
        difficulty: "hard",
        topic: "Security in CI/CD",
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
        topic: "Trunk-Based Development",
        question: "What is trunk-based development?",
        options: [
            "Using multiple long-lived branches",
            "Developers commit to main/trunk frequently, short-lived feature branches",
            "No version control",
            "Only release branches"
        ],
        correct: 1,
        explanation: "Trunk-based: developers work on trunk/main with short-lived feature branches (<1 day). Enables true CI, reduces merge conflicts, forces small incremental changes. Alternative to GitFlow (multiple long-lived branches).",
        tip: "Trunk-based → enables CI/CD. GitFlow → release trains. Modern trend: trunk-based + feature flags for incomplete features."
    },
    {
        difficulty: "hard",
        topic: "Monitoring & Observability",
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
    {
        difficulty: "hard",
        topic: "Infrastructure as Code in CI/CD",
        question: "How does IaC integrate with CI/CD?",
        options: [
            "It doesn't",
            "Infrastructure changes go through same pipeline: test, review, automated deploy",
            "Manual only",
            "Separate process"
        ],
        correct: 1,
        explanation: "IaC (Terraform, CloudFormation) + CI/CD = GitOps. Infrastructure changes: PR → automated validate/plan → review → merge → automated apply. Treats infrastructure like application code.",
        tip: "Pattern: terraform plan in CI (on PR), terraform apply in CD (on merge). Add: cost estimation, security scanning, compliance checks."
    }
];
