import { clientUrl } from "$lib/config";

export function formToObj(formData: FormData): {[key: string]: string}{
	const data: { [key: string]: any } = {};
	formData.forEach((value, key) => (data[key] = value));
	return data;
}

export function randomString(length: number): string{
	return Math.random().toString(36).substring(2, 2 + length);
}

export function getAuthParams(state: string){
	const params = new  URLSearchParams({
		response_type: "code",
		client_id: "12345678", // oauth imitation
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

