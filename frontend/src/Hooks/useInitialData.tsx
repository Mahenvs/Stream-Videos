import { useEffect, useState } from "react";
import { apiRequest } from "../Utility/apiRequest";
import { Api_Props } from "../Models/API_PROPS";

// Define the hook with a generic type T
export const useInitialData = <T,>(api: Api_Props) => {
  const [data, setData] = useState<T | null>(null); // Use T as the expected type
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null); // Handle error state

  const fetchData = async () => {
    setLoading(true);
    setError(null); // Reset the error before making the request

    try {
      const { response, error } = await apiRequest({
        method: api.method,
        url: api.url,
      });

      if (error) {
        setError(error);
      } else {
        setData(response);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: unknown) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [api.url]); // Dependency array to re-fetch data if URL changes

  return { data, loading, error }; // Return data, loading, and error
};
