// api/axiosInstance.ts
import axios from "axios";
import { baseApiUrl } from "../types/common";
import { getAuthToken } from "../utils";

const axiosInstance = axios.create({
	baseURL: baseApiUrl,
	headers: {
		"Content-Type": "application/json",
	},
});

axiosInstance.interceptors.request.use(
	(config) => {
		const token = getAuthToken();
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

export default axiosInstance;
