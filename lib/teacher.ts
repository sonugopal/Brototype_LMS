export const isTeacher = (userId?: string | null) => {
  const list= process.env.NEXT_PUBLIC_TEACHER_ID?.split(',')
  return list?.includes(userId as string)
  //return userId === process.env.NEXT_PUBLIC_TEACHER_ID;
}