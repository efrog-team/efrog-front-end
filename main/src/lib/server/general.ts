const baseUrl = "http://localhost:8000"

export async function request(method:string, path: string , data?: any, auth?:string){
    let options: RequestInit = {
        method, 
        headers: {
            "Content-Type": "application/json",
            "authorization": auth || "",
        }
    }
    if(data) options.body = JSON.stringify(data);
    const response = await fetch(baseUrl + path, options);
    
    const json = await response.json();
    if(!response.ok){
        throw new Error(json.detail || "Undescribed error");
    }
    return {status: response.status, body: json};
}