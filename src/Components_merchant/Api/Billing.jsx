import API from "./Api";

export const getBilling = async () => {
    try {
        const response = await API.get(`/mobile/billing/getBilling`
        //     ,{params:{
        //   status:"DELIVERED",
        // }}
    );
        if (response.status === 200) {
            return {
                status: "SUCCESS",
                message: "You registered successfully",
                data: response.data.data
            };
        } else {
            return {
                status: false,
                message: response.message
            };
        }
    } catch (error) {
        console.error('Error fetching billing:', error);
        return { status: false, message: error.message };
    }
};
