import API from "./Api";

export const updateWebHome = async (data) => {
    try {
        const response = await API.patch("/home/update", data);
        console.log(response);
        return response;
    } catch (error) {
        console.error("Error updating web home:", error);
        throw error;
    }
};




export const createWebNavbar = async (data) => {
    try {
        const response = await API.post("/navbar/create", data);
        return response;
    } catch (error) {
        console.error("Error creating web navbar:", error);
        throw error;
    }
};  

export const getWebNavbar = async () => {
    try {
        const response = await API.get("/navbar");
        console.log("navbar response", response);
        return response;
    } catch (error) {
        console.error("Error getting web navbar:", error);
        throw error;
    }
};  