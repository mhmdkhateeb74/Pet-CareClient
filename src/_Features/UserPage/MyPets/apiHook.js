import { useMutation, useQuery,  useQueryClient } from "@tanstack/react-query";
import {RegisterPetApi,GetAllVet,DeletePet,UpdatePet} from "./apiPets";

function useRegisterPetApi() {
    const queryClient = useQueryClient();

    const { mutate:RegisterPet} = useMutation(
        {
            mutationFn: RegisterPetApi,
            onError: async (err) => {
                console.log("err", err)
            },
            onSuccess: (data)=>{

                queryClient.invalidateQueries({
                    queryKey: ["allAnimals"]
                });
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

function useDeletePet() {

    const queryClient = useQueryClient();

    const { mutate:deletePet} = useMutation(
        {
            mutationFn: DeletePet,
            onError: async (err) => {
                console.log("err", err)
            },
            onSuccess: (data) => {
                console.log(data);
    
                queryClient.invalidateQueries({
                    queryKey: ["allAnimals"]
                });
            },
        }
    );

    return {deletePet};
}

function useUpdatePet() {

    const queryClient = useQueryClient();

    const { mutate:updatePet} = useMutation(
        {
            mutationFn: UpdatePet,
            onError: async (err) => {
                console.log("err", err)
            },
            onSuccess: (data) => {
                console.log(data);
    
                queryClient.invalidateQueries({
                    queryKey: ["allAnimals"]
                });
            },
        }
    );

    return {updatePet};
}


export {useRegisterPetApi,useGetAllVet,useDeletePet,useUpdatePet};