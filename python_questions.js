const questions = [
    // EASY QUESTIONS (1-10)
    {
        difficulty: "easy",
        topic: "Lists & Basics",
        question: "What will be the output of the following code?",
        code: `my_list = [1, 2, 3]
my_list.append([4, 5])
print(len(my_list))`,
        options: ["3", "4", "5", "Error"],
        correct: 1,
        explanation: "append() adds the entire list [4, 5] as a single element, so the list becomes [1, 2, 3, [4, 5]] with length 4. To add elements individually, use extend().",
        tip: "Use extend() to add multiple items individually, append() adds the whole object as one element."
    },
    {
        difficulty: "easy",
        topic: "String Operations",
        question: "Which method converts a string to lowercase?",
        options: ["str.toLower()", "str.lowercase()", "str.lower()", "str.case('lower')"],
        correct: 2,
        explanation: "str.lower() is the correct Python method to convert a string to lowercase. For uppercase, use str.upper()."
    },
    {
        difficulty: "easy",
        topic: "File Operations",
        question: "What does 'with open()' do that makes it better than just open()?",
        options: [
            "It's faster",
            "It automatically closes the file",
            "It can only read files",
            "It requires less memory"
        ],
        correct: 1,
        explanation: "The 'with' statement automatically closes the file when the block ends, even if an error occurs. This prevents resource leaks and is a Python best practice.",
        tip: "Always use 'with open()' - it's the Pythonic way and prevents forgetting to close files."
    },
    {
        difficulty: "easy",
        topic: "Data Types",
        question: "What is the result of: type(5.0)",
        options: ["<class 'int'>", "<class 'float'>", "<class 'number'>", "<class 'decimal'>"],
        correct: 1,
        explanation: "5.0 is a float in Python. Even though it represents a whole number, the decimal point makes it a float type."
    },
    {
        difficulty: "easy",
        topic: "Boolean Logic",
        question: "What does 'not not True' evaluate to?",
        options: ["True", "False", "None", "Error"],
        correct: 0,
        explanation: "'not True' is False, and 'not False' is True. Double negation returns the original boolean value.",
        tip: "In DevOps scripts, double negation can sometimes appear in complex conditionals - understand the logic!"
    },
    {
        difficulty: "easy",
        topic: "List Methods",
        question: "Which method removes and returns the last item from a list?",
        options: ["remove()", "pop()", "delete()", "extract()"],
        correct: 1,
        explanation: "pop() removes and returns the last item (or item at specified index). remove() deletes by value, not position.",
        tip: "pop() is useful when processing queues or stacks in automation scripts."
    },
    {
        difficulty: "easy",
        topic: "String Formatting",
        question: "What is the output of: f'Result: {2 + 2}'",
        options: ["Result: 2 + 2", "Result: 4", "Result: {4}", "Error"],
        correct: 1,
        explanation: "f-strings (formatted string literals) evaluate expressions inside {}. This is the modern way to format strings in Python 3.6+.",
        tip: "f-strings are faster and more readable than .format() or % formatting - use them!"
    },
    {
        difficulty: "easy",
        topic: "Dictionary Basics",
        question: "How do you safely get a value from a dictionary without raising an error if the key doesn't exist?",
        options: [
            "dict[key]",
            "dict.get(key)",
            "dict.find(key)",
            "dict.search(key)"
        ],
        correct: 1,
        explanation: "dict.get(key) returns None if the key doesn't exist. You can also provide a default: dict.get(key, 'default'). dict[key] raises KeyError if key is missing.",
        tip: "In production DevOps scripts, always use .get() to prevent crashes from missing configuration keys."
    },
    {
        difficulty: "easy",
        topic: "Loops",
        question: "What does 'break' do in a loop?",
        options: [
            "Skips to the next iteration",
            "Exits the loop completely",
            "Pauses the loop",
            "Restarts the loop"
        ],
        correct: 1,
        explanation: "'break' exits the entire loop immediately. 'continue' skips to the next iteration. These are essential for controlling flow in file processing."
    },
    {
        difficulty: "easy",
        topic: "Type Conversion",
        question: "What happens when you do: int('42')",
        options: ["Returns 42 as integer", "Returns '42' as string", "Returns 42.0 as float", "Error"],
        correct: 0,
        explanation: "int('42') converts the string '42' to integer 42. This is crucial when parsing configuration files or user input.",
        tip: "Always wrap int() in try/except when parsing external data - invalid input will raise ValueError."
    },

    // MEDIUM QUESTIONS (11-18)
    {
        difficulty: "medium",
        topic: "List Comprehension",
        question: "What is the output of: [x*2 for x in range(3)]",
        options: ["[0, 1, 2]", "[0, 2, 4]", "[2, 4, 6]", "[1, 2, 3]"],
        correct: 1,
        explanation: "List comprehension iterates x through 0, 1, 2 (range(3)) and multiplies each by 2, resulting in [0, 2, 4]. This is a concise way to create lists.",
        tip: "List comprehensions are faster than loops and more Pythonic - master them for data processing!"
    },
    {
        difficulty: "medium",
        topic: "Dictionary Methods",
        question: "What does dict.items() return?",
        options: [
            "List of keys",
            "List of values",
            "List of (key, value) tuples",
            "Dictionary copy"
        ],
        correct: 2,
        explanation: ".items() returns key-value pairs as tuples. Use it in loops: 'for key, value in dict.items()'. .keys() returns keys, .values() returns values.",
        tip: "Use .items() when you need both key and value in loops - it's cleaner than accessing dict[key]."
    },
    {
        difficulty: "medium",
        topic: "Exception Handling",
        question: "What is the correct order of exception handling blocks?",
        code: `try:
    # code
except ___:
    # handle
else:
    # no exception
finally:
    # always runs`,
        options: [
            "try, finally, except, else",
            "try, except, finally, else",
            "try, except, else, finally",
            "try, else, except, finally"
        ],
        correct: 2,
        explanation: "Order: try → except → else → finally. 'else' runs if no exception occurred. 'finally' always runs (cleanup). This structure is vital for robust DevOps scripts.",
        tip: "Use 'finally' for cleanup (closing connections, files) and 'else' for code that should only run on success."
    },
    {
        difficulty: "medium",
        topic: "File Parsing",
        question: "You need to read a file line by line without loading it all into memory. Which is best?",
        options: [
            "file.read().split('\\n')",
            "file.readlines()",
            "for line in file:",
            "file.read()"
        ],
        correct: 2,
        explanation: "'for line in file:' is a generator that reads one line at a time, perfect for large files. readlines() and read() load the entire file into memory.",
        tip: "For large log files (common in DevOps), always iterate directly: 'for line in file:' - it's memory-efficient!"
    },
    {
        difficulty: "medium",
        topic: "String Manipulation",
        question: "What is the output?",
        code: `text = \"server-01-prod\"
parts = text.split('-')
print(parts[1])`,
        options: ["server", "01", "prod", "Error"],
        correct: 1,
        explanation: "split('-') creates ['server', '01', 'prod']. Index [1] is the second element: '01'. This pattern is common for parsing hostnames and logs.",
        tip: "When parsing structured strings, split() is your friend - but always handle edge cases!"
    },
    {
        difficulty: "medium",
        topic: "List Slicing",
        question: "What does my_list[-1] return?",
        options: [
            "First element",
            "Last element",
            "Error",
            "Second to last element"
        ],
        correct: 1,
        explanation: "Negative indices count from the end: -1 is last, -2 is second to last, etc. my_list[0] is first. This is useful for log file processing.",
        tip: "Use [-1] to get the last item, [:-1] to get all except the last - very handy for trimming data!"
    },
    {
        difficulty: "medium",
        topic: "JSON Handling",
        question: "What's the difference between json.dump() and json.dumps()?",
        options: [
            "dump() writes to file, dumps() returns string",
            "dumps() writes to file, dump() returns string",
            "They're the same",
            "dump() is faster"
        ],
        correct: 0,
        explanation: "json.dump(data, file) writes JSON to a file object. json.dumps(data) returns a JSON string. The 's' stands for 'string'. Similarly, load() reads from file, loads() parses a string.",
        tip: "Remember: 'dump' = file, 'dumps' = string. Same for load/loads. Critical for config management!"
    },
    {
        difficulty: "medium",
        topic: "Sets",
        question: "What makes sets useful in DevOps?",
        options: [
            "They're ordered",
            "They allow duplicates",
            "Fast membership testing with 'in'",
            "They can store any type"
        ],
        correct: 2,
        explanation: "Sets use hash tables, making 'in' operations O(1) vs O(n) for lists. Perfect for checking if servers/IPs exist in large lists. Sets also automatically remove duplicates.",
        tip: "Use sets for: unique values, fast lookups, removing duplicates from lists."
    },

    // HARD QUESTIONS (19-25)
    {
        difficulty: "hard",
        topic: "Decorators",
        question: "What does this decorator do?",
        code: `def timer(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        print(f\"Took {time.time() - start}s\")
        return result
    return wrapper`,
        options: [
            "Delays function execution",
            "Measures function execution time",
            "Caches function results",
            "Logs function calls"
        ],
        correct: 1,
        explanation: "This decorator wraps a function to measure how long it takes to execute. Decorators are functions that modify other functions - essential for logging, timing, and monitoring in production.",
        tip: "Use decorators for cross-cutting concerns: logging, timing, authentication, retries. They keep your code DRY!"
    },
    {
        difficulty: "hard",
        topic: "Generators",
        question: "What's the advantage of using generators over lists?",
        code: `# Generator
def read_large_file(path):
    with open(path) as f:
        for line in f:
            yield line.strip()`,
        options: [
            "Faster execution",
            "Better syntax",
            "Memory efficient - generates values on demand",
            "Can be reused multiple times"
        ],
        correct: 2,
        explanation: "Generators yield values one at a time instead of storing all in memory. Critical for processing large files! Use yield instead of return. You can only iterate once.",
        tip: "For multi-GB log files, generators are essential - they process one line at a time without loading everything!"
    },
    {
        difficulty: "hard",
        topic: "Context Managers",
        question: "What happens if an exception occurs inside a 'with' block?",
        options: [
            "File stays open",
            "File is automatically closed before exception propagates",
            "Program crashes",
            "Exception is suppressed"
        ],
        correct: 1,
        explanation: "Context managers (with statement) guarantee cleanup via __exit__ method, even if exceptions occur. This makes them perfect for resource management (files, connections, locks).",
        tip: "Always use 'with' for files, database connections, network sockets - it prevents resource leaks!"
    },
    {
        difficulty: "hard",
        topic: "Lambda Functions",
        question: "Sort this list of servers by their numeric ID:",
        code: `servers = ['server-10', 'server-2', 'server-1']
servers.sort(key=___)`,
        options: [
            "lambda x: x",
            "lambda x: int(x.split('-')[1])",
            "lambda x: x.split('-')",
            "lambda x: x[7:]"
        ],
        correct: 1,
        explanation: "Extract the number after '-' and convert to int for numeric sorting. Without this, you'd get: ['server-1', 'server-10', 'server-2'] (lexical). Lambda creates anonymous functions for simple operations.",
        tip: "Lambdas are perfect for sort keys, filters, and maps. For complex logic, use def functions."
    },
    {
        difficulty: "hard",
        topic: "List vs Dict Performance",
        question: "You need to check if 10,000 IPs are in a list of 1 million banned IPs. What's fastest?",
        options: [
            "Keep as list, use 'in'",
            "Convert to set, use 'in'",
            "Use a for loop",
            "Use filter()"
        ],
        correct: 1,
        explanation: "Converting to set makes lookups O(1) instead of O(n). Initial conversion is O(n), but 10,000 lookups make it worthwhile. For DevOps at scale, this matters!",
        tip: "Rule: If checking membership repeatedly, convert to set first. One-time check? List is fine."
    },
    {
        difficulty: "hard",
        topic: "Error Handling Strategy",
        question: "In a deployment script that processes 100 servers, one fails. What's the best approach?",
        options: [
            "Let the script crash",
            "Wrap each server in try/except, log errors, continue",
            "Use finally to cleanup",
            "Ignore all errors"
        ],
        correct: 1,
        explanation: "Production scripts should be resilient. Catch exceptions per item, log them, and continue. This prevents one failure from blocking 99 successful deployments. Collect failures for review.",
        tip: "Pattern: try each item, catch specific exceptions, log details, continue. Report all failures at the end."
    },
    {
        difficulty: "hard",
        topic: "Default Arguments Trap",
        question: "What's wrong with this function?",
        code: `def add_server(name, servers=[]):
    servers.append(name)
    return servers`,
        options: [
            "Nothing wrong",
            "Mutable default argument persists across calls",
            "servers should be a dict",
            "Missing type hints"
        ],
        correct: 1,
        explanation: "The list is created once at function definition, not per call! Second call gets the list with first call's data. Fix: 'servers=None', then 'if servers is None: servers = []'.",
        tip: "NEVER use mutable defaults (lists, dicts). This bug causes subtle production issues!"
    }
];
