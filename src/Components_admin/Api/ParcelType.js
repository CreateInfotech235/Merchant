import API from "./Api"
import { toast } from "react-toastify";

export const getAllParcelTypes = async (page, pageLimit) => {
    try {
        const response = await API.get(`/parcelType?pageCount=${page}&pageLimit=${pageLimit}`);
        if (response.status === 200) {
            return { status: true, data: response.data.data }
        } else {
            console.log('API error', response.message)
            return {status : false , message: response.message}
        }
    } catch (error) {
        console.error('Error fetching cities:', error);
        return { status: false, message: error.message };
    }
};

export const createParcelType = async (data) => {
    try {
        const response = await API.post(`/parcelType/create`, data);
        
        if (response.status === 200) {
            toast.success(response.data.message)
            return { status: true, data: response.data.message }
        } else {
            console.log('API error', response.response.data.message)
            toast.error(response.response.data.message || response.message)
            return {status : false , message: response.response.data.message || response.message}
        }
    } catch (error) {
        console.error('Error fetching cities:', error);
        toast.error(error.message)
        return { status: false, message: error.message };
    }
}

export const updateParcelType = async (id, data) => {
    try {
        const response = await API.patch(`/parcelType/${id}`, data);
        if (response.status === 200) {
            toast.success(response.data.message)
            return { status: true, data: response.data.data }
        } else {
            console.log('API error', response.response.data.message)
            toast.error(response.response.data.message || response.message)
            return {status : false , message: response.response.data.message || response.message}
        }
    } catch (error) {
        console.error('Error fetching cities:', error);
        toast.error(error.message)
        return { status: false, message: error.message };
    }
}

export const deleteParcelType = async (id) => {
    try {
        const response = await API.delete(`/parcelType/${id}`);
        if (response.status === 200) {
            toast.success(response.data.message)
            return { status: true, data: response.data.data }
        } else {
            toast.error(response.response.data.message || response.message)
            return {status : false , message: response.response.data.message || response.message}
        }
    } catch (error) {
        console.error('Error fetching cities:', error);
        toast.error(error.message)
        return { status: false, message: error.message };
    }
}