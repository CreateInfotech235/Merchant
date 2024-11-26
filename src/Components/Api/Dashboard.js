import API from "./Api";
export const getCounts= async () => {
    const id = localStorage.getItem('merchnatId')
    try {
        const response = await API.get(`/mobile/auth/count/${id}`);
        console.log('res',response)
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