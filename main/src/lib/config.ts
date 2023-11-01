export const authUrl = "https://auth.efrog.pp.ua";
export const serverUrl = "https://api.efrog.pp.ua";
export const clientUrl = "http://localhost:5173";
export const hubUrl = "http://localhost:1204";


// localisations
export const localisations = [
	"en",
	"uk"
];

// submissions
export const languages = [ 
	"C++ 17",
	"C 17",
	"Node.js",
	"Python 3"
];

export const versions = [
	"Python 3 (3.10)",
	"Node.js (20.x)",
	"C++ 17 (g++ 11.2)",
	"C 17 (gcc 11.2)"
];

export const prismLang: Dictionary = {
	"Python 3 (3.10)": "py",
	"Node.js (20.x)": "js",
	"C++ 17 (g++ 11.2)": "cpp",
	"C 17 (gcc 11.2)": "c"
};

export const verdicts = [
	"Correct Answer", // change also at TastCases.svelte
	"Wrong Answer",
	"Compilation Error",
	"Time Limit Exceeded",
	"Memory Limit Exceeded",
	"Runtime Error"
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
