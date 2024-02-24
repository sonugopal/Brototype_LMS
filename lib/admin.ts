import axios from "axios";

export const isAdmin = async () => {
  const response = await axios.post(`/api/isAdmin`);
  console.log(response);
  return response.data;
};
