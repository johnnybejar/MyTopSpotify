import { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  return new Response(process.env.VITE_CLIENT_ID);
}
