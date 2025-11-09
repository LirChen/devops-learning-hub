const questions = [
    {
        difficulty: "easy",
        topic: "Docker Basics",
        question: "What is the difference between a Docker image and a container?",
        options: [
            "They are the same thing",
            "Image is a template, container is a running instance",
            "Container is a template, image is running",
            "Images are for Windows, containers for Linux"
        ],
        correct: 1,
        explanation: "An image is a read-only template with instructions. A container is a runnable instance of an image. Think: image = class, container = object.",
        tip: "One image can spawn many containers. Images are immutable, containers are ephemeral."
    },
    {
        difficulty: "easy",
        topic: "Basic Commands",
        question: "Which command downloads a Docker image from Docker Hub?",
        options: ["docker download", "docker get", "docker pull", "docker fetch"],
        correct: 2,
        explanation: "'docker pull' downloads images from a registry. 'docker push' uploads. Docker Hub is the default registry.",
        tip: "docker pull nginx:latest - always specify tag! 'latest' can change, specific versions are safer"
    },
    {
        difficulty: "easy",
        topic: "Container Lifecycle",
        question: "How do you list all running containers?",
        options: ["docker list", "docker ps", "docker containers", "docker show"],
        correct: 1,
        explanation: "'docker ps' lists running containers. Add '-a' for all (including stopped). 'ps' comes from Unix process listing.",
        tip: "docker ps -a shows stopped containers. docker ps -q gives only IDs (useful for scripts)"
    },
    {
        difficulty: "easy",
        topic: "Stopping Containers",
        question: "What command stops a running container gracefully?",
        options: ["docker kill", "docker stop", "docker end", "docker terminate"],
        correct: 1,
        explanation: "'docker stop' sends SIGTERM then SIGKILL after timeout. 'docker kill' sends SIGKILL immediately. Always prefer stop.",
        tip: "docker stop container_id - gives app time to cleanup. Use kill only when stop fails"
    },
    {
        difficulty: "easy",
        topic: "Port Mapping",
        question: "What does '-p 8080:80' do in 'docker run -p 8080:80 nginx'?",
        options: [
            "Maps host port 80 to container port 8080",
            "Maps host port 8080 to container port 80",
            "Opens both ports",
            "Closes port 80"
        ],
        correct: 1,
        explanation: "Format is '-p host:container'. This maps host machine's port 8080 to container's port 80. Access via localhost:8080.",
        tip: "Remember: -p HOST:CONTAINER. Always host first! Multiple: -p 80:80 -p 443:443"
    },
    {
        difficulty: "medium",
        topic: "Dockerfile",
        question: "What's the purpose of FROM instruction in a Dockerfile?",
        options: [
            "Sets the working directory",
            "Specifies the base image",
            "Copies files",
            "Runs commands"
        ],
        correct: 1,
        explanation: "FROM specifies the base image to build upon. Must be first instruction. Example: FROM ubuntu:20.04 or FROM node:16",
        tip: "Use official images as base. Prefer specific tags over 'latest' for reproducibility"
    },
    {
        difficulty: "medium",
        topic: "Docker Volumes",
        question: "Why use volumes instead of storing data in containers?",
        options: [
            "Volumes are faster",
            "Data persists when container is deleted",
            "Volumes use less space",
            "Required by Docker"
        ],
        correct: 1,
        explanation: "Containers are ephemeral - data inside is lost when deleted. Volumes persist data independently of container lifecycle.",
        tip: "Named volumes: docker run -v mydata:/app/data. Bind mounts: -v /host/path:/container/path"
    },
    {
        difficulty: "medium",
        topic: "Docker Networks",
        question: "How do containers in the same network communicate?",
        options: [
            "By IP address only",
            "By container ID",
            "By container name (DNS)",
            "They cannot communicate"
        ],
        correct: 2,
        explanation: "Docker provides built-in DNS. Containers on same network can reach each other by name. Example: curl http://backend:3000",
        tip: "Create custom network: docker network create mynet. Run with: --network mynet"
    },
    {
        difficulty: "medium",
        topic: "Multi-stage Builds",
        question: "What's the main benefit of multi-stage Docker builds?",
        code: `FROM node:16 AS builder\nWORKDIR /app\nCOPY . .\nRUN npm install && npm run build\n\nFROM nginx:alpine\nCOPY --from=builder /app/dist /usr/share/nginx/html`,
        options: [
            "Faster builds",
            "Smaller final image (excludes build tools)",
            "Multiple apps in one image",
            "Better security by default"
        ],
        correct: 1,
        explanation: "Build in one stage with all tools, copy only artifacts to final stage. Final image doesn't include compilers, dev dependencies, etc.",
        tip: "Pattern: builder stage (big) -> production stage (small). Can reduce image from 1GB to 100MB!"
    },
    {
        difficulty: "medium",
        topic: "Image Layers",
        question: "Why should you order Dockerfile commands from least to most frequently changed?",
        options: [
            "Docker requirement",
            "Faster builds via layer caching",
            "Smaller images",
            "Better security"
        ],
        correct: 1,
        explanation: "Docker caches each layer. If a layer changes, all subsequent layers rebuild. Put stable stuff (base image, system packages) first.",
        tip: "Good order: FROM, system packages, app dependencies, app code. Code changes won't rebuild everything"
    },
    {
        difficulty: "hard",
        topic: "Docker Compose",
        question: "What does 'docker-compose up -d' do?",
        options: [
            "Downloads images",
            "Starts services in detached mode (background)",
            "Stops services",
            "Deletes containers"
        ],
        correct: 1,
        explanation: "'up' creates and starts containers defined in docker-compose.yml. '-d' runs in background. Without -d, logs appear in terminal.",
        tip: "docker-compose down stops and removes. docker-compose logs -f to view logs live"
    },
    {
        difficulty: "hard",
        topic: "Health Checks",
        question: "What happens when a container fails its HEALTHCHECK?",
        options: [
            "Container automatically restarts",
            "Container is marked unhealthy (orchestrator can act)",
            "Container stops immediately",
            "Nothing"
        ],
        correct: 1,
        explanation: "Failed health check marks container unhealthy. Orchestrators like Kubernetes/ECS can then restart or reroute traffic. Docker itself doesn't auto-restart.",
        tip: "Define in Dockerfile: HEALTHCHECK CMD curl -f http://localhost/ || exit 1"
    },
    {
        difficulty: "hard",
        topic: "Image Security",
        question: "Why should you avoid 'RUN apt-get upgrade' in Dockerfiles?",
        options: [
            "It's slow",
            "Creates non-reproducible builds (versions change)",
            "Uses too much space",
            "It's deprecated"
        ],
        correct: 1,
        explanation: "upgrades fetch latest packages, varying by build time. Same Dockerfile could produce different images. Better: use specific base image tags.",
        tip: "Use specific base tags: FROM ubuntu:20.04, not ubuntu:latest. Pin dependencies in requirements.txt"
    },
    {
        difficulty: "hard",
        topic: "Resource Limits",
        question: "Why set memory limits on containers?",
        code: "docker run -m 512m myapp",
        options: [
            "Makes container faster",
            "Prevents one container from consuming all host memory",
            "Required by Docker",
            "Reduces image size"
        ],
        correct: 1,
        explanation: "Without limits, a memory leak in one container can crash the entire host. Limits provide isolation and fair resource sharing.",
        tip: "Also set CPU limits: --cpus=1.5. In production, ALWAYS set limits!"
    },
    {
        difficulty: "hard",
        topic: "Docker Registry",
        question: "You built an image 'myapp:v1' and need to push to private registry at registry.company.com. What's the correct process?",
        options: [
            "docker push myapp:v1",
            "docker tag myapp:v1 registry.company.com/myapp:v1 && docker push registry.company.com/myapp:v1",
            "docker upload myapp:v1",
            "docker send myapp:v1 registry.company.com"
        ],
        correct: 1,
        explanation: "Must tag with full registry path, then push. Format: registry.com/namespace/image:tag. Docker Hub is assumed if no registry specified.",
        tip: "Login first: docker login registry.company.com. Use CI/CD secrets for credentials!"
    },
    {
        difficulty: "hard",
        topic: "Best Practices",
        question: "What's wrong with this Dockerfile?",
        code: `FROM ubuntu\nRUN apt-get update\nRUN apt-get install -y python3\nRUN apt-get install -y pip\nCOPY . /app\nRUN chmod 777 /app`,
        options: [
            "Should use alpine",
            "Too many RUN commands waste layers, chmod 777 is insecure, no tag on FROM",
            "Missing WORKDIR",
            "Should use ENTRYPOINT"
        ],
        correct: 1,
        explanation: "Issues: 1) FROM ubuntu (no tag = unpredictable), 2) separate RUNs create more layers, 3) chmod 777 is major security risk. Combine RUN commands with &&.",
        tip: "Better: FROM ubuntu:20.04, RUN apt-get update && apt-get install -y python3 pip && rm -rf /var/lib/apt/lists/*, never 777!"
    },
    {
        difficulty: "medium",
        topic: "Container Debugging",
        question: "How do you execute commands inside a running container?",
        options: [
            "docker run container_id command",
            "docker exec container_id command",
            "docker shell container_id",
            "docker attach container_id"
        ],
        correct: 1,
        explanation: "'docker exec' runs command in running container. 'docker exec -it container sh' gives interactive shell. Essential for debugging.",
        tip: "docker exec -it container_name bash (or /bin/sh if bash not available)"
    },
    {
        difficulty: "medium",
        topic: "Logs",
        question: "How do you view logs from a container?",
        options: [
            "docker logs container_id",
            "docker show logs container_id",
            "docker cat container_id",
            "docker print container_id"
        ],
        correct: 0,
        explanation: "'docker logs' shows stdout/stderr from container. Add -f to follow (like tail -f). Add --tail 100 for last 100 lines.",
        tip: "docker logs -f --tail 50 container_name - watch last 50 lines live"
    },
    {
        difficulty: "medium",
        topic: "Cleanup",
        question: "How do you remove ALL stopped containers, unused networks, and dangling images?",
        options: [
            "docker clean",
            "docker system prune",
            "docker remove --all",
            "docker delete *"
        ],
        correct: 1,
        explanation: "'docker system prune' cleans up unused resources. Add '-a' to remove all unused images (not just dangling). Add '--volumes' to include volumes.",
        tip: "Run weekly: docker system prune -a --volumes. Saves disk space. Use -f to skip confirmation"
    },
    {
        difficulty: "hard",
        topic: "Build Context",
        question: "You have a 1GB project folder but Dockerfile only needs 2 small files. How to optimize build?",
        options: [
            "Delete unused files before build",
            "Use .dockerignore to exclude unnecessary files",
            "Copy files individually",
            "Use --no-context flag"
        ],
        correct: 1,
        explanation: ".dockerignore works like .gitignore. Excludes files from build context sent to Docker daemon. Dramatically speeds up builds.",
        tip: "Add to .dockerignore: node_modules, .git, *.log, test/, etc. Send only what you COPY in Dockerfile"
    },
    {
        difficulty: "hard",
        topic: "Container Restart Policies",
        question: "What does --restart=unless-stopped do?",
        options: [
            "Never restarts",
            "Always restarts",
            "Restarts unless manually stopped by user",
            "Restarts only on failure"
        ],
        correct: 2,
        explanation: "Restarts on daemon restart UNLESS you explicitly stopped it. Different from 'always' which restarts even after manual stop. Best for production services.",
        tip: "Policies: no, on-failure, always, unless-stopped. Use unless-stopped for production daemons"
    },
    {
        difficulty: "hard",
        topic: "USER Directive",
        question: "Why should Dockerfiles include 'USER' directive?",
        code: `FROM node:16\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install\nCOPY . .\nUSER node\nCMD [\"npm\", \"start\"]`,
        options: [
            "Makes container faster",
            "Security - runs process as non-root user",
            "Required by Docker Hub",
            "Enables networking"
        ],
        correct: 1,
        explanation: "By default, containers run as root - major security risk. USER switches to non-root. If compromised, attacker has limited permissions.",
        tip: "Always add USER before CMD/ENTRYPOINT. Create user if needed: RUN useradd -m appuser"
    },
    {
        difficulty: "hard",
        topic: "ENTRYPOINT vs CMD",
        question: "What's the difference between ENTRYPOINT and CMD?",
        options: [
            "They're the same",
            "ENTRYPOINT sets fixed command, CMD provides default arguments",
            "CMD sets fixed command, ENTRYPOINT provides arguments",
            "ENTRYPOINT is for scripts, CMD for binaries"
        ],
        correct: 1,
        explanation: "ENTRYPOINT defines the executable. CMD provides default args. docker run args override CMD but not ENTRYPOINT. Use both for flexibility.",
        tip: "Pattern: ENTRYPOINT [\"python\"] CMD [\"app.py\"]. Then: docker run image test.py overrides to run test.py"
    },
    {
        difficulty: "hard",
        topic: "ARG vs ENV",
        question: "What's the difference between ARG and ENV in Dockerfile?",
        options: [
            "ARG for build-time, ENV for runtime",
            "ENV for build-time, ARG for runtime",
            "They're the same",
            "ARG is deprecated"
        ],
        correct: 0,
        explanation: "ARG only available during build (docker build --build-arg). ENV persists in running container. Use ARG for build configs, ENV for runtime configs.",
        tip: "ARG VERSION=1.0 at build, ENV API_URL=http://api at runtime. ARG is NOT in final image!"
    }
];
