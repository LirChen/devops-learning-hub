const questions = [
    // Python (8 questions)
    {
        difficulty: "easy",
        topic: "Python - Lists",
        question: "What is the output?",
        code: `servers = ['web1', 'web2', 'db1']\nprint(len(servers))`,
        options: ["2", "3", "4", "Error"],
        correct: 1,
        explanation: "len() returns the number of items in a list. This list has 3 elements.",
        tip: "len() works on lists, strings, dicts, sets - any iterable"
    },
    {
        difficulty: "easy",
        topic: "Python - Files",
        question: "Which mode opens a file for reading?",
        options: ["'w'", "'r'", "'a'", "'x'"],
        correct: 1,
        explanation: "'r' is read mode (default). 'w' = write (overwrites), 'a' = append, 'x' = create new."
    },
    {
        difficulty: "medium",
        topic: "Python - Dictionaries",
        question: "What happens?",
        code: `config = {'host': 'localhost'}\nprint(config['port'])`,
        options: ["Prints None", "Prints empty string", "Raises KeyError", "Prints 0"],
        correct: 2,
        explanation: "Accessing a non-existent key raises KeyError. Use config.get('port') to avoid this."
    },
    {
        difficulty: "medium",
        topic: "Python - JSON",
        question: "How do you parse a JSON string to a Python dict?",
        options: [
            "json.parse(string)",
            "json.loads(string)",
            "json.read(string)",
            "json.decode(string)"
        ],
        correct: 1,
        explanation: "json.loads() converts JSON string to Python object. json.dumps() does the reverse."
    },
    {
        difficulty: "medium",
        topic: "Python - Loops",
        question: "What does this print?",
        code: `for i in range(3):\n    if i == 1:\n        continue\n    print(i)`,
        options: ["0 1 2", "0 2", "1 2", "0 1"],
        correct: 1,
        explanation: "'continue' skips the rest of the iteration. So 1 is skipped, printing 0 and 2."
    },
    {
        difficulty: "hard",
        topic: "Python - Error Handling",
        question: "What's the output?",
        code: `try:\n    x = int('abc')\nexcept ValueError:\n    print('error')\nfinally:\n    print('done')`,
        options: ["error", "done", "error\\ndone", "Error message"],
        correct: 2,
        explanation: "'except' catches the ValueError, 'finally' always runs. Output is error then done."
    },
    {
        difficulty: "medium",
        topic: "Python - Strings",
        question: "What is the output?",
        code: `log = '2025-11-08 ERROR Failed'\nparts = log.split()\nprint(parts[1])`,
        options: ["2025-11-08", "ERROR", "Failed", "Error"],
        correct: 1,
        explanation: "split() without arguments splits on whitespace. Index [1] is the second element: ERROR."
    },
    {
        difficulty: "easy",
        topic: "Python - Boolean",
        question: "What is: bool([])",
        options: ["True", "False", "None", "Error"],
        correct: 1,
        explanation: "Empty containers (list, dict, string) evaluate to False. Non-empty are True."
    },

    // Linux (8 questions)
    {
        difficulty: "easy",
        topic: "Linux - Commands",
        question: "Which command shows disk space usage?",
        options: ["disk", "df -h", "du", "space"],
        correct: 1,
        explanation: "'df -h' shows filesystem disk space in human-readable format (GB/MB)."
    },
    {
        difficulty: "easy",
        topic: "Linux - Viewing Files",
        question: "How do you view the first 20 lines of a file?",
        options: [
            "tail -n 20 file",
            "head -n 20 file",
            "first 20 file",
            "show -n 20 file"
        ],
        correct: 1,
        explanation: "'head -n 20' shows first 20 lines. 'tail -n 20' shows last 20 lines."
    },
    {
        difficulty: "medium",
        topic: "Linux - Permissions",
        question: "What does 'chmod 755 script.sh' do?",
        options: [
            "Owner: rwx, Group: r-x, Others: r-x",
            "Everyone gets read only",
            "Owner: r-x, Group: rwx, Others: rwx",
            "Deletes the file"
        ],
        correct: 0,
        explanation: "755 = rwxr-xr-x. Owner can read/write/execute, others can read/execute. Common for scripts."
    },
    {
        difficulty: "medium",
        topic: "Linux - Pipes",
        question: "What does: cat log.txt | grep ERROR | wc -l",
        options: [
            "Counts all lines",
            "Counts lines with ERROR",
            "Shows ERROR lines",
            "Deletes ERROR lines"
        ],
        correct: 1,
        explanation: "Pipes chain commands: cat reads → grep filters ERROR → wc -l counts lines."
    },
    {
        difficulty: "medium",
        topic: "Linux - Find",
        question: "Find all .log files in /var/log:",
        options: [
            "find /var/log -name '*.log'",
            "search /var/log *.log",
            "locate *.log",
            "grep -r .log /var/log"
        ],
        correct: 0,
        explanation: "'find' searches filesystem. -name matches filenames. Quotes prevent shell expansion."
    },
    {
        difficulty: "hard",
        topic: "Linux - Processes",
        question: "What's the difference between kill -9 and kill -15?",
        options: [
            "-9 is faster",
            "-15 allows graceful shutdown, -9 forces kill",
            "They're the same",
            "-9 is deprecated"
        ],
        correct: 1,
        explanation: "SIGTERM (15) allows cleanup, SIGKILL (9) kills immediately. Always try 15 first."
    },
    {
        difficulty: "medium",
        topic: "Linux - Variables",
        question: "In bash, how do you use a variable?",
        code: `NAME=\"myapp\"\necho ___`,
        options: ["echo NAME", "echo @NAME", "echo $NAME", "echo &NAME"],
        correct: 2,
        explanation: "'$NAME' or '${NAME}' accesses the variable value. Without $, you get literal text."
    },
    {
        difficulty: "hard",
        topic: "Linux - Grep",
        question: "Search for lines starting with ERROR:",
        options: [
            "grep ERROR file.log",
            "grep 'ERROR*' file.log",
            "grep '^ERROR' file.log",
            "grep '$ERROR' file.log"
        ],
        correct: 2,
        explanation: "'^' in regex means start of line. '$' means end of line. '^ERROR' matches lines starting with ERROR."
    },

    // Docker (7 questions)
    {
        difficulty: "easy",
        topic: "Docker - Basics",
        question: "What's the difference between an image and a container?",
        options: [
            "Same thing",
            "Image is template, container is running instance",
            "Container is template, image is instance",
            "Images are for testing"
        ],
        correct: 1,
        explanation: "Image = blueprint, Container = running copy. One image can create many containers."
    },
    {
        difficulty: "easy",
        topic: "Docker - Commands",
        question: "How do you list running containers?",
        options: ["docker list", "docker ps", "docker show", "docker containers"],
        correct: 1,
        explanation: "'docker ps' lists running containers. Add '-a' for all including stopped."
    },
    {
        difficulty: "medium",
        topic: "Docker - Ports",
        question: "What does -p 3000:8080 mean?",
        options: [
            "Host 3000 → Container 8080",
            "Host 8080 → Container 3000",
            "Opens port 3000",
            "Closes port 8080"
        ],
        correct: 0,
        explanation: "Format is -p HOST:CONTAINER. Maps host's 3000 to container's 8080. Access via localhost:3000."
    },
    {
        difficulty: "medium",
        topic: "Docker - Volumes",
        question: "Why use volumes?",
        options: [
            "Faster performance",
            "Data persists when container is deleted",
            "Required by Docker",
            "Uses less memory"
        ],
        correct: 1,
        explanation: "Containers are ephemeral. Volumes persist data outside container lifecycle."
    },
    {
        difficulty: "medium",
        topic: "Docker - Dockerfile",
        question: "What must be the first instruction in a Dockerfile?",
        options: ["RUN", "CMD", "FROM", "WORKDIR"],
        correct: 2,
        explanation: "FROM specifies the base image. Must be first (except ARG which can precede it)."
    },
    {
        difficulty: "hard",
        topic: "Docker - Best Practices",
        question: "Why combine RUN commands with &&?",
        code: `# Bad\nRUN apt-get update\nRUN apt-get install python\n\n# Good\nRUN apt-get update && apt-get install python`,
        options: [
            "Faster execution",
            "Reduces number of layers (smaller image)",
            "Required syntax",
            "Better caching"
        ],
        correct: 1,
        explanation: "Each RUN creates a layer. Combining reduces layers and image size. Also prevents caching issues."
    },
    {
        difficulty: "medium",
        topic: "Docker - Exec",
        question: "How do you run a command in a running container?",
        options: [
            "docker run container command",
            "docker exec container command",
            "docker cmd container command",
            "docker attach container command"
        ],
        correct: 1,
        explanation: "'docker exec -it container bash' gives interactive shell in running container."
    },

    // CI/CD & Git (4 questions)
    {
        difficulty: "easy",
        topic: "Git - Basics",
        question: "Which command creates AND switches to a new branch?",
        options: [
            "git branch new-feature",
            "git checkout new-feature",
            "git checkout -b new-feature",
            "git create new-feature"
        ],
        correct: 2,
        explanation: "'git checkout -b' creates and switches in one step. Shortcut for: branch + checkout."
    },
    {
        difficulty: "medium",
        topic: "CI/CD - Concepts",
        question: "What is the purpose of a staging environment?",
        options: [
            "For developers to test",
            "To test in production-like environment before prod deployment",
            "To store backups",
            "For customer demos"
        ],
        correct: 1,
        explanation: "Staging mirrors production. Test there to catch environment-specific issues before prod."
    },
    {
        difficulty: "medium",
        topic: "Git - Workflow",
        question: "What does 'git pull' do?",
        options: [
            "Fetches and merges changes from remote",
            "Pushes local changes to remote",
            "Creates a new branch",
            "Deletes remote branch"
        ],
        correct: 0,
        explanation: "'git pull' = fetch + merge. Downloads remote changes and merges into current branch."
    },
    {
        difficulty: "easy",
        topic: "CI/CD - Pipeline",
        question: "What does CI stand for?",
        options: [
            "Code Integration",
            "Continuous Integration",
            "Container Installation",
            "Central Infrastructure"
        ],
        correct: 1,
        explanation: "Continuous Integration = automatically test code when pushed. Catch bugs early."
    },

    // AWS & Cloud (3 questions)
    {
        difficulty: "easy",
        topic: "AWS - Basics",
        question: "What is EC2?",
        options: [
            "Storage service",
            "Virtual servers (compute)",
            "Database service",
            "DNS service"
        ],
        correct: 1,
        explanation: "EC2 (Elastic Compute Cloud) provides virtual machines. It's the core compute service."
    },
    {
        difficulty: "easy",
        topic: "AWS - Storage",
        question: "What is S3 used for?",
        options: [
            "Running applications",
            "Object storage (files, backups, static sites)",
            "Running databases",
            "Networking"
        ],
        correct: 1,
        explanation: "S3 (Simple Storage Service) stores objects (files). Great for backups, logs, static websites."
    },
    {
        difficulty: "medium",
        topic: "AWS - Security",
        question: "What is IAM?",
        options: [
            "Instance Access Manager",
            "Identity and Access Management",
            "Image Automation Manager",
            "Infrastructure Asset Manager"
        ],
        correct: 1,
        explanation: "IAM manages users, roles, and permissions in AWS. Controls who can access what."
    }
];
