import {formToObj} from '$lib/features.ts'

function validateFormInfo(data){
	// problem-name
	// time-limit
	// memory-limit
	// statement
	// input-format
	// output-format
	// notes
}

export const actions = {
	save: async ({ request, cookies, params }) => {
		const formData = await request.formData();
		// let {language, version} = getLangInfo(formData.get("language"));
        // let submitionId = await submit(params.task, formData.get("solution"), language, 
        //         version, cookies.get("auth"));

        // throw redirect(303, `/submissions/${submitionId}/full`);
	}
}