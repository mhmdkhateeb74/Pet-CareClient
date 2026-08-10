
import {backURL} from "../../var";
const section = "US";

async function RegisterUserApi(formData) 
{

    let url=`${backURL}/${section}/Add`;
    console.log(url)
    const strToSend = JSON.stringify(formData);
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: strToSend,
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}

export{
    RegisterUserApi,
}