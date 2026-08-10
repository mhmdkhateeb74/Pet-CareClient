import {useMutation} from "@tanstack/react-query";
import {RegisterUserApi} from "./apiRegister";
import { useNavigate } from "react-router-dom";

function useRegisterUser() {
    const Navigate=useNavigate();

    const {isLoading:IsRegister, mutate:RegisterUser} = useMutation(
        {
            mutationFn: RegisterUserApi,
            onError: async (err) => {
                console.log("err", err)
            },
            onSuccess: (data)=>{
                console.log(data);
                Navigate("/Login");

            },
        }
    );

    return {IsRegister, RegisterUser};
}


export {useRegisterUser};