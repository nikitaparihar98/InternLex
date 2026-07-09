import { API_URL } from "../services/api";

export const getImageUrl = (imagePath) => {
  if (!imagePath) return "";
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }
  return `${API_URL.replace("/api", "")}/${imagePath}`;
};
