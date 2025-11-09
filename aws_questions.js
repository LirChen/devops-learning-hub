const questions = [
    // EASY QUESTIONS (1-10)
    {
        difficulty: "easy",
        topic: "EC2 Basics",
        question: "What is an EC2 instance?",
        options: [
        "A database service",
        "A storage bucket",
        "A network service",
        "A virtual server in the cloud"
    ],
        correct: 3,
        explanation: "EC2 (Elastic Compute Cloud) provides resizable virtual servers in the cloud. You choose instance type (CPU/RAM), operating system, and pay per hour. It's the foundation of AWS compute services.",
        tip: "Think of EC2 as renting a computer in AWS's data center. You control the OS and applications."
    },
    {
        difficulty: "easy",
        topic: "S3 Basics",
        question: "What is Amazon S3 primarily used for?",
        options: [
        "Networking",
        "Running applications",
        "Compute resources",
        "Object storage (storing files)"
    ],
        correct: 3,
        explanation: "S3 (Simple Storage Service) is object storage for files. It's highly durable (99.999999999%), scalable, and cost-effective. Common uses: backups, static websites, data lakes, logs.",
        tip: "S3 is like unlimited cloud storage. Organize with buckets (folders). Pay per GB stored and data transfer."
    },
    {
        difficulty: "easy",
        topic: "IAM Basics",
        question: "What does IAM stand for?",
        options: [
        "Instance Application Manager",
        "Identity and Access Management",
        "Internal API Manager",
        "Internet Access Management"
    ],
        correct: 1,
        explanation: "IAM (Identity and Access Management) controls who can access AWS resources and what actions they can perform. It's the security foundation of AWS.",
        tip: "IAM is free! Always use it. Never use root account for daily tasks. Create IAM users/roles with least privilege."
    },
    {
        difficulty: "easy",
        topic: "VPC Basics",
        question: "What is a VPC?",
        options: [
        "Virtual Private Cloud - your isolated network in AWS",
        "A monitoring tool",
        "A type of EC2 instance",
        "A database service"
    ],
        correct: 0,
        explanation: "VPC is your private network in AWS. You define IP ranges, subnets, route tables, and security groups. Resources in VPC are isolated from the internet unless you explicitly allow access.",
        tip: "Every AWS account has a default VPC, but best practice is to create custom VPCs for production with proper subnet design."
    },
    {
        difficulty: "easy",
        topic: "Security Groups",
        question: "What are Security Groups?",
        options: [
        "IAM policies",
        "Encryption keys",
        "User groups",
        "Virtual firewalls for EC2 instances (control inbound/outbound traffic)"
    ],
        correct: 3,
        explanation: "Security Groups are virtual firewalls that control inbound and outbound traffic for EC2 instances. They're stateful (return traffic automatically allowed). Rules specify protocols, ports, and sources.",
        tip: "Security Groups are instance-level firewalls. NACLs are subnet-level. Use both for defense in depth."
    },
    {
        difficulty: "easy",
        topic: "RDS",
        question: "What is Amazon RDS?",
        options: [
        "A file storage system",
        "A caching service",
        "Managed relational database service",
        "A NoSQL database"
    ],
        correct: 2,
        explanation: "RDS (Relational Database Service) is managed database service for MySQL, PostgreSQL, Oracle, SQL Server, MariaDB. AWS handles backups, patching, scaling, and high availability.",
        tip: "RDS vs EC2+database: RDS is managed (easier), EC2 gives more control. For most cases, use RDS and focus on your application."
    },
    {
        difficulty: "easy",
        topic: "Regions and AZs",
        question: "What is an Availability Zone (AZ)?",
        options: [
        "A network zone",
        "A pricing tier",
        "An isolated data center within a region",
        "A country"
    ],
        correct: 2,
        explanation: "An Availability Zone is one or more discrete data centers with redundant power, networking, and connectivity. Each region has multiple AZs (isolated from failures in other AZs).",
        tip: "High availability pattern: deploy across multiple AZs. If one AZ fails, others keep running. Most regions have 3+ AZs."
    },
    {
        difficulty: "easy",
        topic: "Load Balancing",
        question: "What does an ELB (Elastic Load Balancer) do?",
        options: [
        "Distributes traffic across multiple targets (EC2, containers, IPs)",
        "Manages security",
        "Stores data",
        "Monitors applications"
    ],
        correct: 0,
        explanation: "ELB automatically distributes incoming traffic across multiple targets (EC2, containers, Lambda). It provides high availability and fault tolerance. Types: Application LB (HTTP/HTTPS), Network LB (TCP/UDP), Classic LB (legacy).",
        tip: "Use ALB for web apps (HTTP/HTTPS), NLB for ultra-low latency and high throughput. ELB performs health checks and routes only to healthy targets."
    },
    {
        difficulty: "easy",
        topic: "Lambda",
        question: "What is AWS Lambda?",
        options: [
        "A database",
        "Serverless compute - run code without managing servers",
        "A storage service",
        "A virtual machine"
    ],
        correct: 1,
        explanation: "Lambda is serverless compute. Upload code, Lambda runs it in response to events. You pay only for compute time used (per millisecond). No servers to manage. Supports multiple languages.",
        tip: "Lambda use cases: API backends, data processing, scheduled tasks, event-driven workflows. Max 15 min execution time."
    },
    {
        difficulty: "easy",
        topic: "CloudWatch",
        question: "What is Amazon CloudWatch?",
        options: [
        "A security service",
        "A deployment service",
        "Monitoring and observability service for AWS resources",
        "A networking service"
    ],
        correct: 2,
        explanation: "CloudWatch collects monitoring data (metrics, logs, events) from AWS resources. Create dashboards, set alarms, and automate actions. Essential for operational visibility.",
        tip: "CloudWatch basics: Metrics (CPU, network), Logs (application logs), Alarms (alert on thresholds). Enable detailed monitoring for critical resources."
    },

    // MEDIUM QUESTIONS (11-18)
    {
        difficulty: "medium",
        topic: "IAM Advanced",
        question: "What's the difference between IAM users and IAM roles?",
        options: [
        "Users have permanent credentials (people), roles have temporary credentials (services/resources)",
        "Users are deprecated",
        "They're the same",
        "Roles are more secure"
    ],
        correct: 0,
        explanation: "IAM Users: permanent credentials for people. IAM Roles: temporary credentials for AWS services, applications, or federated users. Roles are more secure (no long-term credentials to leak).",
        tip: "Best practice: People use SSO/federation, applications use roles. Never hardcode IAM credentials! Use roles for EC2/Lambda/ECS."
    },
    {
        difficulty: "medium",
        topic: "S3 Storage Classes",
        question: "Which S3 storage class is cheapest for infrequently accessed data?",
        options: [
        "S3 One Zone-IA",
        "S3 Standard",
        "S3 Intelligent-Tiering",
        "S3 Glacier / Glacier Deep Archive"
    ],
        correct: 3,
        explanation: "S3 Glacier and Glacier Deep Archive are cheapest for archival data. Glacier: 3-5 hour retrieval. Deep Archive: 12+ hour retrieval. Trade-off: very low storage cost vs slower access.",
        tip: "S3 classes: Standard (frequent access) → IA/One Zone-IA (infrequent) → Glacier (archive) → Deep Archive (long-term archive). Use lifecycle policies to transition automatically."
    },
    {
        difficulty: "medium",
        topic: "Auto Scaling",
        question: "How does Auto Scaling decide when to scale EC2 instances?",
        options: [
        "Fixed schedule only",
        "Based on CloudWatch metrics (CPU, custom) and thresholds",
        "Random times",
        "Manual triggers only"
    ],
        correct: 1,
        explanation: "Auto Scaling uses CloudWatch alarms based on metrics. Example: if average CPU > 70% for 5 min, add instances. If < 30% for 10 min, remove instances. Ensures performance and cost efficiency.",
        tip: "Set reasonable thresholds. Too sensitive = flapping (add/remove rapidly, costly). Not sensitive enough = slow response. Monitor and adjust."
    },
    {
        difficulty: "medium",
        topic: "VPC Networking",
        question: "What's the difference between public and private subnets?",
        options: [
        "Private subnets are more secure",
        "No difference",
        "Public subnets have route to Internet Gateway, private don't",
        "Public subnets are faster"
    ],
        correct: 2,
        explanation: "Public subnet: has route to Internet Gateway (resources can reach internet). Private subnet: no route to Internet Gateway (isolated, but can use NAT Gateway for outbound). Security is about configuration, not subnet type.",
        tip: "Pattern: Public subnet for load balancers/bastion hosts, private subnet for app servers/databases. Private resources access internet via NAT Gateway."
    },
    {
        difficulty: "medium",
        topic: "EBS vs Instance Store",
        question: "What's the difference between EBS and Instance Store?",
        options: [
        "No difference",
        "Instance Store is faster always",
        "EBS is deprecated",
        "EBS is persistent network storage, Instance Store is temporary local storage"
    ],
        correct: 3,
        explanation: "EBS: network-attached persistent storage, survives instance stop/restart, can be snapshotted. Instance Store: physical disk on host, temporary, lost on stop/terminate, very high IOPS. Choose based on data persistence needs.",
        tip: "Use EBS for persistent data (databases, app state). Instance Store for temp data (caches, buffers). Can use both: OS on EBS, cache on Instance Store."
    },
    {
        difficulty: "medium",
        topic: "Route 53",
        question: "What is Route 53?",
        options: [
        "AWS's DNS (Domain Name System) and domain registration service",
        "A VPN service",
        "A routing protocol",
        "A network device"
    ],
        correct: 0,
        explanation: "Route 53 is AWS's highly available and scalable DNS service. Register domains, route traffic, health check endpoints. Supports advanced routing: latency-based, geo-location, weighted, failover.",
        tip: "Route 53 routing policies: Simple (basic), Weighted (A/B testing), Latency (performance), Failover (DR), Geolocation (compliance)."
    },
    {
        difficulty: "medium",
        topic: "CloudFormation",
        question: "What is AWS CloudFormation?",
        options: [
        "A monitoring service",
        "A CI/CD service",
        "Infrastructure as Code service - define AWS resources in templates (JSON/YAML)",
        "A deployment tool"
    ],
        correct: 2,
        explanation: "CloudFormation lets you define AWS infrastructure as code (JSON/YAML templates). Create stacks of resources, version control infrastructure, replicate environments. AWS's native IaC tool.",
        tip: "CloudFormation vs Terraform: CloudFormation is AWS-only, deep integration. Terraform is multi-cloud. For AWS-only, both work. Choose based on team expertise."
    },
    {
        difficulty: "medium",
        topic: "SNS vs SQS",
        question: "What's the difference between SNS and SQS?",
        options: [
        "SQS is faster",
        "They're the same",
        "SNS is pub/sub (push to subscribers), SQS is message queue (pull by consumers)",
        "SNS is deprecated"
    ],
        correct: 2,
        explanation: "SNS (Simple Notification Service): pub/sub, push messages to multiple subscribers (email, SMS, Lambda, SQS). SQS (Simple Queue Service): message queue, consumers pull messages, decouples services. Often used together: SNS→multiple SQS queues.",
        tip: "Use SNS for fanout (one message to many destinations). Use SQS for work queues and async processing. Combine: SNS publishes, multiple SQS queues subscribe."
    },

    // HARD QUESTIONS (19-25)
    {
        difficulty: "hard",
        topic: "Cost Optimization",
        question: "Which option is cheapest for running EC2 24/7 for 1-3 years?",
        options: [
        "Lambda",
        "Spot Instances",
        "On-Demand instances",
        "Reserved Instances (1-3 year commitment)"
    ],
        correct: 3,
        explanation: "Reserved Instances (1-year: ~40% cheaper, 3-year: ~60% cheaper than On-Demand). Spot: 70-90% cheaper BUT can be terminated. For predictable 24/7 workload, Reserved is best. Spot is for fault-tolerant batch jobs.",
        tip: "On-Demand: flexibility, highest cost. Reserved: commitment, big savings. Spot: interruptible, huge savings. Savings Plans: newer, more flexible than Reserved."
    },
    {
        difficulty: "hard",
        topic: "High Availability",
        question: "How do you achieve Multi-AZ deployment for RDS?",
        options: [
        "Enable Multi-AZ option - AWS creates standby replica in different AZ, auto failover",
        "Use Read Replicas",
        "Create multiple databases",
        "Manual setup"
    ],
        correct: 0,
        explanation: "Multi-AZ RDS: AWS maintains synchronous standby replica in different AZ. Automatic failover (30-120 sec) if primary fails. For high availability, not read scaling. Read Replicas (async) are for scaling reads.",
        tip: "Multi-AZ: HA and failover (same endpoint). Read Replicas: read scaling (different endpoints). You can have both: Multi-AZ for HA + Read Replicas for scaling."
    },
    {
        difficulty: "hard",
        topic: "VPC Peering",
        question: "What is VPC Peering used for?",
        options: [
        "Internet access",
        "Connect two VPCs privately (same/different accounts/regions)",
        "Load balancing",
        "DNS resolution"
    ],
        correct: 1,
        explanation: "VPC Peering connects two VPCs privately using AWS network (no public internet). Works across accounts and regions. Non-transitive: A↔B and B↔C doesn't mean A↔C. Use Transit Gateway for hub-and-spoke.",
        tip: "VPC Peering: point-to-point, non-transitive. Transit Gateway: hub-and-spoke, transitive, scales better for many VPCs. PrivateLink: access services without VPC peering."
    },
    {
        difficulty: "hard",
        topic: "IAM Policies",
        question: "What is the principle of least privilege in IAM?",
        options: [
        "Deny all access",
        "Use only managed policies",
        "Grant minimum permissions needed to perform a task, no more",
        "Give admin access to everyone"
    ],
        correct: 2,
        explanation: "Least privilege: start with no permissions, add only what's needed. Reduces blast radius if credentials compromised. Use IAM Access Analyzer to identify over-permissioned resources.",
        tip: "Start deny-all, add permissions incrementally. Review and remove unused permissions regularly. Use SCPs (Service Control Policies) for organizational guardrails."
    },
    {
        difficulty: "hard",
        topic: "S3 Security",
        question: "What are three ways to secure S3 buckets?",
        options: [
        "Bucket policies, IAM policies, ACLs, encryption, versioning, MFA Delete",
        "VPN only",
        "S3 is secure by default",
        "Passwords only"
    ],
        correct: 0,
        explanation: "S3 security layers: 1) Block public access (default), 2) Bucket policies (resource-based), 3) IAM policies (user-based), 4) Encryption at rest/transit, 5) Versioning + MFA Delete, 6) Access logging. Use multiple layers.",
        tip: "S3 is private by default. Keep 'Block Public Access' ON unless you need public bucket. Always encrypt sensitive data. Enable versioning for important buckets."
    },
    {
        difficulty: "hard",
        topic: "Lambda Best Practices",
        question: "What are Lambda cold start and warm start?",
        options: [
        "Deployment strategies",
        "Pricing tiers",
        "Temperature settings",
        "Cold start: initialization time for new container. Warm start: reuse existing container (faster)"
    ],
        correct: 3,
        explanation: "Cold start: Lambda creates new container (100-1000ms delay). Warm start: reuses existing container (fast). Cold starts happen on: first invocation, scaling up, code update. Minimize by: provisioned concurrency, keeping functions warm, optimizing init code.",
        tip: "Reduce cold starts: use provisioned concurrency (costs more), keep functions warm with scheduled pings, minimize dependencies, optimize initialization code."
    },
    {
        difficulty: "hard",
        topic: "Disaster Recovery",
        question: "What are the four DR strategies in AWS (fastest to slowest)?",
        options: [
        "Backup only",
        "Replication only",
        "Multi-site (active-active) > Warm standby > Pilot light > Backup & restore",
        "All the same speed"
    ],
        correct: 2,
        explanation: "DR strategies by RTO (Recovery Time Objective): 1) Multi-site/active-active (minutes), 2) Warm standby (15-30 min), 3) Pilot light (hours), 4) Backup & restore (24+ hours). Trade-off: speed vs cost.",
        tip: "Choose based on RTO/RPO requirements and budget. Multi-site: expensive but instant failover. Backup & restore: cheapest but slowest. Most use warm standby (good balance)."
    }
];
