export const authUrl = "http://localhost:4189";
export const serverUrl = "http://localhost:8000"
export const clientUrl = "http://localhost:5173"

export let languages = [ 
    "C++ 17",
    "C 17",
    "Node.js",
    "Python 3"
 ];

 export let versions = [
    "Python 3 (3.10)",
    "Node.js (20.x)",
    "C++ 17 (g++ 11.2)",
    "C 17 (gcc 11.2)"
];

export let prismLang: { [key: string]: string; } = {
    "Python 3 (3.10)": "py",
    "Node.js (20.x)": "js",
    "C++ 17 (g++ 11.2)": "cpp",
    "C 17 (gcc 11.2)": "c"
};

export let verdicts = [
    "Correct Answer",
    "Wrong Answer",
    "Compilation Error",
    "Time Limit",
    "Memory Limit",
    "Runtime Error"
];

export let verdictIcon: { [key: string]: string; } = {
    "Memory Limit": "bi-memory text-error",
    "Time Limit": "bi-alarm-circle text-error",
    "Runtime Error": "bi-x-circle text-error",
    "Wrong Answer" : "bi-x-circle text-yellow",
    "Correct Answer": "bi-check-circle text-accent", // change also at TastCases.svelte
    "Compilation Error": "bi-exclamation-triangle text-error"
};

export let katexDelimiters = [
    {left: '$$', right: '$$', display: true},
    {left: '$', right: '$', display: false},
    {left: '\\(', right: '\\)', display: false},
    {left: '\\[', right: '\\]', display: true}
]

export let limits = {
    time: {
        default: 2,
        max: 10,
        min: 1,
    },
    memory: {
        default: 512,
        max: 1024,
        min: 4
    }
}
