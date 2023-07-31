export function load({ params }) {
	return { taskId: params.task };
}

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		
		return {
			lang: formData.get("language"),
			code: formData.get("solution")
		}
	}
}