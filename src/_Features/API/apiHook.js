import { useMutation, useQuery,  useQueryClient } from "@tanstack/react-query";
import {LoginUser,
    RegisterUserApi,
    RegisterPetApi,
    GetAllVet,
    DeletePet,
    UpdatePet,
    GetAllAnimals,
    GetAllVisiters,
    GetAllVaccines} from "./apiFetch";
import { useNavigate } from "react-router-dom";

function useLoginUser() {
    const Navigate=useNavigate();

    const {isLoading:IsloginUser, mutate:loginUser} = useMutation(
        {
            mutationFn: LoginUser,
            onError: async (err) => {
                console.log("err", err)
            },
            onSuccess: (data)=>{
                console.log(data);
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                Navigate("/User");

            },
        }
    );

    return {IsloginUser, loginUser,};
}


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


function useGetAllAnimals() {
    const query = useQuery({
        queryKey: ['allAnimals'],
        queryFn: () => GetAllAnimals(),
        staleTime: 5 * 60 * 1000, 
        gcTime: 5 * 60 * 1000, 
        retry: (failureCount, error) => {
            return failureCount < 3;
        }
    });
    return query;
}

function useGetAllVisiters() {
    const query = useQuery({
        queryKey: ['AllVisiters'],
        queryFn: () => GetAllVisiters(),
        staleTime: 5 * 60 * 1000, 
        gcTime: 5 * 60 * 1000, 
        retry: (failureCount, error) => {
            return failureCount < 3;
        }
    });
    return query;
}

function useGetAllVaccines() {
    const query = useQuery({
        queryKey: ['AllVaccines'],
        queryFn: () => GetAllVaccines(),
        staleTime: 5 * 60 * 1000, 
        gcTime: 5 * 60 * 1000, 
        retry: (failureCount, error) => {
            return failureCount < 3;
        }
    });
    return query;
}



export {useLoginUser,
    useRegisterUser,
    useRegisterPetApi,
    useGetAllVet,
    useDeletePet,
    useUpdatePet,
    useGetAllAnimals,
    useGetAllVisiters,
    useGetAllVaccines};