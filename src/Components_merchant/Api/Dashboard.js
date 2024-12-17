import API from "./Api";
export const getCounts = async () => {
  const id = localStorage.getItem("merchnatId");
  try {
    const response = await API.get(`/mobile/auth/count/${id}`);
    // console.log('res',response)
    if (response.status === 200) {
      return { status: true, data: response.data.data };
    } else {
      // console.log('API error', response.message)
      return { status: false, message: response.message };
    }
  } catch (error) {
    console.error("Error fetching cities:", error);
    return { status: false, message: error.message };
  }
};

export const getdata = async (startDate, endDate) => {
  // console.log("a");

  const id = localStorage.getItem("merchnatId");
  let url = `/mobile/auth/getOrderCountsbyDate/${id}`;

  // Conditionally add the startDate and endDate query parameters if they are provided
  if (startDate) {
    url += `?startDate=${startDate}`;
  }
  if (endDate) {
    // If startDate is already present, append '&' to avoid conflict, otherwise append '?'
    url += startDate ? `&endDate=${endDate}` : `?endDate=${endDate}`;
  }

  try {
    const response = await API.get(url);
    // console.log('resdata', response);
    if (response.status === 200) {
      return { status: true, data: response.data.data };
    } else {
      // console.log('API error', response.message);
      return { status: false, message: response.message };
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return { status: false, message: error.message };
  }
};
