
import API from "./Api";
import { toast } from "react-toastify";
export const login = async (data) => {
    try {
        console.log(data);
        
        const response = await API.post(`/mobile/auth/signIn`, data);
        console.log(response);
        
        if (response.status === 200) {
            return { status: true, data: response.data.data }
        } else {
            return { status: false, message: response.response.data.message }
        }
    } catch (error) {
        console.error('Error fetching cities:', error);
        return { status: false, message: error.message };
    }
};

export const sendOtp = async (data) => {
    try {
        const response = await API.post(`mobile/auth/sendEmailOrMobileOtp`, data);
        console.log('abcd', response);
        
        if (response.status === 200) {
            toast.success('OTP send to your email/contact no, Please check it')
            return { status: true, data: response.data.data }
        } else {
            return { status: false, message: response.response.data.message }
        }
    } catch (error) {
        console.error('Error fetching cities:', error);
        return { status: false, message: error.message };
    }
};

export const signup = async (data) => {
    try {
        const response = await API.post(`/mobile/auth/signUp`, data);
        if (response.status === 200) {
            toast.success(response.data.messgae)
            return { status: true, data: response.data.data }
        } else {
            return { status: false, message: response.response.data.message }
        }
    } catch (error) {
        console.error('Error fetching cities:', error);
        return { status: false, message: error.message };
    }
};




