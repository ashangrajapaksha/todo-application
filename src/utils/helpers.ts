/**
 * Response utility functions
 */
export const createSuccessResponse = (data: any, message?: string) => ({
  success: true,
  data,
  ...(message && { message }),
});

export const createErrorResponse = (error: string, message?: string) => ({
  success: false,
  error,
  ...(message && { message }),
});

/**
 * Validation utility functions
 */
export const isValidId = (id: string | number): boolean => {
  const numId = typeof id === "string" ? parseInt(id) : id;
  return !isNaN(numId) && numId > 0;
};

export const sanitizeString = (str: string): string => {
  return str.trim().replace(/\s+/g, " ");
};

/**
 * Date utility functions
 */
export const formatDate = (date: Date): string => {
  return date.toISOString();
};

/**
 * Environment utility functions
 */
export const isDevelopment = (): boolean => {
  return process.env.NODE_ENV === "development";
};

export const isProduction = (): boolean => {
  return process.env.NODE_ENV === "production";
};
