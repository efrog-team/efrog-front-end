import { error } from "@sveltejs/kit";
import { hubUrl } from "$lib/config";

interface Problem{
    name: string, 
	time_limit: number, 
	memory_limit: number, 
	statement: string, 
	input_statement: string, 
	output_statement: string, 
	note: string, 
	test: TestCase[], 
	is_checker: boolean, 
	checker_code: string, 
	checker_language: string
}

interface TestCase{
    input: string,
    output: string,
    status: boolean
}

export async function getFromHub(taskId: number, token: string): Promise<Problem>{
	const response = await fetch(hubUrl + "/api/publicate-task",{
		method: "POST",
		body: JSON.stringify({taskId}),
		headers: {
			"Content-Type": "application/json",
			Authorization: token
		}
	});

	const json = await response.json();
	if(response.ok){
		return json;
	}
	throw error(response.status, json.error || "Undescribed error");
}


