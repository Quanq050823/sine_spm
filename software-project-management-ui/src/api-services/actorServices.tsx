import { useEffect, useState } from "react";
import axios from "@/utils/axios";
import { toast } from "react-toastify";
import { getAccessTokenFromCookie } from "./CookieServices";
import { handleTokenExpired, RefreshToken } from "./AuthServices";

// -----------------------------------Issue-----------------------------------

export const addActor = async (data: any) => {
    try {
        console.log(data);
        let { role, projectId, email } = data;
        // await RefreshToken();
        const response = await axios.post(
            `/project/add-actor/${projectId}`,
            { email: email, role },
            {
                headers: {
                    Authorization: `Bearer ${getAccessTokenFromCookie()}`,
                },
                withCredentials: true,
            }
        );

        toast.success("Add member succeeded!");
        return response.data;
    } catch (error: any) {
        toast.error(`Add member failed. ${error?.response?.data?.message}`);
        console.log(error);
        await handleTokenExpired(error);
    }
};
