import API from "./Api";
import { toast } from "react-toastify";
export const getBilling = async (data) => {
    try {
        const response = await API.get('/billing/getBilling', { params: data });
        if (response.status === 200) {
            return {
                status: "SUCCESS",
                message: "Billing data retrieved successfully",
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
