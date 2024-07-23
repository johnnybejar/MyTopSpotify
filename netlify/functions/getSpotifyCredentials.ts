export default async () => {
  return new Response(process.env.VITE_CLIENT_ID);
}
