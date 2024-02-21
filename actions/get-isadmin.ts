import { db } from "@/lib/db";
import { notEqual } from "assert";

export const isAdmin = async (userId:any) => {
  try {
    const isAdmin = await db.user.findFirst({
      where: {
          userid: userId,
          role:{gt:0}
      }
    });
    
    return isAdmin!==null
  } catch (error) {
    return false
  }
}