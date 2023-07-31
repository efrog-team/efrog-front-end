const baseUrl = "http://localhost:8000"

export async function request(method:string, path: string , data?: any, auth?:any){
    let options = {
        method, 
        headers: {
            "Content-Type": "application/json",
            "authorization": auth,
        }
    }
    if(data) options.body = JSON.stringify(data);
    const response = await fetch(baseUrl + path, options);
    
    return response;
}