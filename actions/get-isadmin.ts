import { db } from "@/lib/db";

export const isAdmin = async (userId:any) => {
  try {
    const isAdmin = await db.user.findFirst({
      where: {
          userid: userId,
          role:1
      }
    });
    return isAdmin!==null
  } catch (error) {
    return false
  }
}