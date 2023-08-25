const API = {
    url: "/data/menu.json",
    fetchMenu: async () =>{
        const result = await fetch(API.url);   //await from
        return await result.json() ; //parse the result of the json
    }
}

export default API;