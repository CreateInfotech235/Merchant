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
