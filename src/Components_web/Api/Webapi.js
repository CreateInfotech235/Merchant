import API from "./Api";
export const getWebHome = async () => {
    try {
        const response = await API.get(`/web/home`);
        console.log(response.data.webHome);
        
        return response.data.webHome;
    } catch (error) {
        console.error("Error fetching web home:", error);
        return { status: false, message: error.message };
    }
}