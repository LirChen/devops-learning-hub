const questions = [
    // EASY QUESTIONS (1-10)
    {
        difficulty: "easy",
        topic: "Terraform Basics",
        question: "What is Terraform used for?",
        options: [
        "Container orchestration",
        "Monitoring infrastructure",
        "Code compilation",
        "Infrastructure as Code - define infrastructure in configuration files"
    ],
        correct: 3,
        explanation: "Terraform is an Infrastructure as Code (IaC) tool that lets you define infrastructure using declarative configuration files (HCL - HashiCorp Configuration Language). Version control your infrastructure like code.",
        tip: "IaC benefits: version control, repeatability, documentation, automation, collaboration. No more manual clicking in console!"
    },
    {
        difficulty: "easy",
        topic: "Terraform Commands",
        question: "What does 'terraform apply' do?",
        options: [
        "Shows planned changes",
        "Creates or updates infrastructure to match configuration",
        "Destroys infrastructure",
        "Validates syntax"
    ],
        correct: 1,
        explanation: "'terraform apply' creates/updates resources to match your configuration files. Always run 'terraform plan' first to preview changes. 'terraform destroy' removes everything.",
        tip: "Terraform workflow: write .tf files → terraform init (download providers) → terraform plan (preview) → terraform apply (execute)"
    },
    {
        difficulty: "easy",
        topic: "Ansible Basics",
        question: "What is Ansible?",
        options: [
        "A programming language",
        "A database",
        "Configuration management and automation tool",
        "A monitoring tool"
    ],
        correct: 2,
        explanation: "Ansible is an agentless automation tool for configuration management, application deployment, and task automation. Uses YAML playbooks, connects via SSH, no agents needed.",
        tip: "Ansible advantages: agentless (SSH only), simple YAML syntax, idempotent. Alternatives: Puppet (agent-based), Chef (Ruby-based)."
    },
    {
        difficulty: "easy",
        topic: "Ansible Playbooks",
        question: "What is an Ansible playbook?",
        options: [
        "A type of server",
        "YAML file defining tasks to execute on hosts",
        "A server inventory file",
        "A monitoring dashboard"
    ],
        correct: 1,
        explanation: "Playbooks are YAML files that define automation tasks (install packages, copy files, start services). They specify what to do on which hosts. Idempotent: safe to run multiple times.",
        tip: "Playbook structure: hosts (where), tasks (what), handlers (triggers). Use roles for reusable, organized playbooks."
    },
    {
        difficulty: "easy",
        topic: "Terraform Providers",
        question: "What are Terraform providers?",
        options: [
        "State files",
        "Plugins that enable Terraform to interact with APIs (AWS, Azure, GCP, etc.)",
        "Configuration files",
        "Cloud companies"
    ],
        correct: 1,
        explanation: "Providers are plugins that Terraform uses to interact with cloud platforms, SaaS, and APIs. Examples: AWS, Azure, GCP, Kubernetes, GitHub. Each provider has resources and data sources.",
        tip: "Terraform supports 1000+ providers. Configure in provider blocks. 'terraform init' downloads needed providers."
    },
    {
        difficulty: "easy",
        topic: "IaC Benefits",
        question: "Why use Infrastructure as Code?",
        options: [
        "It's required by law",
        "Version control, repeatability, automation, documentation, disaster recovery",
        "It's faster than manual",
        "Required by cloud providers"
    ],
        correct: 1,
        explanation: "IaC benefits: 1) Version control (git), 2) Repeatable deployments, 3) Automated provisioning, 4) Self-documenting, 5) Easy disaster recovery, 6) Consistent environments, 7) Reduced human error.",
        tip: "IaC is DevOps best practice. Treat infrastructure like application code: version, review, test, automate."
    },
    {
        difficulty: "easy",
        topic: "Idempotency",
        question: "What does idempotency mean in IaC?",
        options: [
        "Running once is required",
        "Cannot run twice",
        "Automatic rollback",
        "Running multiple times produces same result - safe to repeat"
    ],
        correct: 3,
        explanation: "Idempotent operations produce the same result regardless of how many times executed. Example: 'ensure package installed' - installs if missing, skips if present. NOT: 'add user' (creates duplicates).",
        tip: "Terraform and Ansible are idempotent by design. Shell scripts often aren't - be careful with raw 'command' tasks. Test by running twice."
    },
    {
        difficulty: "easy",
        topic: "Ansible Inventory",
        question: "What is an Ansible inventory?",
        options: [
        "A monitoring dashboard",
        "A file listing hosts/groups that Ansible manages",
        "A list of tasks",
        "A backup file"
    ],
        correct: 1,
        explanation: "Inventory files list hosts and groups that Ansible manages. Can be static (INI/YAML file) or dynamic (script that queries cloud provider). Groups organize hosts for bulk operations.",
        tip: "Inventory example: [webservers] with 3 servers, [databases] with 2 servers. Run playbook on specific groups. Use dynamic inventory for cloud."
    },
    {
        difficulty: "easy",
        topic: "Terraform Resources",
        question: "What is a Terraform resource?",
        options: [
        "Infrastructure component to create (EC2, VPC, S3, etc.)",
        "A configuration file",
        "A state file",
        "A provider plugin"
    ],
        correct: 0,
        explanation: "Resources are infrastructure components you want to create/manage. Example: aws_instance (EC2), aws_s3_bucket (S3), azurerm_virtual_machine. Each resource has required and optional arguments.",
        tip: "Resource syntax: resource \"provider_type\" \"name\" { ... }. Example: resource \"aws_instance\" \"web\" { ami = \"ami-123\", instance_type = \"t2.micro\" }"
    },
    {
        difficulty: "easy",
        topic: "Configuration Management",
        question: "What is configuration management?",
        options: [
        "Automating and maintaining consistent configuration of servers/systems",
        "Network configuration",
        "Database management",
        "Managing passwords"
    ],
        correct: 0,
        explanation: "Configuration management automates system configuration (packages, files, services, users). Ensures consistency across servers. Tools: Ansible, Puppet, Chef, SaltStack. Prevents configuration drift.",
        tip: "Without configuration management: manual SSH into servers, inconsistent configs, errors. With: automated, consistent, version-controlled, auditable."
    },

    // MEDIUM QUESTIONS (11-18)
    {
        difficulty: "medium",
        topic: "Terraform State",
        question: "What is terraform.tfstate and why is it critical?",
        options: [
        "Configuration file",
        "Backup file",
        "Tracks infrastructure state - maps config to real resources. Losing it = disaster!",
        "Error log"
    ],
        correct: 2,
        explanation: "State file maps Terraform config to real-world resources. Terraform uses it to know what exists, calculate changes, and manage dependencies. Losing state = Terraform doesn't know what it created (disaster).",
        tip: "NEVER commit state to git (contains secrets). Use remote backends: S3, Terraform Cloud, Azure Blob. Enable state locking (DynamoDB for S3) to prevent concurrent modifications."
    },
    {
        difficulty: "medium",
        topic: "Terraform Modules",
        question: "Why use Terraform modules?",
        options: [
        "Makes Terraform faster",
        "Reusability, organization, abstraction - like functions in programming",
        "Required by Terraform",
        "For testing only"
    ],
        correct: 1,
        explanation: "Modules encapsulate and reuse infrastructure code. Like functions: inputs (variables), processing (resources), outputs (values). DRY principle. Example: VPC module used by multiple projects.",
        tip: "Module pattern: Create reusable modules for common patterns (VPC, EKS, ALB). Teams share via git or Terraform Registry. Main config calls modules."
    },
    {
        difficulty: "medium",
        topic: "Ansible Roles",
        question: "What are Ansible roles?",
        options: [
        "Server types",
        "Organizational structure for reusable playbooks (tasks, vars, files, templates)",
        "IAM policies",
        "User permissions"
    ],
        correct: 1,
        explanation: "Roles organize playbook components into reusable structures. Standard directory layout: tasks/, handlers/, vars/, files/, templates/. Share roles via Ansible Galaxy. DRY principle for Ansible.",
        tip: "Role structure: roles/webserver/{tasks, handlers, vars, files, templates}. Use roles to organize complex playbooks and share across teams."
    },
    {
        difficulty: "medium",
        topic: "Terraform Variables",
        question: "What are Terraform variables used for?",
        options: [
        "Define providers",
        "Parameterize configurations for reusability and flexibility",
        "Create resources",
        "Storing state"
    ],
        correct: 1,
        explanation: "Variables make configurations flexible and reusable. Define once, use many times. Types: string, number, bool, list, map, object. Set via: CLI, tfvars files, environment variables, defaults.",
        tip: "Variable precedence: CLI args > .auto.tfvars > terraform.tfvars > env vars > defaults. Use variables for: region, instance type, environment name."
    },
    {
        difficulty: "medium",
        topic: "Ansible Handlers",
        question: "What are handlers in Ansible?",
        options: [
        "Tasks that run only when notified by other tasks (e.g., restart service after config change)",
        "Error handlers",
        "File managers",
        "User managers"
    ],
        correct: 0,
        explanation: "Handlers are tasks triggered by 'notify' from other tasks. Run once at end of play, even if notified multiple times. Common use: restart service after config change.",
        tip: "Pattern: task updates config file → notifies handler → handler restarts service. Handlers run once at play end, even if notified 10 times."
    },
    {
        difficulty: "medium",
        topic: "Terraform Outputs",
        question: "What are Terraform outputs used for?",
        options: [
        "Log files",
        "Error messages",
        "State storage",
        "Extract values to display or use in other configurations"
    ],
        correct: 3,
        explanation: "Outputs extract values from resources (IP addresses, ARNs, etc.). Uses: display after apply, pass to other modules, share between teams, integrate with other tools.",
        tip: "Output example: output 'instance_ip' { value = aws_instance.web.public_ip }. Use outputs for: IPs, endpoints, resource IDs. Essential for module composition."
    },
    {
        difficulty: "medium",
        topic: "Ansible Templates",
        question: "What are Ansible templates (Jinja2)?",
        options: [
        "Inventory files",
        "Playbook files",
        "Role definitions",
        "Files with variables that get rendered dynamically (for config files)"
    ],
        correct: 3,
        explanation: "Templates use Jinja2 syntax for dynamic config file generation. Variables, loops, conditionals in files. Example: nginx.conf.j2 with {{ server_name }} variable. Template module renders and deploys.",
        tip: "Use templates for config files that change per environment. Example: database.yml.j2 with {{ db_host }}, {{ db_port }}. Keep in templates/ directory."
    },
    {
        difficulty: "medium",
        topic: "Terraform Workspaces",
        question: "What are Terraform workspaces used for?",
        options: [
        "Manage multiple environments (dev, staging, prod) with same config",
        "Collaboration",
        "Version control",
        "Backup state"
    ],
        correct: 0,
        explanation: "Workspaces let you use same config for multiple environments. Each workspace has separate state. Commands: terraform workspace new dev, terraform workspace select prod. Alternative: separate directories.",
        tip: "Workspaces vs directories: Workspaces share code, separate state. Directories separate everything. Choose based on: how different are environments, team workflow."
    },

    // HARD QUESTIONS (19-25)
    {
        difficulty: "hard",
        topic: "Terraform State Management",
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
        topic: "Terraform Dependencies",
        question: "How does Terraform handle resource dependencies?",
        options: [
        "Implicit (resource references) and explicit (depends_on) dependencies create DAG",
        "Random order",
        "Alphabetical order",
        "User-defined order"
    ],
        correct: 0,
        explanation: "Terraform builds dependency graph (DAG). Implicit: aws_instance.web.subnet_id = aws_subnet.main.id creates dependency. Explicit: depends_on when implicit isn't enough. Parallel execution where possible.",
        tip: "Terraform is smart about dependencies. Use implicit (resource references) when possible. Only use depends_on for non-obvious dependencies (e.g., IAM propagation delay)."
    },
    {
        difficulty: "hard",
        topic: "Ansible Facts",
        question: "What are Ansible facts?",
        options: [
        "Error logs",
        "Inventory data",
        "Documentation",
        "System information gathered from hosts (OS, IP, memory, etc.) available as variables"
    ],
        correct: 3,
        explanation: "Facts are system information automatically collected by Ansible (OS, IP, CPU, memory, disks). Available as variables in playbooks. Gather with 'setup' module. Use to make playbooks adaptive to different systems.",
        tip: "Access facts via {{ ansible_facts }} or {{ ansible_os_family }}. Disable gathering with 'gather_facts: no' for speed. Custom facts in /etc/ansible/facts.d/"
    },
    {
        difficulty: "hard",
        topic: "Terraform Import",
        question: "What is 'terraform import' used for?",
        options: [
        "Import modules",
        "Import configurations",
        "Bring existing infrastructure under Terraform management",
        "Import state from other tools"
    ],
        correct: 2,
        explanation: "Import brings existing resources into Terraform state. Use when: adopting Terraform for existing infrastructure, recovering from disasters, migrating from manual. Requires: write config matching resource, then import.",
        tip: "Import workflow: 1) Write resource config, 2) terraform import resource_type.name resource_id, 3) terraform plan (should show no changes). Import doesn't generate config - you write it."
    },
    {
        difficulty: "hard",
        topic: "Ansible Vault",
        question: "What is Ansible Vault?",
        options: [
        "Backup tool",
        "Encrypts sensitive data (passwords, keys) in playbooks/vars",
        "Authentication system",
        "Storage system"
    ],
        correct: 1,
        explanation: "Ansible Vault encrypts sensitive data in repos. Encrypt entire files or specific variables. Decrypt at runtime with password. Enables storing secrets safely in version control.",
        tip: "Vault commands: ansible-vault create/encrypt/decrypt/edit. Use --vault-id for multiple passwords. Store vault password securely (not in git!)."
    },
    {
        difficulty: "hard",
        topic: "Terraform Provisioners",
        question: "When should you use Terraform provisioners?",
        options: [
        "First choice",
        "For all configurations",
        "Always",
        "Last resort - only when no other option (prefer cloud-init, Ansible, config management)"
    ],
        correct: 3,
        explanation: "Provisioners are last resort. They break Terraform's declarative model. Better alternatives: cloud-init (user_data), configuration management (Ansible, Packer images). Use only when: vendor resource doesn't exist, temporary workaround.",
        tip: "Provisioners are escape hatch. Order: 1) Use Terraform resources, 2) Use cloud-init/user_data, 3) Use Ansible/Packer, 4) Last resort: provisioners."
    },
    {
        difficulty: "hard",
        topic: "GitOps with IaC",
        question: "What is GitOps for infrastructure?",
        options: [
        "Infrastructure changes via Git PRs: review → merge → automated apply",
        "Manual deployments",
        "Using Git for code only",
        "Git backups"
    ],
        correct: 0,
        explanation: "GitOps: Git as single source of truth for infrastructure. Process: 1) Change IaC code, 2) Create PR, 3) Review terraform plan, 4) Merge, 5) CI/CD auto-applies. Benefits: audit trail, collaboration, rollback, automation.",
        tip: "GitOps pattern: terraform plan in CI (on PR), terraform apply in CD (on merge). Add: cost estimation, security scanning, policy checks. Git history = infrastructure history."
    }
];
