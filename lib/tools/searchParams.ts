export const queryStringCreator = (params: unknown) => {
  const queryParams: Record<string, string> = {};
  Object.entries(params || []).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      queryParams[key] = String(value);
    }
  });

  console.log("queryParams",queryParams)

  return new URLSearchParams(queryParams).toString();
};
