import { db } from "@/lib/db";
// import { User } from "@prisma/client";
import axios from "axios";

export const isTeacher = async (userId:any) => {
  try {
    //const isTeacher = await axios.post(`/api/isTeacher`)
    const isTeacher = await db.user.findFirst({
      where: {
          userid: userId,
          role:1
      }
    });
    return isTeacher!==null
  } catch (error) {
    console.log("[GET_ISTEACHER]", error);
    return false
  }
}