
import {backURL} from "../../../var";
const section = "AN";

async function RegisterPetApi(formData) 
{
    let url = `${backURL}/${section}/Add`;
    console.log(url);

    const dataToSend = new FormData();

    dataToSend.append("name", formData.name);
    dataToSend.append("species", formData.species);
    dataToSend.append("age", formData.age);
    dataToSend.append("photo_url", formData.photo_url);
    dataToSend.append("owner_id", formData.owner_id);
    dataToSend.append("vet_id", formData.vet_id);

    const response = await fetch(url, {
        method: "POST",
        body: dataToSend,
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}


async function GetAllVet() {
    let url=`${backURL}/VT/List`;
    console.log(url);
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'accept': 'application/json',
        },
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}

async function DeletePet(id) 
{
    let url=`${backURL}/${section}/Delete`;
    
    const strToSend = JSON.stringify({  animal_id: id});
    const response = await fetch(url, {
        method: 'DELETE',
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
    RegisterPetApi,GetAllVet,DeletePet
}