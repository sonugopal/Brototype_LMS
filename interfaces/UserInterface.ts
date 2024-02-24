import { Session } from "next-auth";

export interface Userid extends Session {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    userid: string | null;
    Name: string | null;
    role: number | null;
    id: string | null;
  };
}
