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

export const createWebSocialMedia = async (data) => {
    try {
        const response = await API.post("/socialmedia/create", data);
        console.log("social media response", response);
        return response;
    } catch (error) {
        console.error("Error creating web social media:", error);
        throw error;
    }
};  

export const getWebSocialMedia = async () => {
    try {
        const response = await API.get("/socialmedia");
        console.log("social media response", response);
        return response.data;
    } catch (error) {
        console.error("Error getting web social media:", error);
        throw error;
    }
};  





export const createWebLandingPage = async (data) => {
    try {
        const response = await API.post("/home/create", data);
        console.log("web landing page response", response);
        return response;
    } catch (error) {
        console.error("Error creating web landing page:", error);
        throw error;
    }
};  

export const getWebLandingPage = async () => {
    try {
        console.log("ZSDsd");
        
        const response = await API.get("/home/landingpage");
        console.log("web landing page response", response);
        return response.data;
    } catch (error) {
        console.error("Error getting web landing page:", error);
        throw error;
    }
};  

export const updateWebLandingPage = async (data) => {
    try {
        const response = await API.post("/home/landingpage", data);
        console.log("web landing page response", response);
        return response;
    } catch (error) {
        console.error("Error updating web landing page:", error);
        throw error;
    }
};  

// export const footergetdata



export const createfooter  = async (data) => {
    try {
        const response = await API.post("/home/create", data);
        console.log("web landing page response", response);
        return response;
    } catch (error) {
        console.error("Error creating web landing page:", error);
        throw error;
    }
};  




export const getWebFooter = async () => {
    try {
        const response = await API.get("/footer");
        console.log("web footer response", response);
        return response;
    } catch (error) {
        console.error("Error getting web footer:", error);
        throw error;
    }
};



export const updateWebFooter = async (data) => {
    try {
        const response = await API.post("/footer/create", data);
        console.log("web footer response", response);
        return response;
    } catch (error) {
        console.error("Error updating web footer:", error);
        throw error;
    }
};
