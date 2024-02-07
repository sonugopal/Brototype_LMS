
import axios from "axios";


export const isAdmin =async(userId:any)=>{
  const response = await axios.post(`/api/isAdmin`)
  return response.data
}