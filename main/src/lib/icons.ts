export let verdictIcon: { [key: string]: string; } = {
    "Memory Limit Exceeded": "bi-memory text-error",
    "Time Limit Exceeded": "bi-alarm text-error",
    "Runtime Error": "bi-x-circle text-error",
    "Wrong Answer" : "bi-x-circle text-yellow",
    "Correct Answer": "bi-check-circle text-accent", 
    "OK": "bi-check-circle text-accent",
    "Compilation Error": "bi-exclamation-triangle text-error"
};

export let contestStatusIcon: { [key: string]: string; } = {
    "ongoing": "bi-play-circle text-accent",
    "ended": "bi-check-circle text-yellow",
    "unstarted": "bi-clock text-yellow"
};