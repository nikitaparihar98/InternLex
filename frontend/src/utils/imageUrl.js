import { API_URL } from "../services/api";

export const getImageUrl = (imagePath) => {
  if (!imagePath) return "";
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }
  const baseUrl = API_URL.replace(/\/api\/?$/, "");
  const cleanPath = imagePath.startsWith("/") ? imagePath.slice(1) : imagePath;
  return `${baseUrl}/${cleanPath}`;
};
