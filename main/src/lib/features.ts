export function formToObj(formData: FormData): any{
	const data = {};
	formData.forEach((value, key) => (data[key] = value));
	return data;
}