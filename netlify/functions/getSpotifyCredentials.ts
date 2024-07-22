import { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  const value = Netlify.env.get("VITE_CLIENT_ID");

  return new Response(`Value of MY_IMPORTANT_VARIABLE for ${context.site.name} is ${value}.`, {
    headers: { "content-type": "text/html" },
  });
}
