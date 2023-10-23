export const authUrl = "http://localhost:4189";
export const serverUrl = "http://localhost:8000"
export const clientUrl = "http://localhost:5173"
export const hubUrl = "http://localhost:1204"

// localisations
export let localisations = [
    "en",
    "uk"
];

// submissions
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
    "Correct Answer", // change also at TastCases.svelte
    "Wrong Answer",
    "Compilation Error",
    "Time Limit Exceeded",
    "Memory Limit Exceeded",
    "Runtime Error"
];

export let verdictIcon: { [key: string]: string; } = {
    "Memory Limit Exceeded": "bi-memory text-error",
    "Time Limit Exceeded": "bi-alarm-circle text-error",
    "Runtime Error": "bi-x-circle text-error",
    "Wrong Answer" : "bi-x-circle text-yellow",
    "Correct Answer": "bi-check-circle text-accent", 
    "OK": "bi-check-circle text-accent",
    "Compilation Error": "bi-exclamation-triangle text-error"
};

// katex render
export let katexDelimiters = [
    {left: '$$', right: '$$', display: true},
    {left: '$', right: '$', display: false},
    {left: '\\(', right: '\\)', display: false},
    {left: '\\[', right: '\\]', display: true}
]


// problem creation
export let limits = {
    time: {
        default: 2,
        max: 10,
        min: 1,
    },
    memory: {
        default: 512,
        max: 1024,
        min: 2
    }
}

export let testCaseVisible = 5000;

// pagination
export let itemsOnPage = 100;

// contest creation
export let minTimeToContest = 5;
export let minContestDuration = 5;
