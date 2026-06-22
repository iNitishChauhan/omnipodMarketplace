const backendUrl = (process.env.REACT_APP_BACKEND_URL || "https://omnipodmarketplace.minddigital.in").replace(/\/$/, "");

export const BASEURL = backendUrl;
export const WEBSITE_URL = backendUrl;
export const API_URL = `${backendUrl}/api/`;
