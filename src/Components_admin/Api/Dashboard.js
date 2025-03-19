import API from "./Api";
export const getCounts = async () => {
  try {
    const response = await API.get(`/auth/count`);
    // console.log('res',response)
    if (response.status === 200) {
      return { status: true, data: response.data.data };
    } else {
      // console.log('API error', response.message)
      return { status: false, message: response.response.data.message };
    }
  } catch (error) {
    console.error("Error fetching cities:", error);
    return { status: false, message: error.message };
  }
};


export const authenticateAdmin = async () => {
  try {
    const response = await API.post(`/authenticate`);
    console.log('response',response)
    if (response.status === 200 && response.data.status) {
      return { status: true, data: response.data.data };
    } else {
      return { status: false, message: response.response.data.message };
    }
  } catch (error) {
    console.error("Error authenticating admin:", error);
  }
};
