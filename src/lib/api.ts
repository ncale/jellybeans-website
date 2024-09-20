import ApiClient from "./clients/api-client";
import { API_URL } from "@/constants/links";

const apiClient = new ApiClient(API_URL);

export default apiClient;
