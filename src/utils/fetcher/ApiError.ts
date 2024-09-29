/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  public status: number;
  public options?: {
    url?: string;
    /**
     * Stringified API error details
     * @schema {name: string, reason: string}[]
     */
    errors?: string;
  };

  constructor(
    statusCode?: number,
    message?: string,
    options?: (typeof ApiError)["prototype"]["options"],
  ) {
    super(message ?? "API Error");

    this.status = statusCode ?? 500;
    this.options = options;

    Object.setPrototypeOf(this, ApiError.prototype);
  }

  /**
   * Get the error message from the API response
   * Atm, it's not clear how to handle multiple error messages
   */
  getErrorMessage() {
    if (this.options?.errors) {
      const errors = JSON.parse(this.options.errors);
      if (errors?.[0]?.reason) {
        return errors[0].reason as string;
      }
    }

    return this.message;
  }
}
