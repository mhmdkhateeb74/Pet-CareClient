import { GetAllAnimals,GetAllVisiters,GetAllVaccines } from "./apiUser";
import { useQuery } from "@tanstack/react-query";

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

export {useGetAllAnimals,useGetAllVisiters,useGetAllVaccines};