import { error, fail, redirect } from '@sveltejs/kit';

export async function load({params}){
    try {
        return {
            username: params.user,
        }
    } catch (err: any) {
        throw error(403, err.message);
    }
}