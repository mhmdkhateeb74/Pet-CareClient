import {useMutation} from "@tanstack/react-query";
import {LoginUser} from "./apilogin";
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
                Navigate("/");

            },
        }
    );

    return {IsloginUser, loginUser};
}


export {useLoginUser};