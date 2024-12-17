import API from "./Api";
export const getAllCity = async (page, pageLimit) => {
    try {
        const response = await API.get(`/customer/auth/getCities`);
        if (response.status === 200) {
            return { status: true, data: response.data.data }
        } else {
            // console.log('API error', response.message)
            return {status : false , message: response.message}
        }
    } catch (error) {
        console.error('Error fetching cities:', error);
        return { status: false, message: error.message };
    }
};