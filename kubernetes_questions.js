const questions = [
    // EASY QUESTIONS (1-10)
    {
        difficulty: "easy",
        topic: "Kubernetes Basics",
        question: "What is the smallest deployable unit in Kubernetes?",
        options: ["Container", "Pod", "Node", "Deployment"],
        correct: 1,
        explanation: "A Pod is the smallest deployable unit in Kubernetes. It can contain one or more containers that share network and storage resources. Most commonly, one pod contains one container.",
        tip: "Think of pods as wrappers around containers that add Kubernetes-specific features like health checks and resource limits."
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
        explanation: "'kubectl get pods -A' or '--all-namespaces' shows pods across all namespaces. Without flags, it only shows pods in the current namespace.",
        tip: "Add '-o wide' for more details: kubectl get pods -A -o wide"
    },
    {
        difficulty: "easy",
        topic: "Kubernetes Architecture",
        question: "What is a Node in Kubernetes?",
        options: [
            "A container",
            "A physical or virtual machine that runs pods",
            "A configuration file",
            "A network endpoint"
        ],
        correct: 1,
        explanation: "A Node is a worker machine (physical or virtual) that runs pods. Each node contains kubelet, container runtime, and kube-proxy.",
        tip: "Master node(s) control the cluster, worker nodes run your applications"
    },
    {
        difficulty: "easy",
        topic: "Namespaces",
        question: "What is the default namespace in Kubernetes?",
        options: ["kube-system", "default", "public", "main"],
        correct: 1,
        explanation: "The 'default' namespace is where resources are created if no namespace is specified. 'kube-system' is for Kubernetes system components.",
        tip: "Use namespaces to organize resources by environment (dev, staging, prod) or team"
    },
    {
        difficulty: "easy",
        topic: "Labels",
        question: "What are labels used for in Kubernetes?",
        options: [
            "To name resources",
            "Key-value pairs to identify and group resources",
            "To set permissions",
            "To configure networking"
        ],
        correct: 1,
        explanation: "Labels are key-value pairs attached to objects for identification and grouping. Selectors use labels to find resources (e.g., app=nginx, env=prod).",
        tip: "Common labels: app, version, environment, tier. Use selectors to query: kubectl get pods -l app=nginx"
    },
    {
        difficulty: "easy",
        topic: "ReplicaSets",
        question: "What does a ReplicaSet ensure?",
        options: [
            "Pods are backed up",
            "A specified number of pod replicas are running",
            "Pods are secure",
            "Pods have storage"
        ],
        correct: 1,
        explanation: "A ReplicaSet ensures that a specified number of pod replicas are running at any time. If a pod fails, the ReplicaSet creates a new one.",
        tip: "Usually you don't create ReplicaSets directly - Deployments manage them for you"
    },
    {
        difficulty: "easy",
        topic: "Services - Basics",
        question: "What is a Kubernetes Service?",
        options: [
            "A running container",
            "An abstraction that exposes pods as a network service",
            "A storage volume",
            "A security policy"
        ],
        correct: 1,
        explanation: "A Service provides a stable IP address and DNS name for accessing a set of pods. Pods come and go, but the Service endpoint remains constant.",
        tip: "Services use selectors to find pods. They handle load balancing across pod replicas automatically."
    },
    {
        difficulty: "easy",
        topic: "ConfigMaps",
        question: "What are ConfigMaps used for?",
        options: [
            "Storing passwords",
            "Storing non-confidential configuration data",
            "Defining network policies",
            "Managing deployments"
        ],
        correct: 1,
        explanation: "ConfigMaps store non-confidential configuration data as key-value pairs. They decouple configuration from pod specifications.",
        tip: "Use ConfigMaps for config, Secrets for sensitive data. Both can be mounted as files or environment variables."
    },
    {
        difficulty: "easy",
        topic: "Secrets",
        question: "How are Secrets different from ConfigMaps?",
        options: [
            "No difference",
            "Secrets are for confidential data and base64 encoded",
            "Secrets are faster",
            "Secrets are larger"
        ],
        correct: 1,
        explanation: "Secrets store sensitive information (passwords, tokens, keys) and are base64 encoded. They have additional security measures compared to ConfigMaps.",
        tip: "Base64 is NOT encryption! Use encryption at rest and RBAC to truly secure secrets."
    },
    {
        difficulty: "easy",
        topic: "Volumes",
        question: "What happens to data in an emptyDir volume when a pod is deleted?",
        options: [
            "Data is preserved",
            "Data is deleted",
            "Data is backed up automatically",
            "Data is moved to another pod"
        ],
        correct: 1,
        explanation: "emptyDir volumes are created when a pod is assigned to a node and deleted when the pod is removed. Use PersistentVolumes for data that needs to persist.",
        tip: "emptyDir is for temporary/cache data. For persistent data, use PersistentVolumes (PV) and PersistentVolumeClaims (PVC)."
    },

    // MEDIUM QUESTIONS (11-18)
    {
        difficulty: "medium",
        topic: "Deployments",
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
        topic: "Services - Types",
        question: "What type of Service exposes pods to external traffic via a cloud load balancer?",
        options: ["ClusterIP", "NodePort", "LoadBalancer", "ExternalName"],
        correct: 2,
        explanation: "LoadBalancer creates an external load balancer in supported cloud providers (AWS ELB, GCP LB, etc.). ClusterIP is internal only, NodePort exposes on each node's IP.",
        tip: "Service types: ClusterIP (default, internal only) → NodePort (static port on nodes) → LoadBalancer (cloud LB)"
    },
    {
        difficulty: "medium",
        topic: "Health Checks",
        question: "What is the difference between liveness and readiness probes?",
        options: [
            "They are the same",
            "Liveness restarts unhealthy pods, readiness controls traffic routing",
            "Readiness is deprecated",
            "Liveness is for startup only"
        ],
        correct: 1,
        explanation: "Liveness probe: is the container alive? If it fails, Kubernetes restarts the container. Readiness probe: is the container ready for traffic? If it fails, it's removed from Service endpoints.",
        tip: "Use both! Liveness catches deadlocks/hangs. Readiness prevents sending traffic to pods that aren't ready yet (e.g., still loading data)."
    },
    {
        difficulty: "medium",
        topic: "Resource Management",
        question: "What happens if a pod exceeds its memory limit?",
        code: `resources:
  limits:
    memory: "128Mi"
  requests:
    memory: "64Mi"`,
        options: [
            "Pod slows down",
            "Pod is throttled",
            "Pod is killed (OOMKilled)",
            "Warning is logged only"
        ],
        correct: 2,
        explanation: "Exceeding memory limit causes the pod to be killed (OOMKilled). CPU limit causes throttling (slowdown), not killing. Requests are for scheduling, limits are hard caps.",
        tip: "Always set limits! Without them, one pod can consume all node resources. Memory: be generous. CPU: can be tighter."
    },
    {
        difficulty: "medium",
        topic: "ConfigMaps Usage",
        question: "How do you inject all keys from a ConfigMap as environment variables?",
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
        explanation: "Use 'configMapRef' to inject all keys as environment variables. 'configMapKeyRef' injects specific keys. Similar syntax for secrets (secretRef).",
        tip: "envFrom with configMapRef: inject all keys. env with configMapKeyRef: inject specific keys. Choose based on your needs."
    },
    {
        difficulty: "medium",
        topic: "StatefulSets",
        question: "When should you use a StatefulSet instead of a Deployment?",
        options: [
            "For all applications",
            "For stateful apps needing stable network IDs and persistent storage (databases, etc.)",
            "For faster deployments",
            "StatefulSets are deprecated"
        ],
        correct: 1,
        explanation: "StatefulSets provide stable network identities and persistent storage for each pod. Use for databases, distributed systems (Kafka, Cassandra). Use Deployments for stateless apps.",
        tip: "StatefulSet pods have predictable names (app-0, app-1). They're created/deleted in order. Perfect for databases and clustered apps."
    },
    {
        difficulty: "medium",
        topic: "Ingress",
        question: "What is an Ingress in Kubernetes?",
        options: [
            "A type of Service",
            "HTTP/HTTPS router that manages external access to services",
            "A network plugin",
            "A storage class"
        ],
        correct: 1,
        explanation: "Ingress manages external HTTP/HTTPS access to services. It provides load balancing, SSL termination, and name-based virtual hosting. Requires an Ingress Controller (nginx, traefik, etc.).",
        tip: "Pattern: External traffic → Ingress → Service → Pods. One Ingress can route to multiple services based on URL paths or hostnames."
    },
    {
        difficulty: "medium",
        topic: "DaemonSets",
        question: "What is a DaemonSet used for?",
        options: [
            "Running multiple replicas of an app",
            "Running one pod per node (monitoring agents, log collectors, etc.)",
            "Scheduling jobs",
            "Managing secrets"
        ],
        correct: 1,
        explanation: "DaemonSets ensure that all (or some) nodes run a copy of a pod. Common uses: monitoring agents (node-exporter), log collectors (fluentd), network plugins.",
        tip: "Use DaemonSets for node-level services that need to run on every node. They automatically handle node additions/removals."
    },

    // HARD QUESTIONS (19-25)
    {
        difficulty: "hard",
        topic: "Networking",
        question: "What is a NetworkPolicy used for?",
        options: [
            "Creating networks",
            "Controlling traffic between pods (firewall rules)",
            "Load balancing",
            "DNS configuration"
        ],
        correct: 1,
        explanation: "NetworkPolicies are firewall rules for pods. They control ingress (incoming) and egress (outgoing) traffic between pods based on labels and namespaces. Requires a CNI plugin that supports NetworkPolicy.",
        tip: "By default, all pods can talk to all pods. NetworkPolicies implement zero-trust networking. Start with deny-all, then allow specific traffic."
    },
    {
        difficulty: "hard",
        topic: "Persistent Volumes",
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
        topic: "Rolling Updates",
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
        topic: "RBAC",
        question: "What does RBAC stand for and what does it control?",
        options: [
            "Resource-Based Access Control - controls resources",
            "Role-Based Access Control - controls who can do what in the cluster",
            "Remote Backup And Control",
            "Replica-Based Automatic Configuration"
        ],
        correct: 1,
        explanation: "RBAC (Role-Based Access Control) controls authorization in Kubernetes. It defines Roles (what actions) and RoleBindings (who can perform those actions). Use for security and multi-tenancy.",
        tip: "Pattern: ServiceAccount (identity) → RoleBinding → Role (permissions). Use ClusterRole for cluster-wide, Role for namespace-scoped."
    },
    {
        difficulty: "hard",
        topic: "Init Containers",
        question: "What are init containers used for?",
        options: [
            "Backing up containers",
            "Running setup tasks before main containers start (sequential execution)",
            "Monitoring containers",
            "Storing logs"
        ],
        correct: 1,
        explanation: "Init containers run before app containers and must complete successfully. Use for setup tasks: pulling data, waiting for services, generating config. They run sequentially.",
        tip: "Common uses: database migrations, waiting for dependencies (wait-for-db init container), generating configs, cloning git repos."
    },
    {
        difficulty: "hard",
        topic: "HorizontalPodAutoscaler",
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
    {
        difficulty: "hard",
        topic: "Taints and Tolerations",
        question: "What are taints and tolerations used for?",
        options: [
            "Monitoring",
            "Controlling which pods can be scheduled on which nodes",
            "Networking",
            "Storage management"
        ],
        correct: 1,
        explanation: "Taints are applied to nodes to repel pods. Tolerations are applied to pods to allow scheduling on tainted nodes. Use for: dedicated nodes, specialized hardware, isolating workloads.",
        tip: "Taint effects: NoSchedule (don't schedule new), PreferNoSchedule (avoid if possible), NoExecute (evict existing). Common: kubectl taint nodes node1 key=value:NoSchedule"
    },
    {
        difficulty: "hard",
        topic: "Jobs and CronJobs",
        question: "What's the difference between a Job and a CronJob?",
        options: [
            "No difference",
            "Job runs once (or until success), CronJob runs on a schedule",
            "Jobs are faster",
            "CronJobs are deprecated"
        ],
        correct: 1,
        explanation: "Job: creates pods that run to completion (batch processing, one-time tasks). CronJob: creates Jobs on a cron schedule (backups, reports, cleanup). Job ensures task completes successfully.",
        tip: "Job: completions=3 (runs 3 pods to completion). parallelism=2 (runs 2 at a time). CronJob schedule uses cron syntax: '0 2 * * *' = 2 AM daily."
    }
];
