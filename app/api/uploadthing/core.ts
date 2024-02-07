import { createUploadthing, type FileRouter } from "uploadthing/next";
import { isAdmin } from "@/actions/get-isadmin";
import { Userid } from "@/interfaces/UserInterface";
import { getServerSession } from "next-auth";
import { authOption } from "../auth/[...nextauth]/route";
const f = createUploadthing();
 
const handleAuth = async () => {

  const session: Userid | null = await getServerSession(authOption);
    const userId = await session?.user.userid;
  const isAuthorized = isAdmin(userId);

  if (!userId || !isAuthorized) throw new Error("Unauthorized");
  return { userId };
}

export const ourFileRouter = {
  courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  courseAttachment: f(["text", "image", "video", "audio", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  chapterVideo: f({ video: { maxFileCount: 1, maxFileSize: "512GB" } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {})
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;