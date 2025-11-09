const questions = [
    // EASY (1-10)
    {
        difficulty: "easy",
        topic: "Basic Commands",
        question: "Which command displays the current working directory?",
        options: ["cd", "ls", "pwd", "dir"],
        correct: 2,
        explanation: "'pwd' (print working directory) shows your current location in the filesystem. 'cd' changes directory, 'ls' lists files.",
        tip: "Remember: pwd = Print Working Directory. Use it when you're lost in the filesystem!"
    },
    {
        difficulty: "easy",
        topic: "File Operations",
        question: "How do you copy a file named 'config.yml' to 'config.backup.yml'?",
        options: [
            "copy config.yml config.backup.yml",
            "cp config.yml config.backup.yml",
            "mv config.yml config.backup.yml",
            "duplicate config.yml config.backup.yml"
        ],
        correct: 1,
        explanation: "'cp source destination' copies files. 'mv' moves/renames files. This is essential for backup operations in DevOps.",
        tip: "cp for copy, mv for move. Add -r for recursive (directories): cp -r folder/ backup/"
    },
    {
        difficulty: "easy",
        topic: "Viewing Files",
        question: "Which command shows the last 15 lines of a log file?",
        options: [
            "head -n 15 file.log",
            "tail -n 15 file.log",
            "last -n 15 file.log",
            "end -n 15 file.log"
        ],
        correct: 1,
        explanation: "'tail -n 15' shows the last 15 lines. 'head -n 15' shows the first 15. Use 'tail -f' to follow live logs!",
        tip: "tail -f is your best friend for watching live logs in production!"
    },
    {
        difficulty: "easy",
        topic: "File Permissions",
        question: "In 'ls -l' output, what does 'drwxr-xr-x' indicate?",
        options: [
            "A regular file",
            "A directory",
            "A symbolic link",
            "A device file"
        ],
        correct: 1,
        explanation: "The first character 'd' means directory. '-' would be a file, 'l' would be a symbolic link.",
        tip: "First character tells the type: d=directory, -=file, l=link, b=block device"
    },
    {
        difficulty: "easy",
        topic: "Process Management",
        question: "Which command shows all running processes?",
        options: ["ps aux", "show processes", "list -p", "proc -all"],
        correct: 0,
        explanation: "'ps aux' lists all processes with details. 'a' = all users, 'u' = user-oriented format, 'x' = include processes without terminals.",
        tip: "Common patterns: 'ps aux | grep nginx' to find nginx processes"
    },
    {
        difficulty: "easy",
        topic: "Text Search",
        question: "How do you search for the word 'ERROR' in a file?",
        options: [
            "find ERROR file.log",
            "search ERROR file.log",
            "grep ERROR file.log",
            "locate ERROR file.log"
        ],
        correct: 2,
        explanation: "'grep' searches text within files. It's the most-used command in DevOps for log analysis. 'find' searches for files by name.",
        tip: "grep -i for case-insensitive, grep -r for recursive, grep -n for line numbers"
    },
    {
        difficulty: "easy",
        topic: "Redirects",
        question: "What does '>' do in: echo \"hello\" > file.txt",
        options: [
            "Appends to file",
            "Reads from file",
            "Overwrites file",
            "Compares with file"
        ],
        correct: 2,
        explanation: "'>' redirects output and overwrites the file. '>>' appends to the file. This is fundamental for logging and output management.",
        tip: "> overwrites (dangerous!), >> appends (safer). Remember: one > = replace all!"
    },
    {
        difficulty: "easy",
        topic: "File Finding",
        question: "Which command finds all .log files in current directory?",
        options: [
            "find . -name '*.log'",
            "search *.log",
            "locate *.log",
            "grep -r *.log"
        ],
        correct: 0,
        explanation: "'find' searches filesystem by various criteria. '.' means current directory, '-name' searches by filename. Quotes prevent shell expansion.",
        tip: "find is powerful: find /var/log -name '*.log' -mtime -7 (logs modified in last 7 days)"
    },
    {
        difficulty: "easy",
        topic: "Disk Usage",
        question: "Which command shows disk space usage?",
        options: ["du", "df", "disk", "space"],
        correct: 1,
        explanation: "'df' (disk free) shows filesystem disk space. 'du' (disk usage) shows space used by files/folders. Both are essential for capacity monitoring.",
        tip: "df -h for human-readable (GB/MB). du -sh * to see size of all items in current dir"
    },
    {
        difficulty: "easy",
        topic: "User Info",
        question: "Which command shows the current logged-in user?",
        options: ["user", "me", "whoami", "current"],
        correct: 2,
        explanation: "'whoami' prints the current username. Useful in scripts to check who's running them. 'who' shows all logged-in users.",
        tip: "In scripts, use $USER variable or $(whoami) to get the current user"
    },

    // MEDIUM (11-18)
    {
        difficulty: "medium",
        topic: "Pipes & Chaining",
        question: "What does this command do: cat access.log | grep 'ERROR' | wc -l",
        options: [
            "Counts all lines in access.log",
            "Counts lines containing 'ERROR'",
            "Finds ERROR and shows line numbers",
            "Deletes ERROR lines"
        ],
        correct: 1,
        explanation: "Pipes chain commands: cat reads file → grep filters for ERROR → wc -l counts lines. This is the Unix philosophy - combine simple tools.",
        tip: "Pipes are the heart of shell scripting. Master: cat, grep, awk, sed, sort, uniq, wc"
    },
    {
        difficulty: "medium",
        topic: "Permissions",
        question: "What does 'chmod 644 file.txt' do?",
        options: [
            "Owner: rw-, Group: r--, Others: r--",
            "Owner: rwx, Group: r-x, Others: r-x",
            "Owner: r--, Group: rw-, Others: rw-",
            "Makes file executable"
        ],
        correct: 0,
        explanation: "644 = 6(rw-) 4(r--) 4(r--). 6=4+2 (read+write), 4=read only. Common for config files - owner can edit, others can read.",
        tip: "Common: 644 for files, 755 for dirs/scripts, 600 for secrets. Never 777 in production!"
    },
    {
        difficulty: "medium",
        topic: "Text Processing",
        question: "How do you get unique entries from a sorted list?",
        options: [
            "sort file | unique",
            "cat file | distinct",
            "sort file | uniq",
            "filter -u file"
        ],
        correct: 2,
        explanation: "'uniq' removes consecutive duplicate lines - must sort first! 'sort | uniq' or 'sort -u' both work. Essential for log deduplication.",
        tip: "Common pattern: sort file.txt | uniq -c | sort -nr (count occurrences, sort by frequency)"
    },
    {
        difficulty: "medium",
        topic: "Variables",
        question: "In bash, how do you use a variable?",
        code: "NAME=\"server-01\"\necho ___",
        options: ["echo NAME", "echo @NAME", "echo $NAME", "echo #NAME"],
        correct: 2,
        explanation: "'$' prefix accesses variable value. Without $, you get the literal string 'NAME'. ${NAME} also works and is safer in complex expressions.",
        tip: "Always quote variables: echo \"$NAME\" prevents word splitting and glob expansion"
    },
    {
        difficulty: "medium",
        topic: "Background Jobs",
        question: "What does '&' do at the end of a command?",
        code: "python app.py &",
        options: [
            "Runs in foreground",
            "Runs in background",
            "Runs with sudo",
            "Runs repeatedly"
        ],
        correct: 1,
        explanation: "'&' runs command in background, returning control immediately. Use 'jobs' to list, 'fg' to bring to foreground. Essential for long-running processes.",
        tip: "Use 'nohup command &' to keep running after logout. Better: use systemd or screen/tmux"
    },
    {
        difficulty: "medium",
        topic: "Exit Codes",
        question: "What does '$?' contain?",
        options: [
            "Process ID",
            "Exit code of last command",
            "Current directory",
            "Number of arguments"
        ],
        correct: 1,
        explanation: "'$?' holds exit code: 0 = success, non-zero = error. Check with: 'command; if [ $? -eq 0 ]; then echo success; fi'. Critical for error handling.",
        tip: "In scripts: command || echo 'failed' (run if non-zero), command && echo 'success' (run if zero)"
    },
    {
        difficulty: "medium",
        topic: "File Compression",
        question: "How do you extract a tar.gz file?",
        options: [
            "unzip file.tar.gz",
            "tar -xzf file.tar.gz",
            "extract file.tar.gz",
            "gunzip file.tar.gz"
        ],
        correct: 1,
        explanation: "tar -xzf: x=extract, z=gzip, f=file. Create with -czf. .tar.gz is standard for distributing software in Linux.",
        tip: "Remember: -czf to Create, -xzf to eXtract. Add 'v' for verbose: tar -xzvf"
    },
    {
        difficulty: "medium",
        topic: "Network Commands",
        question: "Which command tests network connectivity to a host?",
        options: ["test host", "check host", "ping host", "connect host"],
        correct: 2,
        explanation: "'ping' sends ICMP packets to test connectivity and measure latency. Use Ctrl+C to stop. Also try 'ping -c 5 host' for 5 packets only.",
        tip: "Also learn: curl (test APIs), netstat (show connections), ss (newer netstat)"
    },

    // HARD (19-25)
    {
        difficulty: "hard",
        topic: "Advanced Grep",
        question: "Find lines in logs that start with timestamp and contain ERROR:",
        code: "Sample: 2025-11-08 10:23:45 ERROR Database failed",
        options: [
            "grep '^[0-9].*ERROR' file.log",
            "grep 'ERROR' file.log",
            "grep '^2025.*ERROR$' file.log",
            "grep -E '^[0-9]{4}-.*ERROR' file.log"
        ],
        correct: 3,
        explanation: "'-E' enables extended regex. '^' = start of line, [0-9]{4} = 4 digits, .* = any chars, ERROR = literal. This precisely matches ISO date format logs.",
        tip: "Learn regex! Essential for DevOps. '^' = start, '$' = end, '.' = any char, '*' = 0+ times"
    },
    {
        difficulty: "hard",
        topic: "Awk Processing",
        question: "Sum the values in the 3rd column of a CSV:",
        code: "server1,active,100\nserver2,active,200\nserver3,inactive,50",
        options: [
            "awk -F',' '{sum+=$3} END {print sum}' file.csv",
            "awk '{sum+=$3} END {print sum}' file.csv",
            "awk -F',' '{print $3}' file.csv",
            "awk '{sum=$3; print sum}' file.csv"
        ],
        correct: 0,
        explanation: "awk is a text processing language. -F',' sets delimiter. {sum+=$3} accumulates column 3. END block runs after all lines. Powerful for log analysis.",
        tip: "awk is worth learning deeply. It's a full programming language for text processing!"
    },
    {
        difficulty: "hard",
        topic: "Sed Replacement",
        question: "Replace 'staging' with 'production' in all YAML files:",
        options: [
            "sed 's/staging/production/g' *.yaml",
            "sed -i 's/staging/production/g' *.yaml",
            "replace staging production *.yaml",
            "sed 'staging/production' *.yaml"
        ],
        correct: 1,
        explanation: "sed -i edits files in-place. 's/old/new/g': s=substitute, g=global (all occurrences). Without -i, output goes to stdout. Essential for config management.",
        tip: "ALWAYS test without -i first! Pipe to less: sed 's/old/new/g' file | less"
    },
    {
        difficulty: "hard",
        topic: "Process Signals",
        question: "What's the difference between 'kill -9' and 'kill -15'?",
        options: [
            "No difference",
            "-15 (TERM) allows graceful shutdown, -9 (KILL) forces immediate kill",
            "-9 is slower",
            "-15 forces immediate kill"
        ],
        correct: 1,
        explanation: "SIGTERM (15) asks process to terminate gracefully (cleanup, save state). SIGKILL (9) immediately kills (no cleanup). Always try 15 first!",
        tip: "Signal sequence: TERM (15), wait, KILL (9). Never start with -9 in production!"
    },
    {
        difficulty: "hard",
        topic: "Find & Exec",
        question: "Delete all .tmp files older than 7 days:",
        options: [
            "find . -name '*.tmp' -mtime +7 -delete",
            "rm -rf *.tmp",
            "find . -name '*.tmp' | rm",
            "delete *.tmp -days 7"
        ],
        correct: 0,
        explanation: "-mtime +7 = modified more than 7 days ago. -delete removes them. This is safer than rm * which could be dangerous with glob expansion.",
        tip: "Test first without -delete: find . -name '*.tmp' -mtime +7 -ls"
    },
    {
        difficulty: "hard",
        topic: "Symbolic Links",
        question: "Create a symbolic link from /opt/app/current to /opt/app/v2.0:",
        options: [
            "ln /opt/app/v2.0 /opt/app/current",
            "ln -s /opt/app/v2.0 /opt/app/current",
            "symlink /opt/app/v2.0 /opt/app/current",
            "link -s /opt/app/current /opt/app/v2.0"
        ],
        correct: 1,
        explanation: "'ln -s target linkname' creates symbolic link. Without -s, it's a hard link (different thing). Symlinks are crucial for blue-green deployments.",
        tip: "Pattern: ln -s /path/to/real/version /path/to/link. Change versions by updating link!"
    },
    {
        difficulty: "hard",
        topic: "Script Best Practices",
        question: "What should be the first line of a bash script?",
        options: [
            "#!/bin/bash",
            "#start",
            "//bin/bash",
            "bash"
        ],
        correct: 0,
        explanation: "Shebang (#!/bin/bash) tells system which interpreter to use. Makes script directly executable: './script.sh' instead of 'bash script.sh'.",
        tip: "Use #!/usr/bin/env bash for better portability across systems"
    }
];
