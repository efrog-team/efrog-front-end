import { clientUrl } from "$lib/config";

export function formToObj(formData: FormData): Dictionary {
	const data: Dictionary = {};
	formData.forEach((value, key) => (data[key] = value as string));
	return data;
}

export function randomString(length: number): string{
	return Math.random().toString(36).substring(2, 2 + length);
}

export function getAuthParams(state: string){
	const params = new  URLSearchParams({
		response_type: "code",
		//client_id: "12345678", // oauth imitation
		state,
		redirect_uri: clientUrl + "/api/auth/callback"
	});
	return params.toString();
}

export function isValidDate(str: string){
	return !isNaN((new Date(str)).getTime());
}

export function formatDate(date: string|Date|number){
	date = new Date(date);
	return date.toISOString().replace("T", " ").slice(0,-5);
}

export function toLocalDate(str: string){
	const pad = (num: number) => String(num).padStart(2, "0");
	const d = new Date(str+"Z");
	return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${d.toTimeString().slice(0,8)}`;
}

export function getLangInfo(str: string){
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, language, version] = str.match(/(.+) \((.+)\)/) as string[];
	return {language, version};
}

export function formatCode(code: string){
	return code.replaceAll("\xA0 \xA0 ", "\t").replaceAll("\t", "    ");
}