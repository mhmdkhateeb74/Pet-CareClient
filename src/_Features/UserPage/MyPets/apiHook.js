import { useMutation, useQuery } from "@tanstack/react-query";
import {RegisterPetApi,GetAllVet} from "./apiPets";




function useRegisterPetApi() {
   

    const { mutate:RegisterPet} = useMutation(
        {
            mutationFn: RegisterPetApi,
            onError: async (err) => {
                console.log("err", err)
            },
            onSuccess: (data)=>{
                console.log(data);
                },
        }
    );

    return {RegisterPet};
}

function useGetAllVet() {
    const query = useQuery({
        queryKey: ['allVet'],
        queryFn: () => GetAllVet(),
        staleTime: 5 * 60 * 1000, 
        gcTime: 5 * 60 * 1000, 
        retry: (failureCount, error) => {
            return failureCount < 3;
        }
    });
    return query;
}


export {useRegisterPetApi,useGetAllVet};