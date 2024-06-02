
/**
 * Represents an error detail.
 */
export interface ErrorDetail {
    message: string
    propertyName: string
}

/**
 * Represents an error response.
 */
export interface ErrorResponse {
    statusCode: number
    message: string
    details: ErrorDetail[]
}