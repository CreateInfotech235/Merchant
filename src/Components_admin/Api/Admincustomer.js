import API from "./Api";

export const getAllCustomers = async (createdBy) => {
  try {
    const response = await API.get(`/customer/getAllCustomer/${createdBy}`);
    // console.log("🚀 ~ getAllCustomers ~ response:", response);
    if (response.status === 200) {
      return { status: true, data: response.data.data };
    } else {
      return { status: false, message: response.data.message };
    }
  } catch (error) {
    // console.log("🚀 ~ getAllCustomers ~ error:", error);
    return error;
  }
};
