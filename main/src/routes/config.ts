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

export let verdicts = [
    "Solved",
    "Not Solved",
    "Compilation Error"
];

export let caseVerdictIcon: { [key: string]: string; } = {
    "Time Limit": "bi-alarm-circle text-error",
    "Runtime Error": "bi-x-circle text-error",
    "Wrong Answer" : "bi-x-circle text-yellow",
    "Correct Answer": "bi-check-circle text-accent"
};

export let verdictIcon: { [key: string]: string; } = {
    "Solved": "bi-patch-check text-accent",
    "Not Solved": "bi-x-circle text-yellow",
    "Compilation Error": "bi-exclamation-triangle text-error"
}