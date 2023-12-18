
import axios from "axios";
// export const isTeacher = (userId?: string | null) => {
//   const list= process.env.NEXT_PUBLIC_TEACHER_ID?.split(',')
//   return list?.includes(userId as string)
//   //return userId === process.env.NEXT_PUBLIC_TEACHER_ID;
// }

export const isTeacher =async(userId:any)=>{
  const response = await axios.post(`/api/isTeacher`)
  return response.data
}