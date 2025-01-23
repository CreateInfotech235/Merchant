import axios from "axios";
import API from "./Api";

export const forgotPassword = async (email) => {
    console.log("send email", email);
    try {
        const response = await API.post(`/auth/forgot-password/send-otp`, { email });
        console.log(response.data.status);
        return response.data.status;

    } catch (error) {
        console.error("Error fetching forgot password:", error);
        return { status: false, message: error.message };
    }
}




export const verifyOTP = async (email, otp) => {
    console.log("verify otp", email, otp);
    try {
        const response = await API.post(`/auth/forgot-password/verify-otp`, { email, otp });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching forgot password:", error);
        return { status: false, message: error.message };
    }
}


export const changePassword = async (email, newPassword) => {
    console.log("change password", email, newPassword);
    try {
        const response = await API.post(`/auth/forgot-password/reset-password`, { email, newPassword });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching forgot password:", error);
        return { status: false, message: error.message };
    }
}
