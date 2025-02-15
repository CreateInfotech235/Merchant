import API from "./Api";
import { toast } from "react-toastify";

export const getBilling = async () => {
    try {
        const response = await API.get(`/mobile/billing/getBilling`);
        if (response.status === 200) {
            return {
                status: "SUCCESS",
                message: "You registered successfully",
                data: response.data.data
            };
        } else {
            toast.error(response.message);
            return {
                status: false,
                message: response.message
            };
        }
    } catch (error) {
        console.error('Error fetching billing:', error);
        toast.error(error.message);
        return { status: false, message: error.message };
    }
};
export const BillingApprove = async (data) => {
    try {
        const response = await API.post(`/mobile/billing/approveBilling`, data);
        console.log(response, "response");
        if (response.status === 200) {
            toast.success("Billing approved successfully");
            return {
                status: true,
                message: "Billing approved successfully",
                data: response.data.data
            };
        } else if (response.status === 400) { // Handle BAD_REQUEST specifically
            const errorMessage = response.response.data.message;
            console.log(errorMessage, "errorMessage");
            toast.error(errorMessage);
            return {
                status: "BAD_REQUEST",
                message: errorMessage,
                data: null
            };
        } else {
            console.log(response.data.message, "response.data.message");    
            toast.error(response.data.message || response.message);
            return {
                status: false,
                message: response.data.message || response.message
            };
        }
    } catch (error) {
        console.error('Error approving billing:', error);
        const errorMessage = error.response?.data?.message || "An error occurred while approving billing.";
        toast.error(errorMessage);
        return { status: false, message: errorMessage };
    }
};
