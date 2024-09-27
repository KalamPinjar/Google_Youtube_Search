import axios from "axios";

export default async function postGoogleSearch({ q }: { q: string }) {
  const response = axios.post(
    `${import.meta.env.VITE_SERVER_URL}/googleSearch`,
    { q }
  );
  return response;
}
