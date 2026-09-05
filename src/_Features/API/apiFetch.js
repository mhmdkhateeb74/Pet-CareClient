import {backURL} from "../../var";


async function LoginUser(formData) {
    let url=`${backURL}/US/Login`;
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


async function RegisterUserApi(formData) 
{

    let url=`${backURL}/US/Add`;
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


async function RegisterPetApi(formData) 
{
    let url = `${backURL}/AN/Add`;
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
    let url=`${backURL}/AN/Delete`;
    
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


async function UpdatePet(formData) 
{
    let url=`${backURL}/AN/Update`;
    
    const dataToSend = new FormData();
    dataToSend.append("animal_id", formData.animal_id);
    dataToSend.append("name", formData.name);
    dataToSend.append("species", formData.species);
    dataToSend.append("age", formData.age);
    dataToSend.append("photo_url", formData.photo_url);
    dataToSend.append("owner_id", formData.owner_id);
    dataToSend.append("vet_id", formData.vet_id);

    const response = await fetch(url, {
        method: "PUT",
        body: dataToSend,
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();

}


async function GetAllAnimals() {
    let url=`${backURL}/AN/List`;
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


async function GetAllVisiters() {
    let url=`${backURL}/VI/List`;
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

async function GetAllVaccines() {
    let url=`${backURL}/VA/List`;
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

export{
    LoginUser, RegisterUserApi,RegisterPetApi,GetAllVet,DeletePet,UpdatePet,GetAllAnimals,GetAllVisiters,GetAllVaccines,
}