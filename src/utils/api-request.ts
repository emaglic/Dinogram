const apiRequest = async (
  endpoint,
  method,
  body = null,
  endpointExtension = ""
) => {
  // Dynamically determine the base URL based on the current page's directory
  const basePath = window.location.pathname.endsWith("/")
    ? window.location.pathname
    : window.location.pathname.substring(
        0,
        window.location.pathname.lastIndexOf("/") + 1
      );

  const BASE_URL = `${window.location.origin}${basePath}`;

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}${endpointExtension}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return { error: data?.message || `Error ${response.status}` };
    }

    return { success: true, data };
  } catch (error) {
    console.error("API Request Error:", error.message);
    return { error: error.message || "Something went wrong" };
  }
};

export default apiRequest;
