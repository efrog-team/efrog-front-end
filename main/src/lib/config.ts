export const clientUrl = "http://localhost:5173";
export const authUrl = "https://auth.efrog.pp.ua";
export const serverUrl = "https://api.efrog.pp.ua";
export const hubUrl = "https://hub.efrog.pp.ua";

// localisations
export const localisations = [
	"en",
	"uk"
];

// submissions
export const languages = [
	"C#",
	"C++ 17",
	"C 17",
	"Node.js",
	"Python 3"
];

export const versions = [
	"Python 3 (3.10)",
	"Node.js (20.x)",
	"C++ 17 (g++ 11.2)",
	"C 17 (gcc 11.2)",
	"C# (Mono 6.8)"
];

export const prismLang: Dictionary = {
	"Python 3 (3.10)": "py",
	"Node.js (20.x)": "js",
	"C++ 17 (g++ 11.2)": "cpp",
	"C 17 (gcc 11.2)": "c",
	"C# (Mono 6.8)": "cs"
};

export const verdicts = [
	"Correct Answer", // change also at TestCases.svelte
	"Wrong Answer",
	"Compilation Error",
	"Time Limit Exceeded",
	"Memory Limit Exceeded",
	"Custom Checker Error",
	"Runtime Error",
	"Internal Server Error"
];

// katex render
export const katexDelimiters = [
	{left: "$$", right: "$$", display: true},
	{left: "$", right: "$", display: false},
	{left: "\\(", right: "\\)", display: false},
	{left: "\\[", right: "\\]", display: true}
];


// problem creation
export const limits = {
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
};

export const testCaseVisible = 5000;

// pagination
export const itemsOnPage = 100;

// contest creation
export const minContestDuration = 5;
export const penalti = {
	time: 1,
	wrongAttempt: 10,
};

export const cookiesMaxAge = 60 * 60 * 24 * 30;
