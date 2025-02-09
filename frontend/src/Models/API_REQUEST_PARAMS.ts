export type ApiRequestParams = {
    method: "GET" | "POST" | "PUT" | "DELETE"; // Restrict allowed methods
    url: string;
    data?: Record<string, any>; // Allow objects instead of only string[]
    headers?: Record<string, string>; // Allow custom headers
    params?: Record<string, Object>; // Allow query parameters
}